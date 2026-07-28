"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView, useReducedMotion } from "motion/react";
import { BookCallButton, EmailPill } from "@/components/book-call";
import { Reveal } from "@/components/ui/reveal";
import heroCanvas from "@/images/hero-canvas.webp";
import type { ContactSection, Receipt } from "@/lib/cms/types";

function OvernightLedger({
  receipts,
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
    if (reduced) {
      const timer = window.setTimeout(() => setTotal(target), 0);
      return () => window.clearTimeout(timer);
    }

    const startedAt = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / 1300);
      setTotal(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, target]);

  return (
    <div ref={wrapRef} className="w-full lg:ml-auto">
      <div className="flex items-end justify-between gap-5 border-b border-text/18 pb-4">
        <span className="time-label text-text/56">Overnight ledger</span>
        <span className="max-w-[280px] text-right text-[9px] leading-[1.45] uppercase tracking-[0.13em] text-text/44">
          {note}
        </span>
      </div>

      <div>
        {receipts.map((receipt, index) => (
          <motion.div
            key={receipt.id}
            initial={false}
            animate={{
              opacity: inView ? 1 : 0,
              x: reduced ? 0 : inView ? 0 : 14,
            }}
            transition={{
              duration: reduced ? 0 : 0.66,
              delay: inView ? index * 0.09 : 0,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ opacity: 0, x: reduced ? 0 : 14 }}
            className="grid grid-cols-[38px_1fr] gap-x-3 border-b border-text/14 py-5 sm:grid-cols-[44px_1fr_auto] sm:items-center"
          >
            <span className="text-[9px] font-semibold tracking-[0.16em] text-blue-soft/62">
              0{index + 1}
            </span>
            <span className="text-[13px] font-medium leading-snug text-text/82 sm:text-[14px]">
              {receipt.title}
            </span>
            <span className="col-start-2 mt-1 text-[11px] text-text/48 sm:col-auto sm:mt-0 sm:text-right">
              {receipt.meta}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="grid items-end gap-4 border-b border-text/18 py-7 sm:grid-cols-[1fr_auto]">
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-text/48">
          Always-on total / {totalMeta}
        </span>
        <span className="text-[clamp(62px,9vw,112px)] font-semibold leading-[0.78] tracking-[-0.07em] text-amber tabular-nums">
          {String(total).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

export function Contact({ data }: { data: ContactSection }) {
  const router = useRouter();

  async function lockUp(event: React.MouseEvent) {
    event.preventDefault();
    await fetch("/api/logout", { method: "POST" });
    router.replace("/vault");
    router.refresh();
  }

  return (
    <section
      id="contact"
      className="editorial-section relative overflow-hidden bg-[#05080d] px-5 pb-0 pt-[115px] sm:px-8 sm:pt-[155px] lg:px-12"
    >
      <Image
        src={heroCanvas}
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none object-cover object-bottom opacity-[0.12] mix-blend-screen"
      />

      <div className="relative mx-auto max-w-[1280px]">
        <Reveal>
          <div className="section-kicker text-blue-soft">{data.label}</div>
        </Reveal>

        <div className="mt-7 grid items-start gap-16 lg:grid-cols-[1.02fr_.98fr] lg:gap-20">
          <div>
            <Reveal delay={0.04}>
              <h2 className="max-w-[720px] text-[clamp(50px,7.2vw,102px)] font-semibold leading-[0.9] tracking-[-0.068em] text-text [text-wrap:balance]">
                {data.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-7 max-w-[540px] text-[15px] leading-[1.72] text-text/62 [text-wrap:pretty] sm:text-[16px]">
                {data.pitch}
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-2">
                <BookCallButton label={data.ctaLabel} />
                <EmailPill />
              </div>
            </Reveal>
          </div>

          <OvernightLedger
            receipts={data.receipts}
            note={data.receiptsNote}
            target={data.nightTotal}
            totalMeta={data.nightTotalMeta}
          />
        </div>

        <div className="mt-[110px] border-t border-text/16 pb-[34px] pt-[24px] text-[11px] text-text/44 sm:mt-[150px]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span>{data.footerCopyright}</span>
            <span className="flex gap-6">
              <a
                href={`mailto:${data.footerEmail}`}
                className="email-action text-text/64 transition-colors hover:text-text"
              >
                {data.footerEmail}
              </a>
              <a
                href="#top"
                onClick={lockUp}
                className="email-action text-text/64 transition-colors hover:text-text"
              >
                {data.footerLockLabel}
              </a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
