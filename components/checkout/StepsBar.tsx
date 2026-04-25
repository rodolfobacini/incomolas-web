import Link from "next/link";

const STEPS = [
  { n: 1, label: "Carrinho", href: "/carrinho" },
  { n: 2, label: "Entrega", href: "/checkout/entrega" },
  { n: 3, label: "Pagamento", href: "/checkout/pagamento" },
  { n: 4, label: "Confirmação", href: "/checkout/confirmacao" },
] as const;

export function StepsBar({ active }: { active: 1 | 2 | 3 | 4 }) {
  return (
    <div className="border-b border-[var(--border)] bg-bg-2">
      <div className="container-i flex items-center gap-0 h-14">
        {STEPS.map((s, i) => {
          const state =
            s.n < active ? "done" : s.n === active ? "active" : "pending";
          return (
            <Link
              key={s.n}
              href={s.href}
              className="flex items-center gap-2.5 px-7 h-full relative cursor-pointer"
              style={
                i < STEPS.length - 1
                  ? {}
                  : {}
              }
            >
              <span
                className={`w-[26px] h-[26px] rounded-full grid place-items-center font-display text-[13px] font-extrabold transition-colors`}
                style={{
                  background:
                    state === "done"
                      ? "var(--green)"
                      : state === "active"
                        ? "var(--accent)"
                        : "var(--bg-3)",
                  color:
                    state === "pending" ? "var(--text-3)" : "#fff",
                  border:
                    state === "pending"
                      ? "1.5px solid var(--border)"
                      : "none",
                }}
              >
                {state === "done" ? "✓" : s.n}
              </span>
              <span
                className={`font-display text-[13px] font-bold tracking-[0.06em] uppercase ${
                  state === "active"
                    ? "text-text-1"
                    : state === "done"
                      ? "text-text-2"
                      : "text-text-3"
                }`}
              >
                {s.label}
              </span>
              {i < STEPS.length - 1 && (
                <span
                  className="absolute -right-1 text-[18px]"
                  style={{ color: "var(--border-2)" }}
                >
                  ›
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
