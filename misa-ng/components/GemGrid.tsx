"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Reveal from "./Reveal";
import { gems } from "@/lib/gems";
const categories = [
  "All",
  "Diamond",
  "Emerald",
  "Ruby",
  "Sapphire",
  "Other",
] as const;
export default function GemGrid({
  limit,
}: {
  limit?: number;
}) {
  const [category, setCategory] =
    useState<(typeof categories)[number]>("All");
  const list = gems
    .filter(
      (gem) =>
        category === "All" || gem.category === category
    )
    .slice(0, limit);
  return (
    <div>
      {!limit && (
        <div className="mb-10 flex flex-wrap gap-3">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              className={`btn ${
                category === item
                  ? "btn-brand"
                  : "btn-line"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      )}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {list.map((gem, index) => (
          <Reveal key={gem.id} delay={index * 80}>
            <Link
              href={`/gems/${gem.id}`}
              className="group block"
            >
              {/* IMAGE */}
              <div className="relative aspect-[4/5] overflow-hidden border border-line">
                <Image
                  src={gem.image}
                  alt={gem.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70" />
                <span className="absolute left-4 top-4 border border-white/20 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white backdrop-blur-md">
                  {gem.category}
                </span>
              </div>
              {/* DETAILS */}
              <p className="eyebrow mt-4">
                {gem.origin}
              </p>
              <h3 className="mt-1 font-serif text-xl">
                {gem.name}
              </h3>
              <p className="mt-1 text-sm text-soft">
                {gem.detail}
              </p>
              <p className="mt-3 text-gold">
                {gem.price}
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
      {list.length === 0 && (
        <p className="py-12 text-center text-soft">
          No gems found in this category.
        </p>
      )}
    </div>
  );
}