"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

/** On-view rise, matching the design's data-reveal curve. State-driven
 *  (useInView + animate), deterministic across hydration timing. */
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

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 9 }}
      transition={{ duration: 0.64, delay: inView ? delay : 0, ease: [0.16, 1, 0.3, 1] }}
      style={{ opacity: 0, y: 9 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
