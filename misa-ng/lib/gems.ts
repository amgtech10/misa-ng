// lib/gems.ts

export type Gem = {
  id: string;
  name: string;
  category: "Gemstone" | "Mineral" | "Precious Metal";
  origin: string;
  price: string;
  detail: string;
  blurb: string;
  tone: string;
  image: string;
};

export const gems: Gem[] = [
  {
    id: "1",
    name: "Sapphire",
    category: "Gemstone",
    origin: "Origin available on request",
    price: "Price on request",
    detail: "Natural sapphire gemstone",
    blurb:
      "A precious gemstone admired for its captivating blue colour, brilliance, and timeless appeal.",
    tone: "#142B5C",
    image: "/images/gems/sapphire.jpg",
  },
  {
    id: "2",
    name: "Unprocessed Sapphire",
    category: "Gemstone",
    origin: "Colombia",
    price: "Price on request",
    detail: "Natural unprocessed sapphire",
    blurb:
      "A naturally occurring sapphire in its raw form, showcasing the beauty and character of an uncut gemstone.",
    tone: "#075E43",
    image: "/images/gems/unprocessed-sapphire.jpg",
  },
  {
    id: "3",
    name: "Lithium",
    category: "Mineral",
    origin: "Origin available on request",
    price: "Price on request",
    detail: "Lithium mineral",
    blurb:
      "A valuable mineral resource with significant applications in modern energy storage and advanced technologies.",
    tone: "#8B1538",
    image: "/images/gems/lithium.jpg",
  },
  {
    id: "4",
    name: "Raw Lithium",
    category: "Mineral",
    origin: "Origin available on request",
    price: "Price on request",
    detail: "Unprocessed lithium mineral",
    blurb:
      "Unprocessed lithium-bearing material representing an important resource for industrial and energy applications.",
    tone: "#A7B4C2",
    image: "/images/gems/lithium-raw.jpg",
  },
  {
    id: "5",
    name: "Beryllium",
    category: "Mineral",
    origin: "Mozambique",
    price: "Price on request",
    detail: "Beryllium mineral",
    blurb:
      "A rare and valuable mineral resource recognised for its importance in specialised industrial and technological applications.",
    tone: "#B7791F",
    image: "/images/gems/beryllium.jpg",
  },
  {
    id: "6",
    name: "Gold",
    category: "Precious Metal",
    origin: "Origin available on request",
    price: "Price on request",
    detail: "Natural gold",
    blurb:
      "A highly sought-after precious metal valued for its rarity, enduring worth, and importance in investment and jewellery.",
    tone: "#D4A017",
    image: "/images/gems/gold.jpg",
  },
];