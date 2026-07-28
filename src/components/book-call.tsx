"use client";

import type { ReactNode } from "react";
import { useSiteConfig } from "@/components/site-config";

function useCalAttrs() {
  const { calLink, calNamespace } = useSiteConfig();
  return {
    "data-cal-namespace": calNamespace,
    "data-cal-link": calLink,
    "data-cal-config": '{"layout":"month_view","theme":"dark"}',
  };
}

/** Primary booking CTA with a compact directional affordance. */
export function BookCallButton({
  size = "lg",
  label = "Book a short call",
}: {
  size?: "sm" | "lg";
  label?: string;
}) {
  const calAttrs = useCalAttrs();
  const sizeClasses =
    size === "lg"
      ? "gap-3 py-2 pl-5 pr-2 text-[14px] sm:text-[14.5px]"
      : "gap-2 py-1.5 pl-4 pr-1.5 text-[12.5px]";

  return (
    <button
      type="button"
      {...calAttrs}
      className={`group relative isolate inline-flex items-center overflow-hidden rounded-full border border-[#8aabff]/40 bg-[#74a0ff] font-semibold tracking-[-0.01em] text-[#09101f] shadow-[0_10px_30px_rgba(45,92,210,0.25),inset_0_1px_0_rgba(255,255,255,0.55)] transition-[transform,box-shadow,background-color] duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#8aafff] hover:shadow-[0_16px_40px_rgba(45,92,210,0.36),inset_0_1px_0_rgba(255,255,255,0.65)] active:translate-y-0 ${sizeClasses}`}
    >
      <span className="relative z-10">{label}</span>
      <span
        aria-hidden="true"
        className={`relative z-10 grid flex-none place-items-center rounded-full bg-[#0c1426] text-white transition-transform duration-300 ease-out group-hover:translate-x-0.5 ${
          size === "lg" ? "h-9 w-9 text-base" : "h-7 w-7 text-[13px]"
        }`}
      >
        ↗
      </span>
    </button>
  );
}

/** Text-styled booking trigger for inline links ("Claim it, book the short call →"). */
export function CalTextLink({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const calAttrs = useCalAttrs();
  return (
    <button
      type="button"
      {...calAttrs}
      className={`group text-left font-semibold text-blue-soft transition-colors hover:text-amber ${className}`}
    >
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
        {children}
      </span>
    </button>
  );
}

/** Secondary glass pill (email). */
export function EmailPill({ size = "lg" }: { size?: "sm" | "lg" }) {
  const { email } = useSiteConfig();
  return (
    <a
      href={`mailto:${email}`}
      className={`group inline-flex items-center gap-2.5 rounded-full border border-white/[0.14] bg-white/[0.055] font-medium text-text shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl transition-[transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.09] ${
        size === "lg" ? "px-5 py-[13px] text-[14px] sm:px-6" : "px-4 py-2 text-[12.5px]"
      }`}
    >
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full bg-amber shadow-[0_0_10px_rgba(245,169,78,0.75)]"
      />
      {email}
    </a>
  );
}
