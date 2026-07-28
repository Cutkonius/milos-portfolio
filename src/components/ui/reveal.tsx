"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

/** On-view rise, matching the design's data-reveal curve. State-driven
 *  (useInView + animate) — deterministic across hydration timing. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.14 });

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={
        reduced
          ? { opacity: inView ? 1 : 0 }
          : { opacity: inView ? 1 : 0, y: inView ? 0 : 18, scale: inView ? 1 : 0.992 }
      }
      transition={{ duration: 0.72, delay: inView ? delay : 0, ease: [0.22, 1, 0.36, 1] }}
      style={reduced ? undefined : { opacity: 0, y: 18, scale: 0.992 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
