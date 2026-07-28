"use client";

import { useEffect, useRef, useState } from "react";
import { BookCallButton, EmailPill } from "@/components/book-call";
import { Stars } from "@/components/ui/stars";
import type { Hero as HeroData } from "@/lib/cms/types";

const HERO_STARS = [
  { top: "61%", left: "10%", size: 2 as const, dur: 4.2 },
  { top: "76%", left: "23%", size: 3 as const, dur: 5.2, delay: 0.9 },
  { top: "64%", right: "15%", size: 2 as const, dur: 4.8, delay: 0.3 },
  { top: "83%", right: "8%", size: 2 as const, dur: 5.5, delay: 1.4 },
  { top: "89%", left: "43%", size: 2 as const, dur: 4.6, delay: 2 },
  { top: "69%", left: "68%", size: 2 as const, dur: 5, delay: 2.6 },
];

function CurrentMonth() {
  const [month, setMonth] = useState("July");
  useEffect(() => {
    const timer = setTimeout(() => {
      setMonth(
        new Intl.DateTimeFormat("en-GB", {
          month: "long",
          timeZone: "Europe/Belgrade",
        }).format(new Date())
      );
    }, 0);
    return () => clearTimeout(timer);
  }, []);
  return <span suppressHydrationWarning>{month}</span>;
}

