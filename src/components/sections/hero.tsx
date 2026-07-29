"use client";

import { getImageProps } from "next/image";
import { BookCallButton } from "@/components/book-call";
import heroDesktop from "@/images/hero-nocturne-desktop-v5.webp";
import heroMobile from "@/images/hero-nocturne-mobile-v5.webp";
import type { Hero as HeroData } from "@/lib/cms/types";

export function Hero({ data, open }: { data: HeroData; open: boolean }) {
  const commonImageProps = {
    alt: "",
    sizes: "100vw",
    quality: 82,
    fetchPriority: "high" as const,
  };
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...commonImageProps,
    src: heroDesktop,
    width: 3840,
    height: 2160,
  });
  const {
    props: { srcSet: mobileSrcSet, ...mobileImageProps },
  } = getImageProps({
    ...commonImageProps,
    src: heroMobile,
    width: 1440,
    height: 2560,
  });

  return (
    <section
      id="top"
      className="hero-nocturne relative min-h-[720px] overflow-hidden bg-[#050713] text-text sm:min-h-[780px] lg:h-[100svh] lg:min-h-[760px]"
    >
      <div aria-hidden="true" className="absolute inset-0">
        <picture>
          <source media="(min-width: 640px)" srcSet={desktopSrcSet} />
          <img
            {...mobileImageProps}
            srcSet={mobileSrcSet}
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </picture>
        <span className="absolute inset-0 bg-[#050713]/32 sm:bg-[#050713]/14" />
      </div>

      <div className="relative mx-auto flex min-h-[720px] max-w-[1440px] flex-col justify-center px-5 pb-12 pt-[104px] sm:min-h-[780px] sm:px-8 sm:pb-16 sm:pt-[120px] lg:h-[100svh] lg:min-h-[760px] lg:px-12">
        <div className="flex items-center">
          <div className="hero-copy mx-auto w-full max-w-[720px] text-center lg:mx-0 lg:max-w-[760px] lg:text-left">
            <h1 className="display-heading text-[clamp(54px,8vw,112px)] [text-wrap:balance]">
              <span className="block text-text">{data.day.title}</span>
              <span className="mt-[0.12em] block text-amber">{data.night.title}</span>
            </h1>

            <p className="mx-auto mt-7 max-w-[620px] text-[18px] leading-[1.6] text-text/86 [text-wrap:pretty] sm:mt-8 sm:text-[20px] lg:mx-0">
              {data.day.body}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:mt-9 lg:justify-start">
              <BookCallButton label="Book a 15-minute call" />
              <a
                href="#work"
                className="email-action inline-flex min-h-[54px] items-center px-1 text-[16px] font-semibold text-text/82 transition-colors hover:text-text"
              >
                See selected work →
              </a>
            </div>

            {open && (
              <p className="mt-5 text-[16px] font-medium text-amber">
                {data.openForProjectsLabel}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
