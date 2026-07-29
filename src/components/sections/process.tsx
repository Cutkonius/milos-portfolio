"use client";

import { getImageProps } from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { CalTextLink } from "@/components/book-call";
import processRoomsDesktop from "@/images/process-rooms-desktop-v4.webp";
import processRoomsMobile from "@/images/process-rooms-mobile-v4.webp";
import type { ProcessSection } from "@/lib/cms/types";

export function Process({ data }: { data: ProcessSection }) {
  const commonImageProps = {
    alt: "",
    sizes: "100vw",
    quality: 82,
  };
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...commonImageProps,
    src: processRoomsDesktop,
    width: 3840,
    height: 2160,
  });
  const {
    props: { srcSet: mobileSrcSet, ...mobileImageProps },
  } = getImageProps({
    ...commonImageProps,
    src: processRoomsMobile,
    width: 1440,
    height: 2560,
  });

  return (
    <section
      id="process"
      className="editorial-section scroll-mt-20 overflow-visible bg-[#0d131e] px-5 py-[110px] sm:px-8 sm:py-[150px] lg:px-12"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <picture>
          <source media="(min-width: 640px)" srcSet={desktopSrcSet} />
          <img
            {...mobileImageProps}
            srcSet={mobileSrcSet}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[64%_center] opacity-[0.48] saturate-[.9] sm:object-[72%_center]"
          />
        </picture>
        <span className="absolute inset-0 bg-[#0d131e]/60" />
      </div>

      <div className="relative mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[0.43fr_0.57fr] lg:gap-20">
        <div>
          <div className="lg:sticky lg:top-[118px]">
            <Reveal>
              <div className="section-kicker text-blue-soft">{data.label}</div>
            </Reveal>
            <Reveal delay={0.04}>
              <h2 className="mt-7 max-w-[600px] text-[clamp(48px,6.4vw,88px)] font-semibold leading-[0.92] tracking-[-0.064em] text-text [text-wrap:balance]">
                {data.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-7 max-w-[420px] text-[15px] leading-[1.7] text-text/72 sm:text-[16px]">
                You see working pages, email flows and copy early. You always know what is ready,
                what needs a decision and what happens next.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="border-b border-text/16">
          {data.steps.map((step, index) => (
            <Reveal key={step.id} delay={index * 0.035}>
              <article className="group relative flex min-h-[360px] flex-col overflow-hidden border-t border-text/16 py-8 transition-[background-color,padding] duration-700 ease-[cubic-bezier(.16,1,.3,1)] hover:bg-[#111a29] hover:px-5 focus-within:bg-[#111a29] focus-within:px-5 sm:min-h-[410px] sm:py-10">
                <div className="flex items-start justify-between gap-6">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-text/64">
                    0{index + 1}
                  </span>
                  <span className="text-right text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-soft/88">
                    {step.label}
                  </span>
                </div>

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-2 top-[22%] text-[clamp(76px,12vw,176px)] font-semibold leading-none tracking-[-0.075em] text-text/[0.035] transition-[color,transform] duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-x-3 group-hover:text-blue/[0.12] group-focus-within:-translate-x-3 group-focus-within:text-blue/[0.12]"
                >
                  {step.label}
                </span>

                <div className="relative mt-auto max-w-[560px] pt-24">
                  <h3 className="text-[clamp(30px,4.2vw,56px)] font-semibold leading-[0.98] tracking-[-0.052em] text-text">
                    {step.title}
                  </h3>
                  <p className="mt-5 max-w-[520px] text-[15px] leading-[1.68] text-text/74 [text-wrap:pretty] sm:text-[16px]">
                    {step.blurb}
                    {step.ctaLabel && (
                      <>
                        {" "}
                        <CalTextLink className="text-[15px] sm:text-[16px]">
                          {step.ctaLabel}
                        </CalTextLink>
                      </>
                    )}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
