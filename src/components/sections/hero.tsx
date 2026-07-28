"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BookCallButton, EmailPill } from "@/components/book-call";
import heroCanvas from "@/images/hero-canvas.webp";
import type { Hero as HeroData } from "@/lib/cms/types";

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
  const canvasRef = useRef<HTMLDivElement>(null);
  const dayRef = useRef<HTMLDivElement>(null);
  const nightRef = useRef<HTMLDivElement>(null);
  const sunRef = useRef<HTMLButtonElement>(null);

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
        if (y > vh * 1.35) return;
        const progress = Math.min(1.15, Math.max(0, y / vh));

        if (canvasRef.current) {
          canvasRef.current.style.transform = `translate3d(0, ${progress * 14}px, 0) scale(1.035)`;
        }
        if (dayRef.current) {
          dayRef.current.style.transform = `translate3d(0, ${progress * -24}px, 0)`;
        }
        if (nightRef.current) {
          nightRef.current.style.transform = `translate3d(0, ${progress * -12}px, 0)`;
        }
        if (sunRef.current) {
          sunRef.current.style.transform = `translate3d(0, ${progress * 116}px, 0)`;
          sunRef.current.style.opacity = String(Math.max(0, 1 - progress * 1.55));
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
    window.scrollTo({ top: window.innerHeight * 0.48, behavior: "smooth" });
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
        <Image
          src={heroCanvas}
          alt=""
          fill
          fetchPriority="high"
          loading="eager"
          quality={75}
          sizes="100vw"
          className="object-cover object-center"
        />
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
                Available — <CurrentMonth />
              </span>
            )}
          </div>

          <div className="my-auto max-w-[930px] pb-6 sm:pb-10">
            <h1 className="display-heading max-w-[900px] text-[clamp(52px,9vw,132px)]">
              {data.day.title}
            </h1>
            <div className="mt-4 grid max-w-[760px] grid-cols-[36px_1fr] gap-3 sm:mt-6 sm:grid-cols-[58px_1fr] sm:gap-5">
              <span aria-hidden="true" className="mt-[10px] h-px bg-[#121722]/40" />
              <p className="max-w-[520px] text-[13px] leading-[1.55] text-[#343a43] [text-wrap:pretty] sm:text-[15.5px]">
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
          <div className="my-auto max-w-[1040px] lg:ml-[8%]">
            <h2 className="display-heading max-w-[1000px] text-[clamp(49px,8.7vw,126px)]">
              {data.night.title}
            </h2>
            <div className="mt-4 grid max-w-[790px] grid-cols-[36px_1fr] gap-3 sm:mt-6 sm:grid-cols-[58px_1fr] sm:gap-5">
              <span aria-hidden="true" className="mt-[10px] h-px bg-text/38" />
              <div>
                <p className="max-w-[530px] text-[12.5px] leading-[1.58] text-text/64 [text-wrap:pretty] sm:text-[15.5px]">
                  {data.night.body}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 sm:mt-6">
                  <BookCallButton />
                  <EmailPill />
                </div>
              </div>
            </div>
          </div>

          <div className="hidden items-end justify-between gap-5 text-[9.5px] font-medium uppercase tracking-[0.14em] text-text/48 sm:flex">
            <span>{data.cornerLeft}</span>
            <span>Independent design / build / growth</span>
          </div>
        </div>
      </div>

      <button
        ref={sunRef}
        type="button"
        onClick={revealNight}
        aria-label="Scroll to the night side"
        className="group absolute left-1/2 top-[calc(59%-29px)] z-10 -ml-[29px] h-[58px] w-[58px] rounded-full border border-[#b96f1f]/30 bg-[#e59b32] shadow-[inset_0_0_0_1px_rgba(255,238,201,.24)] will-change-[transform,opacity] transition-transform duration-500 hover:scale-[1.04] sm:top-[calc(59%-37px)] sm:-ml-[37px] sm:h-[74px] sm:w-[74px]"
      >
        <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8.5px] font-semibold uppercase tracking-[0.16em] text-[#4c4135] sm:-top-9">
          Scroll into night
        </span>
      </button>
    </section>
  );
}
