/**
 * Vault auth: HMAC-signed expiring tokens using Web Crypto only,
 * so the same code runs in the Edge proxy and in Node route handlers.
 * No credentials or secrets ever reach the client bundle.
 */

export const COOKIE_NAME = "mn_vault";
export const TOKEN_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

const enc = new TextEncoder();

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function toBase64Url(bytes: Uint8Array): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(s: string): Uint8Array | null {
  try {
    const b64 = s.replace(/-/g, "+").replace(/_/g, "/");
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes;
  } catch {
    return null;
  }
}

/** Token format: "<expiry-ms-base36>.<base64url(hmac-sha256(payload))>" */
export async function createToken(secret: string, maxAgeMs: number = TOKEN_MAX_AGE_MS): Promise<string> {
  const payload = (Date.now() + maxAgeMs).toString(36);
  const key = await hmacKey(secret);
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", key, enc.encode(payload)));
  return `${payload}.${toBase64Url(sig)}`;
}

export async function verifyToken(token: string, secret: string): Promise<boolean> {
  const dot = token.indexOf(".");
  if (dot <= 0) return false;
  const payload = token.slice(0, dot);
  const sig = fromBase64Url(token.slice(dot + 1));
  if (!sig) return false;
  const expiry = parseInt(payload, 36);
  if (!Number.isFinite(expiry) || expiry < Date.now()) return false;
  const key = await hmacKey(secret);
  return crypto.subtle.verify("HMAC", key, sig as BufferSource, enc.encode(payload));
}

/** Constant-time string comparison (length differences short-circuit, which is fine). */
export function safeEqual(a: string, b: string): boolean {
  const ab = enc.encode(a);
  const bb = enc.encode(b);
  if (ab.length !== bb.length) return false;
  let diff = 0;
  for (let i = 0; i < ab.length; i++) diff |= ab[i] ^ bb[i];
  return diff === 0;
}
