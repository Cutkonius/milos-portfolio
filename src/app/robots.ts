import type { MetadataRoute } from "next";
import { getContent } from "@/lib/cms/content";

export const dynamic = "force-dynamic";

/**
 * Crawling follows the CMS launch toggle: disallow everything until the site is
 * launched, then allow all but the admin and point crawlers at the sitemap.
 */
export default async function robots(): Promise<MetadataRoute.Robots> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://milosnovakovic.com";
  const { site } = await getContent();

  if (!site.launched) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: "/hq" },
    sitemap: `${base}/sitemap.xml`,
  };
}
