"use client";

import { getImageProps } from "next/image";
import { BookCallButton, EmailPill } from "@/components/book-call";
import heroDesktop from "@/images/hero-nocturne-desktop-v5.webp";
import heroMobile from "@/images/hero-nocturne-mobile-v5.webp";
import type { Hero as HeroData } from "@/lib/cms/types";

const LEGACY_OUTCOME = "Sold after dark.";

export function Hero({ data, open }: { data: HeroData; open: boolean }) {
  const outcome =
    data.night.title.trim().toLowerCase() === LEGACY_OUTCOME.toLowerCase()
      ? "Useful after launch."
      : data.night.title;

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
      className="hero-nocturne relative min-h-[760px] overflow-hidden bg-[#050713] text-text sm:min-h-[820px] lg:h-[100svh] lg:min-h-[800px]"
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
        <span className="absolute inset-0 bg-[#050713]/18 sm:bg-[#050713]/10" />
      </div>

      <div className="relative mx-auto flex min-h-[760px] max-w-[1440px] flex-col px-5 pb-7 pt-[92px] sm:min-h-[820px] sm:px-8 sm:pb-9 sm:pt-[112px] lg:h-[100svh] lg:min-h-[800px] lg:px-12">
        <div className="flex items-start justify-between gap-6">
          <span className="time-label max-w-[260px] text-text/74">{data.day.label}</span>
          {open && (
            <span className="time-label max-w-[190px] text-right text-amber">
              {data.openForProjectsLabel}
            </span>
          )}
        </div>

        <div className="flex flex-1 items-start pt-[9vh] sm:pt-[11vh] lg:items-center lg:pt-0">
          <div className="hero-copy mx-auto w-full max-w-[690px] text-center sm:mx-0 lg:-mt-2 lg:max-w-[760px]">
            <div aria-hidden="true" className="deco-crown mx-auto mb-7 w-[132px] sm:mb-9" />
            <h1 className="display-heading text-[clamp(54px,8.2vw,120px)] [text-wrap:balance]">
              <span className="block text-text">{data.day.title}</span>
              <span className="mt-[0.12em] block text-amber">{outcome}</span>
            </h1>

            <div className="mx-auto mt-7 max-w-[620px] sm:mt-9">
              <p className="text-[16px] leading-[1.62] text-text/84 [text-wrap:pretty] sm:text-[17px]">
                {data.day.body}
              </p>
              <p className="mx-auto mt-3 max-w-[560px] text-[14px] leading-[1.6] text-blue-soft/88 [text-wrap:pretty] sm:text-[15px]">
                {data.night.body}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 sm:mt-10">
              <BookCallButton label="Book a 15-minute call" />
              <EmailPill label="Email Miloš" />
            </div>
          </div>
        </div>

        <div className="deco-footer-rail flex items-end justify-between gap-5 pt-5 text-[12px] font-medium uppercase tracking-[0.105em] text-text/72">
          <span className="max-w-[440px]">{data.cornerLeft}</span>
          <span className="hidden text-right sm:block">AI-assisted / Experience-led</span>
        </div>
      </div>
    </section>
  );
}
