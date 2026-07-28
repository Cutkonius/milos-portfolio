"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { MediaImage } from "@/components/cms/media-image";
import type { WorkSection } from "@/lib/cms/types";

export function Work({ data }: { data: WorkSection }) {
  const published = data.projects
    .filter((project) => project.published)
    .sort((a, b) => a.order - b.order);

  const featured =
    published.find((project) => project.kind === "case" && project.featured) ??
    published.find((project) => project.kind === "case");

  if (!featured) return null;

  const caseStudyReady = featured.caseStudy?.enabled === true;
  const projectHref = `/work/${featured.slug || featured.id}`;
  const progressBlocks = caseStudyReady ? [] : (featured.caseStudy?.blocks?.slice(0, 3) ?? []);
  const progressStatement = caseStudyReady ? undefined : featured.caseStudy?.intro;
  const image = caseStudyReady && featured.screenshot ? (
    <div className="group relative h-[300px] overflow-hidden border-y border-text/16 sm:h-[570px] lg:h-[690px]">
      <MediaImage
        image={featured.screenshot}
        fill
        sizes="(min-width: 1280px) 1280px, 100vw"
        className="object-cover object-top transition-transform duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.018]"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-0 right-0 border-l border-t border-text/20 bg-[#0b1018] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-text/72 sm:px-6"
      >
        Storefront system / 01
      </span>
    </div>
  ) : null;

  return (
    <section
      id="work"
      className="editorial-section scroll-mt-20 overflow-hidden bg-[#0b1018] px-5 pb-[110px] pt-[120px] sm:px-8 sm:pb-[150px] sm:pt-[155px] lg:px-12"
    >
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <div className="flex flex-col items-start gap-3 border-b border-text/16 pb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <div className="section-kicker text-amber-soft">{data.label}</div>
            <span className="max-w-[480px] text-[11px] font-semibold uppercase tracking-[0.12em] text-text/68 sm:text-right">
              {data.sublabel}
            </span>
          </div>
        </Reveal>

        <div className="grid gap-8 pb-10 pt-10 lg:grid-cols-[0.34fr_1fr] lg:gap-14 lg:pb-14 lg:pt-14">
          <Reveal delay={0.03}>
            <div className="flex items-baseline justify-between border-t border-text/16 pt-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-text/64 lg:block">
              <span>Selected work</span>
              <span className="lg:mt-2 lg:block">2026 / 01</span>
            </div>
          </Reveal>

          <div>
            <Reveal delay={0.05}>
              <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
                <h2 className="display-heading text-[clamp(62px,10vw,148px)] text-text">
                  {featured.title}
                </h2>
                <span className="pb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-soft">
                  {featured.statusLink ?? "In production / 2026"}
                </span>
              </div>
            </Reveal>

            {featured.description && (
              <Reveal delay={0.09}>
                <p className="mt-7 max-w-[760px] text-[16px] leading-[1.7] text-text/74 [text-wrap:pretty] sm:text-[18px]">
                  {featured.description}
                </p>
              </Reveal>
            )}

            <Reveal delay={0.12}>
              <dl className="mt-10 grid border-y border-text/16 sm:grid-cols-4">
                {[
                  ["Year", "2026"],
                  ["Project", "Online auto-parts store"],
                  ["My role", "Strategy / UI/UX / Development"],
                  ["Status", "In production"],
                ].map(([term, value]) => (
                  <div
                    key={term}
                    className="grid grid-cols-[110px_1fr] border-b border-text/12 py-3.5 last:border-b-0 sm:block sm:border-b-0 sm:border-r sm:px-4 sm:first:pl-0 sm:last:border-r-0"
                  >
                    <dt className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-text/62">
                      {term}
                    </dt>
                    <dd className="mt-0 text-[14px] font-medium text-text/86 sm:mt-2">{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        {!caseStudyReady && (progressStatement || progressBlocks.length > 0) && (
          <div>
            {progressStatement && (
              <Reveal delay={0.05}>
                <div className="grid gap-6 border-y border-text/16 py-8 sm:py-10 lg:grid-cols-[0.34fr_1fr] lg:gap-14 lg:py-12">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-soft">
                    Project direction
                  </span>
                  <h3 className="max-w-[820px] text-[clamp(32px,5vw,66px)] font-semibold leading-[0.98] tracking-[-0.05em] text-text [text-wrap:balance]">
                    {progressStatement}
                  </h3>
                </div>
              </Reveal>
            )}

            {progressBlocks.length > 0 && (
              <div className="grid border-b border-text/16 md:grid-cols-3">
                {progressBlocks.map((block, index) => (
                  <Reveal
                    key={block.id}
                    delay={0.04 + index * 0.04}
                    className={`h-full border-text/16 ${
                      index < progressBlocks.length - 1
                        ? "border-b md:border-b-0 md:border-r"
                        : ""
                    }`}
                  >
                    <article
                      className={`h-full py-7 md:py-9 ${
                        index === 0
                          ? "md:pr-7"
                          : index === progressBlocks.length - 1
                            ? "md:pl-7"
                            : "md:px-7"
                      }`}
                    >
                      <span className="text-[11px] font-semibold tracking-[0.12em] text-blue-soft/72">
                        0{index + 1}
                      </span>
                      <h4 className="mt-8 text-[13px] font-semibold uppercase tracking-[0.1em] text-text/82">
                        {block.heading}
                      </h4>
                      <p className="mt-4 max-w-[360px] text-[15.5px] leading-[1.68] text-text/72 [text-wrap:pretty] sm:text-[16px]">
                        {block.body}
                      </p>
                    </article>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        )}

        {image && (
          <Reveal delay={0.08}>
            {caseStudyReady ? (
              <Link href={projectHref} aria-label={`Read the ${featured.title} case study`}>
                {image}
              </Link>
            ) : (
              image
            )}
          </Reveal>
        )}

        {caseStudyReady && featured.productShot && (
          <div className="mt-10 grid items-end gap-8 sm:mt-16 lg:grid-cols-[0.32fr_0.68fr] lg:gap-14">
            <Reveal delay={0.04}>
              <div className="border-t border-text/16 pt-4">
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-soft">
                  The organizing idea
                </span>
                <p className="mt-4 max-w-[320px] text-[15px] leading-[1.65] text-text/70">
                  Buyers usually know the vehicle before they know the part number. The catalog
                  starts there, reducing guesswork before product, price and checkout enter the
                  conversation.
                </p>
                {featured.caseStudy?.enabled && (
                  <Link
                    href={projectHref}
                    className="email-action mt-6 inline-block text-[13px] font-semibold text-blue-soft"
                  >
                    Read the case study ↗
                  </Link>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="group relative h-[320px] overflow-hidden border-y border-text/16 sm:h-[510px]">
                <MediaImage
                  image={featured.productShot}
                  fill
                  sizes="(min-width: 1024px) 65vw, 100vw"
                  className="object-cover object-top transition-transform duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.02]"
                />
              </div>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
