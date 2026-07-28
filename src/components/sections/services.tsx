"use client";

import { Reveal } from "@/components/ui/reveal";
import type { ServicesSection } from "@/lib/cms/types";

const DELIVERABLES = [
  "Message hierarchy / User journeys / Visual system",
  "Responsive build / Performance / Quality assurance",
  "Technical SEO / Email journeys / Post-launch learning",
];

export function Services({ data }: { data: ServicesSection }) {
  return (
    <section
      id="services"
      className="editorial-section scroll-mt-20 overflow-hidden bg-paper px-5 py-[105px] text-day-ink sm:px-8 sm:py-[145px] lg:px-12"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid items-end gap-9 border-b border-day-ink/18 pb-10 lg:grid-cols-[1.25fr_.55fr] lg:pb-14">
          <div>
            <Reveal>
              <div className="section-kicker !text-day-ink/58">{data.label}</div>
            </Reveal>
            <Reveal delay={0.04}>
              <h2 className="mt-7 max-w-[820px] text-[clamp(46px,6.8vw,96px)] font-semibold leading-[0.91] tracking-[-0.065em] [text-wrap:balance]">
                {data.heading}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.08}>
            <p className="max-w-[390px] text-[14px] leading-[1.68] text-day-ink/62 [text-wrap:pretty] lg:ml-auto">
              You do not need separate people translating strategy into design, then design into
              code. One accountable partner keeps the message, interface and build working toward
              the same decision.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div
            aria-hidden="true"
            className="overflow-hidden border-b border-day-ink/18 py-5 sm:py-7"
          >
            <div className="flex items-center gap-4 text-[8.5px] font-semibold uppercase tracking-[0.17em] text-day-ink/46 sm:text-[9px]">
              <span>01 / Message</span>
              <span className="h-px flex-1 bg-day-ink/20" />
              <span>03 / System</span>
            </div>
            <div className="mt-4 flex items-baseline justify-between gap-3 whitespace-nowrap text-[clamp(29px,5.5vw,74px)] font-semibold leading-none tracking-[-0.065em] sm:mt-6">
              <span>Clarity</span>
              <span className="editorial text-[0.62em] text-amber-deep">into</span>
              <span>Action</span>
            </div>
          </div>
        </Reveal>

        <div className="border-b border-day-ink/18">
          {data.rows.map((service, index) => (
            <Reveal key={service.id} delay={index * 0.045}>
              <article className="group grid min-h-[220px] border-t border-day-ink/18 px-0 py-8 transition-[background-color,color,padding] duration-700 ease-[cubic-bezier(.16,1,.3,1)] first:border-t-0 hover:bg-day-ink hover:px-5 hover:text-paper focus-within:bg-day-ink focus-within:px-5 focus-within:text-paper sm:py-10 lg:grid-cols-[0.18fr_1.08fr_.74fr] lg:items-center lg:gap-10 lg:hover:px-8">
                <span
                  aria-hidden="true"
                  className="text-[44px] font-semibold leading-none tracking-[-0.055em] text-day-ink/20 transition-colors duration-500 group-hover:text-amber group-focus-within:text-amber sm:text-[58px]"
                >
                  {service.n}
                </span>

                <div className="mt-5 lg:mt-0">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.17em] text-day-ink/45 transition-colors group-hover:text-paper/50 group-focus-within:text-paper/50">
                    {service.shift}
                  </span>
                  <h3 className="mt-3 max-w-[560px] text-[clamp(30px,3.8vw,54px)] font-semibold leading-[1] tracking-[-0.052em] transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-2 group-focus-within:translate-x-2">
                    {service.title}
                  </h3>
                </div>

                <div className="mt-7 lg:mt-0">
                  <p className="max-w-[420px] text-[14px] leading-[1.65] text-day-ink/62 transition-colors group-hover:text-paper/66 group-focus-within:text-paper/66">
                    {service.blurb}
                  </p>
                  <div className="mt-6 border-t border-current/18 pt-3 text-[9px] font-semibold uppercase tracking-[0.16em] opacity-55">
                    {DELIVERABLES[index] ?? "Strategy / Craft / Delivery"}
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
