"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { CalTextLink } from "@/components/book-call";
import screenShot from "@/images/vujicauto-screen.png";
import productShot from "@/images/vujicauto-product.png";

export function Work() {
  return (
    <section
      id="work"
      className="relative scroll-mt-16 bg-[linear-gradient(180deg,#0d1017_0%,#10141f_100%)] px-6 pb-[120px] pt-[130px] md:px-12"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(760px_420px_at_82%_0%,rgba(91,140,255,0.09),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-[1120px]">
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div className="time-label text-amber-soft">
              20:41 · Fresh off the day shift · Selected work, 2026
            </div>
            <div className="text-[13px] text-text/50">
              WooCommerce · AI-assisted build · launching soon
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-3.5 flex flex-wrap items-baseline gap-[18px]">
            <h2 className="text-[44px] font-semibold tracking-[-0.025em] text-text sm:text-6xl">
              vujicauto
            </h2>
            <span className="text-sm font-medium text-blue-soft">in the paint shop →</span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-3.5 max-w-[620px] text-base leading-[1.6] text-text/65 [text-wrap:pretty]">
            A parts counter for a seller who knows his torque specs. Search by
            vehicle, a catalog that behaves, a checkout that doesn&apos;t stall
            on a hill. Rolling out of the shop soon. Case study to follow.
          </p>
        </Reveal>

        {/* Browser frame */}
        <Reveal delay={0.12}>
          <div className="mt-9 overflow-hidden rounded-[22px] border border-white/[0.11] bg-white/[0.04] shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            <div className="flex items-center gap-2 border-b border-white/[0.09] px-[18px] py-3">
              <span aria-hidden="true" className="h-[9px] w-[9px] rounded-full bg-white/[0.22]" />
              <span aria-hidden="true" className="h-[9px] w-[9px] rounded-full bg-white/[0.22]" />
              <span className="flex-1 text-center text-[11.5px] font-medium tracking-[0.06em] text-text/55">
                vujicauto.rs
              </span>
              <span className="text-[11px] font-semibold text-blue-soft">01</span>
            </div>
            <div className="relative h-[320px] sm:h-[540px]">
              <Image
                src={screenShot}
                alt="Vujić Auto storefront — hero with 'Tačan deo. Prava cena. Kod vas za 48h.'"
                fill
                placeholder="blur"
                sizes="(min-width: 1120px) 1120px, 100vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </Reveal>

        <div className="mt-5 flex flex-wrap gap-5">
          <Reveal delay={0.05} className="min-w-[min(280px,100%)] flex-[1.1] sm:min-w-[min(320px,100%)]">
            <div className="h-full overflow-hidden rounded-[18px] border border-white/[0.11] bg-white/[0.04]">
              <div className="relative h-[280px]">
                <Image
                  src={productShot}
                  alt="Vujić Auto product catalog with categories and prices"
                  fill
                  placeholder="blur"
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="min-w-[min(280px,100%)] flex-1">
            <div className="flex h-full flex-col justify-center gap-2 rounded-[18px] border border-white/[0.11] bg-white/[0.035] p-7">
              <div className="time-label text-text/45">02 · Top secret</div>
              <div className="text-[22px] font-semibold text-text/85">[REDACTED]</div>
              <div aria-hidden="true" className="mt-1 flex flex-col gap-[7px]">
                <div className="h-[11px] w-[82%] rounded-md bg-text/[0.22] blur-[4px]" />
                <div className="h-[11px] w-[64%] rounded-md bg-text/[0.18] blur-[4px]" />
                <div className="h-[11px] w-[73%] rounded-md bg-text/[0.14] blur-[4px]" />
              </div>
              <p className="mt-1.5 text-sm leading-[1.55] text-text/55 [text-wrap:pretty]">
                An NDA is an NDA. You will never learn about this one. (It went
                great.)
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="min-w-[min(280px,100%)] flex-1">
            <div className="flex h-full flex-col justify-center gap-2 rounded-[18px] border border-dashed border-text/[0.22] p-7">
              <div className="time-label text-text/45">03 · Reserved for you</div>
              <div className="text-[22px] font-semibold text-text/85">This slot is yours.</div>
              <p className="text-sm leading-[1.55] text-text/55 [text-wrap:pretty]">
                The night shift has capacity for exactly one more website.
                Ideally yours.
              </p>
              <CalTextLink className="mt-2 text-sm">
                Claim it, book the short call →
              </CalTextLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
