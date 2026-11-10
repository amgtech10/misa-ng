// components/GemCard.tsx

import Image from "next/image";
import type { Gem } from "@/lib/gems";

type GemCardProps = {
  gem: Gem;
};

export default function GemCard({ gem }: GemCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0D121B] transition-all duration-500 hover:-translate-y-2 hover:border-[#C9A45C]/50 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]">

      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#151B24]">

        <Image
          src={gem.image}
          alt={gem.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

        {/* Category */}
        <div className="absolute left-4 top-4">
          <span className="rounded-full border border-[#D6B56D]/40 bg-black/50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D6B56D] backdrop-blur-md">
            {gem.category}
          </span>
        </div>

        {/* Product number */}
        <div className="absolute bottom-4 right-4 text-xs tracking-widest text-white/70">
          NO. {gem.id.padStart(2, "0")}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">

        {/* Origin */}
        <div className="mb-3 flex items-center gap-2">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: gem.tone }}
          />

          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-500">
            {gem.origin}
          </span>
        </div>

        {/* Name */}
        <h3 className="mb-2 text-xl font-medium tracking-tight text-white transition-colors duration-300 group-hover:text-[#D6B56D]">
          {gem.name}
        </h3>

        {/* Description */}
        <p className="min-h-[60px] text-sm leading-6 text-gray-400">
          {gem.blurb}
        </p>

        {/* Divider */}
        <div className="my-5 h-px bg-white/10" />

        {/* Footer */}
        <div className="flex items-center justify-between gap-3">

          <div>
            <p className="mb-1 text-[9px] uppercase tracking-[0.2em] text-gray-500">
              Market Value
            </p>

            <p className="text-sm font-medium text-[#D6B56D]">
              {gem.price}
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition-all duration-300 group-hover:border-[#D6B56D] group-hover:bg-[#D6B56D] group-hover:text-black">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </div>

        </div>
      </div>
    </article>
  );
}