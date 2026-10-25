import type { Metadata } from "next";
import Link from "next/link";
import GemGrid from "@/components/GemGrid";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Gem Collection | MISA NG LTD",
  description:
    "Explore an exceptional collection of diamonds, emeralds, rubies, sapphires, and other gemstones.",
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

const highlights = [
  {
    number: "01",
    label: "Natural beauty",
  },
  {
    number: "02",
    label: "Exceptional colour",
  },
  {
    number: "03",
    label: "Timeless elegance",
  },
];

export default function GemsPage() {
  return (
    <main
      className="relative min-h-screen overflow-clip bg-[#050505] text-[#F5F5F5]"
      style={
        {
          "--gem-gold": COLORS.gold,
          "--gem-orange": COLORS.orange,
          "--gem-border": COLORS.border,
        } as React.CSSProperties
      }
    >
    <Navbar />
      {/* BACKGROUND ATMOSPHERE */}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute -right-40 -top-40 h-[360px] w-[360px] rounded-full bg-[#FFB52A]/[0.07] blur-[120px] sm:h-[500px] sm:w-[500px]" />

        <div className="absolute -left-40 top-[55%] h-[300px] w-[300px] rounded-full bg-[#F59A16]/[0.035] blur-[120px] sm:h-[400px] sm:w-[400px]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,245,245,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(245,245,245,0.018)_1px,transparent_1px)] bg-[size:64px_64px] opacity-30 sm:bg-[size:72px_72px]" />
      </div>

      {/* HERO */}

      <section
        aria-labelledby="gems-heading"
        className="relative border-b border-[#252D3A]"
      >
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-20 sm:px-8 sm:pb-20 sm:pt-24 md:pb-28 md:pt-32 lg:px-12">
          {/* Eyebrow */}

          <div className="mb-6 flex items-center gap-3 sm:mb-8">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-[#FFB52A] sm:w-10"
            />

            <p className="text-[9px] font-medium uppercase tracking-[0.24em] text-[#FFB52A] sm:text-[10px] sm:tracking-[0.3em]">
              The Gem Collection
            </p>
          </div>

          {/* Heading */}

          <h1
            id="gems-heading"
            className="max-w-5xl font-serif text-[clamp(2.8rem,8.5vw,6rem)] leading-[0.98] tracking-[-0.055em]"
          >
            <span className="block text-[#FFB52A]">
              Rare beauty.
            </span>

            <span className="mt-1 block text-[#F5F5F5]/45 sm:mt-2">
              Timeless brilliance.
            </span>
          </h1>

          {/* Description */}

          <p className="mt-6 max-w-xl text-[13px] leading-7 text-[#A7AFBF] sm:mt-8 sm:text-base sm:leading-8">
            Discover an exceptional collection of precious gemstones,
            from brilliant diamonds to vibrant emeralds, extraordinary
            rubies, and captivating sapphires. Each stone tells a story
            of natural beauty and enduring elegance.
          </p>

          {/* Actions */}

          <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row sm:mt-10 sm:gap-4">
            <a
              href="#collection"
              className="group inline-flex min-h-[52px] w-full items-center justify-center gap-5 bg-[#FFB52A] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#050505] transition-colors duration-200 hover:bg-[#F59A16] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFB52A] motion-reduce:transition-none min-[420px]:w-auto"
            >
              Explore collection

              <span
                aria-hidden="true"
                className="text-base transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
              >
                →
              </span>
            </a>

            <Link
              href="/"
              className="group inline-flex min-h-[52px] w-full items-center justify-center gap-4 border border-[#252D3A] px-6 py-3 text-[10px] font-medium uppercase tracking-[0.15em] text-[#A7AFBF] transition-colors duration-200 hover:border-[#FFB52A] hover:text-[#FFB52A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFB52A] motion-reduce:transition-none min-[420px]:w-auto"
            >
              <span aria-hidden="true">←</span>
              Back to home
            </Link>
          </div>

          {/* Collection highlights */}

          <div className="mt-12 grid max-w-2xl grid-cols-2 gap-x-5 gap-y-7 border-t border-[#252D3A] pt-6 sm:mt-16 sm:grid-cols-3 sm:gap-8 sm:pt-8">
            {highlights.map((item) => (
              <div
                key={item.number}
                className="min-w-0"
              >
                <p className="font-serif text-2xl tracking-tight text-[#F5F5F5] sm:text-3xl">
                  {item.number}
                </p>

                <p className="mt-2 text-[9px] uppercase leading-5 tracking-[0.12em] text-[#737B89] sm:text-[10px] sm:tracking-[0.16em]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative accent */}

        <div
          aria-hidden="true"
          className="absolute bottom-0 right-[10%] hidden h-24 w-px bg-gradient-to-b from-transparent via-[#FFB52A]/50 to-transparent lg:block"
        />
      </section>

      {/* COLLECTION */}

      <section
        id="collection"
        aria-labelledby="collection-heading"
        className="relative mx-auto max-w-7xl scroll-mt-20 px-5 py-16 sm:px-8 sm:py-20 md:py-24 lg:px-12"
      >
        {/* Section heading */}

        <div className="mb-8 flex flex-col justify-between gap-6 border-b border-[#252D3A] pb-7 sm:mb-10 sm:pb-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-7 bg-[#FFB52A]"
              />

              <p className="text-[9px] font-medium uppercase tracking-[0.23em] text-[#FFB52A] sm:text-[10px] sm:tracking-[0.26em]">
                Discover our selection
              </p>
            </div>

            <h2
              id="collection-heading"
              className="font-serif text-3xl leading-tight tracking-[-0.035em] text-[#F5F5F5] sm:text-4xl md:text-5xl"
            >
              Explore the gems
              <span className="text-[#FFB52A]">.</span>
            </h2>

            <p className="mt-4 max-w-xl text-[13px] leading-7 text-[#A7AFBF] sm:text-sm">
              Browse by gemstone type and discover the distinctive
              colours, characteristics, and natural beauty of each stone.
            </p>
          </div>

          <a
            href="#collection-grid"
            className="group inline-flex min-h-10 shrink-0 items-center gap-3 self-start text-[9px] font-medium uppercase tracking-[0.16em] text-[#A7AFBF] transition-colors hover:text-[#FFB52A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFB52A] motion-reduce:transition-none md:self-auto"
          >
            View selection

            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-y-1 motion-reduce:transform-none motion-reduce:transition-none"
            >
              ↓
            </span>
          </a>
        </div>

        {/* Gem grid */}

        <div
          id="collection-grid"
          className="scroll-mt-24"
        >
          <GemGrid />
        </div>
      </section>

      {/* CLOSING CTA */}

      <section
        aria-labelledby="gems-cta-heading"
        className="relative border-t border-[#252D3A]"
      >
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 md:py-20 lg:px-12">
          <div className="relative isolate overflow-hidden border border-[#252D3A] bg-[#0D121B] p-6 sm:p-10 md:p-14">
            {/* Restrained background glow */}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-24 -z-10 h-64 w-64 rounded-full bg-[#FFB52A]/[0.07] blur-[90px]"
            />

            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center md:gap-10">
              <div className="max-w-xl">
                <p className="text-[9px] font-medium uppercase tracking-[0.23em] text-[#FFB52A] sm:text-[10px] sm:tracking-[0.25em]">
                  Your next discovery
                </p>

                <h2
                  id="gems-cta-heading"
                  className="mt-4 font-serif text-3xl leading-[1.12] tracking-[-0.035em] text-[#F5F5F5] sm:text-4xl md:text-5xl"
                >
                  Beauty worth
                  <br />
                  looking closer at.
                </h2>

                <p className="mt-4 max-w-lg text-[13px] leading-7 text-[#A7AFBF] sm:text-sm">
                  Explore the collection and find a gemstone that speaks
                  to your individual taste.
                </p>
              </div>

              <a
                href="#collection"
                className="group inline-flex min-h-[52px] w-full shrink-0 items-center justify-center gap-5 self-start bg-[#FFB52A] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#050505] transition-colors duration-200 hover:bg-[#F59A16] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFB52A] motion-reduce:transition-none sm:w-auto sm:tracking-[0.15em] md:self-center"
              >
                Discover the collection

                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
                >
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-[#252D3A]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <p className="text-[9px] uppercase tracking-[0.15em] text-[#737B89]">
            The Gem Collection
          </p>

          <p className="text-[9px] uppercase tracking-[0.15em] text-[#737B89]">
            Rare beauty · Timeless brilliance
          </p>

          <Link
            href="/"
            className="inline-flex min-h-8 items-center self-start text-[9px] uppercase tracking-[0.15em] text-[#A7AFBF] transition-colors hover:text-[#FFB52A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFB52A] motion-reduce:transition-none sm:self-auto"
          >
            Back to home →
          </Link>
        </div>
      </footer>
      <Footer />
    </main>
  );
}