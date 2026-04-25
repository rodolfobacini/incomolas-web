"use client";

import Link from "next/link";
import type { Product } from "@/lib/types";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { SpringImage } from "./SpringImage";
import { brl } from "@/lib/format";
import { useCart } from "@/store/cart";
import { IS_ECOMMERCE } from "@/lib/mode";

export function ProductCard({
  product,
  layout = "grid",
}: {
  product: Product;
  layout?: "grid" | "list";
}) {
  const add = useCart((s) => s.add);

  const isList = layout === "list";

  const onAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    add({
      slug: product.slug,
      name: product.shortName ?? product.name,
      category: product.categoryLabel,
      spec: product.spec,
      price: product.price,
      imageTone: product.imageTone,
      image: product.image,
    });
  };

  const PriceCell = () => {
    if (!IS_ECOMMERCE || product.price === 0) {
      return (
        <span className="font-display text-[14px] font-bold text-[color:var(--accent)] uppercase tracking-[0.06em]">
          Consulte
        </span>
      );
    }
    return (
      <div className="font-display text-[20px] font-extrabold text-text-1">
        <small className="text-[11px] font-normal text-text-3 mr-0.5">R$</small>
        {brl(product.price)}
      </div>
    );
  };

  const ActionBtn = () => {
    if (!IS_ECOMMERCE || product.price === 0) {
      return (
        <Button
          href={`/orcamento?p=${product.slug}`}
          variant="primary"
          size="sm"
        >
          Solicitar Orçamento
        </Button>
      );
    }
    return (
      <Button variant="primary" size="sm" onClick={onAdd}>
        + Carrinho
      </Button>
    );
  };

  return (
    <Link
      href={`/produto/${product.slug}`}
      className={
        isList
          ? "card-i grid grid-cols-[160px_1fr_auto] cursor-pointer"
          : "card-i block cursor-pointer"
      }
    >
      <div>
        <SpringImage
          tone={product.imageTone}
          size={isList ? "sm" : "md"}
          src={product.image}
          alt={product.name}
          label={product.spec.split(" · ").slice(0, 2).join(" · ")}
        />
      </div>
      <div className="p-4">
        <div className="font-display text-[10px] tracking-[0.14em] uppercase text-[color:var(--accent)] font-semibold mb-1">
          {product.categoryLabel}
        </div>
        <div className="font-display text-[18px] font-bold text-text-1 leading-[1.1] mb-1">
          {product.shortName ?? product.name}
        </div>
        <div className="font-mono text-[11px] text-text-3 mb-2.5 leading-[1.5]">
          {product.spec}
        </div>
        <div className="flex gap-1.5 flex-wrap mb-3">
          {product.badges.slice(0, 3).map((b, i) => (
            <Badge key={i} kind={b.kind}>
              {b.label}
            </Badge>
          ))}
        </div>
        {!isList && (
          <div className="flex items-center justify-between pt-3 border-t border-[var(--border)] gap-2">
            <PriceCell />
            <ActionBtn />
          </div>
        )}
      </div>
      {isList && (
        <div className="border-l border-[var(--border)] flex flex-col items-end justify-center gap-2.5 px-5 min-w-[180px]">
          <PriceCell />
          <ActionBtn />
        </div>
      )}
    </Link>
  );
}
