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
      className="mx-auto max-w-7xl px-6 py-24"
    >
      {/* HEADER */}
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-6">
        <h2 className="max-w-xl font-serif text-4xl">
          Properties and developments to know this season
        </h2>

        <div
          className="flex flex-wrap gap-2"
          role="tablist"
        >
          {tabs.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`border px-4 py-2 text-sm transition ${
                tab === t
                  ? "border-brand bg-brand text-ink"
                  : "border-line text-soft hover:border-brand"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* PROPERTIES */}
      <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {items.map((l, i) => (
          <Reveal
            key={l.id}
            delay={i * 80}
          >
            <article className="group">
              {/* IMAGE */}
              <div className="relative aspect-[4/5] overflow-hidden border border-line">
                <Image
                  src={l.image}
                  alt={l.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                <span className="absolute left-4 top-4 border border-white/20 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white backdrop-blur-md">
                  {l.type}
                </span>
              </div>

              {/* INFO */}
              <p className="mt-4 text-xs text-muted">
                {l.area}
              </p>

              <h3 className="font-serif text-2xl">
                {l.name}
              </h3>

              <p className="mt-1 text-sm text-soft">
                {l.detail}
              </p>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-gold">
                  {l.price}
                </span>

                <button
                  onClick={() =>
                    openLead(`Enquiry: ${l.name}`)
                  }
                  className="text-sm text-brand underline-offset-4 hover:underline"
                >
                  Enquire
                </button>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}