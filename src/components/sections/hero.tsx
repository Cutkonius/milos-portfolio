"use client";

import { useEffect, useRef, useState } from "react";
import { BookCallButton, EmailPill } from "@/components/book-call";
import { Stars } from "@/components/ui/stars";

const HERO_STARS = [
  { top: "62%", left: "12%", size: 3 as const, dur: 3.4 },
  { top: "71%", left: "24%", size: 2 as const, dur: 4.2, delay: 0.9 },
  { top: "60%", right: "17%", size: 3 as const, dur: 3.8, delay: 0.3 },
  { top: "80%", right: "9%", size: 2 as const, dur: 4.5, delay: 1.4 },
  { top: "87%", left: "41%", size: 2 as const, dur: 3.6, delay: 2 },
  { top: "66%", left: "64%", size: 2 as const, dur: 4, delay: 2.6 },
];

function CurrentMonth() {
  const [month, setMonth] = useState("July");
  useEffect(() => {
    const t = setTimeout(() => {
      setMonth(
        new Intl.DateTimeFormat("en-GB", { month: "long", timeZone: "Europe/Belgrade" }).format(
          new Date()
        )
      );
    }, 0);
    return () => clearTimeout(t);
  }, []);
  return <span suppressHydrationWarning>{month}</span>;
}

/**
 * The horizon hero: daylight above, night below, and the sun sitting on the
 * line between them. Scroll — or grab the sun and drag it down — to ride
 * into the night shift. Day and night halves drift apart in parallax.
 */
export function Hero() {
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
        const sun = sunRef.current;
        if (sun) {
          const t = Math.min(y / (vh * 0.9), 1.4);
          sun.style.transform = `translateY(${t * vh * 0.42}px)`;
          sun.style.opacity = String(Math.max(0, 1 - t * 0.85));
        }
        if (dayRef.current) dayRef.current.style.transform = `translateY(${y * 0.16}px)`;
        if (nightRef.current) nightRef.current.style.transform = `translateY(${y * -0.06}px)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Dragging the sun scrubs the page scroll.
    const sun = sunRef.current;
    let dragging = false;
    let lastY = 0;
    const down = (e: PointerEvent) => {
      dragging = true;
      lastY = e.clientY;
      if (sun) {
        sun.style.cursor = "grabbing";
        try {
          sun.setPointerCapture(e.pointerId);
        } catch {}
      }
      e.preventDefault();
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dy = e.clientY - lastY;
      lastY = e.clientY;
      window.scrollBy(0, dy * 3.4);
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
    <section id="top" className="relative h-[max(100vh,780px)] overflow-hidden">
      {/* Day sky / night ground / horizon */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[56%] bg-[linear-gradient(180deg,#e6ecf6_0%,#eee0cd_62%,#f6d3a4_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 top-[56%] bg-[linear-gradient(180deg,#151a29_0%,#0d1017_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(56%-2px)] h-1 bg-[linear-gradient(90deg,transparent,rgba(255,220,170,0.55)_28%,rgba(255,220,170,0.85)_50%,rgba(255,220,170,0.55)_72%,transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[56%] h-60 w-[190px] -translate-x-1/2 bg-[linear-gradient(180deg,rgba(255,196,120,0.32),rgba(255,196,120,0)_80%)] blur-[7px]"
      />

      {/* The sun */}
      <button
        ref={sunRef}
        type="button"
        aria-label="The sun. Drag it down to ride into the night shift."
        className="absolute left-1/2 top-[calc(56%-47px)] z-[5] -ml-[47px] h-[94px] w-[94px] cursor-grab touch-none rounded-full bg-[radial-gradient(circle_at_42%_38%,#fff3dd,#ffce8a_60%,#f5a94e)] animate-sunpulse"
      >
        <span className="pointer-events-none absolute -top-[30px] left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold tracking-[0.18em] text-[rgba(33,28,20,0.6)]">
          SCROLL, OR DRAG THE SUN
        </span>
      </button>

      <Stars stars={HERO_STARS} />

      {/* Day half */}
      <div
        ref={dayRef}
        className="absolute inset-x-0 top-0 box-border flex h-[56%] flex-col items-center justify-center px-6 pb-24 pt-16 text-center text-day-ink"
      >
        <div className="time-label text-amber-deep">19:58 · You caught me mid-shift</div>
        <h1 className="mt-4 text-[clamp(52px,6.5vw,86px)] font-semibold leading-none tracking-[-0.035em]">
          Built in daylight.
        </h1>
        <p className="mt-3.5 max-w-[460px] text-[16.5px] leading-[1.55] text-[#4a5145] [text-wrap:pretty]">
          The day job: websites designed and built with AI at unfair speed.
          Kickoff to keys in weeks, not quarters.
        </p>
      </div>

      {/* Night half */}
      <div
        ref={nightRef}
        className="absolute inset-x-0 bottom-0 top-[56%] box-border flex flex-col items-center justify-center px-6 pb-[74px] pt-[34px] text-center text-text"
      >
        <h2 className="mt-6 text-[clamp(52px,6.5vw,86px)] font-semibold leading-none tracking-[-0.035em]">
          Sold after dark.
        </h2>
        <p className="mt-3.5 max-w-[460px] text-[16.5px] leading-[1.55] text-text/60 [text-wrap:pretty]">
          The night job: email flows, SEO and the occasional ad, quietly
          working long after everyone (including me) goes to bed.
        </p>
        <div className="mt-[26px] flex flex-wrap justify-center gap-3">
          <BookCallButton />
          <EmailPill />
        </div>
      </div>

      {/* Corner notes */}
      <div className="absolute bottom-6 left-6 text-xs text-text/55 md:left-12">
        Zdravo. Miloš, 24 · Serbia · GMT+1, both shifts
      </div>
      <div className="absolute bottom-6 right-6 flex items-center gap-2 text-xs text-text/55 md:right-12">
        <span aria-hidden="true" className="h-[7px] w-[7px] rounded-full bg-blue" />
        Open for projects · <CurrentMonth />
      </div>
    </section>
  );
}
