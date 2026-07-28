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

  const projectHref = `/work/${featured.slug || featured.id}`;
  const image = featured.screenshot ? (
    <div className="group relative h-[300px] overflow-hidden border-y border-text/16 sm:h-[570px] lg:h-[690px]">
      <MediaImage
        image={featured.screenshot}
        fill
        sizes="(min-width: 1280px) 1280px, 100vw"
        className="object-cover object-top transition-transform duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.018]"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-0 right-0 border-l border-t border-text/20 bg-[#0b1018] px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-text/62 sm:px-6"
      >
        Open proof / 01
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
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-text/16 pb-5">
            <div className="section-kicker text-amber-soft">{data.label}</div>
            <span className="max-w-[420px] text-right text-[9.5px] font-semibold uppercase tracking-[0.16em] text-text/54">
              {data.sublabel}
            </span>
          </div>
        </Reveal>

        <div className="grid gap-8 pb-10 pt-10 lg:grid-cols-[0.34fr_1fr] lg:gap-14 lg:pb-14 lg:pt-14">
          <Reveal delay={0.03}>
            <div className="flex items-baseline justify-between border-t border-text/16 pt-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-text/50 lg:block">
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
                <span className="pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-soft">
                  Launching 2026
                </span>
              </div>
            </Reveal>

            {featured.description && (
              <Reveal delay={0.09}>
                <p className="mt-7 max-w-[690px] text-[15px] leading-[1.75] text-text/64 [text-wrap:pretty] sm:text-[17px]">
                  {featured.description}
                </p>
              </Reveal>
            )}

            <Reveal delay={0.12}>
              <dl className="mt-10 grid border-y border-text/16 sm:grid-cols-4">
                {[
                  ["Year", "2026"],
                  ["Discipline", "Commerce"],
                  ["Scope", "Design / Build / SEO"],
                  ["Status", "Launching"],
                ].map(([term, value]) => (
                  <div
                    key={term}
                    className="grid grid-cols-[110px_1fr] border-b border-text/12 py-3.5 last:border-b-0 sm:block sm:border-b-0 sm:border-r sm:px-4 sm:first:pl-0 sm:last:border-r-0"
                  >
                    <dt className="text-[8.5px] font-semibold uppercase tracking-[0.16em] text-text/42">
                      {term}
                    </dt>
                    <dd className="mt-0 text-[12px] font-medium text-text/78 sm:mt-2">{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        {image && (
          <Reveal delay={0.08}>
            {featured.caseStudy?.enabled ? (
              <Link href={projectHref} aria-label={`Read the ${featured.title} case study`}>
                {image}
              </Link>
            ) : (
              image
            )}
          </Reveal>
        )}

        {featured.productShot && (
          <div className="mt-10 grid items-end gap-8 sm:mt-16 lg:grid-cols-[0.32fr_0.68fr] lg:gap-14">
            <Reveal delay={0.04}>
              <div className="border-t border-text/16 pt-4">
                <span className="text-[9px] font-semibold uppercase tracking-[0.17em] text-amber-soft">
                  System, not a skin
                </span>
                <p className="mt-4 max-w-[290px] text-[13.5px] leading-[1.65] text-text/56">
                  Vehicle-first search, a catalog built for real inventory and checkout with no
                  unnecessary turns.
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
