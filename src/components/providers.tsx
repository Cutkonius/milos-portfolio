"use client";

import { useEffect, type ReactNode } from "react";
import { MotionConfig } from "motion/react";
import Lenis from "lenis";

/** Inertia scrolling, skipped entirely for reduced-motion users. */
function useLenis() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = reduced
      ? null
      : new Lenis({
          duration: 0.82,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          anchors: true,
          smoothWheel: true,
          wheelMultiplier: 1,
        });
    let raf = 0;
    const loop = (time: number) => {
      lenis?.raf(time);
      raf = requestAnimationFrame(loop);
    };
    if (lenis) raf = requestAnimationFrame(loop);

    const scrollToRequested = (event: Event) => {
      const top = (event as CustomEvent<number>).detail;
      if (lenis) lenis.scrollTo(top, { duration: 0.72 });
      else window.scrollTo({ top, behavior: "auto" });
    };
    window.addEventListener("portfolio:scroll-to", scrollToRequested);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("portfolio:scroll-to", scrollToRequested);
      lenis?.destroy();
    };
  }, []);
}

/** Honors the OS reduced-motion setting for every Motion animation. */
export function Providers({ children }: { children: ReactNode }) {
  useLenis();
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
