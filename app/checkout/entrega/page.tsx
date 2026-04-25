"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StepsBar } from "@/components/checkout/StepsBar";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { Button } from "@/components/ui/Button";

export default function EntregaPage() {
  const router = useRouter();
  const [frete, setFrete] = useState<"pac" | "sedex" | "retirada">("pac");

  const fretePrice = frete === "pac" ? 28.5 : frete === "sedex" ? 52 : 0;
  const freteLabel =
    frete === "pac" ? "PAC" : frete === "sedex" ? "SEDEX" : "Retirada";

  return (
    <>
      <StepsBar active={2} />

      <div className="py-9 pb-16">
        <div className="container-i">
          <div className="mb-6">
            <h1 className="font-display text-[38px] font-black text-text-1">
              Endereço de Entrega
            </h1>
            <p className="font-body text-[14px] text-text-3 mt-1">
              Vamos preparar seu pedido com cuidado.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-7 items-start">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                router.push("/checkout/pagamento");
              }}
            >
              <Section title="Seus dados">
                <Grid2>
                  <Field label="Nome completo">
                    <input className="input-i" required defaultValue="João da Silva" />
                  </Field>
                  <Field label="CPF / CNPJ">
                    <input
                      className="input-i"
                      required
                      defaultValue="123.456.789-00"
                    />
                  </Field>
                </Grid2>
                <Grid2>
                  <Field label="E-mail">
                    <input
                      type="email"
                      className="input-i"
                      required
                      defaultValue="joao@academia.com.br"
                    />
                  </Field>
                  <Field label="Telefone / WhatsApp">
                    <input
                      type="tel"
                      className="input-i"
                      required
                      defaultValue="(11) 9 8888-7777"
                    />
                  </Field>
                </Grid2>
              </Section>

              <Section title="Endereço de entrega">
                <Grid2>
                  <Field label="CEP">
                    <input className="input-i" defaultValue="01310-100" required />
                  </Field>
                  <Field label="Estado / Cidade">
                    <input
                      className="input-i"
                      defaultValue="SP / São Paulo"
                      readOnly
                      style={{ color: "var(--text-2)" }}
                    />
                  </Field>
                </Grid2>
                <div className="grid grid-cols-[2fr_1fr_1fr] gap-3">
                  <Field label="Rua">
                    <input className="input-i" defaultValue="Av. Paulista" />
                  </Field>
                  <Field label="Número">
                    <input className="input-i" defaultValue="1000" />
                  </Field>
                  <Field label="Complemento">
                    <input className="input-i" placeholder="Apto / Bloco" />
                  </Field>
                </div>
                <Grid2>
                  <Field label="Bairro">
                    <input className="input-i" defaultValue="Bela Vista" />
                  </Field>
                  <Field label="Ponto de referência">
                    <input className="input-i" placeholder="Opcional" />
                  </Field>
                </Grid2>
              </Section>

              <Section title="Modalidade de Frete">
                <div className="flex flex-col gap-2">
                  <FreteOpt
                    value="pac"
                    name="PAC Correios"
                    sub="Até 8 dias úteis · embalagem reforçada"
                    price="R$ 28,50"
                    selected={frete === "pac"}
                    onSelect={() => setFrete("pac")}
                  />
                  <FreteOpt
                    value="sedex"
                    name="SEDEX"
                    sub="Até 3 dias úteis · rastreável"
                    price="R$ 52,00"
                    selected={frete === "sedex"}
                    onSelect={() => setFrete("sedex")}
                  />
                  <FreteOpt
                    value="retirada"
                    name="Retirada na fábrica"
                    sub="São Paulo · Seg–Sex 8h–18h"
                    price="Grátis"
                    priceColor="var(--green)"
                    selected={frete === "retirada"}
                    onSelect={() => setFrete("retirada")}
                  />
                </div>
              </Section>

              <div className="flex justify-between gap-3">
                <Button href="/carrinho" variant="outline">
                  ← Voltar ao carrinho
                </Button>
                <Button variant="primary" size="lg" type="submit">
                  Ir para pagamento →
                </Button>
              </div>
            </form>

            <OrderSummary
              step={2}
              shipping={fretePrice}
              shippingLabel={`${freteLabel}`}
              showItems
              withCoupon={false}
              withFrete={false}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card-i mb-4 hover:translate-y-0">
      <div className="px-5 py-4 border-b border-[var(--border)]">
        <div className="font-display text-[15px] font-extrabold text-text-1 uppercase tracking-[0.06em]">
          {title}
        </div>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function Grid2({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{children}</div>;
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-3">
      <label className="field-label">{label}</label>
      {children}
    </div>
  );
}

function FreteOpt({
  value,
  name,
  sub,
  price,
  priceColor,
  selected,
  onSelect,
}: {
  value: string;
  name: string;
  sub: string;
  price: string;
  priceColor?: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <label
      className={`flex items-center gap-3 px-3 py-3 rounded-md border-[1.5px] cursor-pointer transition-colors ${
        selected
          ? "border-[color:var(--accent)]"
          : "border-[var(--border)] hover:border-[var(--border-2)]"
      }`}
      style={{
        background: selected ? "var(--accent-bg)" : "var(--bg-3)",
      }}
    >
      <input
        type="radio"
        name="frete"
        value={value}
        checked={selected}
        onChange={onSelect}
        style={{ accentColor: "var(--accent)" }}
      />
      <div className="flex-1">
        <div className="font-display text-[13px] font-bold text-text-1">
          {name}
        </div>
        <div className="font-body text-[12px] text-text-3">{sub}</div>
      </div>
      <div
        className="font-display text-[15px] font-extrabold"
        style={{ color: priceColor || "var(--text-1)" }}
      >
        {price}
      </div>
    </label>
  );
}
