export type CategoryKey =
  | "academia"
  | "cama"
  | "jump"
  | "industrial"
  | "automotivo";

export type Material =
  | "Aço SAE 9254"
  | "Aço Carbono"
  | "Inox AISI 304"
  | "Aço Especial";

export type Acabamento = "Fosfato Preto" | "Zinco" | "Cromo" | "Natural";

export type Disponibilidade = "estoque" | "atacado" | "sobmedida";

export type ProductBadge =
  | { kind: "estoque"; label: string }
  | { kind: "atacado"; label: string }
  | { kind: "sobmedida"; label: string }
  | { kind: "kit"; label: string }
  | { kind: "par"; label: string }
  | { kind: "consulte"; label: string }
  | { kind: "neutro"; label: string };

export type BulkTier = { qty: string; price: string; save?: string };

export interface Product {
  slug: string;
  name: string;
  shortName?: string;
  category: CategoryKey;
  categoryLabel: string;
  ref: string;
  price: number;
  priceLabel?: string; // texto livre se "Consulte"
  unitLabel: string; // ex: "por par"
  spec: string; // texto curto exibido no card
  description: string[];
  material: Material;
  materials: Material[];
  acabamento: Acabamento;
  acabamentos: Acabamento[];
  disponibilidade: Disponibilidade[];
  badges: ProductBadge[];
  rating: number;
  ratingCount: number;
  bulk: BulkTier[];
  imageTone: "steel" | "zinc" | "green" | "chrome" | "dark";
  image?: string; // path em /public, ex: /products/mola-academia.png
  diameterWire: number; // mm
  // specs técnicas
  specs: {
    dimensoes: Array<{ key: string; value: string }>;
    desempenho: Array<{ key: string; value: string }>;
  };
}
