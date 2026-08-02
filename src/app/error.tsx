"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Public route error", error);
  }, [error]);

  return (
    <main className="relative grid min-h-[100dvh] place-items-center overflow-hidden bg-night px-5 py-20 text-text">
      <div aria-hidden="true" className="absolute inset-y-0 right-0 w-[36vw] border-l border-blue/25 bg-night-3/45" />
      <section className="relative w-full max-w-[760px] border-y border-blue-soft/25 py-12 sm:py-16">
        <p className="section-kicker text-amber">System note / Temporary detour</p>
        <h1 className="display-heading mt-7 max-w-[700px] uppercase text-[clamp(58px,11vw,132px)]">
          Something slipped off course.
        </h1>
        <p className="mt-7 max-w-[540px] text-base leading-7 text-text/72 sm:text-lg">
          The page could not finish loading. Try the route once more; your place on the site is
          safe.
        </p>
        <button
          type="button"
          onClick={reset}
          className="ink-action mt-9 inline-flex min-h-12 items-center justify-center px-6 text-sm font-semibold"
        >
          Try again
        </button>
      </section>
    </main>
  );
}
