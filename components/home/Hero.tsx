import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";

export function Hero() {
  return (
    <section
      className="relative overflow-hidden border-b border-[var(--border)] py-24"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(18% 0.07 38 / 40%) 0%, transparent 70%)",
      }}
    >
      {/* Decorative spring outlines */}
      <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 -left-20 opacity-[0.045]">
        <SpringDecor />
      </div>
      <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 -right-20 opacity-[0.045] scale-x-[-1]">
        <SpringDecor />
      </div>

      <div className="container-i relative z-10 max-w-[960px] text-center">
        <div className="flex gap-2 justify-center flex-wrap mb-7">
          <Badge kind="atacado">Fabricante direto</Badge>
          <Badge kind="estoque">Qualidade garantida</Badge>
          <Badge kind="sobmedida">Atacado &amp; varejo</Badge>
        </div>
        <h1 className="font-display font-black text-[64px] md:text-[96px] leading-[0.88] tracking-[-0.02em] text-text-1 mb-7 text-balance">
          A MOLA CERTA
          <br />
          PARA CADA
          <br />
          <span
            className="text-transparent"
            style={{
              WebkitTextStroke: "2px var(--accent)",
              color: "transparent",
            }}
          >
            APLICAÇÃO
          </span>
        </h1>
        <p className="font-body text-[19px] text-text-2 leading-[1.65] max-w-[54ch] mx-auto mb-10">
          Fabricamos molas agrícolas, automotivas, industriais e para academia, cama
          elástica e jump. Reposição original por código de fabricante e projetos sob
          medida — do varejo ao atacado.
        </p>
        <div className="flex flex-wrap gap-3.5 justify-center">
          <Button href="/catalogo" variant="primary" size="lg">
            Explorar Catálogo
          </Button>
          <Button href="/orcamento" variant="outline" size="lg">
            Solicitar Orçamento
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-14 mt-16 pt-10 border-t border-[var(--border)]">
          <Stat n="10k+" label="Produtos entregues" highlight="k" />
          <Stat n="100%" label="Qualidade garantida" highlight="%" />
          <Stat n="15+" label="Anos de mercado" highlight="+" />
          <Stat n="BR" label="Entrega nacional" />
        </div>
      </div>
    </section>
  );
}

function Stat({
  n,
  label,
  highlight,
}: {
  n: string;
  label: string;
  highlight?: string;
}) {
  const parts = highlight ? n.split(highlight) : [n];
  return (
    <div className="text-center">
      <div className="font-display text-[40px] font-black leading-none text-text-1">
        {parts[0]}
        {highlight && (
          <span style={{ color: "var(--accent)" }}>{highlight}</span>
        )}
        {parts[1]}
      </div>
      <div className="font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-text-3 mt-1">
        {label}
      </div>
    </div>
  );
}

function SpringDecor() {
  return (
    <svg width="220" height="600" viewBox="0 0 220 600" fill="none">
      {[40, 105, 170, 235, 300, 365, 430, 495, 560].map((y) => (
        <ellipse
          key={y}
          cx="110"
          cy={y}
          rx="95"
          ry="34"
          stroke="oklch(66% 0.19 38)"
          strokeWidth="2"
          fill="none"
        />
      ))}
      <line
        x1="15"
        y1="40"
        x2="15"
        y2="560"
        stroke="oklch(66% 0.19 38)"
        strokeWidth="2"
      />
      <line
        x1="205"
        y1="40"
        x2="205"
        y2="560"
        stroke="oklch(66% 0.19 38)"
        strokeWidth="2"
      />
    </svg>
  );
}
