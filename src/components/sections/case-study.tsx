"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { MediaImage } from "@/components/cms/media-image";
import { renderEmphasis } from "@/components/cms/emphasis";
import { BookCallButton, EmailPill } from "@/components/book-call";
import type { Nav, Project, SiteSettings } from "@/lib/cms/types";

export function CaseStudyView({
  project,
  site,
  nav,
}: {
  project: Project;
  site: SiteSettings;
  nav: Nav;
}) {
  const cs = project.caseStudy;
  if (!cs) return null;

  return (
    <div className="relative min-h-[100dvh] bg-[linear-gradient(180deg,#0d1017_0%,#07090d_100%)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(760px_420px_at_78%_-5%,rgba(91,140,255,0.12),transparent_70%)]"
      />

      {/* Top bar */}
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-white/[0.08] bg-[rgba(9,11,17,0.6)] px-6 py-[18px] backdrop-blur-[14px] md:px-12">
        <Link href="/" className="text-[15px] font-semibold text-text">
          {nav.brand}
        </Link>
        <BookCallButton size="sm" label={nav.ctaLabel} />
      </header>

      <main className="relative mx-auto max-w-[880px] px-6 pb-24 pt-32 md:px-8">
        <Reveal>
          <Link href="/#work" className="text-sm text-text/50 transition-colors hover:text-amber">
            ← All work
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mt-5 text-[clamp(40px,6vw,72px)] font-semibold leading-[1.02] tracking-[-0.03em] text-text">
            {project.title}
          </h1>
        </Reveal>

        {cs.intro && (
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-[620px] text-lg leading-[1.6] text-text/70 [text-wrap:pretty]">
              {renderEmphasis(cs.intro)}
            </p>
          </Reveal>
        )}

        {(cs.tags?.length || cs.liveUrl) && (
          <Reveal delay={0.14}>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {cs.tags?.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/[0.12] bg-white/[0.04] px-3 py-1 text-[12.5px] text-text/65"
                >
                  {t}
                </span>
              ))}
              {cs.liveUrl && (
                <a
                  href={cs.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-blue/[0.14] px-3 py-1 text-[12.5px] font-medium text-blue-soft transition-colors hover:bg-blue/[0.22]"
                >
                  Visit the site ↗
                </a>
              )}
            </div>
          </Reveal>
        )}

        {/* Hero shot in a browser frame */}
        {project.screenshot && (
          <Reveal delay={0.16}>
            <div className="mt-12 overflow-hidden rounded-[22px] border border-white/[0.11] bg-white/[0.04] shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
              <div className="flex items-center gap-2 border-b border-white/[0.09] px-[18px] py-3">
                <span aria-hidden="true" className="h-[9px] w-[9px] rounded-full bg-white/[0.22]" />
                <span aria-hidden="true" className="h-[9px] w-[9px] rounded-full bg-white/[0.22]" />
                <span className="flex-1 text-center text-[11.5px] font-medium tracking-[0.06em] text-text/55">
                  {project.urlBar}
                </span>
              </div>
              <div className="relative h-[300px] sm:h-[520px]">
                <MediaImage
                  image={project.screenshot}
                  fill
                  sizes="(min-width: 880px) 880px, 100vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </Reveal>
        )}

        {/* Metrics */}
        {cs.metrics && cs.metrics.length > 0 && (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {cs.metrics.map((m, i) => (
              <Reveal key={m.id} delay={i * 0.05}>
                <div className="rounded-2xl border border-white/[0.1] bg-white/[0.03] px-5 py-4">
                  <div className="text-[28px] font-semibold tracking-[-0.02em] text-amber">
                    {m.value}
                  </div>
                  <div className="mt-1 text-[13px] text-text/55 [text-wrap:pretty]">{m.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {/* Story blocks */}
        {cs.blocks?.map((b) => (
          <Reveal key={b.id}>
            <section className="mt-16 border-t border-white/[0.08] pt-10">
              <h2 className="text-[26px] font-semibold tracking-[-0.02em] text-text sm:text-[30px]">
                {b.heading}
              </h2>
              {b.body && (
                <p className="mt-3.5 max-w-[640px] text-base leading-[1.7] text-text/70 [text-wrap:pretty]">
                  {renderEmphasis(b.body)}
                </p>
              )}
              {b.image?.key && (
                <div className="relative mt-7 aspect-[16/9] overflow-hidden rounded-2xl border border-white/[0.1]">
                  <MediaImage
                    image={b.image}
                    fill
                    sizes="(min-width: 880px) 880px, 100vw"
                    className="object-cover object-top"
                  />
                </div>
              )}
            </section>
          </Reveal>
        ))}

        {/* Gallery */}
        {cs.gallery && cs.gallery.length > 0 && (
          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            {cs.gallery.map((img, i) => (
              <Reveal key={i} delay={(i % 2) * 0.06}>
                <div className="relative aspect-[4/3] overflow-hidden border-y border-white/[0.1]">
                  <MediaImage image={img} fill sizes="(min-width: 640px) 420px, 100vw" className="object-cover object-top" />
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-24 border-y border-white/[0.12] px-2 py-12 text-center">
          <h2 className="text-[clamp(26px,3.4vw,38px)] font-semibold tracking-[-0.02em] text-text [text-wrap:balance]">
            What should your website make easier?
          </h2>
          <p className="mx-auto mt-3 max-w-[440px] text-[15px] leading-[1.6] text-text/60 [text-wrap:pretty]">
            Bring the page, offer or decision path that feels harder than it should. We can
            identify the friction in 15 minutes.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <BookCallButton label="Book a 15-minute fit call" />
            <EmailPill label="Email Miloš" />
          </div>
        </div>

        <div className="mt-14 border-t border-white/[0.1] pt-6 text-[12.5px] text-text/45">
          © 2026 {site.siteName} / Built in daylight. Useful after launch.
        </div>
      </main>
    </div>
  );
}
