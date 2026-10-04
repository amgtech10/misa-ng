import PropertyGrid from "@/components/PropertyGrid";

export const metadata = {
  title: "Properties | MISA NG LTD",
  description:
    "Explore curated residential, commercial and land opportunities across Nigeria with MISA NG LTD.",
};

export default function Page() {
  return (
    <main>
      {/* PAGE INTRO */}
      <section className="wrap py-20 md:py-28">
        <p className="eyebrow">Property listings</p>

        <h1 className="mt-3 max-w-3xl font-serif text-5xl leading-[0.95] md:text-6xl lg:text-7xl">
          Properties worth
          <br />
          <span className="text-brand">looking twice.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-7 text-soft md:text-lg">
          Explore residential, commercial and land opportunities reviewed
          by MISA NG before they reach our network.
        </p>

        {/* Quick stats */}
        <div className="mt-10 flex flex-wrap gap-8 border-t border-line pt-6">
          <div>
            <p className="font-serif text-2xl">06</p>
            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-soft">
              Featured listings
            </p>
          </div>

          <div>
            <p className="font-serif text-2xl">03</p>
            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-soft">
              Property types
            </p>
          </div>

          <div>
            <p className="font-serif text-2xl">02</p>
            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-soft">
              Major markets
            </p>
          </div>
        </div>
      </section>

      {/* LISTINGS */}
      <section className="wrap pb-24">
        <PropertyGrid />
      </section>
    </main>
  );
}