"use client";

import { useState } from "react";
import { Button } from "../ui/Button";
import { getProduct } from "@/lib/products";
import { SpringImage } from "../ui/SpringImage";

type Status = "idle" | "sending" | "ok" | "error";

export function QuoteForm({ productSlug }: { productSlug?: string }) {
  const product = productSlug ? getProduct(productSlug) : undefined;

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [tipoMola, setTipoMola] = useState(product?.category ?? "");
  const [quantidade, setQuantidade] = useState("");
  const [detalhes, setDetalhes] = useState(
    product
      ? `Tenho interesse em ${product.name} (REF ${product.ref}).\nEspecificação: ${product.spec}\nQuantidade desejada: \nObservações: `
      : "",
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/orcamento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          email,
          telefone,
          tipoMola,
          quantidade,
          detalhes,
          productSlug,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setErrorMsg(
          data?.error === "invalid_email"
            ? "E-mail inválido."
            : "Não foi possível enviar agora. Tente novamente ou fale no WhatsApp.",
        );
        setStatus("error");
        return;
      }
      setStatus("ok");
    } catch {
      setErrorMsg(
        "Sem conexão com o servidor. Tente novamente ou fale no WhatsApp.",
      );
      setStatus("error");
    }
  }

  return (
    <section id="orcamento" className="py-20 border-b border-[var(--border)]">
      <div className="container-i">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <span className="section-label">Atacado &amp; Sob Medida</span>
            <h2 className="font-display text-[52px] font-black text-text-1 leading-none mb-4">
              {product ? "Solicite o orçamento" : "Solicite um orçamento"}
            </h2>
            <p className="font-body text-[16px] text-text-2 leading-relaxed mb-8">
              {product
                ? `Você está solicitando uma cotação para ${product.name}. Preencha os dados ao lado e nossa engenharia retorna em até `
                : "Para grandes lotes, especificações personalizadas ou parcerias recorrentes — preencha o formulário ao lado e nossa equipe técnica responde em até "}
              <strong>24h úteis</strong>.
            </p>

            {product && (
              <div className="card-i p-4 mb-8 flex items-center gap-4 hover:translate-y-0">
                <div className="w-20 h-20 rounded-md overflow-hidden border border-[var(--border)] flex-shrink-0">
                  <SpringImage
                    tone={product.imageTone}
                    size="sm"
                    src={product.image}
                    alt={product.name}
                  />
                </div>
                <div>
                  <div className="font-display text-[10px] font-bold tracking-[0.14em] uppercase text-[color:var(--accent)] mb-0.5">
                    {product.categoryLabel}
                  </div>
                  <div className="font-display text-[16px] font-bold text-text-1 leading-tight">
                    {product.name}
                  </div>
                  <div className="font-mono text-[11px] text-text-3 mt-1">
                    REF: {product.ref} · {product.spec}
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-4 mb-9">
              {[
                {
                  icon: "📦",
                  title: "Lotes de 50+ unidades",
                  sub: "Tabela de volume com desconto progressivo",
                },
                {
                  icon: "📐",
                  title: "Sob medida",
                  sub: "Envie desenho técnico, amostra ou descrição",
                },
                {
                  icon: "🚛",
                  title: "Entrega Brasil",
                  sub: "PAC, SEDEX ou transportadora própria",
                },
                {
                  icon: "💬",
                  title: "Resposta em até 24h",
                  sub: "Análise pela engenharia + cotação detalhada",
                },
              ].map((it) => (
                <div key={it.title} className="flex items-center gap-3.5">
                  <div className="w-11 h-11 grid place-items-center rounded-md flex-shrink-0 bg-bg-3 border border-[var(--border)] text-[20px]">
                    {it.icon}
                  </div>
                  <div>
                    <div className="font-display text-[16px] font-bold text-text-1">
                      {it.title}
                    </div>
                    <div className="font-body text-[13px] text-text-3">
                      {it.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="card-i p-9 hover:transform-none hover:translate-y-0"
            style={{ background: "var(--bg-2)" }}
          >
            <div className="font-display text-[22px] font-extrabold text-text-1 mb-6">
              {status === "ok"
                ? "Pedido recebido!"
                : "Conte sobre o seu pedido"}
            </div>

            {status === "ok" ? (
              <div>
                <div className="font-body text-[15px] text-text-2 leading-relaxed mb-5">
                  Obrigado, <strong className="text-text-1">{nome}</strong>!
                  Recebemos sua solicitação e o e-mail já foi entregue para a
                  nossa equipe. Retornamos em até 24h úteis no e-mail{" "}
                  <strong className="text-text-1">{email}</strong>.
                </div>
                <Button
                  href={`https://wa.me/554432551912?text=${encodeURIComponent(
                    `Olá, acabei de enviar um orçamento pelo site (${product ? product.name : "geral"}).`,
                  )}`}
                  variant="green"
                  className="w-full justify-center"
                >
                  Falar no WhatsApp também
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <label className="field-label">Nome / Empresa</label>
                  <input
                    className="input-i"
                    type="text"
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Ex: Academia Forma SP"
                    disabled={status === "sending"}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className="field-label">E-mail</label>
                    <input
                      className="input-i"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="contato@empresa.com.br"
                      disabled={status === "sending"}
                    />
                  </div>
                  <div>
                    <label className="field-label">WhatsApp</label>
                    <input
                      className="input-i"
                      type="tel"
                      required
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                      placeholder="(44) 9 0000-0000"
                      disabled={status === "sending"}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className="field-label">Tipo de mola</label>
                    <select
                      className="input-i"
                      value={tipoMola}
                      onChange={(e) => setTipoMola(e.target.value)}
                      disabled={status === "sending"}
                    >
                      <option value="">Selecionar…</option>
                      <option value="academia">Academia</option>
                      <option value="cama">Cama Elástica</option>
                      <option value="jump">Jump</option>
                      <option value="industrial">Industrial</option>
                      <option value="automotivo">Automotivo</option>
                      <option value="custom">Sob medida</option>
                    </select>
                  </div>
                  <div>
                    <label className="field-label">Quantidade estimada</label>
                    <input
                      className="input-i"
                      type="text"
                      value={quantidade}
                      onChange={(e) => setQuantidade(e.target.value)}
                      placeholder="Ex: 200 pares"
                      disabled={status === "sending"}
                    />
                  </div>
                </div>
                <div className="mb-5">
                  <label className="field-label">
                    Detalhes / especificações
                  </label>
                  <textarea
                    className="input-i"
                    rows={5}
                    value={detalhes}
                    onChange={(e) => setDetalhes(e.target.value)}
                    placeholder="Diâmetro, comprimento, material, prazo desejado…"
                    disabled={status === "sending"}
                  />
                </div>

                {status === "error" && errorMsg && (
                  <div
                    className="mb-4 px-4 py-3 rounded-md font-body text-[13px]"
                    style={{
                      background: "oklch(20% 0.06 30 / 60%)",
                      border: "1px solid oklch(36% 0.13 30)",
                      color: "oklch(76% 0.13 30)",
                    }}
                  >
                    {errorMsg}
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full justify-center"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Enviando…" : "Enviar solicitação"}
                </Button>
                <div className="font-body text-[12px] text-text-3 text-center mt-3">
                  ou ligue:{" "}
                  <strong className="text-text-2">(44) 3255-1912</strong>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
