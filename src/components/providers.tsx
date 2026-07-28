"use client";

import { useEffect, type ReactNode } from "react";
import { MotionConfig } from "motion/react";
import Lenis from "lenis";

/** Inertia scrolling — skipped entirely for reduced-motion users. */
function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      duration: 0.95,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      anchors: true,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
}

/** Honors the OS reduced-motion setting for every Motion animation. */
export function Providers({ children }: { children: ReactNode }) {
  useLenis();
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
