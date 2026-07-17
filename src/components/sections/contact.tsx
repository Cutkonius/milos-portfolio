"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView, useReducedMotion } from "motion/react";
import { BookCallButton, EmailPill } from "@/components/book-call";
import { Reveal } from "@/components/ui/reveal";
import { Stars } from "@/components/ui/stars";

const CONTACT_STARS = [
  { top: "12%", left: "8%", size: 3 as const, dur: 3.5 },
  { top: "24%", left: "30%", size: 2 as const, dur: 4.3, delay: 1.1 },
  { top: "9%", right: "22%", size: 3 as const, dur: 3.9, delay: 0.5 },
  { top: "34%", right: "10%", size: 2 as const, dur: 4.7, delay: 1.8 },
  { top: "48%", left: "16%", size: 2 as const, dur: 4.1, delay: 2.4 },
  { top: "56%", right: "34%", size: 2 as const, dur: 3.7, delay: 3 },
];

const RECEIPTS = [
  {
    icon: "✓",
    title: "Order: brake pads, front axle",
    meta: "vujicauto.rs · 02:13",
  },
  {
    icon: "↑",
    title: "“delovi za auto”, page 1, spot 3",
    meta: "Google Search · 03:07",
  },
  {
    icon: "↺",
    title: "Cart rescued by email: €148",
    meta: "email flow · 04:26",
  },
];

function Receipts() {
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
          setTotal(412);
          return;
        }
        const t0 = performance.now();
        const dur = 1500;
        const tick = (now: number) => {
          const k = Math.min(1, (now - t0) / dur);
          setTotal(Math.round(412 * (1 - Math.pow(1 - k, 3))));
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
  }, [inView, reduced]);

  const item = () =>
    reduced
      ? { opacity: inView ? 1 : 0 }
      : { opacity: inView ? 1 : 0, y: inView ? 0 : 26, scale: inView ? 1 : 0.98 };

  return (
    <div ref={wrapRef} className="flex min-w-[min(300px,100%)] max-w-[440px] flex-1 flex-col gap-3 sm:min-w-[min(340px,100%)]">
      <div className="time-label text-right !text-[10.5px] !tracking-[0.16em] text-text/40">
        Last night, unsupervised · simulated until vujicauto launches
      </div>
      {RECEIPTS.map((r, i) => (
        <motion.div
          key={r.title}
          initial={false}
          animate={item()}
          transition={{ duration: 0.65, delay: inView ? i * 0.18 : 0, ease: [0.2, 0.8, 0.25, 1] }}
          style={reduced ? undefined : { opacity: 0, y: 26, scale: 0.98 }}
          className="flex items-center gap-3.5 rounded-[18px] border border-white/[0.13] bg-white/[0.06] px-[18px] py-4 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
        >
          <span
            aria-hidden="true"
            className="grid h-[38px] w-[38px] flex-none place-items-center rounded-xl bg-blue/[0.18] text-[15px] font-bold text-blue-soft"
          >
            {r.icon}
          </span>
          <span className="flex-1">
            <span className="block text-sm font-semibold text-text">{r.title}</span>
            <span className="mt-0.5 block text-xs text-text/50">{r.meta}</span>
          </span>
        </motion.div>
      ))}
      <motion.div
        initial={false}
        animate={item()}
        transition={{
          duration: 0.65,
          delay: inView ? RECEIPTS.length * 0.18 : 0,
          ease: [0.2, 0.8, 0.25, 1],
        }}
        style={reduced ? undefined : { opacity: 0, y: 26, scale: 0.98 }}
        className="flex items-center justify-between rounded-2xl border border-blue/30 bg-[#141a2b] px-[18px] py-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
        <span className="text-sm font-semibold text-text">Night total</span>
        <span className="text-sm font-bold text-amber tabular-nums">
          €{total} · 3 orders
        </span>
      </motion.div>
    </div>
  );
}

export function Contact() {
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
      className="relative overflow-hidden bg-[linear-gradient(180deg,#0a0c12_0%,#07090d_100%)] px-6 pb-0 pt-[130px] md:px-12"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_460px_at_20%_20%,rgba(91,140,255,0.1),transparent_70%)]"
      />
      <Stars stars={CONTACT_STARS} />

      {/* Crescent moon */}
      <div
        aria-hidden="true"
        className="absolute right-[14%] top-24 h-14 w-14 rounded-full bg-[#dfe7f8] shadow-[0_0_44px_rgba(223,231,248,0.35)]"
      >
        <div className="absolute -left-3 -top-1.5 h-[52px] w-[52px] rounded-full bg-[#0a0c12]" />
      </div>

      <div className="relative mx-auto flex max-w-[1120px] flex-wrap items-center gap-14">
        <div className="min-w-[min(300px,100%)] flex-[1.1] sm:min-w-[min(340px,100%)]">
          <Reveal>
            <div className="time-label text-blue-soft">02:13 · The part where it pays off</div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3.5 text-[clamp(38px,4.6vw,60px)] font-semibold leading-tight tracking-[-0.03em] text-text [text-wrap:balance]">
              Everyone is asleep. The website is not.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-[480px] text-base leading-[1.6] text-text/[0.62] [text-wrap:pretty]">
              That is the whole pitch. Want a website that works both shifts?
              The calendar is right there. Fifteen minutes, no slides, no
              jargon, maybe one bad joke.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-[30px] flex flex-wrap gap-3">
              <BookCallButton label="Book the short call" />
              <EmailPill />
            </div>
          </Reveal>
        </div>

        <Receipts />
      </div>

      {/* Footer bar */}
      <div className="relative mx-auto mt-[90px] flex max-w-[1120px] flex-wrap items-center justify-between gap-3 border-t border-text/[0.1] pb-[30px] pt-[26px] text-[12.5px] text-text/45">
        <span>© 2026 Miloš Novaković · built in daylight, sold after dark</span>
        <span className="flex gap-5">
          <a href="mailto:hi@milosnovakovic.com" className="text-text/60 transition-colors hover:text-amber">
            hi@milosnovakovic.com
          </a>
          <a href="#top" onClick={lockUp} className="text-text/60 transition-colors hover:text-amber">
            Lock up behind you
          </a>
        </span>
      </div>
    </section>
  );
}
