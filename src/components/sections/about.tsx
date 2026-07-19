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
      className="relative scroll-mt-16 bg-[linear-gradient(180deg,#0e1119_0%,#0c0f18_100%)] px-6 py-[120px] md:px-12"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(560px_400px_at_78%_40%,rgba(245,169,78,0.08),transparent_70%)]"
      />
      <div className="relative mx-auto flex max-w-[1120px] flex-wrap items-center gap-16">
        <div className="min-w-[min(300px,100%)] flex-[1.2] sm:min-w-[min(340px,100%)]">
          <Reveal>
            <div className="time-label text-amber-soft">{data.label}</div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3.5 text-[40px] font-semibold tracking-[-0.025em] text-text [text-wrap:balance] sm:text-[52px]">
              {data.heading}
            </h2>
          </Reveal>
          {data.paragraphs.map((paragraph, i) => (
            <Reveal key={i} delay={0.1 + i * 0.04}>
              <p className="mt-[18px] max-w-[540px] text-base leading-[1.65] text-text/65 [text-wrap:pretty]">
                {renderEmphasis(paragraph)}
              </p>
            </Reveal>
          ))}

          <Reveal delay={0.18}>
            <div className="mt-[30px] max-w-[460px]">
              <div className="time-label border-b border-transparent pb-1.5 !text-[10.5px] text-text/35">
                {data.fileHeading}
              </div>
              <dl>
                {FILE_ROWS.map((row) => (
                  <div key={row.k} className="flex items-baseline gap-3 py-[9px]">
                    <dt className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-text/45">
                      {row.k}
                    </dt>
                    <span
                      aria-hidden="true"
                      className="flex-1 -translate-y-1 border-b border-dotted border-text/[0.28]"
                    />
                    <dd className="text-[14.5px] font-semibold text-text">{row.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="flex min-w-[min(300px,100%)] flex-1 justify-center sm:min-w-[min(320px,100%)]">
          <div className="relative w-[300px] sm:w-[360px]">
            <div className="h-[380px] w-full overflow-hidden rounded-[26px] border border-white/[0.14] shadow-[0_34px_80px_rgba(0,0,0,0.5)] sm:h-[440px]">
              <MediaImage
                image={data.photo}
                sizes="(min-width: 640px) 360px, 300px"
                className="h-full w-full object-cover object-[50%_18%]"
              />
            </div>
            <div className="absolute -right-2 bottom-[26px] rounded-[14px] border border-white/[0.16] bg-[rgba(16,20,32,0.75)] px-4 py-3 backdrop-blur-[14px] animate-floaty sm:-right-[18px]">
              <div className="text-[10.5px] font-semibold tracking-[0.16em] text-amber">
                {data.statusLabel}
              </div>
              <div className="mt-[3px] text-[13.5px] font-semibold text-text">{data.statusValue}</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
