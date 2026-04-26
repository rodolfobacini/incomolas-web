"use client";

import { useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { StepsBar } from "@/components/checkout/StepsBar";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/store/cart";
import { brl } from "@/lib/format";

function ConfirmacaoInner() {
  const params = useSearchParams();
  const method = params.get("method") || "pix";
  const items = useCart((s) => s.items);
  const subtotal = useCart((s) => s.subtotal());
  const clear = useCart((s) => s.clear);

  const orderNum = useMemo(
    () => `INC-2026-${Math.floor(10000 + Math.random() * 90000)}`,
    [],
  );

  // limpa o carrinho ao chegar na confirmação
  useEffect(() => {
    const t = setTimeout(() => clear(), 500);
    return () => clearTimeout(t);
  }, [clear]);

  const total = subtotal * 0.94 + 28.5; // mock approx
  const pixTotal = total * 0.97;
  const valor = method === "pix" ? pixTotal : total;

  const methodMap: Record<string, string> = {
    pix: "Pix",
    card: "Cartão de crédito",
    boleto: "Boleto bancário",
    faturado: "Faturado PJ",
  };

  return (
    <>
      <StepsBar active={4} />

      <div className="py-12 pb-16">
        <div className="container-i">
          {/* HERO */}
          <div className="text-center pb-7">
            <div
              className="w-20 h-20 rounded-full grid place-items-center mx-auto mb-5"
              style={{
                background: "var(--green-bg)",
                border: "2px solid oklch(38% 0.12 145)",
              }}
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--green)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 className="font-display text-[48px] font-black text-text-1 mb-2.5">
              Pedido confirmado!
            </h1>
            <p className="font-body text-[16px] text-text-2 leading-[1.6] max-w-[52ch] mx-auto">
              Recebemos seu pedido e já estamos preparando seus produtos com
              todo o cuidado e o controle de qualidade Incomolas.
            </p>
            <div
              className="font-mono text-[13px] mt-2"
              style={{ color: "var(--accent)" }}
            >
              PEDIDO #{orderNum} · {new Date().toLocaleDateString("pt-BR")}
            </div>
          </div>

          {/* GRID 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-7">
            <ConfirmCard label="Pagamento">
              <strong className="font-display font-extrabold text-[16px]">
                {methodMap[method]}
              </strong>
              <br />
              R$ {brl(valor)} ·{" "}
              {method === "pix" ? "aguardando confirmação" : "pagamento confirmado"}
              <br />
              <span
                className="font-display text-[11px] tracking-[0.08em] uppercase font-bold"
                style={{ color: "var(--green)" }}
              >
                ✓ Aprovado
              </span>
            </ConfirmCard>

            <ConfirmCard label="Entrega prevista">
              <strong className="font-display font-extrabold text-[16px]">
                23 a 26 / Mar / 2026
              </strong>
              <br />
              PAC Correios · rastreável
              <br />
              Endereço cadastrado no pedido
            </ConfirmCard>

            <ConfirmCard label="Acompanhe pelo WhatsApp">
              <strong className="font-display font-extrabold text-[16px]">
                (11) 9 8888-7777
              </strong>
              <br />
              Avisamos a cada etapa.
              <br />
              <span className="text-text-3 text-[12px]">
                Também enviamos para joao@academia.com.br
              </span>
            </ConfirmCard>
          </div>

          {/* TRACK */}
          <div className="card-i p-7 mt-4 hover:translate-y-0">
            <div className="font-display text-[14px] font-extrabold uppercase tracking-[0.08em] text-text-1 mb-5">
              Status do pedido
            </div>
            <Track step={1} done label="Pedido recebido" sub="Pagamento aprovado" />
            <Track
              step={2}
              active
              label="Em produção / separação"
              sub="Em andamento · controle de qualidade"
            />
            <Track step={3} label="Despachado para transporte" sub="Previsão: 18/03/2026" />
            <Track step={4} last label="Entrega no destino" sub="Previsão: 23 a 26/03/2026" />
          </div>

          <div className="flex flex-wrap gap-3 justify-center mt-8">
            <Button href="/catalogo" variant="outline">
              Continuar comprando
            </Button>
            <Button variant="primary">Baixar comprovante PDF</Button>
            <Button
              href="https://wa.me/554432551912"
              variant="green"
            >
              Falar no WhatsApp
            </Button>
          </div>

          {/* itens do pedido */}
          {items.length > 0 && (
            <div className="card-i p-6 mt-4 hover:translate-y-0">
              <div className="font-display text-[13px] font-bold uppercase tracking-[0.1em] text-text-3 mb-3">
                Itens deste pedido
              </div>
              <div className="font-body text-[14px] text-text-2 leading-[1.8]">
                {items.map((i) => (
                  <div key={i.slug}>
                    {i.qty}× {i.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function ConfirmacaoPage() {
  return (
    <Suspense fallback={<div className="container-i py-20 text-text-3">Confirmando…</div>}>
      <ConfirmacaoInner />
    </Suspense>
  );
}

function ConfirmCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card-i p-5 hover:translate-y-0">
      <div className="font-display text-[10px] font-bold tracking-[0.14em] uppercase text-text-3 mb-2">
        {label}
      </div>
      <div className="font-body text-[14px] text-text-1 leading-[1.5]">
        {children}
      </div>
    </div>
  );
}

function Track({
  done,
  active,
  last,
  label,
  sub,
}: {
  step: number;
  done?: boolean;
  active?: boolean;
  last?: boolean;
  label: string;
  sub: string;
}) {
  const dotBg = done ? "var(--green)" : active ? "var(--accent)" : "var(--bg-3)";
  const dotShadow = active ? "0 0 0 3px var(--accent-bg)" : "none";
  const dotBorder = active || done ? "none" : "2px solid var(--border-2)";
  const connBg = done ? "var(--green)" : "var(--border)";

  return (
    <div className="flex gap-3.5 items-start">
      <div className="flex flex-col items-center">
        <div
          className="w-3.5 h-3.5 rounded-full mt-0.5"
          style={{
            background: dotBg,
            boxShadow: dotShadow,
            border: dotBorder,
          }}
        />
        {!last && (
          <div
            className="w-0.5 flex-1 my-1"
            style={{
              background: connBg,
              minHeight: 24,
            }}
          />
        )}
      </div>
      <div className="pb-5">
        <div className="font-display text-[14px] font-bold text-text-1">
          {label}
        </div>
        <div className="font-body text-[12px] text-text-3 mt-0.5">{sub}</div>
      </div>
    </div>
  );
}
