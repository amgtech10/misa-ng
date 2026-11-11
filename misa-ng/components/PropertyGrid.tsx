"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Reveal from "./Reveal";
import { properties, money } from "@/lib/data";

const types = [
  "All",
  "Residential",
  "Commercial",
  "Land",
  "Development",
];

export default function PropertyGrid({ limit }: { limit?: number }) {
  const [t, setT] = useState("All");

  const list = properties
    .filter((p) => t === "All" || p.type === t)
    .slice(0, limit);

  return (
    <div>

      {/* FILTERS */}
      {!limit && (
        <div className="mb-10 flex flex-wrap gap-2">

          {types.map((x) => (
            <button
              key={x}
              type="button"
              onClick={() => setT(x)}
              aria-pressed={t === x}
              className={`rounded-full border px-5 py-2.5 text-xs font-medium transition-all duration-300 ${
                t === x
                  ? "border-brand bg-brand text-ink shadow-[0_4px_20px_rgba(245,154,22,0.15)]"
                  : "border-line bg-panel text-soft hover:border-brand hover:text-white"
              }`}
            >
              {x}
            </button>
          ))}

        </div>
      )}

      {/* PROPERTY GRID */}
      <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

        {list.map((p, i) => (
          <Reveal
            key={p.id}
            delay={i * 80}
          >
            <Link
              href={`/properties/${p.id}`}
              className="group block overflow-hidden rounded-xl border border-line bg-panel transition-all duration-500 hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
            >

              {/* IMAGE */}
              <div className="relative aspect-[4/5] overflow-hidden bg-ink">

                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* PREMIUM OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-black/10" />

                {/* PROPERTY TYPE */}
                <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/50 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                  {p.type}
                </span>

                {/* REFERENCE */}
                <span className="absolute bottom-4 right-4 text-[10px] tracking-[0.2em] text-white/70">
                  MISA / {String(i + 1).padStart(2, "0")}
                </span>

              </div>

              {/* DETAILS */}
              <div className="p-5 sm:p-6">

                <p className="mb-3 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                  {p.area}, {p.city}
                </p>

                <h3 className="font-serif text-xl text-white transition-colors duration-300 group-hover:text-gold">
                  {p.name}
                </h3>

                <div className="my-5 h-px bg-line" />

                {/* PRICE + ACTION */}
                <div className="flex items-center justify-between gap-3">

                  <div>
                    <p className="mb-1 text-[9px] uppercase tracking-[0.2em] text-muted">
                      Asking Price
                    </p>

                    <p className="text-sm font-semibold text-gold">
                      {money(p.price)}
                    </p>
                  </div>

                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-white transition-all duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-ink"
                  >
                    ↗
                  </span>

                </div>

              </div>
            </Link>
          </Reveal>
        ))}

      </div>

      {/* EMPTY STATE */}
      {list.length === 0 && (
        <div className="py-20 text-center">
          <h3 className="font-serif text-2xl text-white">
            No properties found
          </h3>

          <p className="mt-3 text-sm text-muted">
            Try selecting another property category.
          </p>
        </div>
      )}

    </div>
  );
}