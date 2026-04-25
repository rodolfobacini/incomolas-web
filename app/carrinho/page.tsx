"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/store/cart";
import { StepsBar } from "@/components/checkout/StepsBar";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { SpringImage } from "@/components/ui/SpringImage";
import { Badge } from "@/components/ui/Badge";
import { QtyCtrl } from "@/components/ui/QtyCtrl";
import { Button } from "@/components/ui/Button";
import { brl } from "@/lib/format";
import Link from "next/link";

export default function CarrinhoPage() {
  const router = useRouter();
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);
  const subtotal = useCart((s) => s.subtotal());

  return (
    <>
      <StepsBar active={1} />

      <div className="py-9 pb-16">
        <div className="container-i">
          <div className="mb-6">
            <h1 className="font-display text-[38px] font-black text-text-1">
              Carrinho
            </h1>
            <p className="font-body text-[14px] text-text-3 mt-1">
              {items.length === 0
                ? "Seu carrinho está vazio."
                : `${items.length} ${items.length === 1 ? "item" : "itens"} · subtotal R$ ${brl(subtotal)}`}
            </p>
          </div>

          {items.length === 0 ? (
            <div className="card-i p-12 text-center hover:translate-y-0">
              <div className="font-display text-[24px] font-bold text-text-1 mb-3">
                Nenhum item no carrinho
              </div>
              <p className="font-body text-[15px] text-text-3 mb-6">
                Explore nosso catálogo e adicione molas ao pedido.
              </p>
              <Button href="/catalogo" variant="primary">
                Ir ao Catálogo
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-7 items-start">
              <div>
                <div className="card-i mb-4 hover:translate-y-0">
                  <div className="flex items-center justify-between p-5 pb-3.5 border-b border-[var(--border)]">
                    <div className="font-display text-[15px] font-extrabold text-text-1 uppercase tracking-[0.06em]">
                      Itens do pedido
                    </div>
                    <button
                      onClick={() => clear()}
                      className="font-display text-[12px] font-bold uppercase tracking-[0.08em] cursor-pointer bg-transparent border-0"
                      style={{ color: "var(--accent)" }}
                    >
                      Limpar carrinho
                    </button>
                  </div>
                  <div className="px-5">
                    {items.map((it) => (
                      <div
                        key={it.slug}
                        className="grid grid-cols-[88px_1fr_auto] gap-4 items-center py-4 border-b border-[var(--border)] last:border-0"
                      >
                        <Link
                          href={`/produto/${it.slug}`}
                          className="w-[88px] h-[88px] rounded-md overflow-hidden border border-[var(--border)]"
                        >
                          <SpringImage
                            tone={it.imageTone}
                            size="sm"
                            src={it.image}
                            alt={it.name}
                          />
                        </Link>
                        <div className="min-w-0">
                          <div className="font-display text-[10px] font-bold tracking-[0.14em] uppercase text-[color:var(--accent)] mb-1">
                            {it.category}
                          </div>
                          <Link
                            href={`/produto/${it.slug}`}
                            className="font-display text-[17px] font-bold text-text-1 leading-tight hover:text-[color:var(--accent)] transition-colors"
                          >
                            {it.name}
                          </Link>
                          <div className="font-mono text-[11px] text-text-3 my-2">
                            {it.spec}
                          </div>
                          <div className="flex gap-1.5">
                            <Badge kind="estoque">Em Estoque</Badge>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2.5">
                          <div className="font-display text-[20px] font-extrabold text-text-1">
                            <small className="text-[11px] font-normal text-text-3">R$</small>{" "}
                            {brl(it.price * it.qty)}
                          </div>
                          <QtyCtrl
                            value={it.qty}
                            onChange={(n) => setQty(it.slug, n)}
                          />
                          <button
                            onClick={() => remove(it.slug)}
                            className="font-display text-[11px] font-semibold uppercase tracking-[0.06em] text-text-3 hover:text-red-400 bg-transparent border-0 cursor-pointer transition-colors"
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="rounded-md p-4 flex items-center justify-between gap-4"
                  style={{
                    background: "var(--accent-bg)",
                    border: "1px solid oklch(32% 0.1 38)",
                  }}
                >
                  <div>
                    <div className="font-display text-[13px] font-extrabold text-text-1 uppercase tracking-[0.06em] mb-0.5">
                      Compre mais e economize
                    </div>
                    <div className="font-body text-[13px] text-text-2">
                      Adicione mais produtos para atingir o desconto de atacado:{" "}
                      <strong style={{ color: "var(--accent)" }}>−14%</strong>
                    </div>
                  </div>
                  <Button href="/catalogo" variant="primary" size="sm">
                    Adicionar
                  </Button>
                </div>
              </div>

              <OrderSummary
                step={1}
                onAdvance={() => router.push("/checkout/entrega")}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
