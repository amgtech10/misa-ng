"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Listing } from "@/lib/data";
import { openLead } from "@/lib/lead";
import Reveal from "./Reveal";

const tabs = [
  "All",
  "Residential",
  "Commercial",
  "Land",
];

export default function Properties() {
  const [tab, setTab] = useState("All");
  const [items, setItems] = useState<Listing[]>([]);

  useEffect(() => {
    fetch(`/api/listings?type=${tab}`)
      .then((r) => r.json())
      .then(setItems);
  }, [tab]);

  return (
    <section
      id="properties"
      className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28"
    >
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-8 border-b border-line pb-8 lg:flex-row lg:items-end">

        <div className="max-w-2xl">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-brand">
            Curated Property
          </p>

          <h2 className="font-serif text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
            Properties and developments
            <span className="block text-gold">
              worth knowing.
            </span>
          </h2>

          <p className="mt-5 max-w-lg text-sm leading-7 text-soft">
            Explore selected residential, commercial and land
            opportunities across strategic locations.
          </p>
        </div>

        {/* FILTERS */}
        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter properties"
        >
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`rounded-full border px-4 py-2.5 text-xs font-medium transition-all duration-300 ${
                tab === t
                  ? "border-brand bg-brand text-ink shadow-[0_4px_20px_rgba(245,154,22,0.15)]"
                  : "border-line bg-panel text-soft hover:border-brand hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* PROPERTIES */}
      <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

        {items.map((l, i) => (
          <Reveal
            key={l.id}
            delay={i * 80}
          >
            <article className="group overflow-hidden rounded-xl border border-line bg-panel transition-all duration-500 hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]">

              {/* IMAGE */}
              <div className="relative aspect-[4/5] overflow-hidden bg-ink">

                <Image
                  src={l.image}
                  alt={l.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-black/10" />

                {/* PROPERTY TYPE */}
                <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/50 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                  {l.type}
                </span>

                {/* PROPERTY NUMBER */}
                <span className="absolute bottom-4 right-4 text-[10px] tracking-[0.2em] text-white/70">
                  MISA / {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* INFO */}
              <div className="p-5 sm:p-6">

                <p className="mb-3 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                  {l.area}
                </p>

                <h3 className="font-serif text-xl text-white transition-colors duration-300 group-hover:text-gold sm:text-2xl">
                  {l.name}
                </h3>

                <p className="mt-2 min-h-[40px] text-sm leading-6 text-soft">
                  {l.detail}
                </p>

                {/* DIVIDER */}
                <div className="my-5 h-px bg-line" />

                {/* FOOTER */}
                <div className="flex items-center justify-between gap-3">

                  <div>
                    <p className="mb-1 text-[9px] uppercase tracking-[0.2em] text-muted">
                      Asking Price
                    </p>

                    <p className="text-sm font-semibold text-gold">
                      {l.price}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => openLead(`Enquiry: ${l.name}`)}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-brand transition-colors hover:text-gold"
                  >
                    Enquire

                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      ↗
                    </span>
                  </button>

                </div>
              </div>
            </article>
          </Reveal>
        ))}

      </div>

      {/* EMPTY STATE */}
      {items.length === 0 && (
        <div className="py-20 text-center">
          <p className="font-serif text-2xl text-white">
            No properties available
          </p>

          <p className="mt-3 text-sm text-muted">
            Check back soon for new opportunities.
          </p>
        </div>
      )}
    </section>
  );
}