import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, verifyToken } from "@/lib/auth";

/**
 * Pre-launch gate: everything except the vault door itself requires a valid
 * signed cookie. Fails closed — if VAULT_SECRET is missing, nobody gets in.
 * Remove this file (plus /vault and /api/login|logout) when going public.
 */

// The OG/Twitter images stay public so shared links unfurl pre-launch.
const PUBLIC_PATHS = [/^\/vault\/?$/, /^\/api\/login\/?$/, /^\/(opengraph|twitter)-image/];

export async function proxy(req: NextRequest) {
  const res = await gate(req);
  // The site is not public yet — keep crawlers away on every response.
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  // Baseline security headers (we frame cal.com; nobody frames us).
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  return res;
}

async function gate(req: NextRequest): Promise<NextResponse> {
  const { pathname } = req.nextUrl;
  const secret = process.env.VAULT_SECRET;
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const authed = Boolean(secret && token && (await verifyToken(token, secret)));

  if (PUBLIC_PATHS.some((r) => r.test(pathname))) {
    // Already inside? The door redirects to the living room.
    if (authed && pathname.startsWith("/vault")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  if (!authed) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }
    const url = new URL("/vault", req.url);
    const redirect = NextResponse.redirect(url);
    // Expired/invalid cookie? Clear it so the browser state stays clean.
    if (token) redirect.cookies.delete(COOKIE_NAME);
    return redirect;
  }

  return NextResponse.next();
}

export const config = {
  // Gate everything, including /_next/image (so the photo can't be fetched
  // pre-login). Build assets, favicon and robots.txt stay reachable.
  matcher: ["/((?!_next/static|favicon\\.ico|icon\\.svg|robots\\.txt).*)"],
};
