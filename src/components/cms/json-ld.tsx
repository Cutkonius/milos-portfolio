import type { Project, SiteSettings } from "@/lib/cms/types";

/** Renders a JSON-LD structured-data script. Server-safe. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function personSchema(site: SiteSettings, base: string): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: site.siteName,
      url: base,
      email: `mailto:${site.email}`,
      jobTitle: "Web designer & marketer",
      description: site.metaDescription,
      knowsAbout: [
        "Web design",
        "WooCommerce",
        "AI-assisted development",
        "Email marketing",
        "SEO",
      ],
      address: { "@type": "PostalAddress", addressCountry: "RS" },
    },
  };
}

export function caseStudySchema(
  project: Project,
  site: SiteSettings,
  base: string
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.title,
    url: `${base}/work/${project.slug || project.id}`,
    abstract: project.caseStudy?.intro || project.description,
    author: { "@type": "Person", name: site.siteName, url: base },
    keywords: project.caseStudy?.tags?.join(", "),
  };
}
