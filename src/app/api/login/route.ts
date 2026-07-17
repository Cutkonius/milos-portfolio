import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, TOKEN_MAX_AGE_MS, createToken, safeEqual } from "@/lib/auth";

export const runtime = "nodejs";

/**
 * Best-effort in-memory rate limit (per server instance). Plenty for a
 * pre-launch wall; the random failure delay blunts brute force further.
 */
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
  // Keep the map from growing unbounded.
  if (fails.size > 5000) {
    for (const [key, value] of fails) {
      if (now - value.windowStart > WINDOW_MS) fails.delete(key);
    }
  }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function POST(req: NextRequest) {
  // Same-origin check — a login CSRF here is near-useless to an attacker,
  // but the check costs nothing. Opaque ("null") or malformed Origin values
  // count as a mismatch rather than crashing the handler.
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

  const secret = process.env.VAULT_SECRET;
  const user = process.env.VAULT_USER;
  const pass = process.env.VAULT_PASS;
  if (!secret || !user || !pass) {
    // TEMPORARY deploy diagnostic — names/booleans only, never values.
    const diag = {
      hasSecret: Boolean(secret),
      hasUser: Boolean(user),
      hasPass: Boolean(pass),
      vaultKeys: Object.keys(process.env).filter((k) => k.startsWith("VAULT")),
      envCount: Object.keys(process.env).length,
      node: process.version,
    };
    console.log("[vault] env diagnostic", JSON.stringify(diag));
    return NextResponse.json({ ok: false, error: "vault_not_configured", diag }, { status: 500 });
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
    password.length > 200
  ) {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const userOk = safeEqual(username, user);
  const passOk = safeEqual(password, pass);
  if (!(userOk && passOk)) {
    recordFail(ip);
    await sleep(300 + Math.random() * 300);
    return NextResponse.json({ ok: false, error: "wrong_credentials" }, { status: 401 });
  }

  fails.delete(ip);
  const token = await createToken(secret);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: TOKEN_MAX_AGE_MS / 1000,
  });
  return res;
}
