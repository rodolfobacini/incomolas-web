export function DiffBand() {
  const items = [
    {
      n: "01",
      t: "Fabricação Própria",
      d: "Indústria com 15+ anos. Você compra direto da fonte, sem intermediários.",
    },
    {
      n: "02",
      t: "Qualidade Certificada",
      d: "Aço SAE 9254 e Inox AISI 304. Inspeção dimensional e de carga em cada lote.",
    },
    {
      n: "03",
      t: "Atacado & Varejo",
      d: "Compre 1 par ou milhares de unidades. Tabela de volume com até 29% off.",
    },
    {
      n: "04",
      t: "Entrega para o Brasil",
      d: "PAC, SEDEX ou transportadora. Embalagem reforçada para qualquer destino.",
    },
  ];
  return (
    <section
      className="py-14 border-b border-[var(--border)]"
      style={{ background: "var(--accent)" }}
    >
      <div className="container-i grid grid-cols-1 md:grid-cols-4 gap-10">
        {items.map((it) => (
          <div key={it.n}>
            <div
              className="font-display text-[52px] font-black leading-none mb-1"
              style={{ color: "rgba(0,0,0,0.14)" }}
            >
              {it.n}
            </div>
            <div className="font-display text-[22px] font-extrabold text-white mb-2">
              {it.t}
            </div>
            <div className="font-body text-[14px] leading-relaxed" style={{ color: "rgba(255,255,255,0.78)" }}>
              {it.d}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
