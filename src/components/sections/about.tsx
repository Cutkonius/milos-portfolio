"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { MediaImage } from "@/components/cms/media-image";
import { renderEmphasis } from "@/components/cms/emphasis";
import studioMaterials from "@/images/studio-materials-v1.webp";
import type { AboutSection } from "@/lib/cms/types";

export function About({ data }: { data: AboutSection }) {
  return (
    <section
      id="about"
      className="editorial-section scroll-mt-20 overflow-hidden bg-[#080d16] px-5 py-[110px] sm:px-8 sm:py-[150px] lg:px-12"
    >
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <div className="section-kicker text-amber-soft">{data.label}</div>
        </Reveal>
        <Reveal delay={0.04}>
          <h2 className="mt-7 max-w-[960px] text-[clamp(48px,7.4vw,106px)] font-semibold leading-[0.91] tracking-[-0.067em] text-text [text-wrap:balance]">
            {data.heading}
          </h2>
        </Reveal>

        <div className="mt-14 grid items-start gap-16 lg:mt-20 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20">
          <Reveal delay={0.07}>
            <figure className="relative mx-auto w-full max-w-[520px] pb-12 lg:mx-0">
              <div
                aria-hidden="true"
                className="absolute bottom-0 left-0 top-[9%] w-[74%] overflow-hidden border-y border-text/16"
              >
                <Image
                  src={studioMaterials}
                  alt=""
                  fill
                  quality={82}
                  sizes="(min-width: 1024px) 390px, 72vw"
                  className="object-cover object-center opacity-80 saturate-[.82] contrast-[1.04]"
                />
              </div>

              <div className="relative ml-[23%] h-[500px] w-[77%] overflow-hidden border border-text/18 sm:h-[610px]">
                <MediaImage
                  image={data.photo}
                  sizes="(min-width: 1024px) 430px, (min-width: 640px) 460px, 84vw"
                  className="h-full w-full object-cover object-[50%_13%] saturate-[.82] contrast-[1.06]"
                />
              </div>

              <figcaption className="relative ml-[23%] mt-4 flex w-[77%] items-start justify-between gap-5 border-t border-text/18 pt-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-text/50">
                <span>Miloš Novaković / Serbia</span>
                <span className="text-right">
                  {data.statusLabel} / {data.statusValue}
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="lg:pt-8">
            {data.paragraphs.map((paragraph, index) => (
              <Reveal key={index} delay={0.06 + index * 0.04}>
                <p
                  className={`max-w-[680px] leading-[1.68] text-text/65 [text-wrap:pretty] ${
                    index === 0
                      ? "text-[clamp(19px,2.25vw,29px)] tracking-[-0.025em]"
                      : "mt-7 text-[15px] sm:text-[16px]"
                  }`}
                >
                  {renderEmphasis(paragraph)}
                </p>
              </Reveal>
            ))}

            <Reveal delay={0.14}>
              <div className="mt-12 border-t border-text/18 pt-4">
                <div className="time-label text-text/48">{data.fileHeading}</div>
                <dl className="mt-5 grid sm:grid-cols-2">
                  {data.fileRows.map((row) => (
                    <div
                      key={row.k}
                      className="border-t border-text/14 py-4 sm:odd:pr-7 sm:even:border-l sm:even:pl-7"
                    >
                      <dt className="text-[8.5px] font-semibold uppercase tracking-[0.16em] text-text/44">
                        {row.k}
                      </dt>
                      <dd className="mt-2 text-[14px] font-medium text-text/82">{row.v}</dd>
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
