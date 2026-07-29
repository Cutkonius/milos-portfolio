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
      className="editorial-section deco-section deco-section-light scroll-mt-20 overflow-hidden bg-[#f1e6cd] px-5 py-[105px] text-[#080d1b] sm:px-8 sm:py-[145px] lg:px-12"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid items-end gap-9 border-b border-day-ink/18 pb-10 lg:grid-cols-[1.25fr_.55fr] lg:pb-14">
          <div>
            <Reveal>
              <div className="section-kicker !text-day-ink/68">{data.label}</div>
            </Reveal>
            <Reveal delay={0.04}>
              <h2 className="mt-7 max-w-[820px] text-[clamp(46px,6.8vw,94px)] font-semibold leading-[0.95] tracking-[-0.038em] [text-wrap:balance]">
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
            <div className="relative h-[170px] border-b border-r border-day-ink/18 bg-[#050713] sm:h-[230px] lg:h-[280px] lg:border-b-0">
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
              className="relative h-[170px] border-b border-day-ink/18 bg-[#050713] sm:h-[230px] lg:h-[280px] lg:border-b-0 lg:border-r"
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
              <div className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.09em] text-day-ink/66">
                <span>01 / Website</span>
                <span className="h-px flex-1 bg-day-ink/20" />
                <span>02 / Email</span>
              </div>
              <div className="mt-7 flex items-baseline justify-between gap-3 whitespace-nowrap text-[clamp(27px,4vw,50px)] font-semibold leading-none tracking-[-0.06em] lg:flex-col lg:items-start lg:gap-0 lg:whitespace-normal">
                <span>Build</span>
                <span className="deco-connector text-[0.42em] text-amber-deep">then</span>
                <span>Follow up</span>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="border-b border-day-ink/18">
          {data.rows.map((service, index) => (
            <Reveal key={service.id} delay={index * 0.045}>
              <article className="service-row group grid min-h-[220px] border-t border-day-ink/18 px-0 py-8 transition-colors duration-500 first:border-t-0 hover:bg-[#173fae] hover:text-[#f1e6cd] focus-within:bg-[#173fae] focus-within:text-[#f1e6cd] sm:py-10 lg:grid-cols-[0.18fr_1.08fr_.74fr] lg:items-center lg:gap-10">
                <span
                  aria-hidden="true"
                  className="text-[44px] font-semibold leading-none tracking-[-0.035em] text-day-ink/24 transition-[color,transform] duration-500 group-hover:translate-x-1 group-hover:text-amber group-focus-within:text-amber sm:text-[58px]"
                >
                  {service.n}
                </span>

                <div className="mt-5 lg:mt-0">
                  <span className="text-[12px] font-semibold uppercase tracking-[0.09em] text-day-ink/66 transition-colors group-hover:text-[#f1e6cd]/78 group-focus-within:text-[#f1e6cd]/78">
                    {service.shift}
                  </span>
                  <h3 className="mt-3 max-w-[560px] text-[clamp(30px,3.8vw,54px)] font-semibold leading-[1.02] tracking-[-0.03em] transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-1 group-focus-within:translate-x-1">
                    {service.title}
                  </h3>
                </div>

                <div className="mt-7 lg:mt-0">
                  <p className="max-w-[440px] text-[15px] leading-[1.65] text-day-ink/74 transition-colors group-hover:text-[#f1e6cd]/84 group-focus-within:text-[#f1e6cd]/84 sm:text-[16px]">
                    {service.blurb}
                  </p>
                  <div className="mt-6 border-t border-current/22 pt-3 text-[12px] font-semibold uppercase tracking-[0.09em] text-day-ink/66 transition-colors group-hover:text-[#f1e6cd]/78 group-focus-within:text-[#f1e6cd]/78">
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
