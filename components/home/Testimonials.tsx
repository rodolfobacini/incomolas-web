export function Testimonials() {
  const items = [
    {
      quote:
        "Atendem academias da nossa rede há 4 anos. As molas Incomolas têm vida útil bem maior que as importadas que usávamos antes.",
      name: "Carlos R.",
      role: "Diretor · Rede Fitness SP",
      initials: "CR",
    },
    {
      quote:
        "Compro kits de cama elástica em volume há tempo. Embalagem reforçada, prazo cumprido, e o suporte técnico é rápido.",
      name: "Juliana M.",
      role: "Distribuidora · MG",
      initials: "JM",
    },
    {
      quote:
        "Pedimos um lote sob medida com especificações próprias. A engenharia entendeu rápido e enviou amostra antes de produzir tudo.",
      name: "Eng. Pedro A.",
      role: "Indústria de Equipamentos",
      initials: "PA",
    },
  ];
  return (
    <section className="py-20 border-b border-[var(--border)]">
      <div className="container-i">
        <span className="section-label">Quem confia</span>
        <h2 className="font-display text-[42px] font-extrabold text-text-1 mb-9">
          Clientes que já produzem com a Incomolas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((it) => (
            <div key={it.name} className="card-i p-7">
              <div
                className="font-display text-[40px] leading-[0.6] mb-3"
                style={{ color: "var(--accent)" }}
              >
                &ldquo;
              </div>
              <p className="font-body text-[15px] text-text-2 leading-[1.7] italic mb-5">
                {it.quote}
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-[var(--border)]">
                <div
                  className="w-9 h-9 rounded-full grid place-items-center font-display font-bold text-[13px]"
                  style={{
                    background: "var(--bg-3)",
                    border: "1px solid var(--border)",
                    color: "var(--accent)",
                  }}
                >
                  {it.initials}
                </div>
                <div>
                  <div className="font-display text-[14px] font-bold text-text-1">
                    {it.name}
                  </div>
                  <div className="font-display text-[11px] uppercase tracking-[0.08em] text-text-3">
                    {it.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
