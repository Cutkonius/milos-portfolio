import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, verifyToken } from "@/lib/auth";
import { HQ_COOKIE, isAdminHost, isAdminAuthed } from "@/lib/cms/admin-auth";

/**
 * One proxy, two surfaces decided by Host:
 *
 *  - The CMS host (`hq.milosnovakovic.com`, or any `hq.*` in dev) serves the
 *    admin app. Clean subdomain paths (`/projects`) are rewritten onto the
 *    internal `/hq/*` route segment; everything but `/login` requires a valid
 *    admin session. The admin app is never reachable from the public host.
 *  - Every other host is the public site behind the pre-launch vault wall:
 *    nothing but the vault door is served without a signed cookie.
 *
 * Remove/relax the vault half when the site goes public.
 */

const PUBLIC_PATHS = [/^\/vault\/?$/, /^\/api\/login\/?$/, /^\/(opengraph|twitter)-image/];

function withCommonHeaders(res: NextResponse, admin: boolean): NextResponse {
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  // The public site frames cal.com; the admin frames nothing.
  res.headers.set("X-Frame-Options", "DENY");
  if (admin) res.headers.set("Cache-Control", "no-store");
  return res;
}

export async function proxy(req: NextRequest) {
  const host = req.headers.get("host");
  const { pathname } = req.nextUrl;

  if (isAdminHost(host)) {
    return withCommonHeaders(await adminGate(req, pathname), true);
  }

  // Public host must never expose the admin routes.
  if (pathname === "/hq" || pathname.startsWith("/hq/")) {
    return withCommonHeaders(new NextResponse("Not found", { status: 404 }), false);
  }
  return withCommonHeaders(await vaultGate(req), false);
}

/** CMS host gate + clean-URL rewrite onto the `/hq/*` route segment. */
async function adminGate(req: NextRequest, pathname: string): Promise<NextResponse> {
  // Uploaded media is public (the live site references it) on every host.
  if (pathname.startsWith("/media/")) return NextResponse.next();

  const authed = await isAdminAuthed(req);

  // The image optimizer is only opened to authenticated admins.
  if (pathname.startsWith("/_next")) {
    return authed ? NextResponse.next() : new NextResponse(null, { status: 401 });
  }

  // Accept either clean subdomain paths ("/projects") or an already-prefixed
  // "/hq/projects" (a dev convenience when hitting the route directly).
  const prefixed = pathname === "/hq" || pathname.startsWith("/hq/");
  const cleanPath = prefixed ? pathname.slice(3) || "/" : pathname;

  const isPublicAdmin = cleanPath === "/login" || cleanPath === "/api/login";

  if (!authed && !isPublicAdmin) {
    if (cleanPath.startsWith("/api/")) {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }
    const redirect = NextResponse.redirect(new URL("/login", req.url));
    if (req.cookies.get(HQ_COOKIE)) redirect.cookies.delete(HQ_COOKIE);
    return redirect;
  }
  if (authed && cleanPath === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (prefixed) return NextResponse.next();
  const internal = cleanPath === "/" ? "/hq" : `/hq${cleanPath}`;
  return NextResponse.rewrite(new URL(internal, req.url));
}

/** Pre-launch vault: only the door is public; everything else needs the cookie. */
async function vaultGate(req: NextRequest): Promise<NextResponse> {
  const { pathname } = req.nextUrl;
  const secret = process.env.VAULT_SECRET;
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const authed = Boolean(secret && token && (await verifyToken(token, secret)));

  if (PUBLIC_PATHS.some((r) => r.test(pathname))) {
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
    if (token) redirect.cookies.delete(COOKIE_NAME);
    return redirect;
  }

  return NextResponse.next();
}

export const config = {
  // Gate everything, including /_next/image (so images can't be fetched
  // pre-login). Build assets, favicon, robots.txt and sitemap.xml stay reachable.
  matcher: ["/((?!_next/static|favicon\\.ico|icon\\.svg|robots\\.txt|sitemap\\.xml).*)"],
};
