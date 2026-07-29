"use client";

import { getImageProps } from "next/image";
import { BookCallButton, EmailPill } from "@/components/book-call";
import { Reveal } from "@/components/ui/reveal";
import contactDesktop from "@/images/contact-nocturne-desktop-v5.webp";
import contactMobile from "@/images/contact-nocturne-mobile-v5.webp";
import type { ContactSection, Receipt } from "@/lib/cms/types";

function WaysToWork({ receipts, note }: { receipts: Receipt[]; note: string }) {
  return (
    <div className="mt-14 w-full max-w-[760px] sm:mt-16">
      <div className="flex flex-col items-start gap-3 border-b border-amber/34 pb-4 sm:flex-row sm:items-end sm:justify-between sm:gap-5">
        <span className="time-label text-text/76">Two ways to work together</span>
        <span className="max-w-[300px] text-[12px] leading-[1.5] text-text/72 sm:text-right">
          {note}
        </span>
      </div>

      <div className="border-b border-text/18">
        {receipts.map((receipt, index) => (
          <Reveal key={receipt.id} delay={index * 0.05}>
            <div className="group grid grid-cols-[48px_1fr] gap-x-4 border-t border-text/16 py-6 first:border-t-0 sm:grid-cols-[58px_1fr_0.75fr] sm:items-center sm:gap-x-6">
              <span className="text-[13px] font-semibold tracking-[0.09em] text-amber transition-transform duration-500 group-hover:translate-x-1">
                0{index + 1}
              </span>
              <span className="text-[16px] font-medium leading-snug text-text/92">
                {receipt.title}
              </span>
              <span className="col-start-2 mt-2 text-[13px] leading-[1.5] text-blue-soft/82 sm:col-auto sm:mt-0 sm:text-right">
                {receipt.meta}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function Contact({ data }: { data: ContactSection }) {
  const commonImageProps = {
    alt: "",
    sizes: "100vw",
    quality: 82,
  };
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...commonImageProps,
    src: contactDesktop,
    width: 3840,
    height: 2160,
  });
  const {
    props: { srcSet: mobileSrcSet, ...mobileImageProps },
  } = getImageProps({
    ...commonImageProps,
    src: contactMobile,
    width: 1440,
    height: 2560,
  });

  const copyright = data.footerCopyright.replace(
    "Sold after dark.",
    "Useful after launch."
  );

  return (
    <section
      id="contact"
      className="editorial-section deco-section relative min-h-[940px] overflow-hidden bg-[#050713] px-5 pb-0 pt-[115px] sm:min-h-[980px] sm:px-8 sm:pt-[155px] lg:px-12"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <picture>
          <source media="(min-width: 640px)" srcSet={desktopSrcSet} />
          <img
            {...mobileImageProps}
            srcSet={mobileSrcSet}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center opacity-80"
          />
        </picture>
        <span className="absolute inset-0 bg-[#050713]/48 sm:bg-[#050713]/30" />
      </div>

      <div className="relative mx-auto flex min-h-[825px] max-w-[1280px] flex-col sm:min-h-[825px]">
        <div className="max-w-[720px]">
          <Reveal>
            <div className="section-kicker text-blue-soft">{data.label}</div>
          </Reveal>

          <Reveal delay={0.04}>
            <h2 className="mt-7 max-w-[700px] text-[clamp(50px,7.2vw,100px)] font-semibold leading-[0.94] tracking-[-0.038em] text-text [text-wrap:balance]">
              {data.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-7 max-w-[610px] text-[16px] leading-[1.68] text-text/82 [text-wrap:pretty] sm:text-[17px]">
              {data.pitch}
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-2">
              <BookCallButton label={data.ctaLabel} />
              <EmailPill label="Email me" />
            </div>
          </Reveal>

          <WaysToWork receipts={data.receipts} note={data.receiptsNote} />
        </div>

        <div className="mt-auto border-t border-text/18 pb-[34px] pt-[24px] text-[12.5px] text-text/72">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span>{copyright}</span>
            <span className="flex gap-6">
              <a
                href={`mailto:${data.footerEmail}`}
                className="email-action text-text/74 transition-colors hover:text-text"
              >
                {data.footerEmail}
              </a>
              <a
                href="/vault"
                className="email-action text-text/74 transition-colors hover:text-text"
              >
                Client login
              </a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
