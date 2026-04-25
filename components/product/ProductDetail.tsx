"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { QtyCtrl } from "../ui/QtyCtrl";
import { SpringImage } from "../ui/SpringImage";
import { ProductCard } from "../ui/ProductCard";
import { brl } from "@/lib/format";
import { useCart } from "@/store/cart";
import { LoadCalculator } from "./LoadCalculator";
import { IS_ECOMMERCE } from "@/lib/mode";

export function ProductDetail({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const [material, setMaterial] = useState(product.material);
  const [acabamento, setAcabamento] = useState(product.acabamento);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"specs" | "desc" | "reviews">("specs");
  const [thumbIdx, setThumbIdx] = useState(0);
  const add = useCart((s) => s.add);

  const onAddToCart = () => {
    add(
      {
        slug: product.slug,
        name: product.shortName ?? product.name,
        category: product.categoryLabel,
        spec: `${product.spec} · ${material} · ${acabamento}`,
        price: product.price,
        imageTone: product.imageTone,
        image: product.image,
      },
      qty,
    );
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="py-4 border-b border-[var(--border)]">
        <div className="container-i flex items-center gap-2 flex-wrap">
          <Link className="font-body text-[13px] text-text-3 hover:text-text-2" href="/">
            Início
          </Link>
          <span className="text-[var(--border-2)]">›</span>
          <Link className="font-body text-[13px] text-text-3 hover:text-text-2" href="/catalogo">
            Catálogo
          </Link>
          <span className="text-[var(--border-2)]">›</span>
          <Link
            className="font-body text-[13px] text-text-3 hover:text-text-2"
            href={`/catalogo?cat=${product.category}`}
          >
            {product.categoryLabel}
          </Link>
          <span className="text-[var(--border-2)]">›</span>
          <span className="font-body text-[13px] text-text-2">{product.name}</span>
        </div>
      </div>

      {/* HERO */}
      <section className="py-10 border-b border-[var(--border)]">
        <div className="container-i">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* Gallery */}
            <div className="flex flex-col gap-3 md:sticky md:top-20">
              <div className="card-i h-[420px] flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-4 left-4 z-10">
                  <Badge kind="estoque">Em Estoque</Badge>
                </div>
                <SpringImage
                  tone={product.imageTone}
                  size="xl"
                  src={product.image}
                  alt={product.name}
                  label={product.spec}
                />
              </div>
              <div className="flex gap-2.5">
                {[0, 1, 2, 3].map((i) => (
                  <button
                    key={i}
                    onClick={() => setThumbIdx(i)}
                    className={`flex-1 h-[90px] rounded-md border transition-colors overflow-hidden ${
                      thumbIdx === i
                        ? "border-[color:var(--accent)]"
                        : "border-[var(--border)] hover:border-[var(--border-2)]"
                    }`}
                  >
                    <SpringImage
                      tone={product.imageTone}
                      size="sm"
                      src={product.image}
                      alt={product.name}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="pt-1">
              <div className="font-display text-[11px] font-bold tracking-[0.18em] uppercase text-[color:var(--accent)] mb-2.5">
                {product.categoryLabel}
              </div>
              <h1 className="font-display text-[44px] font-black text-text-1 leading-none mb-3">
                {product.name}
              </h1>
              <div className="font-mono text-[12px] text-text-3 mb-4">
                REF: {product.ref}
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {product.badges.map((b, i) => (
                  <Badge key={i} kind={b.kind}>
                    {b.label}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-2 mb-5">
                <Stars rating={product.rating} />
                <span className="font-body text-[13px] text-text-3">
                  {product.rating.toFixed(1)} · {product.ratingCount} avaliações
                </span>
              </div>

              <hr className="border-[var(--border)] my-6" />

              {/* Variants */}
              {product.materials.length > 1 && (
                <div className="mb-6">
                  <div className="font-display text-[12px] font-bold tracking-[0.1em] uppercase text-text-3 mb-2.5">
                    Material
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.materials.map((m) => (
                      <VariantBtn
                        key={m}
                        active={material === m}
                        onClick={() => setMaterial(m)}
                      >
                        {m}
                      </VariantBtn>
                    ))}
                  </div>
                </div>
              )}
              {product.acabamentos.length > 1 && (
                <div className="mb-6">
                  <div className="font-display text-[12px] font-bold tracking-[0.1em] uppercase text-text-3 mb-2.5">
                    Acabamento
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.acabamentos.map((a) => (
                      <VariantBtn
                        key={a}
                        active={acabamento === a}
                        onClick={() => setAcabamento(a)}
                      >
                        {a}
                      </VariantBtn>
                    ))}
                  </div>
                </div>
              )}

              <hr className="border-[var(--border)] my-6" />

              {/* Price (apenas em modo ecommerce com preço) */}
              {IS_ECOMMERCE && product.price > 0 && (
                <div className="mb-6">
                  <div className="font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-text-3 mb-1">
                    Preço unitário ({product.unitLabel.split(" · ")[0]})
                  </div>
                  <div className="font-display text-[48px] font-black text-text-1 leading-none">
                    <small className="text-[20px] font-normal text-text-3 mr-0.5 align-super">
                      R$
                    </small>{" "}
                    {brl(product.price)}
                  </div>
                  <div className="font-body text-[13px] text-text-3 mt-1">
                    {product.unitLabel}
                  </div>
                  {/* Bulk */}
                  <div className="mt-3 p-3.5 rounded-md bg-bg-3 border border-[var(--border)]">
                    <div className="font-display text-[11px] font-bold uppercase tracking-[0.1em] text-text-3 mb-2">
                      Tabela de volume
                    </div>
                    <div className="flex flex-col gap-1.5">
                      {product.bulk.map((b) => (
                        <div
                          key={b.qty}
                          className="flex justify-between items-center"
                        >
                          <span className="font-body text-[13px] text-text-2">
                            {b.qty}
                          </span>
                          <div className="flex items-center gap-2.5">
                            <span className="font-display text-[15px] font-bold text-text-1">
                              {b.price}
                            </span>
                            {b.save && (
                              <span
                                className="font-display text-[11px] font-bold"
                                style={{ color: "var(--green)" }}
                              >
                                {b.save}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Catalog mode: bloco de "Consulte preço" */}
              {(!IS_ECOMMERCE || product.price === 0) && (
                <div className="mb-6">
                  <div className="font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-text-3 mb-1">
                    Investimento
                  </div>
                  <div className="font-display text-[36px] font-black text-[color:var(--accent)] leading-none mb-2">
                    Consulte
                  </div>
                  <p className="font-body text-[14px] text-text-2 leading-[1.6]">
                    Cotação personalizada conforme volume, acabamento e prazo.
                    Resposta da engenharia em até 24h úteis.
                  </p>
                </div>
              )}

              {/* CTA */}
              {IS_ECOMMERCE && product.price > 0 ? (
                <>
                  <div className="flex gap-3 items-center mb-3">
                    <QtyCtrl value={qty} onChange={setQty} size="lg" />
                    <Button
                      variant="primary"
                      size="lg"
                      className="flex-1 justify-center"
                      onClick={onAddToCart}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                      </svg>
                      Adicionar ao Carrinho
                    </Button>
                  </div>
                  <Button
                    href={`/orcamento?p=${product.slug}`}
                    variant="steel"
                    className="w-full justify-center"
                  >
                    Solicitar Orçamento — grandes lotes
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    href={`/orcamento?p=${product.slug}`}
                    variant="primary"
                    size="lg"
                    className="w-full justify-center"
                  >
                    Solicitar Orçamento
                  </Button>
                  <Button
                    href="https://wa.me/5511900000000?text=Ol%C3%A1%2C+gostaria+de+um+or%C3%A7amento+da+mola"
                    variant="green"
                    className="w-full justify-center mt-2.5"
                  >
                    Falar no WhatsApp
                  </Button>
                </>
              )}

              <hr className="border-[var(--border)] my-6" />
              <div className="flex gap-4 flex-wrap">
                <Trust label="Qualidade garantida" />
                <Trust label="Fabricação própria" />
                <Trust label="Compra segura" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TABS */}
      <section className="py-14 border-b border-[var(--border)]">
        <div className="container-i">
          <div className="flex border-b border-[var(--border)] mb-10">
            {(
              [
                ["specs", "Especificações Técnicas"],
                ["desc", "Descrição"],
                ["reviews", `Avaliações (${product.ratingCount})`],
              ] as const
            ).map(([k, l]) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`font-display text-[14px] font-bold tracking-[0.08em] uppercase px-6 py-3.5 border-b-2 -mb-px cursor-pointer transition-colors ${
                  tab === k
                    ? "text-text-1 border-[color:var(--accent)]"
                    : "text-text-3 border-transparent hover:text-text-2"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {tab === "specs" && <SpecsTables product={product} />}
          {tab === "desc" && (
            <div className="max-w-[760px]">
              {product.description.map((p, i) => (
                <p
                  key={i}
                  className="font-body text-[16px] text-text-2 leading-[1.8] mb-4.5"
                >
                  {p}
                </p>
              ))}
              <div className="flex gap-3 mt-7">
                <Button variant="ghost">Baixar Datasheet PDF</Button>
                <Button variant="ghost">Solicitar Amostra</Button>
              </div>
            </div>
          )}
          {tab === "reviews" && <Reviews product={product} />}
        </div>
      </section>

      {/* CALCULATOR */}
      {product.price > 0 && (
        <section className="py-14 border-b border-[var(--border)]">
          <div className="container-i">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              <div>
                <span className="section-label">Calculadora</span>
                <h2 className="font-display text-[32px] font-extrabold text-text-1 mb-2">
                  Verifique a aplicação da sua mola
                </h2>
                <p className="font-body text-[15px] text-text-2 leading-[1.65] mb-7">
                  Informe a carga estimada e o curso necessário. A calculadora
                  estima a deflexão e indica se esta mola atende ao projeto.
                </p>
                <div className="card-i p-7 hover:translate-y-0">
                  <div className="font-display text-[13px] font-bold uppercase tracking-[0.1em] text-text-3 mb-3">
                    Especificações desta mola
                  </div>
                  {product.specs.dimensoes.slice(0, 4).map((row) => (
                    <div
                      key={row.key}
                      className="flex justify-between py-2 border-b border-[var(--border)] last:border-0"
                    >
                      <span className="font-body text-[13px] text-text-2">
                        {row.key}
                      </span>
                      <span className="font-mono text-[13px] text-text-1 font-semibold">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <LoadCalculator product={product} />
            </div>
          </div>
        </section>
      )}

      {/* RELATED */}
      <section className="py-14">
        <div className="container-i">
          <span className="section-label">Você também pode gostar</span>
          <h2 className="font-display text-[36px] font-extrabold text-text-1 mb-7">
            Produtos relacionados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function VariantBtn({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`font-display text-[13px] font-bold tracking-[0.06em] uppercase px-4 py-2 rounded-md border-[1.5px] cursor-pointer transition-colors ${
        active
          ? "text-[color:var(--accent)]"
          : "bg-bg-3 text-text-2 border-[var(--border)] hover:text-text-1 hover:border-[var(--border-2)]"
      }`}
      style={
        active
          ? {
              background: "var(--accent-bg)",
              borderColor: "var(--accent)",
            }
          : {}
      }
    >
      {children}
    </button>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          width="14"
          height="14"
          viewBox="0 0 16 16"
          style={{
            fill: "var(--accent)",
            opacity: rating >= n ? 1 : 0.3,
          }}
        >
          <path d="M8 1l2.09 4.26L15 6.27l-3.5 3.41.83 4.82L8 12.27l-4.33 2.23.83-4.82L1 6.27l4.91-.01L8 1z" />
        </svg>
      ))}
    </div>
  );
}

function Trust({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="oklch(66% 0.19 145)"
      >
        <path d="M6.5 11.5l-3-3 1.5-1.5 1.5 1.5L11 3.5 12.5 5z" />
      </svg>
      <span className="font-body text-[12px] text-text-3">{label}</span>
    </div>
  );
}

function SpecsTables({ product }: { product: Product }) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SpecTable title="Dimensões" rows={product.specs.dimensoes} />
        <SpecTable title="Material e desempenho" rows={product.specs.desempenho} />
      </div>
      <div className="mt-4 p-4 rounded-md bg-bg-3 border border-[var(--border)] flex items-center gap-2.5">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--text-3)" strokeWidth="1.5" strokeLinecap="round">
          <circle cx="8" cy="8" r="7" />
          <line x1="8" y1="5" x2="8" y2="8" />
          <line x1="8" y1="11" x2="8" y2="11.5" />
        </svg>
        <span className="font-body text-[13px] text-text-3">
          Tolerâncias dimensionais conforme NBR 8065. Especificações
          personalizadas disponíveis para pedidos acima de 50 pares.
        </span>
      </div>
    </>
  );
}

function SpecTable({
  title,
  rows,
}: {
  title: string;
  rows: { key: string; value: string }[];
}) {
  return (
    <div className="border border-[var(--border)] rounded-md overflow-hidden">
      <div
        className="font-display text-[13px] font-bold uppercase tracking-[0.1em] px-5 py-3.5 bg-bg-3 border-b border-[var(--border)]"
        style={{ color: "var(--accent)" }}
      >
        {title}
      </div>
      {rows.map((r, i) => (
        <div
          key={r.key}
          className={`flex justify-between items-center px-5 py-3 hover:bg-bg-3 ${
            i < rows.length - 1 ? "border-b border-[var(--border)]" : ""
          }`}
        >
          <span className="font-body text-[13px] text-text-2">{r.key}</span>
          <span className="font-mono text-[13px] text-text-1 font-semibold">
            {r.value}
          </span>
        </div>
      ))}
    </div>
  );
}

function Reviews({ product }: { product: Product }) {
  const samples = [
    {
      name: "Roberto S.",
      role: "Academia",
      stars: 5,
      text: "Comprei 30 pares e vieram impecáveis. Ajuste exato nas barras olímpicas e nenhum sinal de fadiga após 4 meses de uso.",
    },
    {
      name: "Ana P.",
      role: "Distribuidora",
      stars: 4,
      text: "Atendimento rápido para atacado. Entrega no prazo. Preço competitivo nos lotes maiores.",
    },
    {
      name: "Eng. Lucas",
      role: "Fab. Equipamentos",
      stars: 4,
      text: "Especificação técnica conforme datasheet. A constante k bate certinho com o catálogo.",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-10 items-start">
      <div className="card-i p-6 text-center hover:translate-y-0">
        <div className="font-display text-[64px] font-black text-text-1 leading-none">
          {product.rating.toFixed(1)}
        </div>
        <div className="flex justify-center my-2">
          <Stars rating={product.rating} />
        </div>
        <div className="font-body text-[12px] text-text-3">
          {product.ratingCount} avaliações
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {samples.map((s) => (
          <div key={s.name} className="card-i p-5 hover:translate-y-0">
            <div className="flex items-center justify-between mb-2.5">
              <div>
                <div className="font-display text-[14px] font-bold text-text-1">
                  {s.name}
                </div>
                <div className="font-display text-[11px] tracking-[0.08em] uppercase text-text-3">
                  {s.role}
                </div>
              </div>
              <Stars rating={s.stars} />
            </div>
            <p className="font-body text-[14px] text-text-2 leading-[1.7]">
              {s.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
