import type { CategoryKey } from "./types";

export const CATEGORY_IMAGES: Record<CategoryKey, string> = {
  academia: "/products/mola-academia.png",
  cama: "/products/mola-cama-elastica.png",
  jump: "/products/mola-jump.png",
  industrial: "/products/mola-industrial.png",
  automotivo: "/products/mola-carros.png",
};

export const CATEGORIES: {
  key: CategoryKey | "todos";
  label: string;
  short?: string;
  desc: string;
  count: number;
}[] = [
  {
    key: "todos",
    label: "Todos os produtos",
    desc: "Linha completa Incomolas",
    count: 47,
  },
  {
    key: "academia",
    label: "Academia",
    short: "Barras, halteres, pesos",
    desc: "Molas para barras olímpicas, halteres e equipamentos de musculação.",
    count: 18,
  },
  {
    key: "cama",
    label: "Cama Elástica",
    short: "4m · 4,5m · 6m+",
    desc: "Kits completos de molas para camas elásticas residenciais e profissionais.",
    count: 12,
  },
  {
    key: "jump",
    label: "Jump / Mini Cama",
    short: "Profissional",
    desc: "Molas para jumps profissionais e mini camas elásticas de academia.",
    count: 8,
  },
  {
    key: "industrial",
    label: "Industrial",
    short: "Projetos especiais",
    desc: "Molas de compressão, extensão e torção para aplicações industriais sob medida.",
    count: 9,
  },
  {
    key: "automotivo",
    label: "Automotivo",
    short: "Carros · caminhões",
    desc: "Molas helicoidais para suspensão de veículos leves e pesados, sob medida.",
    count: 6,
  },
];

export const MATERIAIS = [
  { value: "Aço SAE 9254", count: 22 },
  { value: "Aço Carbono", count: 14 },
  { value: "Inox AISI 304", count: 8 },
  { value: "Aço Especial", count: 3 },
] as const;

export const ACABAMENTOS = [
  { value: "Fosfato Preto", count: 18 },
  { value: "Zinco", count: 16 },
  { value: "Cromo", count: 9 },
  { value: "Natural", count: 4 },
] as const;

export const DISPONIBILIDADES = [
  { value: "estoque" as const, label: "Em Estoque", count: 34 },
  { value: "atacado" as const, label: "Disponível Atacado", count: 28 },
  { value: "sobmedida" as const, label: "Sob Medida", count: 13 },
];
