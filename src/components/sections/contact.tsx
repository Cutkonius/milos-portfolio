"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView, useReducedMotion } from "motion/react";
import { BookCallButton, EmailPill } from "@/components/book-call";
import { Reveal } from "@/components/ui/reveal";
import { Stars } from "@/components/ui/stars";
import type { ContactSection, Receipt } from "@/lib/cms/types";

const CONTACT_STARS = [
  { top: "12%", left: "8%", size: 3 as const, dur: 3.5 },
  { top: "24%", left: "30%", size: 2 as const, dur: 4.3, delay: 1.1 },
  { top: "9%", right: "22%", size: 3 as const, dur: 3.9, delay: 0.5 },
  { top: "34%", right: "10%", size: 2 as const, dur: 4.7, delay: 1.8 },
  { top: "48%", left: "16%", size: 2 as const, dur: 4.1, delay: 2.4 },
  { top: "56%", right: "34%", size: 2 as const, dur: 3.7, delay: 3 },
];

function Receipts({
  receipts: RECEIPTS,
  note,
  target,
  totalMeta,
}: {
  receipts: Receipt[];
  note: string;
  target: number;
  totalMeta: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const delay = setTimeout(
      () => {
        if (reduced) {
          setTotal(target);
          return;
        }
        const t0 = performance.now();
        const dur = 1500;
        const tick = (now: number) => {
          const k = Math.min(1, (now - t0) / dur);
          setTotal(Math.round(target * (1 - Math.pow(1 - k, 3))));
          if (k < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      reduced ? 0 : RECEIPTS.length * 180 + 200
    );
    return () => {
      clearTimeout(delay);
      cancelAnimationFrame(raf);
    };
  }, [inView, reduced, target, RECEIPTS.length]);

  const item = () =>
    reduced
      ? { opacity: inView ? 1 : 0 }
      : { opacity: inView ? 1 : 0, y: inView ? 0 : 26, scale: inView ? 1 : 0.98 };

  return (
    <div ref={wrapRef} className="flex w-full max-w-[470px] flex-col gap-3 lg:ml-auto">
      <div className="time-label text-left !text-[9.5px] !tracking-[0.15em] text-text/34 lg:text-right">
        {note}
      </div>
      {RECEIPTS.map((r, i) => (
        <motion.div
          key={r.id}
          initial={false}
          animate={item()}
          transition={{ duration: 0.58, delay: inView ? i * 0.14 : 0, ease: [0.22, 1, 0.36, 1] }}
          style={reduced ? undefined : { opacity: 0, y: 26, scale: 0.98 }}
          className="surface-card group flex items-center gap-3.5 rounded-[19px] px-[18px] py-4 backdrop-blur-2xl transition-[transform,border-color] duration-300 hover:translate-x-1 hover:border-white/[0.18]"
        >
          <span
            aria-hidden="true"
            className="grid h-[38px] w-[38px] flex-none place-items-center rounded-full border border-blue/20 bg-blue/[0.13] text-[14px] font-bold text-blue-soft transition-colors duration-300 group-hover:bg-blue/[0.2]"
          >
            {r.icon}
          </span>
          <span className="flex-1">
            <span className="block text-[13.5px] font-semibold text-text">{r.title}</span>
            <span className="mt-0.5 block text-xs text-text/50">{r.meta}</span>
          </span>
        </motion.div>
      ))}
      <motion.div
        initial={false}
        animate={item()}
        transition={{
          duration: 0.58,
          delay: inView ? RECEIPTS.length * 0.14 : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={reduced ? undefined : { opacity: 0, y: 26, scale: 0.98 }}
        className="flex items-center justify-between rounded-[19px] border border-blue/30 bg-[linear-gradient(135deg,rgba(113,157,255,.14),rgba(113,157,255,.055))] px-[18px] py-4 shadow-[0_20px_50px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,.06)]"
      >
        <span className="text-sm font-semibold text-text">Night total</span>
        <span className="text-sm font-bold text-amber tabular-nums">
          €{total} · {totalMeta}
        </span>
      </motion.div>
    </div>
  );
}

export function Contact({ data }: { data: ContactSection }) {
  const router = useRouter();

  async function lockUp(e: React.MouseEvent) {
    e.preventDefault();
    await fetch("/api/logout", { method: "POST" });
    router.replace("/vault");
    router.refresh();
  }

  return (
    <section
      id="contact"
      className="premium-section relative overflow-hidden bg-[radial-gradient(850px_560px_at_18%_26%,rgba(113,157,255,.11),transparent_68%),linear-gradient(180deg,#080b12_0%,#05070b_100%)] px-5 pb-0 pt-[115px] sm:px-8 sm:pt-[145px] lg:px-12"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,.28))]"
      />
      <Stars stars={CONTACT_STARS} />

      {/* Crescent moon */}
      <div
        aria-hidden="true"
        className="absolute right-[9%] top-[84px] h-16 w-16 rounded-full bg-[#e2e8f6] shadow-[0_0_58px_rgba(223,231,248,0.3)] sm:right-[14%] sm:top-24"
      >
        <div className="absolute -left-3.5 -top-2 h-[60px] w-[60px] rounded-full bg-[#080b12]" />
        <div className="absolute -inset-4 rounded-full border border-white/[0.06]" />
      </div>

      <div
        aria-hidden="true"
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-[clamp(90px,18vw,250px)] font-semibold leading-none tracking-[-0.07em] text-white/[0.018]"
      >
        AFTER DARK
      </div>

      <div className="relative mx-auto grid max-w-[1180px] items-center gap-16 lg:grid-cols-[1.08fr_.92fr] lg:gap-20">
        <div>
          <Reveal>
            <div className="section-kicker text-blue-soft">{data.label}</div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 max-w-[690px] text-[clamp(44px,5.7vw,78px)] font-semibold leading-[0.98] tracking-[-0.055em] text-text [text-wrap:balance]">
              {data.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[520px] text-[15.5px] leading-[1.7] text-text/[0.55] [text-wrap:pretty]">
              {data.pitch}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap gap-2.5">
              <BookCallButton label={data.ctaLabel} />
              <EmailPill />
            </div>
          </Reveal>
        </div>

        <Receipts
          receipts={data.receipts}
          note={data.receiptsNote}
          target={data.nightTotal}
          totalMeta={data.nightTotalMeta}
        />
      </div>

      {/* Footer bar */}
      <div className="relative mx-auto mt-[100px] flex max-w-[1180px] flex-wrap items-center justify-between gap-4 border-t border-text/[0.09] pb-[32px] pt-[24px] text-[11.5px] text-text/38">
        <span>{data.footerCopyright}</span>
        <span className="flex gap-5">
          <a
            href={`mailto:${data.footerEmail}`}
            className="text-text/60 transition-colors hover:text-amber"
          >
            {data.footerEmail}
          </a>
          <a href="#top" onClick={lockUp} className="text-text/60 transition-colors hover:text-amber">
            {data.footerLockLabel}
          </a>
        </span>
      </div>
    </section>
  );
}
