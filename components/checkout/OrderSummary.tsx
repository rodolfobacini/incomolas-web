"use client";

import { useState } from "react";
import { useCart } from "@/store/cart";
import { brl, brlFull } from "@/lib/format";
import { Button } from "../ui/Button";

export function OrderSummary({
  step,
  onAdvance,
  shipping = 0,
  shippingLabel,
  withCoupon = true,
  withFrete = true,
  pixDiscount = false,
  showItems = false,
}: {
  step: 1 | 2 | 3 | 4;
  onAdvance?: () => void;
  shipping?: number;
  shippingLabel?: string;
  withCoupon?: boolean;
  withFrete?: boolean;
  pixDiscount?: boolean;
  showItems?: boolean;
}) {
  const items = useCart((s) => s.items);
  const subtotal = useCart((s) => s.subtotal());
  const desconto = subtotal > 200 ? subtotal * 0.06 : 0;
  const total = Math.max(0, subtotal - desconto + shipping);
  const pixTotal = total * 0.97;
  const pixSave = total - pixTotal;

  const [freteShown, setFreteShown] = useState(false);
  const [coupon, setCoupon] = useState("");

  const advanceLabel: Record<1 | 2 | 3 | 4, string> = {
    1: "Prosseguir para entrega →",
    2: "Ir para pagamento →",
    3: "Finalizar pedido",
    4: "",
  };

  return (
    <aside className="card-i p-6 sticky top-32 hover:translate-y-0">
      <div className="font-display text-[14px] font-extrabold text-text-1 uppercase tracking-[0.08em] mb-4 pb-3 border-b border-[var(--border)]">
        Resumo do pedido
      </div>
      <Row label={`Subtotal (${items.length} ${items.length === 1 ? "item" : "itens"})`} val={brlFull(subtotal)} />
      {desconto > 0 && (
        <Row label="Desconto atacado" val={`− ${brlFull(desconto)}`} green />
      )}
      <Row
        label="Frete"
        val={shipping > 0 ? brlFull(shipping) : shippingLabel ?? "Calcular →"}
        muted={shipping === 0 && !shippingLabel}
      />
      {pixDiscount && (
        <Row label="Desconto Pix (3%)" val={`− ${brlFull(pixSave)}`} green />
      )}
      <hr className="border-[var(--border)] my-3.5" />
      <div className="flex justify-between items-start">
        <span className="font-display text-[13px] font-bold uppercase tracking-[0.1em] text-text-3">
          Total
        </span>
        <div className="text-right">
          <div className="font-display text-[30px] font-black text-text-1 leading-none">
            <small className="text-[13px] font-normal text-text-3">R$</small>{" "}
            {brl(pixDiscount ? pixTotal : total)}
          </div>
          {!pixDiscount && (
            <div
              className="font-body text-[12px] mt-0.5"
              style={{ color: "var(--green)" }}
            >
              ou {brlFull(pixTotal)} no Pix (−3%)
            </div>
          )}
        </div>
      </div>

      {step === 1 && withFrete && (
        <>
          <MiniLabel>Calcular Frete</MiniLabel>
          <div className="flex gap-2 mt-2.5">
            <input className="input-i flex-1 font-mono" placeholder="00000-000" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFreteShown(true)}
            >
              OK
            </Button>
          </div>
          {freteShown && (
            <div className="mt-2.5 flex flex-col gap-1.5">
              {[
                ["PAC Correios", "Até 8 dias úteis", "R$ 28,50"],
                ["SEDEX", "Até 3 dias úteis", "R$ 52,00"],
                ["Transportadora", "Atacado · consultar", "Consulte"],
              ].map(([n, p, v], i) => (
                <label
                  key={n}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-md border-[1.5px] cursor-pointer ${
                    i === 0
                      ? "border-[color:var(--accent)] bg-[color:var(--accent-bg)]"
                      : "bg-bg-3 border-[var(--border)]"
                  }`}
                >
                  <input
                    type="radio"
                    name="frete"
                    defaultChecked={i === 0}
                    style={{ accentColor: "var(--accent)" }}
                  />
                  <div className="flex-1">
                    <div className="font-display text-[12px] font-bold text-text-1">{n}</div>
                    <div className="font-body text-[11px] text-text-3">{p}</div>
                  </div>
                  <div className="font-display text-[14px] font-extrabold text-text-1">
                    {v}
                  </div>
                </label>
              ))}
            </div>
          )}
        </>
      )}

      {step === 1 && withCoupon && (
        <>
          <MiniLabel>Cupom de Desconto</MiniLabel>
          <div className="flex gap-2 mt-2.5">
            <input
              className="input-i flex-1 font-mono"
              placeholder="EX: INCOMOLAS10"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <Button variant="ghost" size="sm">
              Aplicar
            </Button>
          </div>
        </>
      )}

      {showItems && items.length > 0 && (
        <div
          className="mt-4 p-3.5 rounded-md border border-[var(--border)]"
          style={{ background: "var(--bg-3)" }}
        >
          <div className="font-display text-[11px] font-bold uppercase tracking-[0.12em] text-text-3 mb-2">
            {items.length} {items.length === 1 ? "item" : "itens"} no pedido
          </div>
          <div className="font-body text-[13px] text-text-2 leading-[1.7]">
            {items.map((i) => (
              <div key={i.slug}>
                {i.qty}× {i.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {onAdvance && step !== 4 && items.length > 0 && (
        <>
          <Button
            variant={step === 3 ? "green" : "primary"}
            size="lg"
            className="w-full justify-center mt-5"
            onClick={onAdvance}
          >
            {advanceLabel[step]}
          </Button>
          {step === 1 && (
            <Button
              href="/catalogo"
              variant="ghost"
              size="sm"
              className="w-full justify-center mt-2"
            >
              ← Continuar comprando
            </Button>
          )}
        </>
      )}
    </aside>
  );
}

function Row({
  label,
  val,
  green,
  muted,
}: {
  label: string;
  val: string;
  green?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="flex justify-between items-center mb-2.5">
      <span className="font-body text-[14px] text-text-2">{label}</span>
      <span
        className="font-display text-[15px] font-bold"
        style={{
          color: green
            ? "var(--green)"
            : muted
              ? "var(--text-3)"
              : "var(--text-1)",
        }}
      >
        {val}
      </span>
    </div>
  );
}

function MiniLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-display text-[11px] font-bold uppercase tracking-[0.12em] text-text-3 mt-4">
      {children}
    </div>
  );
}
