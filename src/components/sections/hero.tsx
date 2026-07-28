"use client";

import { getImageProps } from "next/image";
import { useEffect, useRef } from "react";
import { BookCallButton, EmailPill } from "@/components/book-call";
import heroDesktop from "@/images/hero-canvas-desktop-v2.webp";
import heroMobile from "@/images/hero-canvas-mobile-v2.webp";
import type { Hero as HeroData } from "@/lib/cms/types";

export function Hero({ data, open }: { data: HeroData; open: boolean }) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const dayRef = useRef<HTMLDivElement>(null);
  const nightRef = useRef<HTMLDivElement>(null);
  const sunMotionRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let raf = 0;
    let previousProgress = -1;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        const vh = window.innerHeight;
        if (y > vh * 1.35) {
          if (sunMotionRef.current) {
            sunMotionRef.current.style.visibility = "hidden";
            sunMotionRef.current.style.pointerEvents = "none";
          }
          return;
        }
        const progress = Math.min(1.15, Math.max(0, y / vh));
        if (Math.abs(progress - previousProgress) < 0.001) return;
        previousProgress = progress;

        if (canvasRef.current) {
          canvasRef.current.style.transform = `translate3d(0, ${progress * 14}px, 0) scale(1.035)`;
        }
        if (dayRef.current) {
          dayRef.current.style.transform = `translate3d(0, ${progress * -24}px, 0)`;
        }
        if (nightRef.current) {
          nightRef.current.style.transform = `translate3d(0, ${progress * -12}px, 0)`;
        }
        if (sunMotionRef.current) {
          sunMotionRef.current.style.transform = `translate3d(0, ${progress * 116}px, 0)`;
          sunMotionRef.current.style.opacity = String(Math.max(0, 1 - progress * 1.55));
          sunMotionRef.current.style.visibility = progress >= 0.66 ? "hidden" : "visible";
          sunMotionRef.current.style.pointerEvents = progress >= 0.66 ? "none" : "auto";
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const revealNight = () => {
    window.dispatchEvent(
      new CustomEvent<number>("portfolio:scroll-to", {
        detail: window.innerHeight * 0.48,
      })
    );
  };

  return (
    <section
      id="top"
      className="relative h-[100svh] min-h-[680px] overflow-hidden bg-[#e4ddd4] sm:min-h-[760px] lg:min-h-[820px]"
    >
      <div
        ref={canvasRef}
        aria-hidden="true"
        className="absolute -inset-[2.5%] will-change-transform"
      >
        <picture>
          <source media="(min-width: 640px)" srcSet={desktopSrcSet} />
          <img
            {...mobileImageProps}
            srcSet={mobileSrcSet}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </picture>
      </div>

      <div
        ref={dayRef}
        className="absolute inset-x-0 top-0 h-[59%] will-change-transform px-5 pb-10 pt-[92px] text-day-ink sm:px-8 sm:pt-[112px] lg:px-12"
      >
        <div className="mx-auto flex h-full max-w-[1280px] flex-col">
          <div className="flex items-start justify-between gap-5">
            <span className="time-label max-w-[220px] text-[#4b4b49]">{data.day.label}</span>
            {open && (
              <span className="time-label text-right text-[#3f464f]">
                {data.openForProjectsLabel}
              </span>
            )}
          </div>

          <div className="my-auto flex w-full flex-col items-center pb-6 text-center sm:pb-10">
            <h1 className="display-heading mx-auto max-w-[1080px] text-[clamp(52px,9vw,132px)]">
              {data.day.title}
            </h1>
            <div className="mt-4 flex max-w-[620px] flex-col items-center gap-3 sm:mt-6 sm:gap-4">
              <span aria-hidden="true" className="h-px w-12 bg-[#121722]/40 sm:w-16" />
              <p className="text-[13px] leading-[1.55] text-[#343a43] [text-wrap:pretty] sm:text-[15.5px]">
                {data.day.body}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={nightRef}
        className="absolute inset-x-0 bottom-0 top-[59%] will-change-transform px-5 pb-5 pt-10 text-text sm:px-8 sm:pb-7 sm:pt-14 lg:px-12"
      >
        <div className="mx-auto flex h-full max-w-[1280px] flex-col">
          <div className="my-auto flex w-full flex-col items-center text-center">
            <h2 className="display-heading mx-auto max-w-[1100px] text-[clamp(49px,8.7vw,126px)]">
              {data.night.title}
            </h2>
            <div className="mt-4 flex max-w-[620px] flex-col items-center gap-3 sm:mt-6 sm:gap-4">
              <span aria-hidden="true" className="h-px w-12 bg-text/38 sm:w-16" />
              <div className="flex flex-col items-center">
                <p className="text-[12.5px] leading-[1.58] text-text/64 [text-wrap:pretty] sm:text-[15.5px]">
                  {data.night.body}
                </p>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:mt-5">
                  <BookCallButton label="Book a 15-minute fit call" />
                  <EmailPill label="Email Miloš" />
                </div>
              </div>
            </div>
          </div>

          <div className="hidden items-end justify-between gap-5 text-[9.5px] font-medium uppercase tracking-[0.14em] text-text/48 sm:flex">
            <span>{data.cornerLeft}</span>
            <span>Independent from first decision to launch</span>
          </div>
        </div>
      </div>

      <div
        ref={sunMotionRef}
        className="absolute left-1/2 top-[calc(59%-29px)] z-10 -ml-[29px] h-[58px] w-[58px] will-change-[transform,opacity] sm:top-[calc(59%-37px)] sm:-ml-[37px] sm:h-[74px] sm:w-[74px]"
      >
        <button
          type="button"
          onClick={revealNight}
          aria-label="Continue to the night shift"
          className="group relative h-full w-full touch-manipulation rounded-full border border-[#b96f1f]/35 bg-[#e59b32] shadow-[inset_0_0_0_1px_rgba(255,238,201,.24)] transition-[transform,background-color,border-color] duration-300 ease-out hover:scale-[1.06] hover:border-[#8b4e15]/60 hover:bg-[#eeaa46] focus-visible:scale-[1.06]"
        >
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8.5px] font-semibold uppercase tracking-[0.16em] text-[#4c4135] sm:-top-9">
            {data.sunHint}
          </span>
        </button>
      </div>
    </section>
  );
}
