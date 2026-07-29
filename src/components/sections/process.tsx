"use client";

import { getImageProps } from "next/image";
import { BookCallButton } from "@/components/book-call";
import { Reveal } from "@/components/ui/reveal";
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
      className="editorial-section deco-section scroll-mt-20 overflow-hidden bg-[#080d1b] px-5 py-[100px] sm:px-8 sm:py-[140px] lg:px-12"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <picture>
          <source media="(min-width: 640px)" srcSet={desktopSrcSet} />
          <img
            {...mobileImageProps}
            srcSet={mobileSrcSet}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[68%_center] opacity-[0.24] saturate-[.9] sm:object-[72%_center]"
          />
        </picture>
        <span className="absolute inset-0 bg-[#080d1b]/78" />
      </div>

      <div className="relative mx-auto max-w-[1280px]">
        <div className="grid items-end gap-8 border-b border-amber/34 pb-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16 lg:pb-12">
          <div>
            <Reveal>
              <p className="text-[14px] font-semibold uppercase tracking-[0.08em] text-blue-soft sm:text-[15px]">
                {data.label}
              </p>
            </Reveal>
            <Reveal delay={0.04}>
              <h2 className="mt-5 max-w-[700px] text-[clamp(46px,6.1vw,82px)] font-semibold leading-[0.96] tracking-[-0.036em] text-text [text-wrap:balance]">
                {data.heading}
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <p className="max-w-[620px] text-[18px] leading-[1.62] text-text/82 [text-wrap:pretty] sm:text-[20px] lg:ml-auto">
              You always know what is ready, what needs a decision and what happens next.
            </p>
          </Reveal>
        </div>

        <div className="border-b border-text/18">
          {data.steps.map((step, index) => (
            <Reveal key={step.id} delay={index * 0.04}>
              <article className="process-step group grid gap-4 border-t border-text/16 py-7 first:border-t-0 sm:grid-cols-[72px_0.8fr_1.2fr] sm:items-start sm:gap-8 sm:py-9 lg:grid-cols-[90px_0.7fr_1.3fr] lg:gap-12">
                <span className="text-[28px] font-semibold leading-none tracking-[-0.03em] text-amber sm:text-[32px]">
                  0{index + 1}
                </span>
                <h3 className="text-[clamp(26px,3vw,38px)] font-semibold leading-[1.06] tracking-[-0.025em] text-text">
                  {step.title}
                </h3>
                <p className="max-w-[650px] text-[16px] leading-[1.65] text-text/78 [text-wrap:pretty] sm:text-[17px]">
                  {step.blurb}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.06}>
          <div className="mt-9 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <p className="max-w-[540px] text-[17px] leading-[1.6] text-text/78">
              Have a project in mind? We can define the right scope in 15 minutes.
            </p>
            <BookCallButton label="Book a 15-minute call" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
