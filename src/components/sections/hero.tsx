import { getImageProps } from "next/image";
import { BookCallButton } from "@/components/book-call";
import heroDesktop from "@/images/hero-nocturne-desktop-v6.webp";
import heroMobile from "@/images/hero-nocturne-mobile-v6.webp";
import type { Hero as HeroData } from "@/lib/cms/types";

export function Hero({ data, open }: { data: HeroData; open: boolean }) {
  const eyebrow = data.day.label.toLocaleLowerCase().includes("miloš")
    ? data.day.label
    : `Miloš Novaković — ${data.day.label}`;
  const proof = [
    { label: "Approach", value: data.night.body },
    { label: "Coverage", value: data.cornerLeft },
    { label: "Based", value: "Serbia / CET–CEST" },
  ];
  const commonImageProps = {
    alt: "",
    sizes: "100vw",
    quality: 82,
    loading: "eager" as const,
    fetchPriority: "high" as const,
  };
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...commonImageProps,
    src: heroDesktop,
    width: 3840,
    height: 2160,
  });
  const {
    props: { srcSet: mobileSrcSet, ...mobileImageProps },
  } = getImageProps({
    ...commonImageProps,
    src: heroMobile,
    width: 1440,
    height: 2560,
  });

  return (
    <section
      id="top"
      className="relative min-h-[760px] overflow-hidden bg-[#050713] text-text sm:min-h-[820px] lg:h-[100svh] lg:min-h-[780px]"
    >
      <div aria-hidden="true" className="absolute inset-0">
        <picture>
          <source
            media="(min-width: 900px) and (min-aspect-ratio: 6/5)"
            srcSet={desktopSrcSet}
          />
          <img
            {...mobileImageProps}
            srcSet={mobileSrcSet}
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </picture>
        <span className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,19,.95)_0%,rgba(5,7,19,.76)_48%,rgba(5,7,19,.16)_100%)] max-lg:bg-[linear-gradient(180deg,rgba(5,7,19,.82)_0%,rgba(5,7,19,.58)_58%,rgba(5,7,19,.82)_100%)]" />
        <span className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#050713] to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[760px] max-w-[1440px] flex-col px-5 pb-7 pt-[104px] sm:min-h-[820px] sm:px-8 sm:pb-9 sm:pt-[122px] lg:h-[100svh] lg:min-h-[780px] lg:px-12">
        <div className="flex flex-1 items-center py-8 sm:py-10">
          <div className="w-full max-w-[930px]">
            <div className="mb-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-text/72 sm:text-[12px]">
              <span className="inline-flex items-center gap-3 text-amber-soft">
                <span aria-hidden="true" className="h-px w-9 bg-amber" />
                {eyebrow}
              </span>
            </div>

            <h1 className="display-heading max-w-[900px] text-[clamp(50px,7.4vw,108px)] [text-wrap:balance]">
              <span className="block text-text">{data.day.title}</span>
              <span className="mt-[0.1em] block max-w-[840px] text-amber">
                {data.night.title}
              </span>
            </h1>

            <div className="mt-7 grid max-w-[790px] gap-7 border-t border-text/18 pt-6 sm:mt-8 sm:grid-cols-[1fr_auto] sm:items-end sm:gap-10">
              <p className="max-w-[620px] text-[17px] leading-[1.62] text-text/84 [text-wrap:pretty] sm:text-[19px]">
                {data.day.body}
              </p>

              {open && (
                <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.09em] text-amber-soft">
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 rounded-full bg-amber shadow-[0_0_0_5px_rgba(242,179,61,.14)]"
                  />
                  {data.openForProjectsLabel}
                </div>
              )}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <BookCallButton label="Book a project call" />
              <a
                href="#work"
                className="email-action inline-flex min-h-[54px] items-center px-1 text-[15px] font-semibold text-text/82 transition-colors hover:text-text sm:text-[16px]"
              >
                {data.sunHint} <span aria-hidden="true" className="ml-2">↓</span>
              </a>
            </div>
          </div>
        </div>

        <dl className="grid border-y border-text/18 bg-[#050713]/48 backdrop-blur-[3px] sm:grid-cols-3">
          {proof.map((item, index) => (
            <div
              key={item.label}
              className={`grid grid-cols-[82px_1fr] gap-4 py-3.5 sm:block sm:px-5 sm:py-4 sm:first:pl-0 ${
                index < proof.length - 1
                  ? "border-b border-text/14 sm:border-b-0 sm:border-r"
                  : ""
              }`}
            >
              <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-amber-soft">
                {item.label}
              </dt>
              <dd className="text-[12.5px] leading-[1.5] text-text/74 sm:mt-1.5">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
