"use client";

import { Reveal } from "@/components/ui/reveal";

const ROWS = [
  {
    n: "01",
    stroke: "rgba(238,241,247,0.28)",
    title: "Websites, built with AI",
    fav: false,
    blurb:
      "Design to deployment in weeks. AI types fast; I make it tasteful, accessible and unmistakably yours.",
    shift: "The day shift",
  },
  {
    n: "02",
    stroke: "rgba(245,169,78,0.5)",
    title: "Email people actually open",
    fav: true,
    blurb:
      "Flows and campaigns with subject lines like tiny poems, except these ones pay rent.",
    shift: "The night shift",
  },
  {
    n: "03",
    stroke: "rgba(238,241,247,0.28)",
    title: "The rest of the megaphone",
    fav: false,
    blurb:
      "SEO, the occasional ad, motion where it earns its place. Enough to get found without shouting.",
    shift: "Also the night shift",
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="relative scroll-mt-16 bg-[linear-gradient(180deg,#10141f_0%,#0e1119_100%)] px-6 py-[120px] md:px-12"
    >
      <div className="relative mx-auto max-w-[1120px]">
        <Reveal>
          <div className="time-label text-amber-soft">22:06 · What I do between sunsets</div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-3.5 max-w-[640px] text-[40px] font-semibold tracking-[-0.025em] text-text [text-wrap:balance] sm:text-[52px]">
            Three trades, one pair of hands.
          </h2>
        </Reveal>

        <div className="mt-10">
          {ROWS.map((r, i) => (
            <Reveal key={r.n} delay={i * 0.06}>
              <div
                className={`flex flex-wrap items-baseline gap-x-7 gap-y-3 border-t border-text/[0.12] py-[34px] transition-[padding-left] duration-350 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:pl-4 ${
                  i === ROWS.length - 1 ? "border-b" : ""
                }`}
              >
                <span
                  aria-hidden="true"
                  className="flex-none text-[48px] font-semibold leading-none tracking-[-0.03em] text-transparent sm:text-[64px]"
                  style={{ WebkitTextStroke: `1px ${r.stroke}` }}
                >
                  {r.n}
                </span>
                <div className="min-w-[240px] flex-1">
                  <h3 className="text-[22px] font-semibold tracking-[-0.015em] text-text sm:text-[26px]">
                    {r.title}
                    {r.fav && (
                      <em className="ml-2 align-middle text-xs font-semibold not-italic tracking-[0.14em] text-amber">
                        THE FAVORITE
                      </em>
                    )}
                  </h3>
                  <p className="mt-2 max-w-[520px] text-[14.5px] leading-[1.6] text-text/60 [text-wrap:pretty]">
                    {r.blurb}
                  </p>
                </div>
                <span className="time-label flex-none !text-[11px] !tracking-[0.18em] text-text/40">
                  {r.shift}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
