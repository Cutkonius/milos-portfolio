"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type Toast = { id: number; message: string };

let nextId = 1;
let push: ((t: Toast) => void) | null = null;

/** Fire a toast from anywhere (client-side). */
export function toast(message: string) {
  push?.({ id: nextId++, message });
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    push = (t: Toast) => {
      setToasts((prev) => [...prev.slice(-2), t]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((x) => x.id !== t.id));
      }, 3600);
    };
    return () => {
      push = null;
    };
  }, []);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-[70] flex flex-col items-center gap-2 px-4"
    >
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: reduced ? 0 : 0.36, ease: [0.16, 1, 0.3, 1] }}
            className="deco-toast relative border border-amber/55 bg-[#080d1b] px-5 py-3.5 text-[14px] text-text shadow-[0_14px_38px_rgba(0,0,0,0.34)]"
          >
            <span>{t.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
