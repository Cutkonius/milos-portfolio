import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative grid min-h-[100dvh] place-items-center overflow-hidden bg-night px-5 py-20 text-text">
      <div aria-hidden="true" className="absolute inset-y-0 right-0 w-[36vw] border-l border-blue/25 bg-night-3/45" />
      <div aria-hidden="true" className="absolute right-[12vw] top-0 h-[72vh] w-px bg-amber/45" />

      <section className="relative w-full max-w-[760px] border-y border-blue-soft/25 py-12 sm:py-16">
        <p className="section-kicker text-amber">404 / Wrong turn</p>
        <h1 className="display-heading mt-7 max-w-[700px] uppercase text-[clamp(64px,13vw,150px)]">
          This page left the map.
        </h1>
        <p className="mt-7 max-w-[540px] text-base leading-7 text-text/72 sm:text-lg">
          The address may have changed, or the page is still being built. The portfolio is one
          clear route back.
        </p>
        <Link
          href="/"
          className="ink-action mt-9 inline-flex min-h-12 items-center justify-center px-6 text-sm font-semibold"
        >
          Return to the portfolio
        </Link>
      </section>
    </main>
  );
}
