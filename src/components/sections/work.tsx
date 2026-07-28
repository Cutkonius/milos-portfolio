"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { CalTextLink } from "@/components/book-call";
import { MediaImage } from "@/components/cms/media-image";
import type { Project, WorkSection } from "@/lib/cms/types";

function RedactedCard({ p }: { p: Project }) {
  return (
    <div className="surface-card group flex h-full min-h-[280px] flex-col justify-end gap-2 overflow-hidden rounded-[24px] p-7 transition-transform duration-500 hover:-translate-y-1">
      <div className="time-label text-text/45">{p.label}</div>
      <div className="text-[22px] font-semibold text-text/85">{p.cardTitle}</div>
      <div aria-hidden="true" className="my-2 flex flex-col gap-[7px] opacity-80 transition-opacity duration-500 group-hover:opacity-100">
        <div className="h-[11px] w-[82%] rounded-md bg-text/[0.22] blur-[4px]" />
        <div className="h-[11px] w-[64%] rounded-md bg-text/[0.18] blur-[4px]" />
        <div className="h-[11px] w-[73%] rounded-md bg-text/[0.14] blur-[4px]" />
      </div>
      <p className="mt-1.5 text-sm leading-[1.55] text-text/55 [text-wrap:pretty]">{p.blurb}</p>
    </div>
  );
}

function ReservedCard({ p }: { p: Project }) {
  return (
    <div className="group flex h-full min-h-[280px] flex-col justify-end gap-2 rounded-[24px] border border-dashed border-text/[0.22] bg-[radial-gradient(350px_220px_at_100%_0%,rgba(113,157,255,.08),transparent_72%)] p-7 transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-blue/45">
      <div className="time-label text-text/45">{p.label}</div>
      <div className="text-[22px] font-semibold text-text/85">{p.cardTitle}</div>
      <p className="text-sm leading-[1.55] text-text/55 [text-wrap:pretty]">{p.blurb}</p>
      {p.ctaLabel && (
        <CalTextLink className="mt-2 text-sm">{p.ctaLabel}</CalTextLink>
      )}
    </div>
  );
}

/** A secondary case study rendered as a compact image + caption card. */
function CaseCard({ p }: { p: Project }) {
  return (
    <div className="surface-card flex h-full flex-col overflow-hidden rounded-[24px]">
      {p.screenshot && (
        <div className="relative h-[240px] overflow-hidden">
          <MediaImage
            image={p.screenshot}
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover object-top transition-transform duration-700 hover:scale-[1.025]"
          />
        </div>
      )}
      <div className="flex flex-col gap-1 p-6">
        <div className="text-[18px] font-semibold text-text">{p.title}</div>
        {p.description && (
          <p className="text-sm leading-[1.5] text-text/55 [text-wrap:pretty]">{p.description}</p>
        )}
        {p.urlBar && <span className="mt-1 text-xs text-blue-soft">{p.urlBar}</span>}
      </div>
    </div>
  );
}

