"use client";

import type { ReactNode } from "react";
import { CAL_LINK, CAL_NAMESPACE } from "@/lib/cal";
import { burst } from "@/lib/confetti";

const calAttrs = {
  "data-cal-namespace": CAL_NAMESPACE,
  "data-cal-link": CAL_LINK,
  "data-cal-config": '{"layout":"month_view","theme":"dark"}',
};

/** Primary booking CTA — the night-blue pill. Opens the Cal.com popup with a confetti pop. */
export function BookCallButton({
  size = "lg",
  label = "Book a short call",
}: {
  size?: "sm" | "lg";
  label?: string;
}) {
  const sizeClasses =
    size === "lg"
      ? "px-[26px] py-[14px] text-[15px] font-semibold shadow-[0_12px_36px_rgba(91,140,255,0.35)] hover:shadow-[0_18px_44px_rgba(91,140,255,0.5)]"
      : "px-[18px] py-[9px] text-[13px] font-semibold hover:shadow-[0_12px_30px_rgba(91,140,255,0.4)]";

  return (
    <button
      type="button"
      {...calAttrs}
      onClick={(e) => burst(e.clientX, e.clientY)}
      className={`inline-flex items-center rounded-full bg-blue text-blue-ink transition-[transform,box-shadow] duration-250 hover:-translate-y-0.5 active:translate-y-0 ${sizeClasses}`}
    >
      {label}
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
  return (
    <button
      type="button"
      {...calAttrs}
      onClick={(e) => burst(e.clientX, e.clientY)}
      className={`text-left font-semibold text-blue-soft transition-colors hover:text-amber ${className}`}
    >
      {children}
    </button>
  );
}

/** Secondary glass pill (email). */
export function EmailPill({ size = "lg" }: { size?: "sm" | "lg" }) {
  return (
    <a
      href="mailto:hi@milosnovakovic.com"
      className={`inline-flex items-center rounded-full border border-white/15 bg-white/[0.07] font-medium text-text backdrop-blur-md transition-[transform,border-color] duration-250 hover:-translate-y-0.5 hover:border-amber/50 ${
        size === "lg" ? "px-[26px] py-[14px] text-[15px]" : "px-[18px] py-[9px] text-[13px]"
      }`}
    >
      hi@milosnovakovic.com
    </a>
  );
}
