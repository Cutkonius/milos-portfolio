import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { MediaImage } from "@/components/cms/media-image";
import { renderEmphasis } from "@/components/cms/emphasis";
import milosPhoto from "@/images/milos-editorial-portrait-v2.webp";
import type { AboutSection } from "@/lib/cms/types";

export function About({ data }: { data: AboutSection }) {
  return (
    <section
      id="about"
      className="editorial-section deco-section deco-section-light scroll-mt-20 overflow-hidden bg-[#f1e6cd] px-5 py-[92px] text-day-ink sm:px-8 sm:py-[126px] lg:px-12"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-7 border-b border-day-ink/18 pb-9 lg:grid-cols-[0.28fr_0.72fr] lg:items-end lg:gap-14 lg:pb-12">
          <Reveal>
            <div>
              <div className="section-kicker !text-day-ink/66">{data.label}</div>
              <div className="mt-5 hidden text-[11px] font-semibold uppercase tracking-[0.1em] text-[#7f410e] lg:block">
                Personal file / 01
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.04}>
            <h2 className="max-w-[940px] text-[clamp(42px,6.3vw,86px)] font-semibold leading-[0.96] tracking-[-0.038em] text-day-ink [text-wrap:balance]">
              {data.heading}
            </h2>
          </Reveal>
        </div>

        <div className="mt-10 grid items-start gap-12 sm:mt-14 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20">
          <Reveal delay={0.05}>
            <figure className="relative mx-auto w-full max-w-[540px] pb-9 pr-4 pt-4 lg:mx-0">
              <div aria-hidden="true" className="absolute bottom-20 right-0 top-0 w-px bg-[#7f410e]/48" />
              <div aria-hidden="true" className="absolute right-2 top-0 h-px w-[44%] bg-[#7f410e]/66" />

              <div className="relative aspect-[4/5] overflow-hidden border-y border-day-ink/22 bg-[#d8cdb7]">
                <Image
                  src={milosPhoto}
                  alt="Miloš Novaković"
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 500px, (min-width: 640px) 520px, 94vw"
                  className="object-cover object-[center_22%] saturate-[.9]"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(180deg,transparent_62%,rgba(5,7,19,.28)_100%)]"
                />

                <div className="absolute bottom-4 left-4 border border-text/20 bg-[#050713]/90 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-text/82 backdrop-blur-sm sm:bottom-5 sm:left-5 sm:text-[11px]">
                  Miloš Novaković / Serbia
                </div>
              </div>

              {data.photo.key && (
                <div className="absolute -bottom-2 right-0 w-[31%] min-w-[116px] border border-day-ink/20 bg-[#090e1d] p-1.5 shadow-[0_20px_45px_rgba(8,13,27,.18)] sm:w-[28%]">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <MediaImage
                      image={data.photo}
                      fill
                      sizes="160px"
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="px-1 pb-0.5 pt-2 text-[8px] font-semibold uppercase tracking-[0.1em] text-text/58">
                    Nocturne portrait
                  </div>
                </div>
              )}

              <figcaption className="mt-4 max-w-[62%] border-t border-day-ink/18 pt-3 text-[10px] font-semibold uppercase leading-[1.5] tracking-[0.1em] text-day-ink/62 sm:text-[11px]">
                Designer / Developer / Email marketer
              </figcaption>
            </figure>
          </Reveal>

          <div className="lg:pt-5">
            {data.paragraphs.map((paragraph, index) => (
              <Reveal key={index} delay={0.05 + index * 0.04}>
                <p
                  className={`max-w-[720px] text-day-ink/74 [text-wrap:pretty] ${
                    index === 0
                      ? "text-[clamp(21px,2.45vw,31px)] leading-[1.56] tracking-[-0.02em]"
                      : "mt-7 text-[16px] leading-[1.7] sm:text-[17px]"
                  }`}
                >
                  {renderEmphasis(paragraph)}
                </p>
              </Reveal>
            ))}

            <Reveal delay={0.13}>
              <div className="mt-10 grid border-y border-day-ink/20 sm:grid-cols-[0.36fr_0.64fr]">
                <div className="border-b border-day-ink/18 py-5 sm:border-b-0 sm:border-r sm:pr-6">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-day-ink/58">
                    {data.statusLabel}
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-[14px] font-semibold text-[#7f410e]">
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 rounded-full bg-[#a65d19] shadow-[0_0_0_5px_rgba(166,93,25,.13)]"
                    />
                    {data.statusValue}
                  </div>
                </div>
                <div className="py-5 sm:pl-6">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-day-ink/58">
                    Working principle
                  </div>
                  <p className="mt-3 max-w-[430px] text-[14px] leading-[1.6] text-day-ink/70">
                    Direct collaboration, clear decisions and one accountable owner from the first
                    call through launch.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-9">
                <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#7f410e]">
                  {data.fileHeading}
                </div>
                <dl className="mt-4 grid sm:grid-cols-2">
                  {data.fileRows.map((row) => (
                    <div
                      key={row.k}
                      className="border-t border-day-ink/16 py-4 sm:odd:pr-7 sm:even:border-l sm:even:pl-7"
                    >
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.1em] text-day-ink/56">
                        {row.k}
                      </dt>
                      <dd className="mt-2 text-[14px] font-medium leading-[1.5] text-day-ink/82">
                        {row.v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