export function Hero({ data, open }: { data: HeroData; open: boolean }) {
  const sunRef = useRef<HTMLButtonElement>(null);
  const dayRef = useRef<HTMLDivElement>(null);
  const nightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        const vh = window.innerHeight;
        const progress = Math.min(y / (vh * 0.92), 1.35);
        if (sunRef.current) {
          sunRef.current.style.transform = `translate3d(0, ${progress * vh * 0.34}px, 0)`;
          sunRef.current.style.opacity = String(Math.max(0, 1 - progress * 0.92));
        }
        if (dayRef.current) {
          dayRef.current.style.transform = `translate3d(0, ${Math.min(y * 0.1, 90)}px, 0)`;
        }
        if (nightRef.current) {
          nightRef.current.style.transform = `translate3d(0, ${Math.max(y * -0.025, -28)}px, 0)`;
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const sun = sunRef.current;
    let dragging = false;
    let lastY = 0;
    const down = (event: PointerEvent) => {
      dragging = true;
      lastY = event.clientY;
      if (sun) {
        sun.style.cursor = "grabbing";
        sun.setPointerCapture?.(event.pointerId);
      }
      event.preventDefault();
    };
    const move = (event: PointerEvent) => {
      if (!dragging) return;
      const delta = event.clientY - lastY;
      lastY = event.clientY;
      window.scrollBy({ top: delta * 2.8, behavior: "auto" });
    };
    const up = () => {
      dragging = false;
      if (sun) sun.style.cursor = "grab";
    };

    sun?.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      sun?.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative h-[100svh] min-h-[900px] overflow-hidden bg-night sm:min-h-[780px]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[52%] bg-[radial-gradient(900px_360px_at_50%_105%,rgba(255,213,153,.42),transparent_65%),linear-gradient(180deg,#e9eef6_0%,#efe6da_61%,#f0d0a5_100%)] sm:h-[55%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 top-[52%] bg-[radial-gradient(800px_360px_at_50%_-8%,rgba(100,123,180,.18),transparent_68%),linear-gradient(180deg,#121725_0%,#080b12_100%)] sm:top-[55%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[52%] h-px bg-[linear-gradient(90deg,transparent,rgba(255,227,186,.75)_26%,#ffe0b4_50%,rgba(255,227,186,.75)_74%,transparent)] shadow-[0_0_22px_rgba(255,198,117,.38)] sm:top-[55%]"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[52%] h-[260px] w-[170px] -translate-x-1/2 bg-[linear-gradient(180deg,rgba(255,190,102,.26),transparent_82%)] blur-[8px] sm:top-[55%] sm:w-[220px]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.28] [background-image:linear-gradient(rgba(17,22,32,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(17,22,32,.035)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_48%)]"
      />

      <Stars stars={HERO_STARS} />

      <div
        ref={dayRef}
        className="absolute inset-x-0 top-0 flex h-[52%] will-change-transform flex-col items-center justify-center px-5 pb-14 pt-24 text-center text-day-ink sm:h-[55%] sm:px-8 sm:pb-20 sm:pt-20"
      >
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="time-label text-amber-deep">{data.day.label}</span>
          {open && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#121722]/10 bg-white/35 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#39404b] backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2d8e5e]" />
              Open · <CurrentMonth />
            </span>
          )}
        </div>
        <h1 className="mt-4 max-w-[980px] text-[clamp(50px,7vw,98px)] font-semibold leading-[0.9] tracking-[-0.055em] sm:mt-5">
          {data.day.title}
        </h1>
        <p className="mt-5 max-w-[520px] text-[15px] leading-[1.55] text-[#4c535e] [text-wrap:pretty] sm:text-[16.5px]">
          {data.day.body}
        </p>
        <div className="mt-5 hidden items-center gap-5 text-[10px] font-semibold uppercase tracking-[0.17em] text-[#5d6268] sm:flex">
          <span>Strategy</span>
          <span className="h-px w-7 bg-[#121722]/20" />
          <span>Design</span>
          <span className="h-px w-7 bg-[#121722]/20" />
          <span>Development</span>
        </div>
      </div>

      <div
        ref={nightRef}
        className="absolute inset-x-0 bottom-0 top-[52%] flex will-change-transform flex-col items-center justify-center px-5 pb-20 pt-20 text-center text-text sm:top-[55%] sm:px-8 sm:pb-14 sm:pt-16"
      >
        <span className="time-label text-blue-soft/70 sm:hidden">Then it clocks in again</span>
        <h2 className="mt-3 max-w-[980px] text-[clamp(48px,6.7vw,94px)] font-semibold leading-[0.91] tracking-[-0.055em] sm:mt-0">
          {data.night.title}
        </h2>
        <p className="mt-5 max-w-[520px] text-[15px] leading-[1.58] text-text/58 [text-wrap:pretty] sm:text-[16.5px]">
          {data.night.body}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2.5 sm:mt-7">
          <BookCallButton />
          <EmailPill />
        </div>
      </div>

      <button
        ref={sunRef}
        type="button"
        aria-label="The sun. Drag it down to ride into the night shift."
        className="group absolute left-1/2 top-[calc(52%-38px)] z-10 -ml-[38px] h-[76px] w-[76px] cursor-grab touch-none rounded-full bg-[radial-gradient(circle_at_40%_34%,#fff8e8,#ffd18d_56%,#ec9b43)] shadow-[0_0_58px_rgba(255,190,110,.55)] will-change-[transform,opacity] animate-sunpulse sm:top-[calc(55%-47px)] sm:-ml-[47px] sm:h-[94px] sm:w-[94px]"
      >
        <span
          aria-hidden="true"
          className="absolute -inset-3 rounded-full border border-[#ffe7c1]/25 transition-transform duration-500 group-hover:scale-110 sm:-inset-4"
        />
        <span className="pointer-events-none absolute -top-[34px] left-1/2 -translate-x-1/2 whitespace-nowrap text-[8.5px] font-semibold tracking-[0.17em] text-[#4e4437]/70 sm:-top-[38px] sm:text-[9.5px]">
          {data.sunHint}
        </span>
      </button>

      <div className="absolute left-7 top-[48%] hidden -translate-y-1/2 items-center gap-3 text-[#141a25]/35 md:flex">
        <span className="h-px w-8 bg-[#141a25]/18" />
        <span className="text-[8.5px] font-semibold tracking-[0.16em]">01 / 05</span>
      </div>

      <div className="absolute bottom-5 left-5 hidden items-center gap-3 text-[11px] text-text/42 sm:flex md:left-8">
        <span className="grid h-7 w-7 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-[9px] font-semibold text-text/65">
          01
        </span>
        {data.cornerLeft}
      </div>
      <div className="absolute bottom-5 right-5 hidden items-center gap-2 text-[11px] text-text/42 sm:flex md:right-8">
        <span className="h-1.5 w-1.5 rounded-full bg-blue shadow-[0_0_10px_rgba(113,157,255,.75)]" />
        Working both shifts · GMT+1
      </div>
    </section>
  );
}
