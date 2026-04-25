"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { Button } from "../ui/Button";

export function LoadCalculator({ product }: { product: Product }) {
  const [carga, setCarga] = useState("80");
  const [curso, setCurso] = useState("40");

  // pega k da spec se existir (ex: "8,4 kgf/mm")
  const k = useMemo(() => {
    const row = product.specs.desempenho.find((r) =>
      r.key.toLowerCase().includes("constante"),
    );
    if (!row) return 8.4;
    const m = row.value.replace(",", ".").match(/[\d.]+/);
    return m ? parseFloat(m[0]) : 8.4;
  }, [product]);

  const cargaN = parseFloat(carga.replace(",", ".")) || 0;
  const cursoN = parseFloat(curso.replace(",", ".")) || 0;

  const deflexao = k > 0 ? cargaN / k : 0;
  const cargaMaxRow = product.specs.desempenho.find((r) =>
    r.key.toLowerCase().includes("carga"),
  );
  const cargaMax = cargaMaxRow
    ? parseFloat(cargaMaxRow.value.replace(",", ".")) || 120
    : 120;

  const ok = cargaN <= cargaMax && deflexao >= cursoN;

  return (
    <div className="card-i p-7 hover:translate-y-0">
      <div className="font-display text-[14px] font-bold uppercase tracking-[0.12em] text-text-3 mb-5">
        Simular aplicação
      </div>

      <div className="mb-4">
        <label className="field-label">Carga aplicada</label>
        <div className="relative">
          <input
            className="input-i pr-14"
            type="text"
            value={carga}
            onChange={(e) => setCarga(e.target.value)}
            placeholder="Ex: 80"
          />
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 font-mono text-[12px] text-text-3 pointer-events-none">
            kgf
          </span>
        </div>
      </div>

      <div className="mb-5">
        <label className="field-label">Curso necessário</label>
        <div className="relative">
          <input
            className="input-i pr-14"
            type="text"
            value={curso}
            onChange={(e) => setCurso(e.target.value)}
            placeholder="Ex: 40"
          />
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 font-mono text-[12px] text-text-3 pointer-events-none">
            mm
          </span>
        </div>
      </div>

      <hr className="border-[var(--border)] my-5" />

      <div className="flex flex-col">
        <Result label="Deflexão estimada">
          <span className="font-display text-[32px] font-black text-[color:var(--accent)] leading-none">
            {deflexao.toFixed(1).replace(".", ",")}
            <span className="text-[15px] font-normal text-text-3 ml-1">mm</span>
          </span>
        </Result>
        <Result label="Carga máx. desta mola">
          <span className="font-display text-[24px] font-black text-text-1 leading-none">
            {cargaMax.toFixed(0)}
            <span className="text-[14px] font-normal text-text-3 ml-1">kgf</span>
          </span>
        </Result>
      </div>

      <div
        className={`flex items-center gap-2.5 mt-5 px-4 py-3.5 rounded-md ${
          ok ? "" : ""
        }`}
        style={{
          background: ok ? "var(--green-bg)" : "var(--accent-bg)",
          border: `1px solid ${
            ok ? "oklch(28% 0.1 145)" : "oklch(28% 0.1 38)"
          }`,
        }}
      >
        <span
          className="font-display text-[14px] font-bold uppercase tracking-[0.06em]"
          style={{ color: ok ? "var(--green)" : "var(--accent)" }}
        >
          {ok ? "✓ Atende ao projeto" : "⚠ Verificar especificação"}
        </span>
      </div>

      <p className="font-body text-[12px] text-text-3 leading-relaxed mt-4">
        Cálculo aproximado para conferência. Para projetos críticos, envie a
        especificação completa para nossa engenharia.
      </p>
      <Button href="/orcamento" variant="ghost" className="w-full justify-center mt-3">
        Falar com a engenharia
      </Button>
    </div>
  );
}

function Result({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="py-4 border-b border-[var(--border)] last:border-0">
      <div className="font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-text-3 mb-1">
        {label}
      </div>
      {children}
    </div>
  );
}
