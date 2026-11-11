import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";

import GemGrid from "@/components/GemGrid";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Gem Collection | MISA LTD",
  description:
    "Discover an exceptional collection of diamonds, emeralds, rubies, sapphires and other precious gemstones with MISA LTD.",
  openGraph: {
    title: "The Gem Collection | MISA LTD",
    description:
      "Rare beauty. Timeless brilliance. Explore our curated gemstone collection.",
    type: "website",
  },
};

const COLORS = {
  background: "#050505",
  navy: "#0A0F17",
  panel: "#0D121B",
  border: "#252D3A",
  orange: "#F59A16",
  gold: "#FFB52A",
  deepOrange: "#A85F08",
  white: "#F5F5F5",
  gray: "#A7AFBF",
  muted: "#737B89",
} as const;

const primaryButton =
  "group inline-flex min-h-[54px] w-full items-center justify-center gap-5 bg-[#FFB52A] px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.17em] text-[#050505] transition-all duration-300 hover:bg-[#F59A16] hover:shadow-[0_8px_35px_rgba(255,181,42,0.15)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFB52A] motion-reduce:transition-none sm:w-auto";

const secondaryButton =
  "group inline-flex min-h-[54px] w-full items-center justify-center gap-5 border border-[#353D49] bg-white/[0.02] px-7 py-4 text-[10px] font-medium uppercase tracking-[0.17em] text-[#F5F5F5] transition-all duration-300 hover:border-[#FFB52A] hover:bg-[#FFB52A]/[0.06] hover:text-[#FFB52A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFB52A] motion-reduce:transition-none sm:w-auto";

export default function GemsPage() {
  return (
    <main
      className="relative min-h-screen overflow-clip bg-[#050505] text-[#F5F5F5]"
      style={
        {
          "--gem-gold": COLORS.gold,
          "--gem-orange": COLORS.orange,
          "--gem-border": COLORS.border,
        } as CSSProperties
      }
    >
      <Navbar />

      {/* =========================================
          BACKGROUND ATMOSPHERE
      ========================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-0 overflow-hidden"
      >
        <div className="absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-[#FFB52A]/[0.07] blur-[130px] sm:h-[600px] sm:w-[600px]" />

        <div className="absolute -left-40 top-[55%] h-[350px] w-[350px] rounded-full bg-[#F59A16]/[0.035] blur-[130px]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,245,245,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(245,245,245,0.018)_1px,transparent_1px)] bg-[size:72px_72px] opacity-25" />
      </div>

      {/* =========================================
          HERO SECTION
      ========================================= */}

      <section
        aria-labelledby="gems-heading"
        className="relative z-10 border-b border-[#252D3A]"
        style={{backgroundImage: "url('/images/gems/gold.jpg')"}}
      >
        <div className="mx-auto bg-gradient-to-r from-black via-black/50 to-black/30  max-w-7xl px-5 pb-16 pt-24 sm:px-8 sm:pb-20 sm:pt-28 md:pb-28 md:pt-36 lg:px-12">

          {/* Eyebrow */}

          <div className="mb-7 flex items-center gap-3 sm:mb-9">
            <span
              aria-hidden="true"
              className="h-px w-10 bg-[#FFB52A]"
            />

            <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#FFB52A] sm:text-[10px]">
              MISA / The Gem Collection
            </p>
          </div>

          {/* Heading */}

          <h1
            id="gems-heading"
            className="max-w-5xl font-serif text-[clamp(3.1rem,9vw,7rem)] leading-[0.95] tracking-[-0.065em]"
          >
            <span className="block text-[#FFB52A]">
              Rare beauty.
            </span>

            <span className="mt-2 block text-white">
              Timeless brilliance.
            </span>
          </h1>

          {/* Description */}

          <p className="mt-7 max-w-xl text-[13px] leading-7 text-[#A7AFBF] sm:mt-9 sm:text-base sm:leading-8">
            Discover an exceptional collection of precious gemstones,
            from brilliant diamonds to vibrant emeralds, extraordinary
            rubies and captivating sapphires.

            Each stone represents a unique expression of natural
            beauty, character and enduring elegance.
          </p>

        </div>

          {/* =====================================
              COLLECTION HIGHLIGHTS
          ===================================== */}

        {/* Decorative accent */}

        <div
          aria-hidden="true"
          className="absolute bottom-0 right-[10%] hidden h-28 w-px bg-gradient-to-b from-transparent via-[#FFB52A]/60 to-transparent lg:block"
        />

      </section>

      {/* =========================================
          GEM COLLECTION
      ========================================= */}

      <section
        id="collection"
        aria-labelledby="collection-heading"
        className="relative z-10 mx-auto max-w-7xl scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24 md:py-28 lg:px-12"
      >

        {/* Gem Grid */}

        <div
          id="collection-grid"
          className="scroll-mt-28"
        >
          <GemGrid />
        </div>

      </section>

      {/* =========================================
          CLOSING CTA
      ========================================= */}

      <section
        aria-labelledby="gems-cta-heading"
        className="relative z-10 border-t border-[#252D3A]"
      >

        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 md:py-24 lg:px-12">

          <div className="relative isolate overflow-hidden border border-[#303744] bg-[#0D121B] p-7 sm:p-10 md:p-16">

            {/* Background glow */}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-24 -z-10 h-72 w-72 rounded-full bg-[#FFB52A]/[0.09] blur-[100px]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-32 -left-20 -z-10 h-64 w-64 rounded-full bg-[#F59A16]/[0.05] blur-[100px]"
            />

            <div className="flex flex-col justify-between gap-10 md:flex-row md:items-center md:gap-12">

              {/* CTA Content */}

              <div className="max-w-xl">

                <div className="mb-5 flex items-center gap-3">

                  <span
                    aria-hidden="true"
                    className="h-px w-8 bg-[#FFB52A]"
                  />

                  <p className="text-[9px] font-medium uppercase tracking-[0.27em] text-[#FFB52A] sm:text-[10px]">
                    Your next discovery
                  </p>

                </div>

                <h2
                  id="gems-cta-heading"
                  className="font-serif text-4xl leading-[1.08] tracking-[-0.045em] text-[#F5F5F5] sm:text-5xl md:text-6xl"
                >
                  Beauty worth
                  <br />

                  <span className="text-[#FFB52A]">
                    looking closer at.
                  </span>
                </h2>

                <p className="mt-6 max-w-lg text-[13px] leading-7 text-[#A7AFBF] sm:text-sm sm:leading-8">
                  Explore our collection and discover gemstones
                  that reflect your individual taste and appreciation
                  for exceptional natural beauty.
                </p>

              </div>

              {/* CTA Button */}

              <div className="shrink-0">

                <a
                  href="#collection"
                  className={`${primaryButton} sm:min-w-[235px]`}
                >
                  <span>Discover the collection</span>

                  <span
                    aria-hidden="true"
                    className="text-lg transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>

                </a>

                <p className="mt-4 text-center text-[9px] uppercase tracking-[0.15em] text-[#737B89]">
                  Explore exceptional gemstones
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      <Footer />

    </main>
  );
}