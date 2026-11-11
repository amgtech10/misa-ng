import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyGrid from "@/components/PropertyGrid";

export const metadata: Metadata = {
  title: "Properties | MISA LTD",
  description:
    "Explore curated residential, commercial and land investment opportunities across Nigeria with MISALTD.",
  openGraph: {
    title: "Properties | MISA LTD",
    description:
      "Discover selected property opportunities across Nigeria.",
    type: "website",
  },
};

export default function PropertiesPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-ink">

        {/* HERO */}
        <section
          className="relative mb-4 isolate overflow-hidden border-b border-line bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/gems/house.jpeg')",
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 -z-10 bg-black/50" />

          {/* Gradient overlay */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/50 to-black/20" />

          {/* Decorative glow */}
          <div className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[500px] w-[500px] rounded-full bg-brand/10 blur-[120px]" />

          <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-32 sm:px-8 sm:pb-20 lg:px-10 lg:pt-40">

            <div className="max-w-3xl">

              <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.35em] text-brand">
                Property Collection
              </p>

              <h1 className="font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-7xl">
                Exceptional properties.
                <span className="block text-gold">
                  Considered opportunities.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-sm leading-8 text-soft sm:text-base">
                Discover carefully selected residential, commercial
                and land opportunities across Nigeria. From premium
                developments to strategic investment locations,
                explore properties worth knowing.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">

                <a
                  href="#property-listings"
                  className="inline-flex items-center gap-3 bg-brand px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-ink transition hover:bg-gold"
                >
                  Explore properties
                  
                </a>

                <a
                  href="/#contact"
                  className="border border-white/20 bg-white/5 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md transition hover:border-brand hover:text-brand"
                >
                  Contact MISA
                </a>

              </div>

            </div>

            {/* Bottom information */}
            <div className="mt-16 grid grid-cols-2 gap-4 border-t border-white/15 pt-7 sm:grid-cols-2">

              
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#ffb25a]">
                  Property types
                </p>
                <p className="mt-2 text-sm text-white">
                  Residential · Commercial · Land
                </p>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#ffb25a]">
                  Our approach
                </p>
                <p className="mt-2 text-sm text-white">
                  Curated property listings
                </p>
              </div>

            </div>

          </div>
        </section>
<PropertyGrid/>
        {/* PROPERTY LISTINGS */}
        <section
          id="property-listings"
          className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28"
        >

          <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

            <div>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-brand">
                Explore the collection
              </p>

              <h2 className="font-serif text-3xl text-white sm:text-4xl">
                Available properties
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-7 text-soft">
                Browse our property portfolio and find an opportunity
                that aligns with your requirements.
              </p>
            </div>

            <p className="text-xs uppercase tracking-[0.2em] text-muted">
              Selected opportunities / Nigeria
            </p>

          </div>

      

        </section>

      </main>

      <Footer />
    </>
  );
}