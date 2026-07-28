"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BookCallButton } from "@/components/book-call";
import type { Nav as NavData } from "@/lib/cms/types";

export function Nav({ data }: { data: NavData }) {
  const { links, clockStartMin, clockEndMin } = data;
  const navRef = useRef<HTMLElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(links[0]?.href ?? "");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        const vh = window.innerHeight;
        const doc = document.documentElement.scrollHeight - vh;
        const progress = doc > 0 ? Math.min(1, Math.max(0, y / doc)) : 0;
        const minutes =
          Math.round(clockStartMin + progress * (clockEndMin - clockStartMin)) % 1440;
        const clock =
          String(Math.floor(minutes / 60)).padStart(2, "0") +
          ":" +
          String(minutes % 60).padStart(2, "0");

        if (clockRef.current) clockRef.current.textContent = clock;
        if (dotRef.current) dotRef.current.style.left = `${(progress * 100).toFixed(1)}%`;

        let current = links[0]?.href ?? "";
        for (const link of links) {
          const section = document.querySelector<HTMLElement>(link.href);
          if (section && section.offsetTop <= y + vh * 0.36) current = link.href;
        }
        setActive((previous) => (previous === current ? previous : current));

        const nav = navRef.current;
        if (!nav) return;
        const night = y > vh * 0.43;
        nav.style.setProperty("--nav-ink", night ? "#f2f4f8" : "#121722");
        nav.style.setProperty(
          "--nav-sub",
          night ? "rgba(242,244,248,.58)" : "rgba(18,23,34,.58)"
        );
        nav.style.setProperty(
          "--nav-bg",
          night ? "rgba(8,10,16,.72)" : "rgba(247,246,243,.72)"
        );
        nav.style.setProperty(
          "--nav-line",
          night ? "rgba(242,244,248,.12)" : "rgba(18,23,34,.1)"
        );
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [clockStartMin, clockEndMin, links]);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);

  const style = {
    "--nav-ink": "#121722",
    "--nav-sub": "rgba(18,23,34,.58)",
    "--nav-bg": "rgba(247,246,243,.72)",
    "--nav-line": "rgba(18,23,34,.1)",
  } as CSSProperties;

  return (
    <header
      ref={navRef}
      style={style}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
    >
      <div
        className="pointer-events-auto relative mx-auto flex max-w-[1180px] items-center justify-between rounded-[18px] border px-3 py-2 shadow-[0_12px_45px_rgba(0,0,0,0.1)] backdrop-blur-2xl transition-[background,border-color,box-shadow] duration-500 sm:rounded-full sm:pl-4"
        style={{
          color: "var(--nav-ink)",
          background: "var(--nav-bg)",
          borderColor: "var(--nav-line)",
        }}
      >
        <a
          href="#top"
          className="group flex min-w-0 items-center gap-2.5 pr-2"
          aria-label={`${data.brand}, back to top`}
        >
          <span
            aria-hidden="true"
            className="grid h-7 w-7 flex-none place-items-center rounded-full bg-[var(--nav-ink)] text-[9px] font-bold tracking-[-0.03em] text-[var(--nav-bg)] transition-transform duration-300 group-hover:rotate-[-8deg]"
          >
            MN
          </span>
          <span className="truncate text-[13px] font-semibold tracking-[-0.015em]">
            <span className="sm:hidden">{data.brand.split(" ")[0]}</span>
            <span className="hidden sm:inline">{data.brand}</span>
          </span>
        </a>

        <nav aria-label="Main" className="flex items-center gap-1.5">
          <div className="mr-1 hidden items-center rounded-full border border-[var(--nav-line)] bg-black/[0.025] p-1 lg:flex">
            {links.map((link) => {
              const selected = active === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={selected ? "location" : undefined}
                  className="relative rounded-full px-3.5 py-2 text-[12.5px] font-medium transition-colors duration-300"
                  style={{ color: selected ? "var(--nav-ink)" : "var(--nav-sub)" }}
                >
                  {selected && (
                    <motion.span
                      layoutId="active-nav"
                      className="absolute inset-0 -z-10 rounded-full bg-white/[0.1] shadow-[inset_0_0_0_1px_var(--nav-line)]"
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    />
                  )}
                  {link.label}
                </a>
              );
            })}
          </div>

          <span
            className="mr-1 flex w-[48px] flex-col items-center gap-1"
            title="Page time. It moves when you scroll."
          >
            <span
              ref={clockRef}
              suppressHydrationWarning
              className="text-[10.5px] font-semibold tracking-[0.09em] tabular-nums"
            >
              19:58
            </span>
            <span className="relative h-px w-[36px] bg-[linear-gradient(90deg,#f2aa58,#c78d91,#719dff)]">
              <span
                ref={dotRef}
                className="absolute -top-[2px] left-0 h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.95)]"
              />
            </span>
          </span>

          <span className="hidden md:inline-flex">
            <BookCallButton size="sm" label={data.ctaLabel} />
          </span>

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMenuOpen((open) => !open)}
            className="grid h-9 w-9 place-items-center rounded-full border border-[var(--nav-line)] lg:hidden"
          >
            <span className="flex w-3.5 flex-col gap-1">
              <span
                className={`h-px w-full bg-[var(--nav-ink)] transition-transform duration-300 ${
                  menuOpen ? "translate-y-[2.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-full bg-[var(--nav-ink)] transition-transform duration-300 ${
                  menuOpen ? "-translate-y-[2.5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-[calc(100%+8px)] overflow-hidden rounded-[20px] border border-white/[0.12] bg-[rgba(8,10,16,.94)] p-2 text-text shadow-[0_24px_70px_rgba(0,0,0,.38)] backdrop-blur-2xl lg:hidden"
            >
              <div className="grid gap-1 sm:grid-cols-2">
                {links.map((link, index) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-medium text-text/72 transition-colors hover:bg-white/[0.07] hover:text-text"
                  >
                    {link.label}
                    <span className="text-[10px] text-text/35">0{index + 1}</span>
                  </a>
                ))}
              </div>
              <div className="mt-1 flex items-center justify-between gap-3 border-t border-white/[0.1] px-3 pt-3">
                <span className="text-[11px] text-text/42">One short call. No hard sell.</span>
                <BookCallButton size="sm" label={data.ctaLabel} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
