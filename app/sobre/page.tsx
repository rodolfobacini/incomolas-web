import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export const metadata = {
  title: "Quem Somos — Incomolas Indústria de Molas",
  description:
    "Há mais de 15 anos fabricando molas de alta resistência para academia, cama elástica, jump, industrial e automotivo. Conheça a Incomolas.",
};

export default function SobrePage() {
  return (
    <>
      {/* HERO */}
      <section
        className="py-16 border-b border-[var(--border)]"
        style={{
          background:
            "radial-gradient(ellipse 80% 100% at 50% 0%, oklch(16% 0.06 38 / 35%) 0%, transparent 70%)",
        }}
      >
        <div className="container-i">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 items-center">
            <div>
              <span className="section-label">Quem somos</span>
              <h1 className="font-display text-[64px] leading-[0.95] font-black text-text-1 mb-5">
                Mola é o nosso{" "}
                <span style={{ color: "var(--accent)" }}>ofício</span>.
              </h1>
              <p className="font-body text-[17px] text-text-2 leading-[1.65] mb-6 max-w-[58ch]">
                A Incomolas é uma indústria brasileira fundada em 2010,
                especializada na produção de molas helicoidais de alta
                resistência. Atendemos academias, fabricantes de equipamentos
                esportivos, oficinas e indústrias com qualidade certificada e
                prazos confiáveis.
              </p>
              <div className="flex flex-wrap gap-2.5 mb-7">
                <Badge kind="atacado">Fabricante direto</Badge>
                <Badge kind="estoque">15+ anos no mercado</Badge>
                <Badge kind="sobmedida">Produção própria</Badge>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button href="/orcamento" variant="primary" size="lg">
                  Solicitar Orçamento
                </Button>
                <Button href="/catalogo" variant="outline" size="lg">
                  Ver Catálogo
                </Button>
              </div>
            </div>
            <div
              className="aspect-[4/3] rounded-lg relative overflow-hidden"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 30%, #1e1e22 0%, #0e0e10 100%)",
                border: "1px solid var(--border)",
              }}
            >
              <Image
                src="/products/mola-industrial.png"
                alt="Mola industrial Incomolas"
                fill
                sizes="(max-width: 1024px) 90vw, 600px"
                style={{
                  objectFit: "contain",
                  padding: 30,
                  filter: "drop-shadow(0 16px 50px rgba(0,0,0,0.7))",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-12 border-b border-[var(--border)]">
        <div className="container-i grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { n: "15+", l: "Anos de mercado" },
            { n: "10k+", l: "Pedidos entregues" },
            { n: "5", l: "Setores atendidos" },
            { n: "BR", l: "Cobertura nacional" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="font-display text-[48px] font-black leading-none text-text-1">
                {s.n}
              </div>
              <div className="font-display text-[12px] uppercase tracking-[0.12em] text-text-3 mt-2">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION */}
      <section className="py-16 border-b border-[var(--border)]">
        <div className="container-i">
          <div className="text-center mb-10 max-w-[720px] mx-auto">
            <span className="section-label">Por que existimos</span>
            <h2 className="font-display text-[40px] font-extrabold text-text-1 leading-tight">
              Mola é peça crítica. Não pode falhar.
            </h2>
            <p className="font-body text-[16px] text-text-2 leading-[1.7] mt-4">
              Trabalhamos para que o equipamento da academia funcione todo dia,
              o trampolim da criança seja seguro, o veículo aguente a estrada e
              a indústria não pare. Mola que falha custa caro — em dinheiro, em
              tempo e às vezes em vida.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: "🎯",
                t: "Precisão",
                d: "Tolerâncias dimensionais conforme NBR 8065. Cada lote inspecionado antes do embarque.",
              },
              {
                icon: "🔧",
                t: "Confiabilidade",
                d: "Aço selecionado, têmpera e revenimento controlados. Curva de fadiga garantida.",
              },
              {
                icon: "🤝",
                t: "Parceria",
                d: "Engenharia próxima do cliente. Apoiamos a especificação, sugerimos alternativas, entregamos no prazo.",
              },
            ].map((v) => (
              <div key={v.t} className="card-i p-7 hover:translate-y-0">
                <div className="text-[32px] mb-3">{v.icon}</div>
                <div className="font-display text-[22px] font-extrabold text-text-1 mb-2">
                  {v.t}
                </div>
                <div className="font-body text-[14px] text-text-2 leading-[1.7]">
                  {v.d}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-16 border-b border-[var(--border)]">
        <div className="container-i">
          <div className="mb-10">
            <span className="section-label">Nossa trajetória</span>
            <h2 className="font-display text-[40px] font-extrabold text-text-1">
              15+ anos fabricando molas
            </h2>
          </div>
          <div className="relative max-w-[820px] mx-auto">
            <div
              className="absolute left-[18px] top-2 bottom-2 w-px"
              style={{ background: "var(--border)" }}
            />
            {[
              {
                y: "2010",
                t: "Fundação da Incomolas",
                d: "Início da operação em galpão próprio em Maringá/PR, focados em molas para academias.",
              },
              {
                y: "2014",
                t: "Linha de Cama Elástica",
                d: "Lançamento dos kits zincados para camas elásticas residenciais e profissionais.",
              },
              {
                y: "2017",
                t: "Inox e Jumps",
                d: "Adição da linha em aço inox AISI 304 para jumps profissionais e ambientes corrosivos.",
              },
              {
                y: "2020",
                t: "Setor Industrial",
                d: "Estrutura para projetos sob medida em volumes industriais. Lotes a partir de 50 unidades.",
              },
              {
                y: "2023",
                t: "Linha Automotiva",
                d: "Início da fabricação de molas helicoidais para suspensão de veículos leves e pesados.",
              },
              {
                y: "2026",
                t: "Loja online",
                d: "Lançamento da plataforma incomolas.com.br para mostruário e solicitação de orçamentos.",
              },
            ].map((m) => (
              <div key={m.y} className="flex gap-7 pl-2 mb-7">
                <div className="relative">
                  <div
                    className="w-9 h-9 rounded-full grid place-items-center font-display text-[12px] font-black"
                    style={{
                      background: "var(--accent)",
                      color: "#fff",
                      boxShadow: "0 0 0 4px var(--bg)",
                    }}
                  >
                    {m.y.slice(2)}
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <div className="font-display text-[12px] tracking-[0.1em] uppercase text-text-3 mb-1">
                    {m.y}
                  </div>
                  <div className="font-display text-[20px] font-extrabold text-text-1 mb-1">
                    {m.t}
                  </div>
                  <div className="font-body text-[14px] text-text-2 leading-[1.6]">
                    {m.d}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="py-16 border-b border-[var(--border)]">
        <div className="container-i">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <span className="section-label">Capacidades</span>
              <h2 className="font-display text-[40px] font-extrabold text-text-1 mb-5">
                Estrutura de fábrica
              </h2>
              <p className="font-body text-[16px] text-text-2 leading-[1.7] mb-7">
                Parque fabril próprio, processos integrados desde o
                recebimento da matéria-prima até o ensaio dimensional final.
                Capacidade de produção de molas com ø arame de 1mm a 22mm e
                comprimento livre de 30mm a 600mm.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { k: "Materiais", v: "SAE 9254 · Carbono · Inox 304 · Especial" },
                  { k: "Acabamentos", v: "Fosfato · Zinco · Cromo · Natural" },
                  { k: "ø arame", v: "1 mm – 22 mm" },
                  { k: "Comprimento", v: "30 mm – 600 mm" },
                  { k: "Tratamento", v: "Têmpera · Revenimento" },
                  { k: "Inspeção", v: "Dimensional · Carga · Visual" },
                ].map((c) => (
                  <div
                    key={c.k}
                    className="card-i p-3.5 hover:translate-y-0"
                  >
                    <div className="font-display text-[10px] font-bold tracking-[0.14em] uppercase text-text-3">
                      {c.k}
                    </div>
                    <div className="font-display text-[14px] font-extrabold text-text-1 mt-1">
                      {c.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-display text-[26px] font-extrabold text-text-1 mb-5">
                Qualidade & garantia
              </h3>
              <div className="flex flex-col gap-3">
                {[
                  ["Tolerâncias NBR 8065", "Conformidade dimensional para molas helicoidais."],
                  [
                    "Ensaio de carga por lote",
                    "Cada lote tem amostra ensaiada antes do embarque.",
                  ],
                  [
                    "Rastreabilidade",
                    "Cada pedido tem código de lote para auditoria de matéria-prima.",
                  ],
                  [
                    "Garantia contra defeito",
                    "Substituição imediata de peças com defeito de fabricação.",
                  ],
                ].map(([t, d]) => (
                  <div
                    key={t}
                    className="flex items-start gap-3 p-3.5 rounded-md"
                    style={{
                      background: "var(--bg-2)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div
                      className="w-7 h-7 rounded-md grid place-items-center flex-shrink-0 mt-0.5"
                      style={{
                        background: "var(--green-bg)",
                        border: "1px solid oklch(28% 0.1 145)",
                      }}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M2 6.5l2.5 2.5 5.5-5.5"
                          stroke="var(--green)"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="font-display text-[15px] font-bold text-text-1">
                        {t}
                      </div>
                      <div className="font-body text-[13px] text-text-3 leading-[1.6]">
                        {d}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/orcamento"
                className="block mt-6 p-5 rounded-md text-center cursor-pointer"
                style={{
                  background: "var(--accent-bg)",
                  border: "1px solid oklch(32% 0.10 38)",
                }}
              >
                <div className="font-display text-[16px] font-extrabold text-text-1 mb-1">
                  Precisa de mola para sua aplicação?
                </div>
                <div className="font-body text-[13px] text-text-2 mb-3">
                  Fale com nossa engenharia em até 24h úteis.
                </div>
                <span
                  className="font-display text-[13px] font-bold tracking-[0.08em] uppercase"
                  style={{ color: "var(--accent)" }}
                >
                  Solicitar orçamento →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION & MAP */}
      <section className="py-16 border-b border-[var(--border)]">
        <div className="container-i">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 items-stretch">
            <div>
              <span className="section-label">Onde estamos</span>
              <h2 className="font-display text-[40px] font-extrabold text-text-1 leading-tight mb-5">
                Fábrica em Maringá/PR
              </h2>
              <p className="font-body text-[16px] text-text-2 leading-[1.7] mb-7">
                Nossa unidade fica no Jardim Bertioga, em Maringá — Paraná, com
                fácil acesso pela Av. Prefeito Sincler Sambatti. Receba a sua
                visita técnica com hora marcada.
              </p>

              <div className="flex flex-col gap-3">
                {[
                  ["Endereço", "Av. Prefeito Sincler Sambatti, 4242"],
                  ["Bairro", "Jardim Bertioga"],
                  ["Cidade / UF", "Maringá / PR"],
                  ["CEP", "87055-405"],
                  ["Telefone", "(44) 3255-1912"],
                  ["Horário", "Seg a Sex · 8h às 18h"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-start gap-3 p-3.5 rounded-md"
                    style={{
                      background: "var(--bg-2)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div className="font-display text-[10px] font-bold tracking-[0.14em] uppercase text-text-3 w-[88px] flex-shrink-0 mt-1">
                      {k}
                    </div>
                    <div className="font-body text-[14px] text-text-1 font-medium">
                      {v}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mt-6">
                <Button
                  href="https://www.google.com/maps/dir/?api=1&destination=Av.+Prefeito+Sincler+Sambatti+4242+Jardim+Bertioga+Maring%C3%A1+PR"
                  variant="outline"
                >
                  Como chegar
                </Button>
                <Button href="tel:+554432551912" variant="primary">
                  Ligar (44) 3255-1912
                </Button>
              </div>
            </div>

            <div
              className="rounded-lg overflow-hidden relative min-h-[420px]"
              style={{ border: "1px solid var(--border)" }}
            >
              <iframe
                title="Mapa da Incomolas — Av. Prefeito Sincler Sambatti, 4242, Jardim Bertioga, Maringá/PR"
                src="https://www.google.com/maps?q=Av.+Prefeito+Sincler+Sambatti+4242+Jardim+Bertioga+Maring%C3%A1+PR&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, position: "absolute", inset: 0, filter: "grayscale(0.2) contrast(1.05)" }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT FOOTER */}
      <section className="py-16">
        <div className="container-i">
          <div
            className="rounded-lg p-12 text-center"
            style={{
              background:
                "radial-gradient(ellipse 80% 100% at 50% 0%, oklch(20% 0.07 38 / 50%) 0%, var(--bg-2) 70%)",
              border: "1px solid var(--border)",
            }}
          >
            <h2 className="font-display text-[40px] font-extrabold text-text-1 mb-3">
              Vamos fazer mola juntos?
            </h2>
            <p className="font-body text-[16px] text-text-2 leading-[1.6] max-w-[54ch] mx-auto mb-7">
              Tem um projeto, dúvida técnica ou quer conhecer a fábrica? Estamos
              em Maringá/PR de seg a sex, 8h às 18h.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button href="/orcamento" variant="primary" size="lg">
                Solicitar Orçamento
              </Button>
              <Button
                href="https://wa.me/554432551912?text=Ol%C3%A1%2C+gostaria+de+conversar+sobre+um+projeto"
                variant="green"
                size="lg"
              >
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
