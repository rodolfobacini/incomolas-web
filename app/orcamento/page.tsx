"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { QuoteForm } from "@/components/home/QuoteForm";
import { Button } from "@/components/ui/Button";
import { CATEGORIES, CATEGORY_IMAGES } from "@/lib/categories";
import type { CategoryKey } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

function OrcamentoInner() {
  const params = useSearchParams();
  const productSlug = params.get("p") ?? undefined;

  return (
    <>
      {/* HERO */}
      <section
        className="py-14 border-b border-[var(--border)]"
        style={{
          background:
            "radial-gradient(ellipse 80% 100% at 50% 0%, oklch(16% 0.06 38 / 35%) 0%, transparent 70%)",
        }}
      >
        <div className="container-i">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
            <div>
              <span className="section-label">Atendimento direto da fábrica</span>
              <h1 className="font-display text-[64px] leading-[0.95] font-black text-text-1 mb-4">
                Orçamento
                <br />
                em até <span style={{ color: "var(--accent)" }}>24h úteis</span>
              </h1>
              <p className="font-body text-[17px] text-text-2 leading-[1.6] mb-7 max-w-[60ch]">
                Atendemos atacado, distribuição e projetos especiais.
                Especificou ou não? Tudo bem — nossa engenharia ajuda a
                dimensionar a mola certa para sua aplicação.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button href="#form" variant="primary" size="lg">
                  Preencher formulário
                </Button>
                <Button
                  href="https://wa.me/554432551912?text=Ol%C3%A1%2C+gostaria+de+um+or%C3%A7amento"
                  variant="green"
                  size="lg"
                >
                  Falar no WhatsApp agora
                </Button>
              </div>
              <div className="flex flex-wrap gap-7 mt-9 pt-7 border-t border-[var(--border)]">
                <Stat n="24h" l="Resposta da engenharia" />
                <Stat n="50+" l="Lotes mínimos a partir de" />
                <Stat n="BR" l="Entrega nacional" />
              </div>
            </div>

            <div className="hidden lg:block relative">
              <div
                className="aspect-[4/5] rounded-lg relative overflow-hidden"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 30%, #232325 0%, #111113 100%)",
                  border: "1px solid var(--border)",
                }}
              >
                <Image
                  src="/products/mola-customizada.png"
                  alt="Mola sob medida"
                  fill
                  sizes="(max-width: 1024px) 0px, 400px"
                  style={{
                    objectFit: "contain",
                    padding: 30,
                    filter: "drop-shadow(0 14px 40px rgba(0,0,0,0.7))",
                  }}
                />
                <div
                  className="absolute bottom-4 left-4 px-3 py-2 rounded-md backdrop-blur"
                  style={{
                    background: "oklch(8% 0.01 0 / 80%)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div className="font-display text-[10px] tracking-[0.14em] uppercase text-[color:var(--accent)] font-bold">
                    Sob medida
                  </div>
                  <div className="font-display text-[14px] font-bold text-text-1 leading-tight">
                    Qualquer especificação
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-16 border-b border-[var(--border)]">
        <div className="container-i">
          <div className="text-center mb-10">
            <span className="section-label">Como funciona</span>
            <h2 className="font-display text-[40px] font-extrabold text-text-1">
              Do briefing à entrega
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                n: "01",
                t: "Você envia o pedido",
                d: "Formulário, WhatsApp ou e-mail. Aceita desenho técnico, foto ou descrição da aplicação.",
              },
              {
                n: "02",
                t: "Engenharia analisa",
                d: "Nossa equipe valida especificação, dimensiona, sugere alternativas e calcula o lote ideal.",
              },
              {
                n: "03",
                t: "Cotação detalhada",
                d: "Enviamos preço por unidade, prazo de produção, frete e condição de pagamento.",
              },
              {
                n: "04",
                t: "Produção e entrega",
                d: "Aprovado o pedido, produzimos com inspeção dimensional e despachamos para todo Brasil.",
              },
            ].map((s) => (
              <div key={s.n} className="card-i p-6 hover:translate-y-0">
                <div
                  className="font-display text-[42px] font-black leading-none mb-3"
                  style={{ color: "var(--accent)", opacity: 0.5 }}
                >
                  {s.n}
                </div>
                <div className="font-display text-[18px] font-extrabold text-text-1 mb-2">
                  {s.t}
                </div>
                <div className="font-body text-[14px] text-text-2 leading-[1.6]">
                  {s.d}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATIONS */}
      <section className="py-16 border-b border-[var(--border)]">
        <div className="container-i">
          <div className="mb-10">
            <span className="section-label">Setores atendidos</span>
            <h2 className="font-display text-[40px] font-extrabold text-text-1">
              Para qual aplicação você precisa de mola?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CATEGORIES.filter((c) => c.key !== "todos").map((c) => (
              <Link
                key={c.key}
                href={`/catalogo?cat=${c.key}`}
                className="card-i p-5 cursor-pointer"
                style={{ borderTop: "3px solid var(--accent)" }}
              >
                <div
                  className="h-24 mb-3 rounded-md relative overflow-hidden"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 40%, #1a1a1d 0%, #0a0a0c 100%)",
                  }}
                >
                  <Image
                    src={CATEGORY_IMAGES[c.key as CategoryKey]}
                    alt={c.label}
                    fill
                    sizes="(max-width: 640px) 90vw, 200px"
                    style={{ objectFit: "contain", padding: 8 }}
                  />
                </div>
                <div className="font-display text-[18px] font-extrabold text-text-1 mb-1">
                  {c.label}
                </div>
                <div className="font-body text-[12px] text-text-3 leading-relaxed">
                  {c.desc}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <div id="form">
        <QuoteForm productSlug={productSlug} />
      </div>

      {/* FAQ */}
      <section className="py-16 border-b border-[var(--border)]">
        <div className="container-i max-w-[920px]">
          <span className="section-label">Dúvidas frequentes</span>
          <h2 className="font-display text-[40px] font-extrabold text-text-1 mb-9">
            Antes de pedir orçamento
          </h2>
          <div className="flex flex-col gap-3">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="card-i p-5 cursor-pointer hover:translate-y-0 group"
              >
                <summary className="font-display text-[16px] font-bold text-text-1 list-none flex items-center justify-between">
                  {f.q}
                  <span
                    className="font-display text-[20px] transition-transform group-open:rotate-45"
                    style={{ color: "var(--accent)" }}
                  >
                    +
                  </span>
                </summary>
                <p className="font-body text-[14px] text-text-2 leading-[1.7] mt-3 pt-3 border-t border-[var(--border)]">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-16">
        <div className="container-i">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ContactCard
              icon="💬"
              label="WhatsApp"
              primary="(44) 3255-1912"
              sub="Resposta em poucos minutos · seg-sex 8h-18h"
              href="https://wa.me/554432551912"
              cta="Iniciar conversa"
            />
            <ContactCard
              icon="✉️"
              label="E-mail"
              primary="contato@incomolas.com.br"
              sub="Para anexar desenho técnico ou ficha de especificações"
              href="mailto:contato@incomolas.com.br"
              cta="Enviar e-mail"
            />
            <ContactCard
              icon="📍"
              label="Visita técnica"
              primary="Av. Pref. Sincler Sambatti, 4242"
              sub="Jardim Bertioga, Maringá/PR · agendamento prévio"
              href="https://www.google.com/maps?q=Av.+Prefeito+Sincler+Sambatti+4242+Jardim+Bertioga+Maring%C3%A1+PR"
              cta="Ver no mapa"
            />
          </div>
        </div>
      </section>
    </>
  );
}

