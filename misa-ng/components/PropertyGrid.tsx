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
      {!limit && (
        <div className="mb-10 flex flex-wrap gap-3">
          {types.map((x) => (
            <button
              key={x}
              onClick={() => setT(x)}
              className={`btn ${
                t === x ? "btn-brand" : "btn-line"
              }`}
            >
              {x}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-8 md:grid-cols-3">
        {list.map((p) => (
          <Reveal key={p.id}>
            <Link
              href={`/properties/${p.id}`}
              className="group block"
            >
              {/* IMAGE */}
              <div className="relative aspect-[4/5] overflow-hidden border border-line">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                {/* Dark premium overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70" />

                {/* Property type */}
                <span className="absolute left-4 top-4 border border-white/20 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white backdrop-blur-md">
                  {p.type}
                </span>
              </div>

              {/* DETAILS */}
              <p className="eyebrow mt-4">
                {p.area}, {p.city}
              </p>

              <h3 className="mt-1 font-serif text-xl">
                {p.name}
              </h3>

              <p className="mt-1 text-sm text-brand">
                {money(p.price)}
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}