import { BookCallButton, CalTextLink } from "@/components/book-call";
import { Reveal } from "@/components/ui/reveal";
import type { ProcessSection } from "@/lib/cms/types";

const OUTPUTS = [
  "Scope note / priorities / success signal",
  "Page map or automation architecture",
  "Working build shared for focused review",
  "QA checklist / launch / next improvements",
];

export function Process({ data }: { data: ProcessSection }) {
  return (
    <section
      id="process"
      className="editorial-section deco-section scroll-mt-20 overflow-hidden bg-[#080d1b] px-5 py-[92px] text-text sm:px-8 sm:py-[126px] lg:px-12"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute -right-24 top-0 h-[520px] w-[42vw] min-w-[320px] border-l border-blue/30 bg-[#11175e]/54" />
        <span className="absolute right-[13vw] top-0 h-[360px] w-px bg-amber/38" />
        <span className="absolute -left-28 bottom-0 h-64 w-64 rounded-full bg-blue/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1280px]">
        <div className="grid items-end gap-8 border-b border-amber/30 pb-9 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16 lg:pb-12">
          <div>
            <Reveal>
              <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-blue-soft">
                {data.label}
              </p>
            </Reveal>
            <Reveal delay={0.04}>
              <h2 className="mt-5 max-w-[650px] text-[clamp(42px,5.9vw,78px)] font-semibold leading-[0.96] tracking-[-0.036em] text-text [text-wrap:balance]">
                {data.heading}
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <div className="lg:ml-auto lg:max-w-[620px]">
              <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-amber-soft">
                A visible path, not a black box
              </div>
              <p className="mt-4 text-[17px] leading-[1.62] text-text/78 [text-wrap:pretty] sm:text-[19px]">
                You always know what is ready, what needs a decision and what happens next. Each
                stage closes with something concrete you can review.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-10 sm:mt-14">
          <div className="mb-7 flex items-center justify-between gap-5 text-[10px] font-semibold uppercase tracking-[0.1em] text-text/52 sm:text-[11px]">
            <span>First conversation</span>
            <span aria-hidden="true" className="h-px flex-1 bg-text/14" />
            <span>Live and learning</span>
          </div>

          <div className="relative">
            <ol
              aria-label="Project delivery path"
              className="relative grid gap-5 lg:grid-cols-4 lg:gap-4"
            >
              {data.steps.map((step, index) => (
                <li key={step.id} className="relative pl-[58px] lg:pl-0">
                  {index < data.steps.length - 1 && (
                    <span
                      aria-hidden="true"
                      style={{ backgroundColor: step.stroke }}
                      className="absolute bottom-[-20px] left-[19px] top-10 w-px lg:bottom-auto lg:left-10 lg:right-[-16px] lg:top-[20px] lg:h-px lg:w-auto"
                    />
                  )}
                  <Reveal delay={index * 0.045}>
                    <div className="relative lg:pt-[62px]">
                      <div
                        style={{
                          borderColor: step.stroke,
                          color: step.dot,
                          boxShadow: `0 0 0 6px ${step.ring}`,
                        }}
                        className="absolute left-[-58px] top-0 z-10 grid h-10 w-10 place-items-center rounded-full border bg-[#080d1b] text-[11px] font-semibold lg:left-0"
                      >
                        0{index + 1}
                      </div>

                      <article className="min-h-full border border-text/16 bg-[#090e1d]/86 p-5 backdrop-blur-[2px] sm:p-6 lg:min-h-[320px]">
                        <div className="text-[10px] font-semibold uppercase leading-[1.45] tracking-[0.1em] text-blue-soft/76">
                          {step.label}
                        </div>
                        <h3 className="mt-4 text-[clamp(25px,2.6vw,36px)] font-semibold leading-[1.04] tracking-[-0.026em] text-text">
                          {step.title}
                        </h3>
                        <p className="mt-4 text-[14.5px] leading-[1.65] text-text/72 sm:text-[15px]">
                          {step.blurb}
                        </p>
                        {step.ctaLabel && (
                          <CalTextLink className="mt-4 inline-block text-[12px]">
                            {step.ctaLabel}
                          </CalTextLink>
                        )}

                        <div className="mt-7 border-t border-text/16 pt-3 lg:mt-8">
                          <div className="text-[9px] font-semibold uppercase tracking-[0.1em] text-amber/78">
                            You receive
                          </div>
                          <p className="mt-2 text-[11px] font-medium uppercase leading-[1.5] tracking-[0.065em] text-text/64">
                            {OUTPUTS[index] ?? "A clear deliverable and next decision"}
                          </p>
                        </div>
                      </article>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <Reveal delay={0.06}>
          <div className="mt-10 grid gap-6 border-y border-amber/30 bg-[#11175e]/28 px-0 py-7 sm:px-7 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10 lg:px-8">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-amber-soft">
                Start with the next useful decision
              </div>
              <p className="mt-3 max-w-[680px] text-[16px] leading-[1.62] text-text/76 sm:text-[17px]">
                Bring the offer, page or system that is creating friction. A short project call is
                enough to identify the right scope and the first concrete step.
              </p>
            </div>
            <BookCallButton label="Book a project call" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
