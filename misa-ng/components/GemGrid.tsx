// components/GemGrid.tsx

"use client";

import { useMemo, useState } from "react";
import { gems } from "@/lib/gems";
import GemCard from "./GemCard";

export default function GemGrid() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(gems.map((gem) => gem.category))),
  ];

  const filteredGems = useMemo(() => {
    return gems.filter((gem) => {
      const matchesCategory =
        activeCategory === "All" || gem.category === activeCategory;

      const matchesSearch =
        gem.name.toLowerCase().includes(search.toLowerCase()) ||
        gem.origin.toLowerCase().includes(search.toLowerCase()) ||
        gem.detail.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <section className="bg-[#050505] px-5 py-4 sm:px-8 lg:px-16 lg:py-28">

      <div className="mx-auto max-w-7xl">

       
        {/* Filters */}
        <div className="mb-8 flex flex-col gap-5 border-b border-white/10 pb-8 md:flex-row md:items-center md:justify-between">

          {/* Category buttons */}
          <div className="flex flex-wrap gap-2">

            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-5 py-2.5 text-xs transition-all duration-300 ${
                  activeCategory === category
                    ? "border-[#D6B56D] bg-[#D6B56D] text-black"
                    : "border-white/10 text-gray-400 hover:border-[#D6B56D]/50 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}

          </div>

          {/* Search */}
          <div className="relative w-full md:max-w-xs">

            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search minerals..."
              aria-label="Search minerals"
              className="w-full rounded-full border border-white/10 bg-[#0D121B] py-3 pl-11 pr-4 text-sm text-white outline-none transition-colors placeholder:text-gray-600 focus:border-[#D6B56D]/60"
            />

          </div>

        </div>

        {/* Results */}
        {filteredGems.length > 0 ? (

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {filteredGems.map((gem) => (
              <div
                key={gem.id}
                className="animate-in fade-in duration-500"
              >
                <GemCard gem={gem} />
              </div>
            ))}

          </div>

        ) : (

          <div className="py-24 text-center">

            <h3 className="text-xl font-medium text-white">
              No minerals found
            </h3>

            <p className="mt-3 text-sm text-gray-500">
              Try another search term or category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
              className="mt-6 text-sm text-[#D6B56D] hover:underline"
            >
              Clear filters
            </button>

          </div>

        )}

      </div>

    </section>
  );
}
