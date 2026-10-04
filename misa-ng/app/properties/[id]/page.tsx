import Image from "next/image";
import { notFound } from "next/navigation";
import LeadForm from "@/components/LeadForm";
import { properties, money } from "@/lib/data";

export function generateStaticParams() {
  return properties.map((p) => ({
    id: p.id,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const p = properties.find((x) => x.id === id);

  if (!p) {
    notFound();
  }

  return (
    <main className="wrap grid gap-12 py-20 lg:grid-cols-2">
      {/* PROPERTY IMAGE */}
      <div className="relative aspect-[4/5] w-full overflow-hidden border border-line bg-black/5">
        <Image
          src={p.image}
          alt={p.name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition duration-700 hover:scale-[1.02]"
        />

        {/* Image overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Property type */}
        <div className="absolute left-5 top-5">
          <span className="bg-black/70 px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] text-white backdrop-blur-sm">
            {p.type}
          </span>
        </div>
      </div>

      {/* PROPERTY DETAILS */}
      <div className="flex flex-col justify-center">
        <p className="eyebrow">
          {p.type} · {p.area}, {p.city}
        </p>

        <h1 className="mt-3 font-serif text-4xl leading-tight md:text-5xl lg:text-6xl">
          {p.name}
        </h1>

        <p className="mt-5 font-serif text-2xl text-brand md:text-3xl">
          {money(p.price)}
        </p>

        <p className="mt-2 text-sm text-soft">
          {p.detail}
        </p>

        <p className="mt-6 max-w-xl text-base leading-7 text-soft md:text-lg">
          {p.blurb}
          {p.beds !== "N/A" ? ` ${p.beds} bedrooms.` : ""}
        </p>

        {/* PROPERTY INFORMATION */}
        <div className="mt-8 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3">
          <div className="bg-[var(--background)] p-4">
            <p className="text-xs uppercase tracking-wider text-soft">
              Type
            </p>
            <p className="mt-1 text-sm font-medium">
              {p.type}
            </p>
          </div>

          <div className="bg-[var(--background)] p-4">
            <p className="text-xs uppercase tracking-wider text-soft">
              Location
            </p>
            <p className="mt-1 text-sm font-medium">
              {p.city}
            </p>
          </div>

          <div className="bg-[var(--background)] p-4">
            <p className="text-xs uppercase tracking-wider text-soft">
              Details
            </p>
            <p className="mt-1 text-sm font-medium">
              {p.detail}
            </p>
          </div>
        </div>

        {/* ENQUIRY FORM */}
        <div className="mt-10">
          <LeadForm
            type="property-enquiry"
            title="Enquire about this property"
            extra={{
              property: p.name,
              location: `${p.area}, ${p.city}`,
              type: p.type,
            }}
            cta="Send enquiry"
            steps={[
              [
                {
                  n: "name",
                  l: "Full name",
                  r: true,
                },
                {
                  n: "phone",
                  l: "Phone",
                  t: "tel",
                  r: true,
                },
                {
                  n: "email",
                  l: "Email",
                  t: "email",
                  r: true,
                },
                {
                  n: "message",
                  l: "Message",
                  t: "area",
                },
              ],
            ]}
          />
        </div>
      </div>
    </main>
  );
}