"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type Toast = { id: number; message: string };

let nextId = 1;
let push: ((t: Toast) => void) | null = null;

/** Fire a toast from anywhere (client-side). */
export function toast(message: string) {
  push?.({ id: nextId++, message });
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

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
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="flex items-center gap-3 rounded-2xl border border-white/[0.13] bg-[rgba(16,20,32,0.85)] px-5 py-3 text-sm text-text shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
          >
            <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-blue" />
            <span>{t.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