const FAQS: { q: string; a: string }[] = [
  {
    q: "Vocês atendem pedidos pequenos ou só atacado?",
    a: "Atendemos os dois. Para a linha padrão (academia, cama elástica, jump) trabalhamos a partir de 1 par. Para industrial e sob medida, o lote mínimo varia conforme a peça — geralmente 50 unidades.",
  },
  {
    q: "Quanto tempo leva para receber o orçamento?",
    a: "Em média 24h úteis. Para projetos sob medida ou aplicações críticas, podemos pedir mais tempo (até 48h) para validar a especificação com a engenharia.",
  },
  {
    q: "Posso enviar um desenho técnico ou amostra física?",
    a: "Sim. No formulário aceita anexos via e-mail. Para amostras físicas, combinamos o envio depois do contato — temos endereço de fábrica em Maringá/PR.",
  },
  {
    q: "Quais formas de pagamento vocês aceitam?",
    a: "Pix, boleto, cartão de crédito (até 10x) e faturamento PJ (30/45/60 dias) sujeito a análise. Para grandes lotes, condições especiais.",
  },
  {
    q: "Vocês entregam em todo Brasil?",
    a: "Sim. Trabalhamos com PAC e SEDEX para volumes menores e transportadora própria para atacado. Retirada na fábrica em Maringá/PR também é uma opção.",
  },
  {
    q: "Que materiais vocês trabalham?",
    a: "Aço SAE 9254 (linha esportiva), Aço Carbono (zincado), Inox AISI 304 (jumps e ambientes corrosivos) e Aço Especial para projetos industriais. Acabamentos: fosfato preto, zinco, cromo e natural.",
  },
];

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="font-display text-[34px] font-black leading-none text-text-1">
        {n}
      </div>
      <div className="font-display text-[11px] uppercase tracking-[0.12em] text-text-3 mt-1">
        {l}
      </div>
    </div>
  );
}

function ContactCard({
  icon,
  label,
  primary,
  sub,
  href,
  cta,
}: {
  icon: string;
  label: string;
  primary: string;
  sub: string;
  href: string;
  cta: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="card-i p-7 block cursor-pointer no-underline"
    >
      <div className="text-[28px] mb-3">{icon}</div>
      <div className="font-display text-[10px] font-bold tracking-[0.14em] uppercase text-text-3 mb-1">
        {label}
      </div>
      <div className="font-display text-[20px] font-extrabold text-text-1 mb-2 break-words">
        {primary}
      </div>
      <div className="font-body text-[13px] text-text-3 leading-[1.6] mb-4">
        {sub}
      </div>
      <div
        className="font-display text-[12px] font-bold tracking-[0.08em] uppercase"
        style={{ color: "var(--accent)" }}
      >
        {cta} →
      </div>
    </a>
  );
}

export default function OrcamentoPage() {
  return (
    <Suspense
      fallback={
        <div className="container-i py-20 text-text-3">Carregando…</div>
      }
    >
      <OrcamentoInner />
    </Suspense>
  );
}
