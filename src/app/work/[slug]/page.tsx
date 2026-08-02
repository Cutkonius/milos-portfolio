import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getContent } from "@/lib/cms/content";
import { Providers } from "@/components/providers";
import { SiteConfigProvider } from "@/components/site-config";
import { CalProvider } from "@/components/cal-provider";
import { Toaster } from "@/components/ui/toast";
import { CaseStudyView } from "@/components/sections/case-study";
import { JsonLd, caseStudySchema } from "@/components/cms/json-ld";
import type { Project } from "@/lib/cms/types";

const slugOf = (p: Project) => p.slug || p.id;

async function findCase(slug: string) {
  const content = await getContent();
  const project = content.work.projects.find(
    (p) => p.kind === "case" && p.published && p.caseStudy?.enabled && slugOf(p) === slug
  );
  return project ? { project, site: content.site, nav: content.nav } : null;
}

export async function generateStaticParams() {
  const { work } = await getContent();
  return work.projects
    .filter((p) => p.kind === "case" && p.published && p.caseStudy?.enabled)
    .map((p) => ({ slug: slugOf(p) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const found = await findCase(slug);
  if (!found) return {};
  const { project, site } = found;
  const projectName = project.title?.trim() || "Case study";
  const title = `${projectName} case study | ${site.siteName}`;
  const intro = project.caseStudy?.intro || project.description || "";
  const tags = project.caseStudy?.tags?.join(", ");
  const description = [intro, tags ? `Work spanning ${tags}.` : ""].filter(Boolean).join(" ");
  const canonicalPath = `/work/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title,
      description,
      url: canonicalPath,
      siteName: site.siteName,
      locale: "en_US",
      type: "article",
    },
    twitter: { card: "summary_large_image", title, description },
    robots:
      process.env.SITE_LAUNCHED === "true"
        ? { index: true, follow: true }
        : { index: false, follow: false, noarchive: true },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const found = await findCase(slug);
  if (!found) notFound();

  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://milosnovakovic.com";

  return (
    <Providers>
      <SiteConfigProvider calLink={found.site.calLink} email={found.site.email}>
        <JsonLd data={caseStudySchema(found.project, found.site, base)} />
        <CalProvider />
        <CaseStudyView project={found.project} site={found.site} nav={found.nav} />
        <Toaster />
      </SiteConfigProvider>
    </Providers>
  );
}
