import type { MetadataRoute } from "next";
import { getContent } from "@/lib/cms/content";

export const dynamic = "force-dynamic";

const slugOf = (p: { slug?: string; id: string }) => p.slug || p.id;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://milosnovakovic.com";
  if (process.env.SITE_LAUNCHED !== "true") return [];

  const { work } = await getContent();

  const caseStudies = work.projects
    .filter((p) => p.kind === "case" && p.published && p.caseStudy?.enabled)
    .map((p) => ({
      url: `${base}/work/${slugOf(p)}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    ...caseStudies,
  ];
}
