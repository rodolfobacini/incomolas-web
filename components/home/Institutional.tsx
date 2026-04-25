import { Button } from "../ui/Button";

export function Institutional() {
  return (
    <section
      id="institucional"
      className="py-20 border-b border-[var(--border)]"
    >
      <div className="container-i">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="card-i h-[400px] flex items-center justify-center relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-60"
              style={{
                background:
                  "repeating-linear-gradient(45deg, #1E1E21 0px, #1E1E21 7px, #242427 7px, #242427 14px)",
              }}
            />
            <div className="relative z-10 text-center px-8">
              <div className="font-display text-[14px] uppercase tracking-[0.18em] text-text-3 mb-3">
                Foto da fábrica
              </div>
              <div className="font-display text-[28px] font-extrabold text-text-1 leading-tight">
                15+ anos
                <br />
                fabricando molas
              </div>
            </div>
          </div>
          <div>
            <span className="section-label">Quem somos</span>
            <h2 className="font-display text-[48px] font-black text-text-1 leading-none mb-5">
              Mola é o nosso ofício
            </h2>
            <p className="font-body text-[16px] text-text-2 leading-[1.75] mb-3.5">
              A Incomolas é uma indústria brasileira especializada na produção
              de molas helicoidais de alta resistência. Atendemos academias,
              fabricantes de equipamentos esportivos e indústrias com qualidade
              certificada e prazos confiáveis.
            </p>
            <div className="flex flex-col gap-3 my-7">
              {[
                ["Aço selecionado", "SAE 9254, Carbono e Inox AISI 304"],
                ["Tratamentos térmicos próprios", "Têmpera e revenimento controlados"],
                ["Lote padrão e sob medida", "1 par a 10.000+ unidades por pedido"],
              ].map(([title, sub]) => (
                <div key={title} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-sm grid place-items-center mt-0.5 flex-shrink-0"
                    style={{
                      background: "var(--accent-bg)",
                      border: "1px solid oklch(35% 0.1 38)",
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6.5l2.5 2.5 5.5-5.5"
                        stroke="var(--accent)"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className="font-body text-[15px] text-text-2 leading-snug">
                    <strong className="text-text-1 font-semibold">
                      {title}.
                    </strong>{" "}
                    {sub}.
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <Button href="/orcamento" variant="primary">
                Falar com a Engenharia
              </Button>
              <Button href="/catalogo" variant="outline">
                Ver Catálogo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
