"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import emailNocturne from "@/images/email-nocturne-vector-v4.webp";
import websiteNocturne from "@/images/website-nocturne-vector-v4.webp";
import type { ServicesSection } from "@/lib/cms/types";

const DELIVERABLES = [
  "Structure and content / UI/UX design / Development and launch",
  "Complete ESP setup / Automated flows / Written email sequences",
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
              <div className="section-kicker !text-day-ink/68">{data.label}</div>
            </Reveal>
            <Reveal delay={0.04}>
              <h2 className="mt-7 max-w-[820px] text-[clamp(46px,6.8vw,96px)] font-semibold leading-[0.91] tracking-[-0.065em] [text-wrap:balance]">
                {data.heading}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.08}>
            <p className="max-w-[430px] text-[15px] leading-[1.68] text-day-ink/72 [text-wrap:pretty] sm:text-[16px] lg:ml-auto">
              You can hire me for either service or combine both. I use AI to work faster and
              explore more options, while my knowledge and experience guide every final decision.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 overflow-hidden border-b border-day-ink/18 lg:grid-cols-[0.52fr_0.28fr_0.20fr]">
            <div className="relative h-[160px] border-b border-r border-day-ink/18 sm:h-[220px] lg:h-[260px] lg:border-b-0">
              <Image
                src={websiteNocturne}
                alt="A lone figure approaches an illuminated Art Deco staircase opening onto a cobalt city"
                fill
                quality={82}
                sizes="(min-width: 1280px) 665px, (min-width: 1024px) 52vw, 50vw"
                className="object-cover object-center"
              />
            </div>

            <div
              aria-hidden="true"
              className="relative h-[160px] border-b border-day-ink/18 sm:h-[220px] lg:h-[260px] lg:border-b-0 lg:border-r"
            >
              <Image
                src={emailNocturne}
                alt=""
                fill
                quality={82}
                sizes="(min-width: 1280px) 360px, (min-width: 1024px) 28vw, 50vw"
                className="object-cover object-center"
              />
            </div>

            <div
              aria-hidden="true"
              className="col-span-2 flex min-h-[132px] flex-col justify-between px-4 py-5 sm:px-6 sm:py-6 lg:col-span-1 lg:min-h-0"
            >
              <div className="flex items-center gap-3 text-[10.5px] font-semibold uppercase tracking-[0.11em] text-day-ink/62">
                <span>01 / Website</span>
                <span className="h-px flex-1 bg-day-ink/20" />
                <span>02 / Email</span>
              </div>
              <div className="mt-7 flex items-baseline justify-between gap-3 whitespace-nowrap text-[clamp(27px,4vw,50px)] font-semibold leading-none tracking-[-0.06em] lg:flex-col lg:items-start lg:gap-0 lg:whitespace-normal">
                <span>Build</span>
                <span className="editorial text-[0.62em] text-amber-deep">then</span>
                <span>Follow up</span>
              </div>
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
                  <span className="text-[11px] font-semibold uppercase tracking-[0.11em] text-day-ink/62 transition-colors group-hover:text-paper/70 group-focus-within:text-paper/70">
                    {service.shift}
                  </span>
                  <h3 className="mt-3 max-w-[560px] text-[clamp(30px,3.8vw,54px)] font-semibold leading-[1] tracking-[-0.052em] transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-2 group-focus-within:translate-x-2">
                    {service.title}
                  </h3>
                </div>

                <div className="mt-7 lg:mt-0">
                  <p className="max-w-[440px] text-[15px] leading-[1.65] text-day-ink/72 transition-colors group-hover:text-paper/78 group-focus-within:text-paper/78 sm:text-[16px]">
                    {service.blurb}
                  </p>
                  <div className="mt-6 border-t border-current/18 pt-3 text-[11px] font-semibold uppercase tracking-[0.11em] text-day-ink/62 transition-colors group-hover:text-paper/70 group-focus-within:text-paper/70">
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
