"use client";

import { useEffect, useRef } from "react";
import { BookCallButton } from "@/components/book-call";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#process", label: "Process" },
];

/** Page time runs 19:58 → 02:13 across the full scroll. */
const START_MIN = 19 * 60 + 58;
const END_MIN = 26 * 60 + 13;

/**
 * Fixed nav that changes skin at the horizon: dark ink over the daylight
 * hero, light text on frosted night once you scroll past it. Carries the
 * scroll-linked clock with its sunset-to-night rail.
 */
export function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        const vh = window.innerHeight;
        const doc = document.documentElement.scrollHeight - vh;
        const p = doc > 0 ? Math.min(1, Math.max(0, y / doc)) : 0;

        const m = Math.round(START_MIN + p * (END_MIN - START_MIN)) % 1440;
        const clock =
          String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0");
        if (clockRef.current) clockRef.current.textContent = clock;
        if (dotRef.current) dotRef.current.style.left = (p * 100).toFixed(1) + "%";

        const nav = navRef.current;
        if (nav) {
          const night = y > vh * 0.42;
          nav.style.setProperty("--nav-ink", night ? "#eef1f7" : "#171c26");
          nav.style.setProperty("--nav-sub", night ? "rgba(238,241,247,.62)" : "rgba(23,28,38,.62)");
          nav.style.setProperty("--nav-bg", night ? "rgba(9,11,17,.55)" : "transparent");
          nav.style.setProperty("--nav-line", night ? "rgba(238,241,247,.14)" : "transparent");
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

  return (
    <header
      ref={navRef}
      style={
        {
          "--nav-ink": "#171c26",
          "--nav-sub": "rgba(23,28,38,.62)",
          background: "var(--nav-bg, transparent)",
          borderBottom: "1px solid var(--nav-line, transparent)",
        } as React.CSSProperties
      }
      className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-[18px] backdrop-blur-[14px] transition-[background,border-color] duration-500 md:px-12"
    >
      <a href="#top" className="text-[15px] font-semibold" style={{ color: "var(--nav-ink)" }}>
        Miloš Novaković
      </a>

      <nav aria-label="Main" className="flex items-center gap-[22px] text-[13.5px]">
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="hidden transition-colors hover:!text-amber md:block"
            style={{ color: "var(--nav-sub)" }}
          >
            {l.label}
          </a>
        ))}

        <span
          className="flex flex-col items-center gap-[5px]"
          title="Page time. It moves when you scroll."
        >
          <span
            ref={clockRef}
            suppressHydrationWarning
            className="text-xs font-semibold tracking-[0.1em] tabular-nums"
            style={{ color: "var(--nav-ink)" }}
          >
            19:58
          </span>
          <span className="relative h-0.5 w-[46px] rounded-full bg-gradient-to-r from-amber via-[#c98a8a] to-blue">
            <span
              ref={dotRef}
              className="absolute -top-0.5 left-0 h-1.5 w-1.5 -translate-x-[3px] rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]"
            />
          </span>
        </span>

        <BookCallButton size="sm" label="Book a call" />
      </nav>
    </header>
  );
}
