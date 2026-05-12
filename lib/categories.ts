import type { CategoryKey } from "./types";

export const CATEGORY_IMAGES: Record<CategoryKey, string> = {
  agricola: "/products/mola-industrial.png",
  academia: "/products/mola-academia.png",
  cama: "/products/mola-cama-elastica.png",
  jump: "/products/mola-jump.png",
  industrial: "/products/mola-industrial.png",
  automotivo: "/products/mola-carros.png",
  carroceria: "/products/mola-caminhao.png",
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
    count: 58,
  },
  {
    key: "agricola",
    label: "Agrícola",
    short: "Plantio · colheita · tração",
    desc: "Molas para plantadeiras, semeadeiras, colheitadeiras e implementos agrícolas — linha completa por fabricante.",
    count: 26,
  },
  {
    key: "academia",
    label: "Academia",
    short: "Barras, halteres, pesos",
    desc: "Molas para barras olímpicas, halteres e equipamentos de musculação.",
    count: 4,
  },
  {
    key: "cama",
    label: "Cama Elástica",
    short: "4m · 4,5m · 6m+",
    desc: "Kits completos de molas para camas elásticas residenciais e profissionais.",
    count: 2,
  },
  {
    key: "jump",
    label: "Jump / Mini Cama",
    short: "Profissional",
    desc: "Molas para jumps profissionais e mini camas elásticas de academia.",
    count: 1,
  },
  {
    key: "industrial",
    label: "Industrial",
    short: "Projetos especiais",
    desc: "Molas de compressão, extensão e torção para aplicações industriais sob medida.",
    count: 2,
  },
  {
    key: "automotivo",
    label: "Automotivo",
    short: "Carros · caminhões",
    desc: "Molas helicoidais para suspensão de veículos leves, caminhões e linha pesada (Scania, Volvo, Mercedes-Benz).",
    count: 10,
  },
  {
    key: "carroceria",
    label: "Carroceria",
    short: "Engates · dobradiças · pinos",
    desc: "Peças para carrocerias, carretas e implementos: dobradiças, engates, presilhas, arruelas e correntes.",
    count: 13,
  },
];

export const FABRICANTES_AGRICOLAS = [
  "Baldan",
  "Montana",
  "Tatu",
  "Jumil",
  "Semeato",
  "Massey Ferguson",
  "New Holland",
  "Jacto",
  "SLC",
  "Ideal",
  "Nogueira",
  "Menegas",
] as const;

export const MATERIAIS = [
  { value: "Aço SAE 9254", count: 28 },
  { value: "Aço Carbono", count: 18 },
  { value: "Inox AISI 304", count: 8 },
  { value: "Aço Especial", count: 4 },
] as const;

export const ACABAMENTOS = [
  { value: "Fosfato Preto", count: 22 },
  { value: "Zinco", count: 20 },
  { value: "Cromo", count: 10 },
  { value: "Natural", count: 6 },
] as const;

export const DISPONIBILIDADES = [
  { value: "estoque" as const, label: "Em Estoque", count: 40 },
  { value: "atacado" as const, label: "Disponível Atacado", count: 34 },
  { value: "sobmedida" as const, label: "Sob Medida", count: 16 },
];
