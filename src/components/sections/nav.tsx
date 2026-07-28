"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BookCallButton } from "@/components/book-call";
import type { Nav as NavData } from "@/lib/cms/types";

export function Nav({ data }: { data: NavData }) {
  const { links } = data;
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(links[0]?.href ?? "");
  const [night, setNight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let raf = 0;
    let positions: Array<{ href: string; top: number }> = [];
    let previousNight: boolean | null = null;

    const measure = () => {
      positions = links.flatMap((link) => {
        const section = document.querySelector<HTMLElement>(link.href);
        return section ? [{ href: link.href, top: section.offsetTop }] : [];
      });
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        const vh = window.innerHeight;

        let current = links[0]?.href ?? "";
        for (const position of positions) {
          if (position.top <= y + vh * 0.34) current = position.href;
        }
        setActive((previous) => (previous === current ? previous : current));

        const nextNight = y > vh * 0.54;
        if (nextNight !== previousNight) {
          previousNight = nextNight;
          setNight(nextNight);
        }
      });
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    for (const link of links) {
      const section = document.querySelector<HTMLElement>(link.href);
      if (section) resizeObserver.observe(section);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("load", onResize, { once: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
      resizeObserver.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [links]);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    const main = document.querySelector<HTMLElement>("#main");
    const wasInert = main?.inert ?? false;
    document.body.style.overflow = "hidden";
    if (main) main.inert = true;
    const focusFrame = requestAnimationFrame(() => {
      menuPanelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    });
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
      if (event.key === "Tab" && headerRef.current) {
        const focusable = Array.from(
          headerRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter((element) => element.offsetParent !== null);
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", close);
    return () => {
      cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      if (main) main.inert = wasInert;
      window.removeEventListener("keydown", close);
    };
  }, [menuOpen]);

  const style = {
    "--nav-ink": night ? "#eeeae1" : "#121722",
    "--nav-sub": night ? "rgba(238,234,225,.66)" : "rgba(18,23,34,.66)",
    "--nav-bg": night ? "rgba(7,9,16,.9)" : "rgba(238,234,225,.84)",
    "--nav-line": night ? "rgba(238,234,225,.16)" : "rgba(18,23,34,.18)",
  } as CSSProperties;

  return (
    <header
      ref={headerRef}
      role={menuOpen ? "dialog" : undefined}
      aria-modal={menuOpen ? true : undefined}
      aria-label={menuOpen ? "Site navigation" : undefined}
      className="pointer-events-none fixed inset-x-0 top-4 z-[70] flex justify-center px-4"
    >
      <div
        style={{
          ...style,
          color: menuOpen ? "#eeeae1" : "var(--nav-ink)",
          background: menuOpen ? "#070910" : "var(--nav-bg)",
          borderColor: menuOpen ? "rgba(238,234,225,.18)" : "var(--nav-line)",
        }}
        className="nav-shell pointer-events-auto relative inline-flex h-[50px] w-max max-w-[calc(100vw-2rem)] items-stretch overflow-hidden rounded-[18px] border shadow-[0_10px_36px_rgba(4,7,12,.12)] backdrop-blur-xl transition-[color,background-color,border-color] duration-500 sm:h-[52px]"
      >
        <nav aria-label="Main" className="flex min-w-0 items-stretch">
          <div className="hidden items-stretch lg:flex">
            {links.map((link) => {
              const selected = active === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={selected ? "location" : undefined}
                  data-active={selected}
                  className="nav-underline inline-flex min-h-11 items-center px-4 text-[12px] font-medium transition-[color,letter-spacing,background-color] duration-300 hover:bg-current/[0.045] hover:tracking-[0.025em] focus-visible:outline-offset-[-3px] xl:px-5"
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
            className="group flex min-h-11 items-center gap-2 px-4 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors hover:bg-current/[0.05] focus-visible:outline-offset-[-3px] lg:hidden"
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

        <span
          aria-hidden="true"
          className="my-2 w-px flex-none"
          style={{
            background: menuOpen ? "rgba(238,234,225,.18)" : "var(--nav-line)",
          }}
        />

        <span className="inline-flex flex-none items-center">
          <span className="lg:hidden">
            <BookCallButton size="sm" label={data.ctaLabel} />
          </span>
          <span className="hidden lg:inline-flex">
            <BookCallButton size="sm" label={data.ctaLabel} />
          </span>
        </span>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuPanelRef}
            id="mobile-navigation"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto fixed inset-0 -z-10 flex bg-night px-5 pb-8 pt-[100px] text-text sm:px-8 sm:pt-[112px] lg:hidden"
          >
            <div className="flex w-full flex-col">
              <div className="mb-8 flex items-end justify-between border-b border-text/16 pb-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-text/66">
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
                    <span className="text-[11px] font-semibold tracking-[0.12em] text-text/64">
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

              <p className="mt-auto max-w-[300px] pt-8 text-[14px] leading-relaxed text-text/70">
                Built in daylight. Sold after dark.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
