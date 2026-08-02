import { Reveal } from "@/components/ui/reveal";
import type { ServicesSection } from "@/lib/cms/types";

const DELIVERABLES = [
  ["Structure and content", "UX/UI design", "Development and launch"],
  ["Email platform setup", "Core automations", "Lifecycle sequences"],
];

function WebsiteSystemDiagram() {
  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border border-text/18 bg-[#050713] p-3 text-text shadow-[0_24px_60px_rgba(5,7,19,.18)] sm:p-4"
    >
      <div className="flex h-8 items-center justify-between border-b border-text/16 px-1 text-[9px] font-semibold uppercase tracking-[0.11em] text-text/52">
        <span className="flex gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-amber" />
          <span className="h-1.5 w-1.5 rounded-full bg-blue-soft/50" />
          <span className="h-1.5 w-1.5 rounded-full bg-text/30" />
        </span>
        <span>Responsive page system</span>
      </div>

      <div className="mt-3 grid grid-cols-[0.28fr_0.72fr] gap-3">
        <div className="border border-blue-soft/20 p-2">
          <div className="h-2 w-8 bg-amber/88" />
          <div className="mt-4 space-y-2">
            {["w-4/5", "w-3/5", "w-full", "w-2/3"].map((width, index) => (
              <div key={index} className={`h-1.5 ${width} bg-text/18`} />
            ))}
          </div>
          <div className="mt-8 h-12 border border-blue/46 bg-blue/18" />
        </div>

        <div className="space-y-3">
          <div className="grid min-h-[112px] grid-cols-[0.62fr_0.38fr] border border-blue-soft/20">
            <div className="flex flex-col justify-between p-3">
              <div className="h-2 w-16 bg-text/72" />
              <div>
                <div className="h-1.5 w-4/5 bg-text/22" />
                <div className="mt-2 h-1.5 w-3/5 bg-text/22" />
              </div>
              <div className="h-5 w-20 bg-amber" />
            </div>
            <div className="border-l border-blue-soft/20 bg-[#173fae] p-2">
              <div className="h-full border border-text/18 bg-[linear-gradient(145deg,rgba(241,230,205,.18),transparent)]" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {["Message", "Path", "Action"].map((label) => (
              <div key={label} className="border border-text/14 px-2 py-2.5">
                <div className="h-7 bg-text/10" />
                <div className="mt-2 text-[8px] font-semibold uppercase tracking-[0.1em] text-text/52">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function EmailSystemDiagram() {
  const nodes = [
    { n: "01", label: "Welcome", meta: "New subscriber" },
    { n: "02", label: "Nurture", meta: "Build intent" },
    { n: "03", label: "Recovery", meta: "Return to cart" },
    { n: "04", label: "Sales", meta: "Make the offer" },
  ];

  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border border-text/20 bg-[#070b25] p-4 text-text shadow-[0_24px_60px_rgba(2,4,12,.24)] sm:p-5"
    >
      <div className="flex items-center justify-between border-b border-text/16 pb-3 text-[9px] font-semibold uppercase tracking-[0.11em] text-text/54">
        <span>Audience signal</span>
        <span>Automated response</span>
      </div>

      <div className="relative mt-7">
        <span className="absolute left-[8%] right-[8%] top-[19px] h-px bg-amber/52" />
        <div className="relative grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-4">
          {nodes.map((node, index) => (
            <div key={node.n} className="relative">
              <div className="relative z-10 grid h-10 w-10 place-items-center rounded-full border border-amber/72 bg-[#070b25] text-[10px] font-semibold text-amber-soft shadow-[0_0_0_5px_rgba(23,63,174,.28)]">
                {node.n}
              </div>
              <div className="mt-4 border-l border-blue-soft/28 pl-3">
                <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text/92">
                  {node.label}
                </div>
                <div className="mt-1 text-[9px] leading-[1.45] text-blue-soft/68">
                  {node.meta}
                </div>
              </div>
              {index < nodes.length - 1 && (
                <span className="absolute left-12 top-3.5 hidden text-[12px] text-amber/72 sm:block">→</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-7 grid grid-cols-[1fr_auto] items-center gap-4 border-t border-text/16 pt-3">
        <div className="h-1.5 overflow-hidden bg-text/10">
          <div className="h-full w-[78%] bg-[linear-gradient(90deg,#173fae,#f2b33d)]" />
        </div>
        <span className="text-[9px] font-semibold uppercase tracking-[0.1em] text-text/56">
          Measure / improve
        </span>
      </div>
    </div>
  );
}

export function Services({ data }: { data: ServicesSection }) {
  return (
    <section
      id="services"
      className="editorial-section deco-section scroll-mt-20 overflow-hidden bg-[#090e1d] px-5 py-[92px] text-text sm:px-8 sm:py-[126px] lg:px-12"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid items-end gap-8 border-b border-text/18 pb-9 lg:grid-cols-[1.16fr_.84fr] lg:gap-16 lg:pb-12">
          <div>
            <Reveal>
              <div className="section-kicker text-amber-soft">{data.label}</div>
            </Reveal>
            <Reveal delay={0.04}>
              <h2 className="mt-6 max-w-[860px] text-[clamp(43px,6.4vw,88px)] font-semibold leading-[0.95] tracking-[-0.038em] text-text [text-wrap:balance]">
                {data.heading}
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <div className="lg:ml-auto lg:max-w-[430px]">
              <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-blue-soft">
                Two systems / one customer journey
              </div>
              <p className="mt-4 text-[15px] leading-[1.68] text-text/74 [text-wrap:pretty] sm:text-[16px]">
                The website makes the offer clear. Email carries the conversation forward. Each
                service works alone; together they remove the gap between first visit and follow-up.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-8 space-y-6 sm:mt-10 sm:space-y-8">
          {data.rows.map((service, index) => {
            const isEmail = service.favorite;
            const deliverables = DELIVERABLES[index] ?? ["Strategy", "Craft", "Delivery"];

            return (
              <Reveal key={service.id} delay={index * 0.05}>
                <article
                  style={{ borderTopColor: service.stroke }}
                  className={`relative overflow-hidden border ${
                    isEmail
                      ? "border-blue-soft/24 bg-[#11175e] text-text"
                      : "border-day-ink/18 bg-[#f1e6cd] text-day-ink"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    style={{ backgroundColor: service.stroke }}
                    className="absolute left-0 top-0 h-[2px] w-[38%]"
                  />
                  <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-center lg:gap-14 lg:p-10">
                    <div className={isEmail ? "lg:order-2" : ""}>
                      <div className="flex items-center justify-between gap-5">
                        <span
                          className={`text-[11px] font-semibold uppercase tracking-[0.1em] ${
                            isEmail ? "text-amber-soft" : "text-[#7f410e]"
                          }`}
                        >
                          Service / {service.n}
                        </span>
                        <span
                          aria-hidden="true"
                          className={`h-px flex-1 ${isEmail ? "bg-text/18" : "bg-day-ink/18"}`}
                        />
                      </div>

                      <div
                        className={`mt-5 text-[11px] font-semibold uppercase tracking-[0.09em] ${
                          isEmail ? "text-blue-soft" : "text-day-ink/62"
                        }`}
                      >
                        {service.shift}
                      </div>
                      <h3 className="mt-3 max-w-[560px] text-[clamp(31px,4.5vw,58px)] font-semibold leading-[1] tracking-[-0.034em] [text-wrap:balance]">
                        {service.title}
                      </h3>
                      <p
                        className={`mt-5 max-w-[520px] text-[15px] leading-[1.66] sm:text-[16px] ${
                          isEmail ? "text-text/78" : "text-day-ink/72"
                        }`}
                      >
                        {service.blurb}
                      </p>

                      <ul
                        className={`mt-7 grid gap-2 border-t pt-4 text-[10px] font-semibold uppercase tracking-[0.085em] sm:grid-cols-3 ${
                          isEmail
                            ? "border-text/18 text-text/66"
                            : "border-day-ink/18 text-day-ink/64"
                        }`}
                        aria-label={`${service.title} deliverables`}
                      >
                        {deliverables.map((item, itemIndex) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className={isEmail ? "text-amber" : "text-[#7f410e]"}>
                              0{itemIndex + 1}
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={isEmail ? "lg:order-1" : ""}>
                      {isEmail ? <EmailSystemDiagram /> : <WebsiteSystemDiagram />}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.06}>
          <div className="mt-8 flex flex-col gap-4 border-y border-amber/28 py-5 text-[12px] font-semibold uppercase tracking-[0.09em] text-text/68 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
            <span>Every engagement ends with a working, tested system.</span>
            <span className="text-amber-soft">Plan → Build → Launch → Improve</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
