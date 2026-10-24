import Navbar from "@/components/Navbar";
import CinematicHero from "@/components/CinematicHero";
import Properties from "@/components/Properties";
import LeadModal from "@/components/LeadModal";
import LeadButton from "@/components/LeadButton";
import Reveal from "@/components/Reveal";
import { news } from "@/lib/data";
import Link from "next/link";
import GemGrid from "@/components/GemGrid";

const pillars = [
  {
    number: "01",
    title: "Curated property",
    text: "Residential, commercial and land opportunities reviewed before they reach our network.",
  },
  {
    number: "02",
    title: "Market intelligence",
    text: "Clear insight into property markets, finance, policy and the forces shaping real estate.",
  },
  {
    number: "03",
    title: "Developer access",
    text: "A structured route for developers to reach qualified buyers and serious investors.",
  },
  {
    number: "04",
    title: "Investment opportunities",
    text: "Selected opportunities built around transparency, documentation and completion.",
  },
];

export default function Home() {
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

  return (
    <main
      id="top"
      className="min-h-screen overflow-hidden bg-ink text-white"
    >
      <Navbar />

      {/* =========================================================
          HERO
      ========================================================= */}
      <CinematicHero />

      {/* =========================================================
          BRAND STATEMENT / TRUST STRIP
      ========================================================= */}
      <section className="relative border-y border-white/[0.08] bg-[#080d14]">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid divide-y divide-white/[0.08] md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-4">
            {pillars.map((item, index) => (
              <Reveal key={item.number} delay={index * 80}>
                <article className="group relative min-h-[275px] overflow-hidden px-6 py-12 sm:px-8 lg:px-9">
                  {/* Hover glow */}
                  <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand/10 opacity-0 blur-3xl transition duration-700 group-hover:opacity-100" />

                  <div className="relative flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-[0.28em] text-brand">
                      {item.number}
                    </span>

                    <span className="h-px w-8 bg-white/10 transition-all duration-500 group-hover:w-16 group-hover:bg-brand" />
                  </div>

                  <h3 className="relative mt-12 max-w-[220px] font-serif text-[1.55rem] leading-[1.05] tracking-[-0.02em] text-white">
                    {item.title}
                  </h3>

                  <p className="relative mt-5 max-w-[260px] text-[13px] leading-7 text-white/45">
                    {item.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          FEATURED OPPORTUNITY
      ========================================================= */}
      <section
        id="properties"
        className="relative overflow-hidden bg-[#080807]"
      >
        <div className="grid min-h-[760px] lg:grid-cols-[1.05fr_.95fr]">
          {/* Visual panel */}
          <div className="group relative min-h-[560px] overflow-hidden">
            {/* Image */}
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=90"
              alt="Premium residential development"
              className="absolute inset-0 h-full w-full object-cover grayscale-[15%] transition duration-[1400ms] group-hover:scale-[1.04]"
            />

            {/* Cinematic overlays */}
            <div className="absolute inset-0 bg-black/25" />

            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-transparent" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20" />

            {/* Vertical editorial marker */}
            <div className="absolute left-7 top-1/2 hidden -translate-y-1/2 rotate-180 lg:block">
              <span className="[writing-mode:vertical-rl] text-[9px] uppercase tracking-[0.35em] text-white/40">
                MISA NG · Featured development
              </span>
            </div>

            {/* Top label */}
            <div className="absolute left-7 top-8 sm:left-10 sm:top-10">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-brand" />
                <span className="text-[9px] uppercase tracking-[0.28em] text-white/65">
                  Selected opportunity
                </span>
              </div>
            </div>

            {/* Bottom information */}
            <div className="absolute bottom-8 left-7 right-7 sm:bottom-10 sm:left-10 sm:right-10">
              <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.28em] text-white/45">
                    Abuja · Nigeria
                  </p>

                  <h3 className="mt-3 font-serif text-3xl tracking-[-0.02em] text-white sm:text-4xl">
                    Maitama Terraces
                  </h3>
                </div>

                <span className="w-fit rounded-full border border-white/20 bg-black/20 px-4 py-2 text-[9px] uppercase tracking-[0.18em] text-white/70 backdrop-blur-xl">
                  Private development
                </span>
              </div>
            </div>
          </div>

          {/* Editorial content */}
          <div className="relative flex items-center bg-[#f2eee6] px-7 py-20 text-[#111] sm:px-12 lg:px-16 xl:px-20">
            <Reveal>
              <div className="w-full max-w-xl">
                <div className="flex items-center gap-4">
                  <span className="h-px w-10 bg-[#a86f20]" />

                  <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#93611c]">
                    Featured investment
                  </p>
                </div>

                <h2 className="mt-7 font-serif text-[clamp(3rem,6vw,5.8rem)] leading-[0.88] tracking-[-0.045em]">
                  Maitama
                  <br />
                  <span className="italic text-[#9b681e]">Terraces.</span>
                </h2>

                <p className="mt-8 max-w-lg text-[15px] leading-8 text-black/55">
                  A considered residential development in one of Abuja&apos;s
                  most established districts, offering four-bedroom terraces,
                  private parking and documentation prepared for transfer.
                </p>

                {/* Stats */}
                <div className="mt-10 grid max-w-lg grid-cols-3 border-y border-black/10">
                  <div className="py-6">
                    <p className="text-[9px] uppercase tracking-[0.18em] text-black/35">
                      From
                    </p>

                    <p className="mt-2 font-serif text-xl sm:text-2xl">
                      ₦450m
                    </p>
                  </div>

                  <div className="border-x border-black/10 px-5 py-6">
                    <p className="text-[9px] uppercase tracking-[0.18em] text-black/35">
                      Residence
                    </p>

                    <p className="mt-2 font-serif text-xl sm:text-2xl">
                      4 bed
                    </p>
                  </div>

                  <div className="pl-5 py-6">
                    <p className="text-[9px] uppercase tracking-[0.18em] text-black/35">
                      Location
                    </p>

                    <p className="mt-2 font-serif text-xl sm:text-2xl">
                      Abuja
                    </p>
                  </div>
                </div>

                <div className="mt-10">

                  <Link

  href="/invest"

  className="group inline-flex min-h-[48px] items-center justify-center gap-3 bg-[#FFB52A] px-5 py-3 text-[9px] font-medium uppercase tracking-[0.18em] text-[#080B10] transition duration-300 hover:bg-[#FFD078]"

>

  <span>Explore investment opportunities</span>

  <span

    aria-hidden="true"

    className="text-sm transition-transform duration-300 group-hover:translate-x-1"

  >

    →

  </span>
  </Link>
                  
                </div>

                <p className="mt-5 text-[10px] leading-5 text-black/35">
                  Availability, pricing and documentation remain subject to
                  independent verification.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =========================================================
          PROPERTIES
      ========================================================= */}
      <section
        id="properties"
        className="relative bg-[#070c12]"
      >
        <div className="mx-auto max-w-[1500px] px-6 pt-28 sm:px-8 lg:px-10">
          <Reveal>
            <div className="grid gap-10 border-b border-white/[0.08] pb-12 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <div className="flex items-center gap-4">
                  <span className="h-px w-10 bg-brand" />

                  <p className="text-[9px] uppercase tracking-[0.3em] text-brand">
                    The portfolio
                  </p>
                </div>

                <h2 className="mt-6 max-w-4xl font-serif text-[clamp(3rem,6vw,5.8rem)] leading-[0.88] tracking-[-0.045em]">
                  Properties worth
                  <br />
                  <span className="text-white/35">looking twice.</span>
                </h2>
              </div>

              <div className="max-w-sm lg:pb-1">
                <p className="text-[13px] leading-7 text-white/45">
                  A considered selection of residential, commercial and land
                  opportunities across Nigeria.
                </p>

                <div className="mt-5 flex items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-white/25">
                  <span className="h-px w-7 bg-white/15" />
                  Updated portfolio
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Properties />
      </section>
{/* =========================================================
    THE GEM COLLECTION
========================================================= */}
<section
  id="gems"
  className="relative overflow-hidden border-y border-white/[0.08] bg-[#080B10] text-white"
>
  {/* Ambient background lighting */}
  <div className="pointer-events-none absolute -left-40 top-20 h-[400px] w-[400px] rounded-full bg-emerald-500/[0.07] blur-[140px]" />
  <div className="pointer-events-none absolute -right-40 bottom-0 h-[450px] w-[450px] rounded-full bg-amber-500/[0.06] blur-[140px]" />
  <div className="relative mx-auto max-w-[1500px] px-6 py-24 sm:px-8 sm:py-32 lg:px-10 lg:py-36">
    {/* HEADER */}
    <Reveal>
      <div className="grid gap-10 border-b border-white/[0.10] pb-12 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-[#C49A52]" />
            <p className="text-[9px] font-medium uppercase tracking-[0.35em] text-[#C49A52]">
              Beyond the ordinary
            </p>
          </div>
          <h2 className="mt-7 max-w-4xl font-serif text-[clamp(3.2rem,7vw,7rem)] leading-[0.88] tracking-[-0.055em]">
            Nature&apos;s
            <br />
            <span className="italic text-white/35">
              rarest expressions.
            </span>
          </h2>
          <p className="mt-7 max-w-xl text-[13px] leading-7 text-white/45 sm:text-sm">
            Discover a considered collection of gemstones,
            selected for their colour, character and enduring
            appeal. Exceptional stones, presented with the
            attention they deserve.
          </p>
        </div>
        {/* COLLECTION MARKER */}
        <div className="flex items-center gap-5 lg:pb-2">
          <div className="grid h-14 w-14 place-items-center rounded-full border border-[#C49A52]/30">
            <svg
              viewBox="0 0 40 40"
              fill="none"
              className="h-7 w-7 text-[#C49A52]"
              aria-hidden="true"
            >
              <path
                d="M20 3 34 13 29 31 20 37 11 31 6 13 20 3Z"
                stroke="currentColor"
                strokeWidth="1"
              />
              <path
                d="M6 13h28M11 31l9-18 9 18M14 8l6 5 6-5M20 13v24"
                stroke="currentColor"
                strokeWidth=".7"
              />
            </svg>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-[0.25em] text-white/35">
              MISA Collection
            </p>
            <p className="mt-2 font-serif text-xl">
              The art of rarity
            </p>
          </div>
        </div>
      </div>
    </Reveal>
    {/* COLLECTION INTRODUCTION */}
    <Reveal delay={100}>
      <div className="flex flex-col justify-between gap-5 py-8 sm:flex-row sm:items-center">
        <div>
          <p className="text-[9px] uppercase tracking-[0.28em] text-[#C49A52]">
            Explore the collection
          </p>
          <h3 className="mt-3 font-serif text-2xl sm:text-3xl">
            Stones with a story.
          </h3>
        </div>
        <p className="max-w-md text-[12px] leading-6 text-white/40">
          From captivating emeralds to brilliant diamonds,
          discover gemstones with distinctive character and
          timeless beauty.
        </p>
      </div>
    </Reveal>
    {/* GEM CARDS */}
    <div className="gems-premium-grid">
      <GemGrid limit={4} />
    </div>
    {/* FOOTER CTA */}
    <Reveal>
      <div className="mt-14 flex flex-col gap-6 border-t border-white/[0.10] pt-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[9px] uppercase tracking-[0.25em] text-white/30">
            The complete collection
          </p>
          <p className="mt-2 font-serif text-xl text-white/80">
            Discover more exceptional stones.
          </p>
        </div>
        <Link
          href="/gems"
          className="group inline-flex min-h-[48px] items-center justify-center gap-3 bg-[#C49A52] px-5 py-3 text-[9px] font-medium uppercase tracking-[0.18em] text-[#080B10] transition duration-300 hover:bg-[#D6B97C]"
        >
          <span>Explore all gems</span>
          <span
            aria-hidden="true"
            className="text-base transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </Reveal>
  </div>
</section>

      {/* =========================================================
          DEVELOPER PARTNERSHIPS
      ========================================================= */}
      <section
        id="developers"
        className="relative overflow-hidden border-t border-white/[0.08] bg-[#090e15]"
      >
        {/* Ambient light */}
        <div className="pointer-events-none absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-brand/[0.06] blur-[120px]" />

        <div className="relative mx-auto grid max-w-[1500px] gap-16 px-6 py-32 sm:px-8 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:px-10">
          <Reveal>
            <div>
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-brand" />

                <p className="text-[9px] uppercase tracking-[0.3em] text-brand">
                  Developer partnerships
                </p>
              </div>

              <h2 className="mt-7 max-w-4xl text-zinc-400 font-serif text-[clamp(3rem,6vw,6rem)] leading-[0.86] tracking-[-0.045em]">
                Put your
                <br />
                development
                <br />
                <span className="italic text-amber-500">in the right hands.</span>
              </h2>

              <p className="mt-8 max-w-xl text-[15px] leading-8 text-white/45">
                MISA gives developers a more considered route to market —
                combining professional presentation, structured enquiries and
                access to serious buyers and investors.
              </p>

              <div className="mt-10 flex flex-wrap gap-3 text-[9px] uppercase tracking-[0.2em] text-white">
                <span className="border border-white/10 px-4 py-2.5">
                  Project presentation
                </span>

                <span className="border border-white/10 px-4 py-2.5">
                  Buyer qualification
                </span>

                <span className="border border-white/10 px-4 py-2.5">
                  Sales introduction
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="relative border border-white/10 bg-white/[0.025] shadow-2xl shadow-black/20 backdrop-blur-sm sm:p-4">

              <h3 className="pt-10 p-7 max-w-md font-serif text-3xl leading-tight sm:text-4xl">
                Steps to qualified enquiries.
              </h3>

              <div className=" border-white/10 justiy items-center p-8">
                {[
                  [
                    "01",
                    "Submit",
                    "Share your development, documentation and commercial terms.",
                  ],
                  [
                    "02",
                    "Structure",
                    "We review the opportunity and present it professionally.",
                  ],
                  [
                    "03",
                    "Connect",
                    "Qualified enquiries are introduced to your team.",
                  ],
                ].map(([number, title, text]) => (
                  <div
                    key={number}
                    className="group flex gap-5 border-b border-white/[0.07] py-5 first:pt-0 last:border-b-0"
                  >
                    <span className="font-mono text-[9px] text-brand">
                      {number}
                    </span>

                    <div>
                      <p className="text-[11px] uppercase tracking-[0.16em] text-white/70">
                        {title}
                      </p>

                      <p className="mt-2 text-[12px] leading-6 text-white/35">
                        {text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2 px-8">
                <LeadButton type="Developer onboarding">
                  Start onboarding
                </LeadButton>
              </div>

              <p className="mt-5 text-[10px] leading-0 p-5 text-white/25">
                Commission is payable upon a completed sale, subject to agreed
                terms.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =========================================================
          INTELLIGENCE / NEWS
      ========================================================= */}
      <section
        id="newsfeed"
        className="relative bg-white px-6 py-28 text-[#111] sm:px-8 lg:px-10"
      >
        <div className="mx-auto max-w-[1500px]">
          <Reveal>
            <div className="grid gap-10 border-b border-black/10 pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <div className="flex items-center gap-4">
                  <span className="h-px w-10 bg-[#a86f20]" />

                  <p className="text-[9px] uppercase tracking-[0.3em] text-[#95631e]">
                    MISA intelligence
                  </p>
                </div>

                <h2 className="mt-6 font-serif text-[clamp(3rem,6vw,5.7rem)] leading-[0.88] tracking-[-0.045em]">
                  Market notes.
                  <br />
                  <span className="text-zinc-400">Better decisions.</span>
                </h2>
              </div>

              <div>
                <LeadButton
                  className="Newsfeed text-[#ffb52a] bg-black/90 border-radius-100"
                  type="Newsfeed subscription">
                     Subscribe to newsfeed
                </LeadButton>
              </div>
            </div>
          </Reveal>

          <div className="mt-3">
            {news.map((n, index) => (
              <Reveal key={n.title} delay={index * 50}>
                <article className="group grid gap-5 border-b border-black/10 py-8 md:grid-cols-[70px_1fr_auto] md:items-center">
                  <span className="font-mono text-[9px] tracking-[0.15em] text-black/25">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.24em] text-[#95631e]">
                      {n.tag}
                    </p>

                    <h3 className="mt-3 max-w-4xl font-serif text-[1.55rem] leading-tight tracking-[-0.015em] transition-transform duration-500 group-hover:translate-x-2 sm:text-2xl lg:text-3xl">
                      {n.title}
                    </h3>
                  </div>

                  <span className="hidden h-11 w-11 items-center justify-center rounded-full border border-black/10 text-lg text-black/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#95631e] group-hover:text-[#95631e] md:flex">
                    ↗
                  </span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          CONTACT / FOOTER
      ========================================================= */}
      <footer
        id="contact"
        className="relative overflow-hidden border-t border-white/[0.08] bg-[#05080d]"
      >
        <div className="pointer-events-none absolute right-[-10%] top-[-20%] h-[500px] w-[500px] rounded-full bg-brand/[0.04] blur-[130px]" />

        <div className="relative mx-auto max-w-[1500px] px-6 py-24 sm:px-8 lg:px-10 lg:py-32">
          <div className="grid gap-20 lg:grid-cols-[1.5fr_.5fr_.5fr]">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-brand" />

                <span className="text-[9px] uppercase tracking-[0.3em] text-brand">
                  MISA NG LTD
                </span>
              </div>

              <h2 className="mt-8 max-w-3xl font-serif text-[clamp(3rem,6vw,6rem)] leading-[0.88] tracking-[-0.045em]">
                Real estate,
                <br />
                <span className="italic text-white/30">
                  approached differently.
                </span>
              </h2>

              <p className="mt-8 max-w-xl text-[13px] leading-7 text-white/40">
                Municipal Integrated Service Agent NG Ltd — MISA NG LTD — is
                part of Strategic Infrastructure and Resource Partners
                (SIR-Partners).
              </p>

              <div className="mt-10">
                <LeadButton type="Contact request">
                  Contact Us
                </LeadButton>
              </div>
            </div>

            <nav className="grid content-start gap-4">
              <p className="mb-3 text-[9px] uppercase tracking-[0.28em] text-white">
                Explore
              </p>

              <a
                href="#properties"
                className="text-[13px] text-white/45 transition hover:text-brand"
              >
                Properties
              </a>

              <Link
                href="/invest"
                className="text-[13px] text-white/45 transition hover:text-brand"
              >
                Investments
              </Link>

              <a
                href="#newsfeed"
                className="text-[13px] text-white/45 transition hover:text-brand"
              >
                Market intelligence
              </a>
            </nav>

            <nav className="grid content-start gap-4">
              <p className="mb-3 text-[9px] uppercase tracking-[0.28em] text-white">
                Connect
              </p>

              <a
                href="#developers"
                className="text-[13px] text-white/45 transition hover:text-brand"
              >
                Developers
              </a>

              <a
                href="#contact"
                className="text-[13px] text-white/45 transition hover:text-brand"
              >
                Contact
              </a>

              <a
                href="#top"
                className="text-[13px] text-white/45 transition hover:text-brand"
              >
                Back to top ↑
              </a>
            </nav>
          </div>

          <div className="mt-24 flex flex-col justify-between gap-5 border-t border-white/[0.08] pt-7 text-[9px] uppercase tracking-[0.18em] text-white/25 sm:flex-row">
            <p>
              © {new Date().getFullYear()} MISA NG LTD. All rights reserved.
            </p>

            <p>Abuja · Nigeria</p>
          </div>
        </div>
      </footer>

      {/* =========================================================
          FLOATING WHATSAPP
      ========================================================= */}
      {wa && (
        <a
          href={`https://wa.me/${+233505171018}?text=${encodeURIComponent(
            "Hello MISA NG, I would like to enquire about a property."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with MISA NG on WhatsApp"
          className="group fixed bottom-60 right-6 z-30"
        >
          <span className="absolute inset-0 rounded-full bg-profit/30 blur-xl transition duration-500 group-hover:scale-125" />

          <span className="relative grid h-14 w-14 place-items-center rounded-full bg-profit text-ink shadow-2xl shadow-black/40 transition duration-300 group-hover:scale-105">
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.9 5-1.3A10 10 0 1 0 12 2Zm5.2 14c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 .9-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6c-.1.1-.3.3-.1.6.6 1 1.4 1.8 2.4 2.3.3.1.5.1.6-.1l.8-1c.2-.2.4-.2.6-.1l1.9.9c.2.1.4.2.4.3.1.2.1.8-.1 1.4Z" />
            </svg>
          </span>
        </a>
      )}

      <LeadModal />
    </main>
  );
}