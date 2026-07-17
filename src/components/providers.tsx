"use client";

import { useEffect, type ReactNode } from "react";
import { MotionConfig } from "motion/react";
import Lenis from "lenis";

/** Inertia scrolling — skipped entirely for reduced-motion users. */
function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      duration: 1.1,
      anchors: true,
      smoothWheel: true,
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
