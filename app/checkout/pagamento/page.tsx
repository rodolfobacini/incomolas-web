"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StepsBar } from "@/components/checkout/StepsBar";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { Button } from "@/components/ui/Button";

type PayMethod = "pix" | "card" | "boleto" | "faturado";

export default function PagamentoPage() {
  const router = useRouter();
  const [method, setMethod] = useState<PayMethod>("pix");

  const handleSubmit = () => {
    router.push("/checkout/confirmacao?method=" + method);
  };

  return (
    <>
      <StepsBar active={3} />

      <div className="py-9 pb-16">
        <div className="container-i">
          <div className="mb-6">
            <h1 className="font-display text-[38px] font-black text-text-1">
              Pagamento
            </h1>
            <p className="font-body text-[14px] text-text-3 mt-1">
              Escolha como prefere pagar. Pix tem 3% de desconto.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-7 items-start">
            <div>
              <div className="card-i mb-4 hover:translate-y-0">
                <div className="px-5 py-4 border-b border-[var(--border)]">
                  <div className="font-display text-[15px] font-extrabold text-text-1 uppercase tracking-[0.06em]">
                    Forma de Pagamento
                  </div>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-5">
                    <PayTab
                      icon="PIX"
                      label="Pix"
                      discount="−3% off"
                      discountColor="var(--green)"
                      active={method === "pix"}
                      onClick={() => setMethod("pix")}
                    />
                    <PayTab
                      icon="💳"
                      label="Cartão"
                      discount="até 10×"
                      active={method === "card"}
                      onClick={() => setMethod("card")}
                    />
                    <PayTab
                      icon="📄"
                      label="Boleto"
                      discount="3 dias úteis"
                      active={method === "boleto"}
                      onClick={() => setMethod("boleto")}
                    />
                    <PayTab
                      icon="📋"
                      label="Faturado"
                      discount="PJ · análise"
                      active={method === "faturado"}
                      onClick={() => setMethod("faturado")}
                    />
                  </div>

                  {method === "pix" && <PixPanel />}
                  {method === "card" && <CardPanel />}
                  {method === "boleto" && <BoletoPanel />}
                  {method === "faturado" && <FaturadoPanel />}
                </div>
              </div>

              <div className="flex justify-between gap-3">
                <Button href="/checkout/entrega" variant="outline">
                  ← Voltar à entrega
                </Button>
                <Button variant="green" size="lg" onClick={handleSubmit}>
                  Finalizar pedido
                </Button>
              </div>
            </div>

            <OrderSummary
              step={3}
              shipping={28.5}
              shippingLabel="PAC"
              pixDiscount={method === "pix"}
              withCoupon={false}
              withFrete={false}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function PayTab({
  icon,
  label,
  discount,
  discountColor,
  active,
  onClick,
}: {
  icon: string;
  label: string;
  discount: string;
  discountColor?: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-md border-[1.5px] cursor-pointer text-center flex flex-col items-center gap-1.5 transition-colors ${
        active
          ? "border-[color:var(--accent)]"
          : "border-[var(--border)] hover:border-[var(--border-2)]"
      }`}
      style={{
        background: active ? "var(--accent-bg)" : "var(--bg-3)",
      }}
    >
      <span
        className="font-display text-[20px] font-black"
        style={{
          color: active ? "var(--accent)" : "var(--text-2)",
        }}
      >
        {icon}
      </span>
      <span
        className="font-display text-[11px] font-bold tracking-[0.06em] uppercase"
        style={{
          color: active ? "var(--accent)" : "var(--text-2)",
        }}
      >
        {label}
      </span>
      <span
        className="font-display text-[9px] font-bold uppercase tracking-[0.08em]"
        style={{ color: discountColor || "var(--text-3)" }}
      >
        {discount}
      </span>
    </button>
  );
}

function PixPanel() {
  return (
    <div className="rounded-md border border-[var(--border)] bg-bg-3 p-6 text-center">
      <PixQRPlaceholder />
      <div className="font-mono text-[12px] text-text-2 mt-3.5 mb-2 break-all">
        incomolas@pagar.com.br
      </div>
      <div className="font-body text-[13px] text-text-3 mb-3">
        Aponte a câmera do seu app de banco · pagamento em até 30 minutos
      </div>
      <div
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm"
        style={{
          background: "var(--green-bg)",
          border: "1px solid oklch(28% 0.1 145)",
        }}
      >
        <span
          className="font-display text-[12px] font-bold uppercase tracking-[0.06em]"
          style={{ color: "var(--green)" }}
        >
          ✓ Você economiza 3% no Pix
        </span>
      </div>
    </div>
  );
}

function PixQRPlaceholder() {
  // 15x15 grid pseudo-random determinístico
  const cells = Array.from({ length: 225 }).map((_, i) => {
    const r = Math.floor(i / 15);
    const c = i % 15;
    // finder corners
    if ((r < 4 && c < 4) || (r < 4 && c > 10) || (r > 10 && c < 4)) {
      const inFrame =
        (r === 0 || r === 3 || c === 0 || c === 3) ||
        ((r === 1 || r === 2) && (c === 1 || c === 2));
      return inFrame;
    }
    let h = (r * 31 + c * 17 + 7) >>> 0;
    h = (h * 1103515245 + 12345) >>> 0;
    return Boolean(h & 0x1000000);
  });

  return (
    <div
      className="grid grid-cols-[repeat(15,1fr)] grid-rows-[repeat(15,1fr)] gap-px p-2 mx-auto"
      style={{ width: 150, height: 150, background: "white", borderRadius: 8 }}
    >
      {cells.map((b, i) => (
        <div
          key={i}
          style={{ background: b ? "black" : "white" }}
        />
      ))}
    </div>
  );
}

function CardPanel() {
  return (
    <div>
      <div className="mb-4">
        <label className="field-label">Número do cartão</label>
        <input className="input-i" placeholder="0000 0000 0000 0000" maxLength={19} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <div>
          <label className="field-label">Nome impresso no cartão</label>
          <input className="input-i" placeholder="JOÃO DA SILVA" />
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="field-label">Validade</label>
            <input className="input-i" placeholder="MM/AA" maxLength={5} />
          </div>
          <div>
            <label className="field-label">CVV</label>
            <input className="input-i" placeholder="000" maxLength={4} />
          </div>
        </div>
      </div>
      <div>
        <label className="field-label">Parcelamento</label>
        <select className="input-i">
          <option>1× sem juros</option>
          <option>2× sem juros</option>
          <option>3× sem juros</option>
          <option>6× sem juros</option>
          <option>10× sem juros</option>
        </select>
      </div>
    </div>
  );
}

function BoletoPanel() {
  return (
    <div className="rounded-md border border-[var(--border)] bg-bg-3 p-6">
      <div className="font-display text-[14px] font-extrabold text-text-1 uppercase tracking-[0.06em] mb-3.5">
        Pagamento via boleto bancário
      </div>
      <p className="font-body text-[14px] text-text-2 leading-[1.7] mb-3.5">
        O boleto será gerado após a confirmação do pedido. Pode ser pago em
        qualquer banco, lotérica ou app.
      </p>
      <div className="flex gap-2.5 flex-wrap font-body text-[13px] text-text-3">
        <span>⏱ Vencimento: 3 dias úteis</span>
        <span>·</span>
        <span>📦 Envio após confirmação</span>
      </div>
    </div>
  );
}

function FaturadoPanel() {
  return (
    <div className="rounded-md border border-[var(--border)] bg-bg-3 p-6">
      <div className="font-display text-[14px] font-extrabold text-text-1 uppercase tracking-[0.06em] mb-3.5">
        Pagamento Faturado (PJ)
      </div>
      <p className="font-body text-[14px] text-text-2 leading-[1.7] mb-3.5">
        Para distribuidores, lojas e indústrias com cadastro aprovado:
        faturamento direto em 30, 45 ou 60 dias.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="field-label">Inscrição Estadual</label>
          <input className="input-i" placeholder="000.000.000.000" />
        </div>
        <div>
          <label className="field-label">Prazo desejado</label>
          <select className="input-i">
            <option>30 dias</option>
            <option>45 dias</option>
            <option>60 dias</option>
          </select>
        </div>
      </div>
      <div className="mt-2.5 font-body text-[12px] text-text-3">
        Sujeito a análise · prazo de até 24h
      </div>
    </div>
  );
}
