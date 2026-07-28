import type { Metadata } from "next";
import { getContentAdmin } from "@/lib/cms/content";
import { Providers } from "@/components/providers";
import { SiteConfigProvider } from "@/components/site-config";
import { CalProvider } from "@/components/cal-provider";
import { Toaster } from "@/components/ui/toast";
import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { Work } from "@/components/sections/work";
import { Services } from "@/components/sections/services";
import { About } from "@/components/sections/about";
import { Process } from "@/components/sections/process";
import { Contact } from "@/components/sections/contact";
import { PreviewBanner } from "./preview-banner";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Preview | HQ",
  robots: { index: false, follow: false },
};

/** The public home page rendered from the draft. Admin-only, never indexed. */
export default async function PreviewPage() {
  const { content } = await getContentAdmin();

  return (
    <Providers>
      <SiteConfigProvider calLink={content.site.calLink} email={content.site.email}>
        <div className="relative">
          <CalProvider />
          <Nav data={content.nav} />

          <main id="main" tabIndex={-1} className="outline-none">
            <Hero data={content.hero} open={content.site.openForProjects} />
            <Work data={content.work} />
            <Services data={content.services} />
            <About data={content.about} />
            <Process data={content.process} />
            <Contact data={content.contact} />
          </main>

          <PreviewBanner />
          <Toaster />
        </div>
      </SiteConfigProvider>
    </Providers>
  );
}
