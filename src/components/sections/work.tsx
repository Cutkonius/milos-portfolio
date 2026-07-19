"use client";

import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { CalTextLink } from "@/components/book-call";
import { MediaImage } from "@/components/cms/media-image";
import type { Project, WorkSection } from "@/lib/cms/types";

function RedactedCard({ p }: { p: Project }) {
  return (
    <div className="flex h-full flex-col justify-center gap-2 rounded-[18px] border border-white/[0.11] bg-white/[0.035] p-7">
      <div className="time-label text-text/45">{p.label}</div>
      <div className="text-[22px] font-semibold text-text/85">{p.cardTitle}</div>
      <div aria-hidden="true" className="mt-1 flex flex-col gap-[7px]">
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
    <div className="flex h-full flex-col justify-center gap-2 rounded-[18px] border border-dashed border-text/[0.22] p-7">
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
    <div className="flex h-full flex-col overflow-hidden rounded-[18px] border border-white/[0.11] bg-white/[0.04]">
      {p.screenshot && (
        <div className="relative h-[220px]">
          <MediaImage
            image={p.screenshot}
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover object-top"
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
        <div className="h-full overflow-hidden rounded-[18px] border border-white/[0.11] bg-white/[0.04]">
          <div className="relative h-[280px]">
            <MediaImage
              image={featured.productShot}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover object-top"
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
      className="relative scroll-mt-16 bg-[linear-gradient(180deg,#0d1017_0%,#10141f_100%)] px-6 pb-[120px] pt-[130px] md:px-12"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(760px_420px_at_82%_0%,rgba(91,140,255,0.09),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-[1120px]">
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div className="time-label text-amber-soft">{data.label}</div>
            <div className="text-[13px] text-text/50">{data.sublabel}</div>
          </div>
        </Reveal>

        {featured && (
          <>
            <Reveal delay={0.05}>
              <div className="mt-3.5 flex flex-wrap items-baseline gap-[18px]">
                <h2 className="text-[44px] font-semibold tracking-[-0.025em] text-text sm:text-6xl">
                  {featured.title}
                </h2>
                {featured.statusLink && (
                  <span className="text-sm font-medium text-blue-soft">{featured.statusLink}</span>
                )}
              </div>
            </Reveal>

            {featured.description && (
              <Reveal delay={0.1}>
                <p className="mt-3.5 max-w-[620px] text-base leading-[1.6] text-text/65 [text-wrap:pretty]">
                  {featured.description}
                </p>
              </Reveal>
            )}

            {featured.screenshot && (
              <Reveal delay={0.12}>
                <div className="mt-9 overflow-hidden rounded-[22px] border border-white/[0.11] bg-white/[0.04] shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                  <div className="flex items-center gap-2 border-b border-white/[0.09] px-[18px] py-3">
                    <span aria-hidden="true" className="h-[9px] w-[9px] rounded-full bg-white/[0.22]" />
                    <span aria-hidden="true" className="h-[9px] w-[9px] rounded-full bg-white/[0.22]" />
                    <span className="flex-1 text-center text-[11.5px] font-medium tracking-[0.06em] text-text/55">
                      {featured.urlBar}
                    </span>
                    <span className="text-[11px] font-semibold text-blue-soft">{featured.badge}</span>
                  </div>
                  <div className="relative h-[320px] sm:h-[540px]">
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
          <div className="mt-5 flex flex-wrap gap-5">
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
