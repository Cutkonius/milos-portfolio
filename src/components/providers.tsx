"use client";

import { useEffect, type ReactNode } from "react";
import { MotionConfig } from "motion/react";
import Lenis from "lenis";

/** Inertia scrolling, skipped entirely for reduced-motion users. */
function useLenis() {
  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let unsubscribeVirtualScroll: (() => void) | null = null;
    let raf: number | null = null;
    let idleFrames = 0;

    const loop = (time: number) => {
      const current = lenis;
      if (!current || document.hidden) {
        raf = null;
        return;
      }

      current.raf(time);
      const moving = Boolean(current.isScrolling) || Math.abs(current.velocity) > 0.01;
      idleFrames = moving ? 0 : idleFrames + 1;

      if (moving || idleFrames < 3) raf = requestAnimationFrame(loop);
      else raf = null;
    };

    const ensureRaf = () => {
      idleFrames = 0;
      if (lenis && raf === null && !document.hidden) {
        raf = requestAnimationFrame(loop);
      }
    };

    const destroyLenis = () => {
      if (raf !== null) cancelAnimationFrame(raf);
      raf = null;
      unsubscribeVirtualScroll?.();
      unsubscribeVirtualScroll = null;
      lenis?.destroy();
      lenis = null;
    };

    const createLenis = () => {
      if (lenis || motionPreference.matches) return;
      lenis = new Lenis({
        duration: 0.82,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        anchors: true,
        smoothWheel: true,
        wheelMultiplier: 1,
      });
      unsubscribeVirtualScroll = lenis.on("virtual-scroll", ensureRaf);
    };

    const syncMotionPreference = () => {
      if (motionPreference.matches) destroyLenis();
      else createLenis();
    };

    const scrollToRequested = (event: Event) => {
      const detail = (event as CustomEvent<number | { top: number; immediate?: boolean }>).detail;
      const top = typeof detail === "number" ? detail : detail?.top;
      const immediate = typeof detail === "number" ? false : Boolean(detail?.immediate);
      if (!Number.isFinite(top)) return;
      if (lenis) {
        lenis.scrollTo(top, { duration: immediate ? 0 : 0.72, immediate });
        if (!immediate) ensureRaf();
      }
      else window.scrollTo({ top, behavior: "auto" });
    };

    const startForAnchor = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest("a[href^='#']") : null;
      if (target) ensureRaf();
    };

    const handleVisibility = () => {
      if (document.hidden && raf !== null) {
        cancelAnimationFrame(raf);
        raf = null;
      } else if (!document.hidden && lenis?.isScrolling) {
        ensureRaf();
      }
    };

    syncMotionPreference();
    window.addEventListener("portfolio:scroll-to", scrollToRequested);
    document.addEventListener("click", startForAnchor, true);
    document.addEventListener("visibilitychange", handleVisibility);
    motionPreference.addEventListener("change", syncMotionPreference);

    return () => {
      window.removeEventListener("portfolio:scroll-to", scrollToRequested);
      document.removeEventListener("click", startForAnchor, true);
      document.removeEventListener("visibilitychange", handleVisibility);
      motionPreference.removeEventListener("change", syncMotionPreference);
      destroyLenis();
    };
  }, []);
}

/** Honors the OS reduced-motion setting for every Motion animation. */
export function Providers({ children }: { children: ReactNode }) {
  useLenis();
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
