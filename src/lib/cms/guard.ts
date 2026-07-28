import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { HQ_COOKIE } from "./admin-auth";

/**
 * Server-side admin check for Route Handlers and Server Actions. The proxy
 * already gates the admin host, but every mutation re-verifies here. Proxy
 * gating is not a security boundary for Server Functions (they POST to the
 * route where used, which a matcher could skip).
 */
export async function isAdmin(): Promise<boolean> {
  const secret = process.env.HQ_SECRET;
  const token = (await cookies()).get(HQ_COOKIE)?.value;
  return Boolean(secret && token && (await verifyToken(token, secret)));
}

export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) throw new Error("Unauthorized");
}