export function Work({ data }: { data: WorkSection }) {
  const published = data.projects.filter((p) => p.published).sort((a, b) => a.order - b.order);

  const featured =
    published.find((p) => p.kind === "case" && p.featured) ??
    published.find((p) => p.kind === "case");

  const rest = published.filter((p) => p !== featured);

  // The grid under the showcase: the featured project's product shot first,
  // then every other published card in order.
  const cards: { key: string; wrap: string; node: ReactNode }[] = [];
  const wide = "min-w-[min(280px,100%)] flex-[1.1] sm:min-w-[min(320px,100%)]";
  const narrow = "min-w-[min(280px,100%)] flex-1";

  if (featured?.productShot) {
    cards.push({
      key: `${featured.id}-product`,
      wrap: wide,
      node: (
        <div className="surface-card group h-full overflow-hidden rounded-[24px]">
          <div className="relative h-[280px] sm:h-[310px]">
            <MediaImage
              image={featured.productShot}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.025]"
            />
          </div>
        </div>
      ),
    });
  }

  for (const p of rest) {
    if (p.kind === "redacted") cards.push({ key: p.id, wrap: narrow, node: <RedactedCard p={p} /> });
    else if (p.kind === "reserved") cards.push({ key: p.id, wrap: narrow, node: <ReservedCard p={p} /> });
    else if (p.kind === "case") cards.push({ key: p.id, wrap: narrow, node: <CaseCard p={p} /> });
  }

  return (
    <section
      id="work"
      className="premium-section relative scroll-mt-24 overflow-hidden bg-[radial-gradient(950px_520px_at_86%_5%,rgba(113,157,255,.1),transparent_68%),linear-gradient(180deg,#0b0e16_0%,#0d111b_100%)] px-5 pb-[110px] pt-[120px] sm:px-8 sm:pb-[140px] sm:pt-[150px] lg:px-12"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[12%] top-[8%] h-[520px] w-[520px] rounded-full border border-white/[0.035]"
      />
      <div className="relative mx-auto max-w-[1180px]">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="section-kicker text-amber-soft">{data.label}</div>
            <div className="rounded-full border border-white/[0.1] bg-white/[0.035] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-text/42">
              {data.sublabel}
            </div>
          </div>
        </Reveal>

        {featured && (
          <>
            <Reveal delay={0.05}>
              <div className="mt-8 flex flex-wrap items-end justify-between gap-5">
                <div>
                  <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-soft/65">
                    Featured build · 01
                  </div>
                  <h2 className="text-[clamp(48px,7vw,90px)] font-semibold leading-none tracking-[-0.055em] text-text">
                  {featured.title}
                  </h2>
                </div>
                {featured.statusLink && (
                  <span className="mb-2 inline-flex items-center gap-2 rounded-full border border-blue/20 bg-blue/[0.07] px-3 py-1.5 text-[11px] font-medium text-blue-soft">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue shadow-[0_0_9px_rgba(113,157,255,.8)]" />
                    {featured.statusLink}
                  </span>
                )}
              </div>
            </Reveal>

            {featured.description && (
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-[670px] text-[15.5px] leading-[1.7] text-text/58 [text-wrap:pretty] sm:text-[17px]">
                  {featured.description}
                </p>
              </Reveal>
            )}

            {featured.caseStudy?.enabled && (
              <Reveal delay={0.11}>
                <Link
                  href={`/work/${featured.slug || featured.id}`}
                  className="mt-3.5 inline-block text-sm font-semibold text-blue-soft transition-colors hover:text-amber"
                >
                  Read the case study →
                </Link>
              </Reveal>
            )}

            {featured.screenshot && (
              <Reveal delay={0.12}>
                <div className="surface-card mt-10 overflow-hidden rounded-[26px] shadow-[0_36px_110px_rgba(0,0,0,0.42)] sm:rounded-[30px]">
                  <div className="flex items-center gap-2 border-b border-white/[0.08] bg-white/[0.018] px-4 py-3.5 sm:px-5">
                    <span aria-hidden="true" className="h-[9px] w-[9px] rounded-full bg-white/[0.22]" />
                    <span aria-hidden="true" className="h-[9px] w-[9px] rounded-full bg-white/[0.22]" />
                    <span className="mx-auto rounded-full border border-white/[0.08] bg-black/20 px-5 py-1.5 text-center text-[10.5px] font-medium tracking-[0.06em] text-text/48">
                      {featured.urlBar}
                    </span>
                    <span className="text-[11px] font-semibold text-blue-soft">{featured.badge}</span>
                  </div>
                  <div className="relative h-[290px] overflow-hidden sm:h-[560px]">
                    <MediaImage
                      image={featured.screenshot}
                      fill
                      sizes="(min-width: 1120px) 1120px, 100vw"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              </Reveal>
            )}
          </>
        )}

        {cards.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-4 sm:mt-5 sm:gap-5">
            {cards.map((c, i) => (
              <Reveal key={c.key} delay={0.05 + i * 0.05} className={c.wrap}>
                {c.node}
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
