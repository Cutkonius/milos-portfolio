"use client";

import type { CSSProperties } from "react";
import { Reveal } from "@/components/ui/reveal";
import type { ServicesSection } from "@/lib/cms/types";

const DELIVERABLES = [
  "Positioning · UI/UX · Development",
  "Flows · Campaigns · Retention",
  "Technical SEO · Motion · Launch",
];

export function Services({ data }: { data: ServicesSection }) {
  return (
    <section
      id="services"
      className="premium-section scroll-mt-24 overflow-hidden bg-[radial-gradient(900px_520px_at_7%_18%,rgba(242,170,88,.055),transparent_70%),linear-gradient(180deg,#0d111b_0%,#090c13_100%)] px-5 py-[100px] sm:px-8 sm:py-[130px] lg:px-12"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="grid items-end gap-8 lg:grid-cols-[1.35fr_.65fr]">
          <div>
            <Reveal>
              <div className="section-kicker text-amber-soft">{data.label}</div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 max-w-[760px] text-[clamp(42px,5.4vw,72px)] font-semibold leading-[0.98] tracking-[-0.05em] text-text [text-wrap:balance]">
                {data.heading}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-[390px] pb-1 text-[15px] leading-[1.65] text-text/52 [text-wrap:pretty] lg:ml-auto">
              A deliberately small stack. One person owns the taste, the build and what happens
              after launch—so the idea does not get lost between handoffs.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {data.rows.map((service, index) => (
            <Reveal key={service.id} delay={index * 0.07}>
              <article
                style={{ "--service-accent": service.stroke } as CSSProperties}
                className="surface-card group relative flex min-h-[340px] flex-col overflow-hidden rounded-[26px] p-6 transition-[transform,border-color,background-color] duration-500 ease-out hover:-translate-y-1 hover:border-white/[0.18] sm:min-h-[360px] sm:p-8"
              >
                <div
                  aria-hidden="true"
                  className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[var(--service-accent)] opacity-0 blur-[70px] transition-opacity duration-500 group-hover:opacity-25"
                />
                <div className="relative flex items-start justify-between gap-4">
                  <span className="text-[12px] font-semibold tracking-[0.13em] text-text/35">
                    / {service.n}
                  </span>
                  <span className="rounded-full border border-white/[0.1] px-2.5 py-1 text-[8.5px] font-semibold uppercase tracking-[0.16em] text-text/42">
                    {service.shift}
                  </span>
                </div>

                <div className="relative mt-auto pt-16">
                  {service.favorite && (
                    <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-amber/20 bg-amber/[0.07] px-2.5 py-1 text-[8.5px] font-semibold uppercase tracking-[0.16em] text-amber-soft">
                      <span className="h-1 w-1 rounded-full bg-amber" />
                      Personal favorite
                    </span>
                  )}
                  <h3 className="max-w-[310px] text-[27px] font-semibold leading-[1.05] tracking-[-0.035em] text-text sm:text-[30px]">
                    {service.title}
                  </h3>
                  <p className="mt-4 max-w-[330px] text-[14.5px] leading-[1.65] text-text/55 [text-wrap:pretty]">
                    {service.blurb}
                  </p>
                  <div className="mt-7 border-t border-white/[0.09] pt-4 text-[9px] font-semibold uppercase tracking-[0.16em] text-text/34">
                    {DELIVERABLES[index] ?? "Strategy · Craft · Delivery"}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
