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
          : { opacity: inView ? 1 : 0, y: inView ? 0 : 14 }
      }
      transition={{ duration: 0.82, delay: inView ? delay : 0, ease: [0.16, 1, 0.3, 1] }}
      style={reduced ? undefined : { opacity: 0, y: 14 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
