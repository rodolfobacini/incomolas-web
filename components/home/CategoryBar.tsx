import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";

export function CategoryBar() {
  const cats = CATEGORIES.filter((c) => c.key !== "todos");
  return (
    <div className="border-b border-[var(--border)]">
      <div className="container-i">
        <div className="grid grid-cols-2 md:grid-cols-5">
          {cats.map((cat, i) => (
            <Link
              key={cat.key}
              href={`/catalogo?cat=${cat.key}`}
              className={`flex items-center gap-3.5 py-5 transition-colors hover:bg-bg-3 ${
                i < cats.length - 1 ? "border-r border-[var(--border)] pr-6" : ""
              } pl-${i === 0 ? "0" : "6"}`}
              style={i === 0 ? { paddingLeft: 0 } : { paddingLeft: 24 }}
            >
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: "var(--accent)" }}
              />
              <div>
                <div className="font-display text-[13px] font-extrabold text-text-1 tracking-[0.08em] uppercase">
                  {cat.label}
                </div>
                <div className="font-display text-[11px] text-text-3 tracking-[0.06em] uppercase mt-0.5">
                  {cat.short ?? "Ver categoria"} →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
