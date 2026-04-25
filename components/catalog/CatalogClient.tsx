"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS } from "@/lib/products";
import { CATEGORIES } from "@/lib/categories";
import { Sidebar, INITIAL_FILTER, type FilterState } from "./Sidebar";
import { ProductCard } from "../ui/ProductCard";
import type { Product, CategoryKey } from "@/lib/types";

type SortKey = "relevance" | "price-asc" | "price-desc" | "name";

export function CatalogClient() {
  const params = useSearchParams();
  const [filter, setFilter] = useState<FilterState>(INITIAL_FILTER);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState<SortKey>("relevance");

  // Sync ?cat= from URL into filter
  useEffect(() => {
    const cat = params.get("cat");
    if (cat) setFilter((f) => ({ ...f, cats: [cat] }));
  }, [params]);

  const activeCat: CategoryKey | "todos" =
    filter.cats.length === 1
      ? (filter.cats[0] as CategoryKey)
      : ("todos" as const);

  const filtered = useMemo(() => {
    let list: Product[] = PRODUCTS;
    if (filter.cats.length) list = list.filter((p) => filter.cats.includes(p.category));
    if (filter.materiais.length)
      list = list.filter((p) => filter.materiais.includes(p.material));
    if (filter.acabamentos.length)
      list = list.filter((p) => filter.acabamentos.includes(p.acabamento));
    if (filter.disp.length)
      list = list.filter((p) => p.disponibilidade.some((d) => filter.disp.includes(d)));
    if (filter.q.trim()) {
      const q = filter.q.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.spec.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q),
      );
    }
    if (filter.priceMax < 500)
      list = list.filter((p) => p.price === 0 || p.price <= filter.priceMax);
    list = list.filter(
      (p) =>
        p.diameterWire === 0 ||
        (p.diameterWire >= filter.wireMin && p.diameterWire <= filter.wireMax),
    );

    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [filter, sort]);

  return (
    <>
      {/* HERO */}
      <div
        className="py-10 border-b border-[var(--border)]"
        style={{
          background:
            "radial-gradient(ellipse 80% 100% at 50% 0%, oklch(16% 0.06 38 / 35%) 0%, transparent 70%)",
        }}
      >
        <div className="container-i flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-[56px] font-black text-text-1 leading-none">
              Catálogo de Molas
            </h1>
            <p className="font-body text-[15px] text-text-2 mt-2">
              Linha completa — academia, cama elástica, jump e industrial ·{" "}
              <strong className="text-text-1">{PRODUCTS.length} produtos</strong>
            </p>
          </div>
        </div>
      </div>

      {/* CATEGORY TABS */}
      <div className="border-b border-[var(--border)] sticky top-16 z-[90] bg-bg">
        <div className="container-i">
          <div className="flex gap-0 overflow-x-auto no-scrollbar">
            {CATEGORIES.map((c) => {
              const active =
                (c.key === "todos" && filter.cats.length === 0) ||
                (filter.cats.length === 1 && filter.cats[0] === c.key);
              return (
                <button
                  key={c.key}
                  onClick={() =>
                    setFilter({
                      ...filter,
                      cats: c.key === "todos" ? [] : [c.key],
                    })
                  }
                  className={`font-display text-[13px] font-bold tracking-[0.08em] uppercase px-6 py-3.5 border-b-2 -mb-px whitespace-nowrap flex items-center gap-2 transition-colors ${
                    active
                      ? "text-text-1 border-[color:var(--accent)]"
                      : "text-text-3 border-transparent hover:text-text-2"
                  }`}
                >
                  {c.label}
                  <span
                    className={`font-display text-[10px] rounded-full px-1.5 py-0.5 border ${
                      active
                        ? "bg-[color:var(--accent-bg)] border-[color:oklch(30%_0.1_38)] text-[color:var(--accent)]"
                        : "bg-bg-3 border-[var(--border)] text-text-3"
                    }`}
                  >
                    {c.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="container-i">
        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 py-8 pb-20 items-start">
          <Sidebar filter={filter} setFilter={setFilter} />
          <main>
            {/* toolbar */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div className="font-display text-[14px] text-text-3">
                <strong className="text-text-1">{filtered.length}</strong>{" "}
                produtos encontrados
              </div>
              <div className="flex gap-2.5 items-center">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="bg-bg-3 border-[1.5px] border-[var(--border)] rounded-md text-text-2 font-display text-[12px] font-semibold tracking-[0.06em] uppercase px-3.5 py-2 outline-none cursor-pointer"
                >
                  <option value="relevance">Relevância</option>
                  <option value="price-asc">Menor preço</option>
                  <option value="price-desc">Maior preço</option>
                  <option value="name">Nome A–Z</option>
                </select>
                <div className="flex gap-1">
                  <button
                    type="button"
                    aria-label="Visualização em grade"
                    onClick={() => setView("grid")}
                    className={`w-9 h-9 grid place-items-center rounded-md cursor-pointer transition-colors ${
                      view === "grid"
                        ? "bg-[color:var(--accent-bg)] border border-[color:var(--accent)]"
                        : "bg-bg-3 border border-[var(--border)]"
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="var(--text-2)">
                      <rect x="0" y="0" width="6" height="6" rx="1" />
                      <rect x="8" y="0" width="6" height="6" rx="1" />
                      <rect x="0" y="8" width="6" height="6" rx="1" />
                      <rect x="8" y="8" width="6" height="6" rx="1" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    aria-label="Visualização em lista"
                    onClick={() => setView("list")}
                    className={`w-9 h-9 grid place-items-center rounded-md cursor-pointer transition-colors ${
                      view === "list"
                        ? "bg-[color:var(--accent-bg)] border border-[color:var(--accent)]"
                        : "bg-bg-3 border border-[var(--border)]"
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="var(--text-2)">
                      <rect x="0" y="0" width="14" height="3" rx="1" />
                      <rect x="0" y="5.5" width="14" height="3" rx="1" />
                      <rect x="0" y="11" width="14" height="3" rx="1" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* active tags */}
            <ActiveTags filter={filter} setFilter={setFilter} />

            {/* GRID */}
            {filtered.length === 0 ? (
              <div className="card-i p-12 text-center">
                <div className="font-display text-[20px] font-bold text-text-1 mb-2">
                  Nenhum produto encontrado
                </div>
                <div className="font-body text-[14px] text-text-3">
                  Ajuste os filtros ou busque por outro termo.
                </div>
              </div>
            ) : (
              <div
                className={
                  view === "grid"
                    ? "grid grid-cols-1 md:grid-cols-3 gap-4"
                    : "grid grid-cols-1 gap-4"
                }
              >
                {filtered.map((p) => (
                  <ProductCard key={p.slug} product={p} layout={view} />
                ))}
              </div>
            )}

            {/* PAGINATION (mock) */}
            <div className="flex items-center justify-center gap-2 pt-10">
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  className={`w-9 h-9 grid place-items-center font-display text-[14px] font-bold border-[1.5px] rounded-md cursor-pointer transition-colors ${
                    n === 1
                      ? "border-[color:var(--accent)] text-white"
                      : "border-[var(--border)] bg-bg-3 text-text-2 hover:border-[var(--border-2)]"
                  }`}
                  style={n === 1 ? { background: "var(--accent)" } : {}}
                >
                  {n}
                </button>
              ))}
              <span className="text-text-3 font-display">…</span>
              <button className="w-9 h-9 grid place-items-center font-display text-[14px] font-bold border-[1.5px] border-[var(--border)] bg-bg-3 text-text-2 rounded-md">
                6
              </button>
              <button className="px-3.5 h-9 grid place-items-center font-display text-[14px] font-bold border-[1.5px] border-[var(--border)] bg-bg-3 text-text-2 rounded-md">
                Próxima →
              </button>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

function ActiveTags({
  filter,
  setFilter,
}: {
  filter: FilterState;
  setFilter: (f: FilterState) => void;
}) {
  const all = [
    ...filter.cats.map((v) => ({ k: "cats" as const, v })),
    ...filter.materiais.map((v) => ({ k: "materiais" as const, v })),
    ...filter.acabamentos.map((v) => ({ k: "acabamentos" as const, v })),
    ...filter.disp.map((v) => ({ k: "disp" as const, v })),
  ];
  if (all.length === 0) return null;
  return (
    <div className="flex gap-2 flex-wrap mb-4">
      {all.map(({ k, v }) => (
        <div
          key={`${k}-${v}`}
          className="flex items-center gap-1.5 font-display text-[11px] font-semibold tracking-[0.06em] uppercase rounded-sm px-2.5 py-1"
          style={{
            background: "var(--accent-bg)",
            border: "1px solid oklch(30% 0.1 38)",
            color: "var(--accent)",
          }}
        >
          {v}
          <button
            type="button"
            onClick={() =>
              setFilter({
                ...filter,
                [k]: (filter[k] as string[]).filter((x) => x !== v),
              })
            }
            className="bg-transparent border-0 text-[14px] cursor-pointer leading-none"
            style={{ color: "var(--accent)" }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
