/**
 * Admin (CMS) session: a second, independent HMAC-cookie session layered on
 * top of the site's existing vault auth (`@/lib/auth`). It reuses the same
 * Web-Crypto token scheme so it runs in both the proxy and Node route handlers,
 * but with its own cookie and secret so the CMS and the public vault are fully
 * separate credentials.
 */
import type { NextRequest } from "next/server";
import { isConfiguredCredential, verifyToken } from "@/lib/auth";

export const HQ_COOKIE = "mn_hq";
export const HQ_TOKEN_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

/**
 * Is this request addressed to the CMS host? Prefers an explicit `ADMIN_HOST`
 * (e.g. `hq.milosnovakovic.com`); otherwise any `hq.*` host, which also covers
 * `hq.localhost` for local development.
 */
export function isAdminHost(host: string | null | undefined): boolean {
  if (!host) return false;
  const h = host.split(":")[0].toLowerCase();
  const configured = process.env.ADMIN_HOST?.toLowerCase();
  if (configured) return h === configured;
  return h === "hq.localhost" || h.startsWith("hq.");
}

/** True when the request carries a valid, unexpired admin session cookie. */
export async function isAdminAuthed(req: NextRequest): Promise<boolean> {
  const rawSecret = process.env.HQ_SECRET;
  const secret = isConfiguredCredential(rawSecret, 32) ? rawSecret : undefined;
  const token = req.cookies.get(HQ_COOKIE)?.value;
  return Boolean(secret && token && (await verifyToken(token, secret)));
}
