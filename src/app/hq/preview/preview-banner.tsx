"use client";

/* eslint-disable @next/next/no-html-link-for-pages -- full-page nav on the admin host */

export function PreviewBanner() {
  return (
    <div className="fixed bottom-4 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-3 whitespace-nowrap rounded-full border border-amber/30 bg-[rgba(16,20,32,0.92)] px-4 py-2 text-[13px] text-text shadow-[0_16px_40px_rgba(0,0,0,0.5)] backdrop-blur-lg">
      <span className="flex items-center gap-1.5">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-amber" />
        Preview · draft, not published
      </span>
      <a href="/" className="font-semibold text-amber transition-colors hover:text-amber-soft">
        Back to HQ
      </a>
    </div>
  );
}
