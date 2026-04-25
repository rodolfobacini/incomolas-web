import { notFound } from "next/navigation";
import { getProduct, getRelated, PRODUCTS } from "@/lib/products";
import { ProductDetail } from "@/components/product/ProductDetail";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = getProduct(params.slug);
  if (!p) return { title: "Produto não encontrado — Incomolas" };
  return {
    title: `${p.name} — Incomolas`,
    description: p.description[0],
  };
}

export default function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProduct(params.slug);
  if (!product) notFound();
  const related = getRelated(params.slug);
  return <ProductDetail product={product} related={related} />;
}
