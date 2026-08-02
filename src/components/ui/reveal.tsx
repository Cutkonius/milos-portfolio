"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
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
  const [canAnimate, setCanAnimate] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Keep the server-rendered content visible. Only elements that start
    // below the fold opt into the hidden pre-reveal state after hydration.
    const bounds = node.getBoundingClientRect();
    setCanAnimate(bounds.top >= window.innerHeight && bounds.bottom > 0);
  }, []);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={
        canAnimate
          ? { opacity: inView ? 1 : 0, y: inView ? 0 : 9 }
          : { opacity: 1, y: 0 }
      }
      transition={{ duration: 0.64, delay: inView ? delay : 0, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
