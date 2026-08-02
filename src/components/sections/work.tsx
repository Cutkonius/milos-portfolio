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
  const previewBlocks = featured.caseStudy?.blocks?.slice(0, 3) ?? [];
  const tags = featured.caseStudy?.tags?.slice(0, 4) ?? [];
  const direction = featured.caseStudy?.intro;

  const screenshotFrame = featured.screenshot ? (
    <figure className="group relative overflow-hidden border border-day-ink/18 bg-[#050713] p-2 shadow-[0_30px_80px_rgba(5,7,19,.16)] sm:p-3">
      <figcaption className="flex min-h-10 items-center justify-between gap-5 border-b border-text/18 px-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-text/68 sm:px-3 sm:text-[11px]">
        <span className="inline-flex items-center gap-2">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-amber" />
          Working storefront / Preview 01
        </span>
        <span className="hidden text-blue-soft/82 sm:inline">{featured.urlBar}</span>
      </figcaption>
      <div className="relative mt-2 aspect-[16/10] overflow-hidden bg-[#111116] sm:mt-3 sm:aspect-video">
        <MediaImage
          image={featured.screenshot}
          fill
          sizes="(min-width: 1280px) 1280px, 100vw"
          className="object-cover object-top transition-transform duration-[1000ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.012]"
        />
      </div>
      <span className="absolute bottom-5 right-5 border border-amber/60 bg-[#050713]/92 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-amber-soft backdrop-blur-sm sm:bottom-7 sm:right-7 sm:text-[11px]">
        Work in progress
      </span>
    </figure>
  ) : null;

  return (
    <section
      id="work"
      className="editorial-section deco-section deco-section-light scroll-mt-20 overflow-hidden bg-[#f1e6cd] px-5 pb-[92px] pt-[96px] text-day-ink sm:px-8 sm:pb-[128px] sm:pt-[126px] lg:px-12"
    >
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <div className="flex flex-col items-start gap-3 border-b border-day-ink/18 pb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <div className="section-kicker !text-day-ink/68">{data.label}</div>
            <span className="max-w-[520px] text-[11px] font-semibold uppercase tracking-[0.1em] text-day-ink/62 sm:text-right sm:text-[12px]">
              {data.sublabel}
            </span>
          </div>
        </Reveal>

        <div className="grid gap-8 pb-9 pt-9 lg:grid-cols-[0.31fr_1fr] lg:gap-16 lg:pb-12 lg:pt-12">
          <Reveal delay={0.03}>
            <div className="border-t border-amber-deep/38 pt-4">
              <div className="flex items-center justify-between gap-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-day-ink/62 lg:block">
                <span>Case file / {featured.badge ?? "01"}</span>
                <span className="lg:mt-2 lg:block">Commerce / 2026</span>
              </div>
              <div className="mt-6 inline-flex items-center gap-2 border border-amber-deep/32 bg-[#fff8e8]/52 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#7f410e]">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#a65d19]" />
                {featured.statusLink ?? "In production"}
              </div>

              {tags.length > 0 && (
                <ul className="mt-7 flex flex-wrap gap-2" aria-label="Project disciplines">
                  {tags.map((tag) => (
                    <li
                      key={tag}
                      className="border border-day-ink/16 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-day-ink/66"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>

          <div>
            <Reveal delay={0.05}>
              <h2 className="display-heading uppercase text-[clamp(56px,9.5vw,136px)] text-day-ink">
                {featured.title}
              </h2>
            </Reveal>

            {featured.description && (
              <Reveal delay={0.08}>
                <p className="mt-6 max-w-[820px] text-[17px] leading-[1.68] text-day-ink/76 [text-wrap:pretty] sm:text-[19px]">
                  {featured.description}
                </p>
              </Reveal>
            )}

            <Reveal delay={0.1}>
              <dl className="mt-8 grid border-y border-day-ink/18 sm:grid-cols-3">
                {[
                  ["Goal", "Find the right part with confidence"],
                  ["Role", "Strategy / UI/UX / Development"],
                  ["Stage", caseStudyReady ? "Case study available" : "Design and build in progress"],
                ].map(([term, value], index) => (
                  <div
                    key={term}
                    className={`py-4 sm:px-5 sm:first:pl-0 ${
                      index < 2 ? "border-b border-day-ink/14 sm:border-b-0 sm:border-r" : ""
                    }`}
                  >
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.1em] text-day-ink/58">
                      {term}
                    </dt>
                    <dd className="mt-2 text-[13.5px] font-medium leading-[1.45] text-day-ink/82">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        {screenshotFrame && (
          <Reveal delay={0.06}>
            {caseStudyReady ? (
              <Link
                href={projectHref}
                aria-label={`Read the ${featured.title} case study`}
                className="block focus-visible:outline-offset-4"
              >
                {screenshotFrame}
              </Link>
            ) : (
              screenshotFrame
            )}
          </Reveal>
        )}

        {(featured.productShot || direction || previewBlocks.length > 0) && (
          <div className="mt-10 grid gap-9 sm:mt-14 lg:grid-cols-[0.62fr_0.38fr] lg:items-start lg:gap-14">
            {featured.productShot && (
              <Reveal delay={0.04}>
                <figure className="border-y border-day-ink/18 bg-[#e7ddc8] p-2 sm:p-3">
                  <div className="relative aspect-[16/10] overflow-hidden bg-white sm:aspect-[16/9]">
                    <MediaImage
                      image={featured.productShot}
                      fill
                      sizes="(min-width: 1024px) 62vw, 100vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <figcaption className="flex items-center justify-between gap-4 px-1 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-day-ink/60 sm:text-[11px]">
                    <span>Catalog system / Preview 02</span>
                    <span>Desktop build</span>
                  </figcaption>
                </figure>
              </Reveal>
            )}

            <div className={featured.productShot ? "" : "lg:col-span-2"}>
              <Reveal delay={0.06}>
                <div className="border-t border-day-ink/22 pt-4">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#7f410e]">
                    The organizing idea
                  </span>
                  {direction && (
                    <h3 className="mt-4 max-w-[560px] text-[clamp(29px,4.2vw,48px)] font-semibold leading-[1.02] tracking-[-0.03em] text-day-ink [text-wrap:balance]">
                      {direction}
                    </h3>
                  )}
                </div>
              </Reveal>

              {previewBlocks.length > 0 && (
                <ol className="mt-7 border-b border-day-ink/18">
                  {previewBlocks.map((block, index) => (
                    <li
                      key={block.id}
                      className="grid grid-cols-[38px_1fr] gap-4 border-t border-day-ink/18 py-5"
                    >
                      <span className="text-[11px] font-semibold tracking-[0.1em] text-[#7f410e]">
                        0{index + 1}
                      </span>
                      <div>
                        <h4 className="text-[12px] font-semibold uppercase tracking-[0.09em] text-day-ink/82">
                          {block.heading}
                        </h4>
                        <p className="mt-2 max-w-[520px] text-[14px] leading-[1.62] text-day-ink/68">
                          {block.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              )}

              {caseStudyReady && (
                <Reveal delay={0.08}>
                  <Link
                    href={projectHref}
                    className="email-action mt-7 inline-block text-[13px] font-semibold text-[#173fae]"
                  >
                    Read the full case study ↗
                  </Link>
                </Reveal>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
