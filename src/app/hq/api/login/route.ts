import { NextRequest, NextResponse } from "next/server";
import { scryptSync, timingSafeEqual } from "node:crypto";
import { createToken, safeEqual } from "@/lib/auth";
import { HQ_COOKIE, HQ_TOKEN_MAX_AGE_MS } from "@/lib/cms/admin-auth";

export const runtime = "nodejs";

/** Best-effort in-memory rate limit (per server instance). */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_FAILS = 8;
const fails = new Map<string, { count: number; windowStart: number }>();

function clientIp(req: NextRequest): string {
  return (req.headers.get("x-forwarded-for") ?? "local").split(",")[0].trim();
}

function isRateLimited(ip: string): boolean {
  const entry = fails.get(ip);
  if (!entry) return false;
  if (Date.now() - entry.windowStart > WINDOW_MS) {
    fails.delete(ip);
    return false;
  }
  return entry.count >= MAX_FAILS;
}

function recordFail(ip: string) {
  const now = Date.now();
  const entry = fails.get(ip);
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    fails.set(ip, { count: 1, windowStart: now });
  } else {
    entry.count += 1;
  }
  if (fails.size > 5000) {
    for (const [key, value] of fails) {
      if (now - value.windowStart > WINDOW_MS) fails.delete(key);
    }
  }
}

/** Verifies a password against a stored `scrypt` hash of the form `<saltHex>:<hashHex>`. */
function verifyPassword(password: string, stored: string): boolean {
  const [saltHex, hashHex] = stored.split(":");
  if (!saltHex || !hashHex) return false;
  try {
    const salt = Buffer.from(saltHex, "hex");
    const expected = Buffer.from(hashHex, "hex");
    const actual = scryptSync(password, salt, expected.length);
    return actual.length === expected.length && timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function POST(req: NextRequest) {
  // Same-origin check (cheap CSRF hardening).
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host) {
    let originHost: string | null = null;
    try {
      originHost = new URL(origin).host;
    } catch {
      originHost = null;
    }
    if (originHost !== host) {
      return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
    }
  }

  const secret = process.env.HQ_SECRET;
  const user = process.env.HQ_USER;
  const passHash = process.env.HQ_PASS_HASH;
  if (!secret || !user || !passHash) {
    return NextResponse.json({ ok: false, error: "hq_not_configured" }, { status: 500 });
  }

  const ip = clientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "too_many_attempts" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  const { username, password } = (body ?? {}) as { username?: unknown; password?: unknown };
  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    username.length > 200 ||
    password.length > 400
  ) {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const userOk = safeEqual(username, user);
  const passOk = verifyPassword(password, passHash);
  if (!(userOk && passOk)) {
    recordFail(ip);
    await sleep(300 + Math.random() * 300);
    return NextResponse.json({ ok: false, error: "wrong_credentials" }, { status: 401 });
  }

  fails.delete(ip);
  const token = await createToken(secret, HQ_TOKEN_MAX_AGE_MS);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(HQ_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: HQ_TOKEN_MAX_AGE_MS / 1000,
  });
  return res;
}
