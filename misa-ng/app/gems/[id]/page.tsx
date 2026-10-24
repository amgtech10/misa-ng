import Image from "next/image";
import Link from "next/link";
import GemEnquiryButton from "@/components/GemEnquiryButton";
import { notFound } from "next/navigation";
import { gems } from "@/lib/gems";

export function generateStaticParams() {
  return gems.map((gem) => ({
    id: gem.id,
  }));
}

export default async function GemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const gem = gems.find((item) => item.id === id);

  if (!gem) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <Link
        href="/gems"
        className="text-sm text-soft hover:text-brand"
      >
        ← Back to gems
      </Link>

      <div className="mt-10 grid gap-12 md:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden border border-line">
          <Image
            src={gem.image}
            alt={gem.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="eyebrow">{gem.category}</p>

          <h1 className="mt-3 font-serif text-4xl md:text-6xl">
            {gem.name}
          </h1>

          <p className="mt-5 text-lg text-gold">
            {gem.price}
          </p>

          <p className="mt-6 leading-7 text-soft">
            {gem.blurb}
          </p>

          <div className="mt-8 space-y-4 border-y border-line py-6">
            <div className="flex justify-between gap-4">
              <span className="text-soft">Category</span>
              <span>{gem.category}</span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-soft">Origin</span>
              <span>{gem.origin}</span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-soft">Description</span>
              <span className="text-right">
                {gem.detail}
              </span>
            </div>
          </div>

          <GemEnquiryButton
            enquiryTitle={`Gem enquiry: ${gem.name}`}
          />
        </div>
      </div>
    </main>
  );
}