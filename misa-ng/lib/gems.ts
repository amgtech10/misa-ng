// lib/gems.ts

export type Gem = {
  id: string;
  name: string;
  category: "Diamond" | "Emerald" | "Ruby" | "Sapphire" | "Other";
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
    name: "Royal Blue Sapphire",
    category: "Sapphire",
    origin: "Sri Lanka",
    price: "Price on request",
    detail: "Natural blue sapphire",
    blurb:
      "A striking blue gemstone prized for its rich colour and timeless elegance.",
    tone: "#142B5C",
    image:
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: "2",
    name: "Colombian Emerald",
    category: "Emerald",
    origin: "Colombia",
    price: "Price on request",
    detail: "Natural green emerald",
    blurb:
      "A vibrant green gemstone celebrated for its distinctive colour and luxurious appeal.",
    tone: "#075E43",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: "3",
    name: "Ruby Elegance",
    category: "Ruby",
    origin: "Mozambique",
    price: "Price on request",
    detail: "Natural red ruby",
    blurb:
      "A bold red gemstone associated with passion, rarity, and classic jewellery design.",
    tone: "#8B1538",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: "4",
    name: "Brilliant Diamond",
    category: "Diamond",
    origin: "Origin available on request",
    price: "Price on request",
    detail: "Diamond collection",
    blurb:
      "A brilliant gemstone selected for its sparkle and timeless sophistication.",
    tone: "#A7B4C2",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: "5",
    name: "Golden Citrine",
    category: "Other",
    origin: "Origin available on request",
    price: "Price on request",
    detail: "Golden citrine gemstone",
    blurb:
      "A warm golden gemstone with a luminous appearance and distinctive character.",
    tone: "#B7791F",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: "6",
    name: "Amethyst Collection",
    category: "Other",
    origin: "Origin available on request",
    price: "Price on request",
    detail: "Purple amethyst gemstone",
    blurb:
      "A captivating purple gemstone suited to elegant jewellery and collector collections.",
    tone: "#68449A",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1600&q=85",
  },
]; 