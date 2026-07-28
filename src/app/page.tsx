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
import { getContent } from "@/lib/cms/content";
import { JsonLd, personSchema } from "@/components/cms/json-ld";

export default async function Home() {
  const content = await getContent();
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://milosnovakovic.com";

  return (
    <Providers>
      <SiteConfigProvider calLink={content.site.calLink} email={content.site.email}>
        <JsonLd data={personSchema(content.site, base)} />
        <div className="relative">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:bg-amber focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#1c1206]"
          >
            Skip to content
          </a>

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

          <Toaster />
        </div>
      </SiteConfigProvider>
    </Providers>
  );
}
