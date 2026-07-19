"use client";

import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";
import { useId } from "react";

// --- Button ------------------------------------------------------------------

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "danger" | "subtle";
  size?: "sm" | "md";
};

const BUTTON_VARIANTS: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-amber text-[#1c1206] font-semibold shadow-[0_8px_24px_-6px_rgba(245,169,78,0.5)] hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-6px_rgba(245,169,78,0.6)] active:translate-y-0",
  ghost:
    "border border-white/[0.14] bg-white/[0.04] text-text/85 backdrop-blur hover:border-white/30 hover:bg-white/[0.07] hover:text-text",
  subtle: "text-text/60 hover:text-text hover:bg-white/[0.07]",
  danger:
    "border border-[#ff9d7a]/30 bg-[#ff9d7a]/[0.08] text-[#ff9d7a] hover:bg-[#ff9d7a]/[0.16]",
};

export function Button({ variant = "primary", size = "md", className = "", ...props }: ButtonProps) {
  const sizing = size === "sm" ? "px-3.5 py-1.5 text-[13px]" : "px-[18px] py-2.5 text-sm";
  return (
    <button
      type="button"
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-full transition-[transform,box-shadow,background-color,border-color,color] duration-200 disabled:pointer-events-none disabled:opacity-50 ${BUTTON_VARIANTS[variant]} ${sizing} ${className}`}
    />
  );
}

// --- Kicker (time-label eyebrow, echoes the site's section labels) -----------

export function Kicker({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-soft ${className}`}
    >
      {children}
    </div>
  );
}

// --- Field wrapper -----------------------------------------------------------

export function Field({
  label,
  hint,
  htmlFor,
  children,
}: {
  label?: string;
  hint?: string;
  htmlFor?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={htmlFor}
          className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text/45"
        >
          {label}
        </label>
      )}
      {children}
      {hint && <p className="text-xs text-text/40 [text-wrap:pretty]">{hint}</p>}
    </div>
  );
}

const CONTROL =
  "block w-full rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-2.5 text-sm text-text placeholder:text-text/30 transition-[border-color,box-shadow,background-color] duration-200 hover:border-white/20 focus:border-amber/60 focus:bg-white/[0.06] focus:outline-none focus:shadow-[0_0_0_3px_rgba(245,169,78,0.12)]";

export function TextInput({
  label,
  hint,
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label?: string; hint?: string }) {
  const id = useId();
  return (
    <Field label={label} hint={hint} htmlFor={id}>
      <input id={id} {...props} className={`${CONTROL} ${className}`} />
    </Field>
  );
}

export function TextArea({
  label,
  hint,
  className = "",
  rows = 3,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; hint?: string }) {
  const id = useId();
  return (
    <Field label={label} hint={hint} htmlFor={id}>
      <textarea id={id} rows={rows} {...props} className={`${CONTROL} resize-y leading-[1.6] ${className}`} />
    </Field>
  );
}

// --- Toggle ------------------------------------------------------------------

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="group inline-flex items-center gap-2.5 text-left"
    >
      <span
        className={`relative h-[22px] w-[38px] shrink-0 rounded-full transition-colors duration-200 ${
          checked ? "bg-amber shadow-[0_0_14px_-2px_rgba(245,169,78,0.6)]" : "bg-white/15"
        }`}
      >
        <span
          className={`absolute top-[3px] h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${
            checked ? "translate-x-[19px]" : "translate-x-[3px]"
          }`}
        />
      </span>
      {label && <span className="text-sm text-text/80 group-hover:text-text">{label}</span>}
    </button>
  );
}

// --- Card --------------------------------------------------------------------

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-white/[0.09] bg-white/[0.028] p-5 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_20px_50px_-30px_rgba(0,0,0,0.7)] backdrop-blur-sm sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
}

// --- Page header -------------------------------------------------------------

export function PageHeader({
  title,
  description,
  kicker,
  actions,
}: {
  title: string;
  description?: string;
  kicker?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
      <div>
        {kicker && <Kicker className="mb-2">{kicker}</Kicker>}
        <h1 className="text-[28px] font-semibold tracking-[-0.025em] text-text">{title}</h1>
        {description && (
          <p className="mt-1.5 max-w-[560px] text-sm text-text/55 [text-wrap:pretty]">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
