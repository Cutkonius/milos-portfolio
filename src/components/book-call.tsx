"use client";

import type { MouseEvent, ReactNode } from "react";
import { requestCalOpen, requestCalPrepare } from "@/components/cal-provider";
import { useSiteConfig } from "@/components/site-config";

function useCalAttrs() {
  const { calLink } = useSiteConfig();
  const trimmed = calLink.trim();
  const href = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://cal.com/${trimmed.replace(/^\/+/, "")}`;

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    if (requestCalOpen(event.currentTarget, calLink, href)) event.preventDefault();
  };

  return {
    href,
    onClick,
    onFocus: requestCalPrepare,
    onPointerEnter: requestCalPrepare,
    "aria-haspopup": "dialog" as const,
  };
}

/** Primary booking CTA: a clear, soft-corner action. */
export function BookCallButton({
  size = "lg",
  label = "Book a call",
}: {
  size?: "sm" | "lg";
  label?: string;
}) {
  const calAttrs = useCalAttrs();
  const sizeClasses =
    size === "lg"
      ? "min-h-[54px] gap-5 px-6 py-3 text-[15px] sm:text-[16px]"
      : "min-h-11 gap-3 px-4 py-2.5 text-[14px]";

  return (
    <a
      {...calAttrs}
      className={`ink-action group inline-flex items-center justify-between font-semibold tracking-[-0.015em] ${sizeClasses}`}
    >
      <span className="relative z-10">{label}</span>
      <span
        aria-hidden="true"
        className={`relative z-10 grid flex-none place-items-center transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-[3px] ${
          size === "lg" ? "h-6 w-6 text-[20px]" : "h-5 w-5 text-[16px]"
        }`}
      >
        →
      </span>
    </a>
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
    <a
      {...calAttrs}
      className={`group text-left font-semibold text-blue-soft transition-colors duration-300 hover:text-amber focus-visible:text-amber ${className}`}
    >
      <span className="email-action">{children}</span>
    </a>
  );
}

/** Secondary outlined action. Kept under the legacy export name for CMS consumers. */
export function EmailPill({
  size = "lg",
  label,
}: {
  size?: "sm" | "lg";
  label?: string;
}) {
  const { email } = useSiteConfig();
  const sizeClasses =
    size === "lg"
      ? "min-h-[54px] gap-5 px-6 py-3 text-[15px] sm:text-[16px]"
      : "min-h-11 gap-3 px-4 py-2.5 text-[14px]";

  return (
    <a
      href={`mailto:${email}`}
      className={`outline-action group inline-flex items-center justify-between font-semibold ${sizeClasses}`}
    >
      <span>{label ?? email}</span>
      <span
        aria-hidden="true"
        className="grid h-5 w-5 place-items-center text-[16px] transition-transform duration-300 group-hover:translate-x-[3px]"
      >
        →
      </span>
    </a>
  );
}
