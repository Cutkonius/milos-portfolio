import { Providers } from "@/components/providers";
import { CalProvider } from "@/components/cal-provider";
import { Toaster } from "@/components/ui/toast";
import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { Work } from "@/components/sections/work";
import { Services } from "@/components/sections/services";
import { About } from "@/components/sections/about";
import { Process } from "@/components/sections/process";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <Providers>
      <div className="relative">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-amber focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#1c1206]"
        >
          Skip to content
        </a>

        <CalProvider />
        <Nav />

        <main id="main" tabIndex={-1} className="outline-none">
          <Hero />
          <Work />
          <Services />
          <About />
          <Process />
          <Contact />
        </main>

        <Toaster />
      </div>
    </Providers>
  );
}
