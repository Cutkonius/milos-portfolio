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
    <div className="nocturne-site case-nocturne relative min-h-[100dvh] overflow-hidden bg-[#050713] text-text">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-[620px] w-[34vw] min-w-[240px] border-l border-blue/28 bg-[#11175e]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[8vw] top-0 h-[430px] w-px bg-amber/48"
      />

      <header className="pointer-events-none fixed inset-x-0 top-4 z-40 flex justify-center px-4">
        <div className="nav-shell pointer-events-auto inline-flex h-[52px] w-max max-w-[calc(100vw-2rem)] items-center overflow-hidden rounded-[22px] border border-blue/60 bg-[#050713]">
          <Link
            href="/#work"
            className="nav-underline inline-flex min-h-11 items-center px-5 text-[12px] font-semibold uppercase tracking-[0.09em] text-text/74 transition-colors hover:text-text"
          >
            Back to work
          </Link>
          <span aria-hidden="true" className="my-2 h-8 w-px bg-text/18" />
          <BookCallButton size="sm" label={nav.ctaLabel} />
        </div>
      </header>

      <main className="relative mx-auto max-w-[980px] px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
        <Reveal>
          <div className="section-kicker text-amber">Case study / Selected work</div>
        </Reveal>

        <Reveal delay={0.04}>
          <h1 className="display-heading mt-7 max-w-[900px] uppercase text-[clamp(58px,9vw,126px)] text-text">
            {project.title}
          </h1>
        </Reveal>

        {cs.intro && (
          <Reveal delay={0.08}>
            <p className="mt-7 max-w-[700px] text-[clamp(19px,2.35vw,28px)] leading-[1.55] tracking-[-0.018em] text-text/82 [text-wrap:pretty]">
              {renderEmphasis(cs.intro)}
            </p>
          </Reveal>
        )}

        {(cs.tags?.length || cs.liveUrl) && (
          <Reveal delay={0.12}>
            <div className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-2 border-y border-blue/32 py-4 text-[12px] font-semibold uppercase tracking-[0.09em] text-blue-soft/82">
              {cs.tags?.map((tag, index) => (
                <span key={tag} className="inline-flex items-center gap-3">
                  {index > 0 && <span aria-hidden="true" className="text-amber/72">/</span>}
                  {tag}
                </span>
              ))}
              {cs.liveUrl && (
                <>
                  <span aria-hidden="true" className="text-amber/72">/</span>
                  <a
                    href={cs.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="email-action text-amber transition-colors hover:text-text"
                  >
                    Visit the site ↗
                  </a>
                </>
              )}
            </div>
          </Reveal>
        )}

        {project.screenshot && (
          <Reveal delay={0.14}>
            <figure className="deco-media-frame mt-14 border-y border-amber/38 bg-[#080d1b] p-2 sm:p-3">
              <figcaption className="flex items-center justify-between gap-5 border-b border-blue/28 px-2 pb-3 text-[12px] font-semibold uppercase tracking-[0.085em] text-text/72">
                <span>Project view / 01</span>
                <span className="text-blue-soft">{project.urlBar}</span>
              </figcaption>
              <div className="relative mt-2 h-[300px] sm:mt-3 sm:h-[560px]">
                <MediaImage
                  image={project.screenshot}
                  fill
                  sizes="(min-width: 980px) 980px, 100vw"
                  className="object-cover object-top"
                />
              </div>
            </figure>
          </Reveal>
        )}

        {cs.metrics && cs.metrics.length > 0 && (
          <div className="mt-10 grid border-y border-blue/32 sm:grid-cols-3">
            {cs.metrics.map((metric, index) => (
              <Reveal
                key={metric.id}
                delay={index * 0.05}
                className={index < cs.metrics!.length - 1 ? "border-b border-blue/24 sm:border-b-0 sm:border-r" : ""}
              >
                <div className="px-5 py-6 sm:py-8">
                  <div className="text-[36px] font-semibold tracking-[-0.025em] text-amber">
                    {metric.value}
                  </div>
                  <div className="mt-2 text-[13px] leading-[1.55] text-text/72 [text-wrap:pretty]">
                    {metric.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        <div className="mt-20">
          {cs.blocks?.map((block, index) => (
            <Reveal key={block.id}>
              <section className="grid gap-6 border-t border-text/18 py-11 sm:grid-cols-[72px_1fr] sm:gap-10 sm:py-14">
                <span className="text-[12px] font-semibold tracking-[0.09em] text-amber">
                  0{index + 1}
                </span>
                <div>
                  <h2 className="text-[clamp(30px,4vw,50px)] font-semibold leading-[1.02] tracking-[-0.03em] text-text">
                    {block.heading}
                  </h2>
                  {block.body && (
                    <p className="mt-5 max-w-[680px] text-[16px] leading-[1.68] text-text/76 [text-wrap:pretty]">
                      {renderEmphasis(block.body)}
                    </p>
                  )}
                  {block.image?.key && (
                    <div className="relative mt-8 aspect-[16/9] overflow-hidden border-y border-blue/28">
                      <MediaImage
                        image={block.image}
                        fill
                        sizes="(min-width: 900px) 820px, 100vw"
                        className="object-cover object-top"
                      />
                    </div>
                  )}
                </div>
              </section>
            </Reveal>
          ))}
        </div>

        {cs.gallery && cs.gallery.length > 0 && (
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {cs.gallery.map((image, index) => (
              <Reveal key={index} delay={(index % 2) * 0.05}>
                <div className="relative aspect-[4/3] overflow-hidden border-y border-blue/28">
                  <MediaImage
                    image={image}
                    fill
                    sizes="(min-width: 640px) 480px, 100vw"
                    className="object-cover object-top"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        )}

        <div className="deco-portal mt-24 border-y border-amber/38 px-3 py-14 text-center sm:py-18">
          <div aria-hidden="true" className="deco-crown mx-auto mb-7 w-[118px]" />
          <h2 className="mx-auto max-w-[680px] text-[clamp(32px,4.7vw,54px)] font-semibold leading-[1.03] tracking-[-0.03em] text-text [text-wrap:balance]">
            What should your website make easier?
          </h2>
          <p className="mx-auto mt-4 max-w-[500px] text-[16px] leading-[1.65] text-text/74 [text-wrap:pretty]">
            Bring the page or offer that is not working clearly enough. In 15 minutes, we can
            identify the main problem and the best next step.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-2">
            <BookCallButton label="Book a 15-minute call" />
            <EmailPill label="Email Miloš" />
          </div>
        </div>

        <div className="mt-14 border-t border-text/16 pt-6 text-[12.5px] text-text/68">
          © 2026 {site.siteName} / Built in daylight. Useful after launch.
        </div>
      </main>
    </div>
  );
}
