import type { MetadataRoute } from "next";
export const dynamic = "force-dynamic";

/**
 * Crawling follows the same fail-closed deploy switch as the vault proxy.
 * Keeping the decision in server-only environment state prevents a CMS edit
 * from accidentally exposing an unfinished site.
 */
export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://milosnovakovic.com";
  const launched = process.env.SITE_LAUNCHED === "true";

  if (!launched) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: "/hq" },
    sitemap: `${base}/sitemap.xml`,
  };
}
