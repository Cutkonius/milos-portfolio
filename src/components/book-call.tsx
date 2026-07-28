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

/** Primary booking CTA: a soft-corner editorial control with an ink-wipe hover. */
export function BookCallButton({
  size = "lg",
  label = "Book a 15-minute call",
}: {
  size?: "sm" | "lg";
  label?: string;
}) {
  const calAttrs = useCalAttrs();
  const sizeClasses =
    size === "lg"
      ? "min-h-12 gap-5 px-5 py-3 text-[13.5px] sm:px-6 sm:text-[14px]"
      : "min-h-11 gap-3.5 px-4 py-2.5 text-[12px]";

  return (
    <button
      type="button"
      {...calAttrs}
      className={`ink-action group inline-flex items-center justify-between font-semibold tracking-[-0.015em] ${sizeClasses}`}
    >
      <span className="relative z-10">{label}</span>
      <span
        aria-hidden="true"
        className={`relative z-10 grid flex-none place-items-center rounded-full border border-current/15 bg-current/[0.06] transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-[2px] group-hover:-translate-y-[2px] ${
          size === "lg" ? "h-7 w-7 text-[14px]" : "h-6 w-6 text-[12px]"
        }`}
      >
        ↗
      </span>
    </button>
  );
}

/** Text-styled booking trigger for inline links. */
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
      className={`group text-left font-semibold text-blue-soft transition-colors duration-300 hover:text-amber focus-visible:text-amber ${className}`}
    >
      <span className="email-action">{children}</span>
    </button>
  );
}

/** Secondary text action. Kept under the legacy export name for CMS consumers. */
export function EmailPill({
  size = "lg",
  label,
}: {
  size?: "sm" | "lg";
  label?: string;
}) {
  const { email } = useSiteConfig();
  return (
    <a
      href={`mailto:${email}`}
      className={`email-action inline-flex items-center font-medium text-text/76 transition-colors duration-300 hover:text-text focus-visible:text-text ${
        size === "lg" ? "px-1 py-[12px] text-[13.5px]" : "px-1 py-2 text-[12px]"
      }`}
    >
      {label ?? email}
    </a>
  );
}
