"use client";

import { Reveal } from "@/components/ui/reveal";
import { MediaImage } from "@/components/cms/media-image";
import { renderEmphasis } from "@/components/cms/emphasis";
import type { AboutSection } from "@/lib/cms/types";

export function About({ data }: { data: AboutSection }) {
  const FILE_ROWS = data.fileRows;
  return (
    <section
      id="about"
      className="premium-section relative scroll-mt-24 overflow-hidden bg-[radial-gradient(700px_520px_at_82%_42%,rgba(242,170,88,.075),transparent_70%),linear-gradient(180deg,#090c13_0%,#0a0d15_100%)] px-5 py-[105px] sm:px-8 sm:py-[135px] lg:px-12"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[4%] top-[12%] h-[560px] w-[420px] rounded-[50%] border border-amber/[0.06]"
      />
      <div className="relative mx-auto grid max-w-[1180px] items-center gap-16 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
        <div>
          <Reveal>
            <div className="section-kicker text-amber-soft">{data.label}</div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 max-w-[670px] text-[clamp(42px,5.2vw,70px)] font-semibold leading-[1.01] tracking-[-0.05em] text-text [text-wrap:balance]">
              {data.heading}
            </h2>
          </Reveal>
          {data.paragraphs.map((paragraph, i) => (
            <Reveal key={i} delay={0.1 + i * 0.04}>
              <p className="mt-[20px] max-w-[600px] text-[15.5px] leading-[1.75] text-text/58 [text-wrap:pretty] sm:text-base">
                {renderEmphasis(paragraph)}
              </p>
            </Reveal>
          ))}

          <Reveal delay={0.18}>
            <div className="surface-card mt-8 max-w-[540px] rounded-[22px] p-4 sm:p-5">
              <div className="time-label border-b border-white/[0.08] pb-3 !text-[9.5px] text-text/34">
                {data.fileHeading}
              </div>
              <dl>
                {FILE_ROWS.map((row) => (
                  <div key={row.k} className="flex items-baseline gap-3 border-b border-white/[0.055] py-[10px] last:border-0 last:pb-0">
                    <dt className="text-[9.5px] font-semibold uppercase tracking-[0.16em] text-text/38">
                      {row.k}
                    </dt>
                    <span
                      aria-hidden="true"
                      className="flex-1 -translate-y-1 border-b border-dotted border-text/[0.28]"
                    />
                    <dd className="text-[13.5px] font-medium text-text/82 sm:text-[14px]">{row.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[410px]">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[32px] border border-white/[0.055] sm:-inset-4 sm:rounded-[36px]"
            />
            <div className="relative h-[470px] w-full overflow-hidden rounded-[26px] border border-white/[0.13] shadow-[0_40px_110px_rgba(0,0,0,0.52)] sm:h-[520px] sm:rounded-[30px]">
              <MediaImage
                image={data.photo}
                sizes="(min-width: 1024px) 410px, (min-width: 640px) 400px, 100vw"
                className="h-full w-full object-cover object-[50%_16%] saturate-[.88] contrast-[1.04]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(180deg,transparent_58%,rgba(7,9,16,.42))]"
              />
              <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/20 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/65 backdrop-blur-md">
                Both shifts · 2026
              </div>
            </div>
            <div className="absolute -bottom-5 right-3 min-w-[170px] rounded-[18px] border border-white/[0.14] bg-[rgba(13,17,28,0.82)] px-4 py-3.5 shadow-[0_18px_45px_rgba(0,0,0,.3)] backdrop-blur-2xl animate-floaty sm:-right-5 sm:bottom-8">
              <div className="flex items-center gap-2 text-[9.5px] font-semibold tracking-[0.16em] text-amber">
                <span className="h-1.5 w-1.5 rounded-full bg-amber shadow-[0_0_9px_rgba(242,170,88,.8)]" />
                {data.statusLabel}
              </div>
              <div className="mt-1 text-[13px] font-semibold text-text">{data.statusValue}</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
