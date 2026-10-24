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
      className={`
        group relative isolate inline-flex min-h-12
        w-auto max-w-full shrink-0
        items-center justify-center gap-3
        overflow-hidden
        px-5 py-3
        text-center text-[10px] font-medium uppercase
        leading-none tracking-[0.14em]
        transition-colors duration-300 ease-out
        active:scale-[0.99]
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-brand
        focus-visible:ring-offset-2
        focus-visible:ring-offset-ink
        motion-reduce:transition-none
        motion-reduce:active:scale-100
        sm:gap-4 sm:px-6
        ${className}
      `}
    >
      {/* Restrained hover highlight */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 -z-10
          -translate-x-full bg-white/[0.08]
          transition-transform duration-300 ease-out
          group-hover:translate-x-0
          motion-reduce:transition-none
        "
      />

      {/* Button label */}
      <span
        className="
          relative z-10 min-w-0
          whitespace-normal break-words
        "
      >
        {children}
      </span>

      {/* Decorative directional arrow */}
      <span
        aria-hidden="true"
        className="
          relative z-10 inline-flex h-5 w-5 shrink-0
          items-center justify-center
          text-[15px] leading-none
          transition-transform duration-300 ease-out
          group-hover:translate-x-1
          motion-reduce:transition-none
          motion-reduce:group-hover:translate-x-0
        "
      >
        →
      </span>
    </button>
  );
}