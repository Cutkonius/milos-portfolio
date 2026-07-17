"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/ui/reveal";
import { CalTextLink } from "@/components/book-call";

const STEPS = [
  {
    label: "DAY 0",
    stroke: "rgba(245,169,78,0.55)",
    dot: "#f5a94e",
    ring: "rgba(245,169,78,0.16)",
    title: "The short call",
    blurb: (
      <>
        Fifteen minutes. You talk, I take notes, we find out if we fit.{" "}
        <CalTextLink className="text-sm">
          It is literally called the short informative call →
        </CalTextLink>
      </>
    ),
  },
  {
    label: "DAYS 1–20",
    stroke: "rgba(238,241,247,0.3)",
    dot: "#d99a5b",
    ring: "rgba(217,154,91,0.14)",
    title: "The build",
    blurb: "You get a link on day one and watch the site grow up. Progress you can click, not promises.",
  },
  {
    label: "DAY 21",
    stroke: "rgba(238,241,247,0.3)",
    dot: "#8fabff",
    ring: "rgba(143,171,255,0.14)",
    title: "The keys",
    blurb: "Launch day. Training included, documentation included, hostage handovers not included.",
  },
  {
    label: "EVERY NIGHT",
    stroke: "rgba(91,140,255,0.6)",
    dot: "#5b8cff",
    ring: "rgba(91,140,255,0.18)",
    title: "The night shift",
    blurb: "Email flows first, SEO close behind. The marketing clocks in when you clock out. Receipts below.",
  },
];

export function Process() {
  const railRef = useRef<HTMLDivElement>(null);
  const inView = useInView(railRef, { once: true, amount: 0.35 });
  const reduced = useReducedMotion();

  return (
    <section
      id="process"
      className="relative scroll-mt-16 bg-[linear-gradient(180deg,#0c0f18_0%,#0a0c12_100%)] px-6 py-[120px] md:px-12"
    >
      <div className="relative mx-auto max-w-[1120px]">
        <Reveal>
          <div className="time-label text-blue-soft">00:52 · How a project rolls out of the shop</div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-3.5 max-w-[620px] text-[40px] font-semibold tracking-[-0.025em] text-text [text-wrap:balance] sm:text-[52px]">
            Four steps. Zero mystery.
          </h2>
        </Reveal>

        <div ref={railRef} className="relative mt-[60px]">
          {/* Rail (drawn in on view) — spans the row on large screens */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[7px] hidden h-0.5 rounded-full bg-text/[0.09] lg:block"
          />
          <motion.div
            aria-hidden="true"
            initial={false}
            animate={{ width: inView ? "100%" : "0%" }}
            transition={reduced ? { duration: 0 } : { duration: 1.8, ease: [0.25, 0.6, 0.2, 1] }}
            className="absolute left-0 top-[7px] hidden h-0.5 rounded-full bg-[linear-gradient(90deg,#f5a94e_0%,#d99a5b_40%,#8fabff_75%,#5b8cff_100%)] shadow-[0_0_12px_rgba(245,169,78,0.35)] lg:block"
            style={{ width: 0 }}
          />

          <div className="grid gap-x-[clamp(16px,2.5vw,36px)] gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="relative pt-[38px]">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 h-4 w-4 rounded-full"
                    style={{ background: s.dot, boxShadow: `0 0 0 5px ${s.ring}` }}
                  />
                  <div
                    aria-hidden="true"
                    className="whitespace-nowrap text-[clamp(24px,2.9vw,38px)] font-semibold leading-none tracking-[-0.02em] text-transparent"
                    style={{ WebkitTextStroke: `1px ${s.stroke}` }}
                  >
                    {s.label}
                  </div>
                  <h3 className="mt-3 text-xl font-semibold text-text">
                    <span className="sr-only">{s.label} — </span>
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-[1.6] text-text/60 [text-wrap:pretty]">{s.blurb}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
