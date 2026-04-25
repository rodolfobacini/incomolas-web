"use client";

import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import { SpringImage } from "../ui/SpringImage";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { brl } from "@/lib/format";
import { useCart } from "@/store/cart";
import { IS_ECOMMERCE } from "@/lib/mode";
import type { Product } from "@/lib/types";

export function FeaturedGrid() {
  const featured = PRODUCTS[0]; // Mola Barra Olímpica
  const cards = PRODUCTS.slice(1, 5);
  const add = useCart((s) => s.add);

  const renderPrice = (p: Product, big = false) => {
    if (!IS_ECOMMERCE || p.price === 0) {
      return (
        <span
          className={`font-display font-extrabold uppercase tracking-[0.06em] text-[color:var(--accent)] ${
            big ? "text-[26px]" : "text-[16px]"
          }`}
        >
          Consulte
        </span>
      );
    }
    return (
      <div
        className={`font-display font-extrabold text-text-1 ${
          big ? "text-[30px]" : "text-[20px]"
        }`}
      >
        <small className="text-[13px] font-normal text-text-3">R$</small>{" "}
        {brl(p.price)}
      </div>
    );
  };

  const renderAction = (p: Product) => {
    if (!IS_ECOMMERCE || p.price === 0) {
      return (
        <Button
          href={`/orcamento?p=${p.slug}`}
          variant="primary"
          size="sm"
        >
          Solicitar Orçamento
        </Button>
      );
    }
    return (
      <Button
        variant="primary"
        size="sm"
        onClick={(e) => {
          e.preventDefault();
          add({
            slug: p.slug,
            name: p.shortName ?? p.name,
            category: p.categoryLabel,
            spec: p.spec,
            price: p.price,
            imageTone: p.imageTone,
            image: p.image,
          });
        }}
      >
        + Carrinho
      </Button>
    );
  };

  return (
    <section className="py-20 border-b border-[var(--border)]">
      <div className="container-i">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="section-label">Em destaque</span>
            <h2 className="font-display text-[42px] font-extrabold text-text-1 leading-tight">
              Produtos mais procurados
            </h2>
          </div>
          <Button href="/catalogo" variant="ghost">
            Ver catálogo completo →
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* hero card spans 2 rows */}
          <Link
            href={`/produto/${featured.slug}`}
            className="card-i md:row-span-2 cursor-pointer block"
          >
            <SpringImage
              tone={featured.imageTone}
              size="xl"
              src={featured.image}
              alt={featured.name}
              label={featured.spec.split(" · ").slice(0, 2).join(" · ")}
            />
            <div className="p-7">
              <div className="font-display text-[11px] tracking-[0.14em] uppercase text-[color:var(--accent)] font-semibold mb-1.5">
                Mais vendido · {featured.categoryLabel}
              </div>
              <div className="font-display text-[28px] font-bold text-text-1 leading-[1.1] mb-2">
                {featured.name}
              </div>
              <div className="font-mono text-[13px] text-text-3 mb-3">
                {featured.spec} · Tratamento anticorrosão
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3.5">
                {featured.badges.map((b, i) => (
                  <Badge key={i} kind={b.kind}>
                    {b.label}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-[var(--border)] gap-3">
                <div>
                  {IS_ECOMMERCE && featured.price > 0 && (
                    <div className="font-display text-[12px] uppercase tracking-[0.06em] text-text-3">
                      a partir de
                    </div>
                  )}
                  {renderPrice(featured, true)}
                </div>
                <div className="flex gap-2.5">
                  <Button variant="outline" size="sm">
                    Especificações
                  </Button>
                  {renderAction(featured)}
                </div>
              </div>
            </div>
          </Link>

          {cards.map((p) => (
            <Link
              key={p.slug}
              href={`/produto/${p.slug}`}
              className="card-i cursor-pointer block"
            >
              <SpringImage
                tone={p.imageTone}
                size="md"
                src={p.image}
                alt={p.name}
                label={p.spec.split(" · ").slice(0, 2).join(" · ")}
              />
              <div className="p-5">
                <div className="font-display text-[11px] tracking-[0.14em] uppercase text-[color:var(--accent)] font-semibold mb-1">
                  {p.categoryLabel}
                </div>
                <div className="font-display text-[18px] font-bold text-text-1 mb-1">
                  {p.shortName ?? p.name}
                </div>
                <div className="font-mono text-[12px] text-text-3 mb-3">
                  {p.spec}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[var(--border)] gap-2">
                  {renderPrice(p)}
                  {renderAction(p)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
