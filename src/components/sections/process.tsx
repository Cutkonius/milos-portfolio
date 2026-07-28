"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/ui/reveal";
import { CalTextLink } from "@/components/book-call";
import type { ProcessSection } from "@/lib/cms/types";

export function Process({ data }: { data: ProcessSection }) {
  const railRef = useRef<HTMLDivElement>(null);
  const inView = useInView(railRef, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();

  return (
    <section
      id="process"
      className="premium-section relative scroll-mt-24 overflow-hidden bg-[radial-gradient(800px_420px_at_54%_100%,rgba(113,157,255,.065),transparent_70%),linear-gradient(180deg,#0a0d15_0%,#080b12_100%)] px-5 py-[105px] sm:px-8 sm:py-[135px] lg:px-12"
    >
      <div className="relative mx-auto max-w-[1180px]">
        <Reveal>
          <div className="section-kicker text-blue-soft">{data.label}</div>
        </Reveal>

        <div className="mt-5 grid items-end gap-6 lg:grid-cols-[1fr_.55fr]">
          <Reveal delay={0.05}>
            <h2 className="max-w-[760px] text-[clamp(42px,5.3vw,70px)] font-semibold leading-[1] tracking-[-0.05em] text-text [text-wrap:balance]">
              {data.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-[370px] text-[14.5px] leading-[1.65] text-text/48 lg:ml-auto">
              You always know what is happening, what comes next and who is accountable for it.
            </p>
          </Reveal>
        </div>

        <div ref={railRef} className="relative mt-14">
          <div
            aria-hidden="true"
            className="absolute inset-x-6 top-[8px] hidden h-px rounded-full bg-text/[0.09] lg:block"
          />
          <motion.div
            aria-hidden="true"
            initial={false}
            animate={{ width: inView ? "calc(100% - 48px)" : "0%" }}
            transition={
              reduced
                ? { duration: 0 }
                : { duration: 1.45, ease: [0.22, 1, 0.36, 1] }
            }
            className="absolute left-6 top-[8px] hidden h-px rounded-full bg-[linear-gradient(90deg,#f2aa58_0%,#d99a5b_40%,#a5bdff_75%,#719dff_100%)] shadow-[0_0_14px_rgba(242,170,88,0.32)] lg:block"
            style={{ width: 0 }}
          />
          <div
            aria-hidden="true"
            className="absolute bottom-6 left-[7px] top-2 w-px bg-[linear-gradient(#f2aa58,#719dff)] opacity-45 sm:hidden"
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.steps.map((step, index) => (
              <Reveal key={step.id} delay={index * 0.07}>
                <div className="relative ml-8 h-full sm:ml-0 lg:pt-[42px]">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[31px] top-6 z-10 h-3.5 w-3.5 rounded-full lg:left-2 lg:top-[1px]"
                    style={{ background: step.dot, boxShadow: `0 0 0 5px ${step.ring}` }}
                  />
                  <article className="surface-card flex h-full min-h-[250px] flex-col rounded-[22px] p-5 transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-white/[0.18] sm:p-6">
                    <div
                      aria-hidden="true"
                      className="whitespace-nowrap text-[22px] font-semibold leading-none tracking-[-0.02em] text-transparent"
                      style={{ WebkitTextStroke: `1px ${step.stroke}` }}
                    >
                      {step.label}
                    </div>
                    <h3 className="mt-auto pt-12 text-[20px] font-semibold tracking-[-0.02em] text-text">
                      <span className="sr-only">{step.label} — </span>
                      {step.title}
                    </h3>
                    <p className="mt-3 text-[13.5px] leading-[1.65] text-text/55 [text-wrap:pretty]">
                      {step.blurb}
                      {step.ctaLabel && (
                        <>
                          {" "}
                          <CalTextLink className="text-[13.5px]">{step.ctaLabel}</CalTextLink>
                        </>
                      )}
                    </p>
                  </article>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
