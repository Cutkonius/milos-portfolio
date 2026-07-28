"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BookCallButton } from "@/components/book-call";
import type { Nav as NavData } from "@/lib/cms/types";

export function Nav({ data }: { data: NavData }) {
  const { links } = data;
  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
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

        let current = links[0]?.href ?? "";
        for (const link of links) {
          const section = document.querySelector<HTMLElement>(link.href);
          if (section && section.offsetTop <= y + vh * 0.34) current = link.href;
        }
        setActive((previous) => (previous === current ? previous : current));

        const nav = navRef.current;
        if (!nav) return;
        const night = y > vh * 0.56;
        nav.style.setProperty("--nav-ink", night ? "#eeeae1" : "#121722");
        nav.style.setProperty(
          "--nav-sub",
          night ? "rgba(238,234,225,.62)" : "rgba(18,23,34,.62)"
        );
        nav.style.setProperty(
          "--nav-bg",
          night ? "rgba(7,9,16,.9)" : "rgba(238,234,225,.86)"
        );
        nav.style.setProperty(
          "--nav-line",
          night ? "rgba(238,234,225,.15)" : "rgba(18,23,34,.16)"
        );
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [links]);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", close);
    };
  }, [menuOpen]);

  const style = {
    "--nav-ink": "#121722",
    "--nav-sub": "rgba(18,23,34,.62)",
    "--nav-bg": "rgba(238,234,225,.86)",
    "--nav-line": "rgba(18,23,34,.16)",
  } as CSSProperties;

  return (
    <header
      ref={navRef}
      style={style}
      className="fixed inset-x-0 top-0 z-[70] px-4 sm:px-6 lg:px-10"
    >
      <div
        className="relative grid h-[64px] grid-cols-[1fr_auto_1fr] items-center border-b backdrop-blur-md transition-[color,background-color,border-color] duration-500 sm:h-[72px]"
        style={{
          color: menuOpen ? "#eeeae1" : "var(--nav-ink)",
          background: menuOpen ? "#070910" : "var(--nav-bg)",
          borderColor: menuOpen ? "rgba(238,234,225,.15)" : "var(--nav-line)",
        }}
      >
        <span aria-hidden="true" />

        <nav aria-label="Main" className="justify-self-center">
          <div className="hidden items-center gap-7 lg:flex">
            {links.map((link) => {
              const selected = active === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={selected ? "location" : undefined}
                  data-active={selected}
                  className="nav-underline py-2 text-[12.5px] font-medium transition-[color,letter-spacing] duration-300 hover:tracking-[0.025em]"
                  style={{ color: selected ? "var(--nav-ink)" : "var(--nav-sub)" }}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="group flex min-h-11 items-center gap-2 px-3 text-[12px] font-semibold uppercase tracking-[0.14em] lg:hidden"
          >
            <span className="relative h-[10px] w-4" aria-hidden="true">
              <span
                className={`absolute left-0 top-[2px] h-px w-4 bg-current transition-transform duration-300 ${
                  menuOpen ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute bottom-[2px] left-0 h-px w-4 bg-current transition-transform duration-300 ${
                  menuOpen ? "-translate-y-[3px] -rotate-45" : ""
                }`}
              />
            </span>
            {menuOpen ? "Close" : "Menu"}
          </button>
        </nav>

        <span className="justify-self-end lg:hidden">
          <BookCallButton size="sm" label="Book" />
        </span>
        <span className="hidden justify-self-end lg:inline-flex">
          <BookCallButton size="sm" label={data.ctaLabel} />
        </span>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 -z-10 flex bg-night px-5 pb-8 pt-[104px] text-text sm:px-8 sm:pt-[120px] lg:hidden"
          >
            <div className="flex w-full flex-col">
              <div className="mb-8 flex items-end justify-between border-b border-text/16 pb-4 text-[9.5px] font-semibold uppercase tracking-[0.17em] text-text/54">
                <span>Index</span>
                <span>Portfolio / 2026</span>
              </div>

              <div className="divide-y divide-text/16 border-b border-t border-text/16">
                {links.map((link, index) => (
                  <a
                    key={link.href}
                    href={link.href}
                    aria-current={active === link.href ? "location" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className="group grid grid-cols-[46px_1fr_auto] items-baseline py-5 sm:py-7"
                  >
                    <span className="text-[10px] font-semibold tracking-[0.15em] text-text/48">
                      0{index + 1}
                    </span>
                    <span className="text-[clamp(36px,11vw,64px)] font-semibold leading-none tracking-[-0.055em] text-text transition-transform duration-500 group-hover:translate-x-2">
                      {link.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-lg text-text/42 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                    >
                      ↗
                    </span>
                  </a>
                ))}
              </div>

              <p className="mt-auto max-w-[280px] pt-8 text-[12px] leading-relaxed text-text/52">
                Built in daylight. Sold after dark.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
