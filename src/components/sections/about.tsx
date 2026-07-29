"use client";

import { Reveal } from "@/components/ui/reveal";
import { MediaImage } from "@/components/cms/media-image";
import { renderEmphasis } from "@/components/cms/emphasis";
import type { AboutSection } from "@/lib/cms/types";

export function About({ data }: { data: AboutSection }) {
  return (
    <section
      id="about"
      className="editorial-section deco-section scroll-mt-20 overflow-hidden bg-[#090e1d] px-5 py-[110px] sm:px-8 sm:py-[150px] lg:px-12"
    >
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <div className="section-kicker text-amber-soft">{data.label}</div>
        </Reveal>
        <Reveal delay={0.04}>
          <h2 className="mt-7 max-w-[960px] text-[clamp(48px,7.4vw,104px)] font-semibold leading-[0.94] tracking-[-0.038em] text-text [text-wrap:balance]">
            {data.heading}
          </h2>
        </Reveal>

        <div className="mt-14 grid items-start gap-16 lg:mt-20 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20">
          <Reveal delay={0.07}>
            <figure className="deco-portrait relative mx-auto w-full max-w-[520px] pb-8 pl-4 pt-4 lg:mx-0">
              <div
                aria-hidden="true"
                className="absolute bottom-24 left-0 top-12 w-px bg-amber"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-28 left-[6px] top-24 w-px bg-blue/70"
              />
              <div className="relative h-[560px] w-full overflow-hidden border-y border-amber/38 sm:h-[650px]">
                <MediaImage
                  image={data.photo}
                  fill
                  sizes="(min-width: 1024px) 520px, (min-width: 640px) 560px, 94vw"
                  className="h-full w-full object-cover object-center"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-[5px] border-y border-amber/45 bg-[#050713]"
                />
              </div>

              <figcaption className="relative mt-4 flex w-full flex-col items-start gap-2 border-t border-text/18 pt-3 text-[12px] font-semibold uppercase leading-[1.45] tracking-[0.09em] text-text/74 sm:flex-row sm:justify-between sm:gap-5">
                <span>Miloš Novaković / Serbia</span>
                <span className="sm:text-right">
                  {data.statusLabel} / {data.statusValue}
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="lg:pt-8">
            {data.paragraphs.map((paragraph, index) => (
              <Reveal key={index} delay={0.06 + index * 0.04}>
                <p
                  className={`max-w-[680px] leading-[1.68] text-text/74 [text-wrap:pretty] ${
                    index === 0
                       ? "text-[clamp(19px,2.25vw,29px)] tracking-[-0.018em]"
                      : "mt-7 text-[16px] sm:text-[17px]"
                  }`}
                >
                  {renderEmphasis(paragraph)}
                </p>
              </Reveal>
            ))}

            <Reveal delay={0.14}>
              <div className="mt-12 border-t border-text/18 pt-4">
                <div className="time-label text-text/72">{data.fileHeading}</div>
                <dl className="mt-5 grid sm:grid-cols-2">
                  {data.fileRows.map((row) => (
                    <div
                      key={row.k}
                      className="border-t border-text/14 py-4 sm:odd:pr-7 sm:even:border-l sm:even:pl-7"
                    >
                      <dt className="text-[12px] font-semibold uppercase tracking-[0.09em] text-text/68">
                        {row.k}
                      </dt>
                      <dd className="mt-2 text-[15px] font-medium text-text/86">{row.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
