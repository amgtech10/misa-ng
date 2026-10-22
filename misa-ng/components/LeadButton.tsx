"use client";

import type { ReactNode } from "react";
import { openLead } from "@/lib/lead";

type LeadButtonProps = {
  type: string;
  className?: string;
  children: ReactNode;
};

export default function LeadButton({
  type,
  className = "btn-solid",
  children,
}: LeadButtonProps) {
  return (
    <button
      type="button"
      onClick={() => openLead(type)}
      className={`group relative inline-flex min-h-[48px] w-auto max-w-full flex-row flex-nowrap items-center justify-center gap-1 overflow-hidden whitespace-nowrap px-2 py-2 text-[9px] font-medium uppercase tracking-[0.18em] transition-all duration-500 focus:outline-none border-border-current focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${className}`}
    >
      {/* Hover effect */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 ease-out group-hover:translate-x-0"
      />

      {/* Button text */}
      <span className="relative z-10 inline-flex shrink-0 items-center whitespace-nowrap">
        {children}
      </span>

      {/* Arrow */}
      <span
        aria-hidden="true"
        className="relative z-10 inline-flex h-6 w-6 shrink-0 items-center justify-center text-[20px] leading-none transition-all duration-500 group-hover:translate-x-1"
      >
        →
      </span>
    </button>
  );
}