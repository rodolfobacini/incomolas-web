import Link from "next/link";
import Image from "next/image";
import { CATEGORIES, CATEGORY_IMAGES } from "@/lib/categories";
import type { CategoryKey } from "@/lib/types";

export function CategoryCards() {
  const cats = CATEGORIES.filter((c) => c.key !== "todos");
  return (
    <section id="categorias" className="py-20 border-b border-[var(--border)]">
      <div className="container-i">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="section-label">Categorias</span>
            <h2 className="font-display text-[42px] font-extrabold text-text-1">
              Encontre por aplicação
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {cats.map((cat) => (
            <Link
              key={cat.key}
              href={`/catalogo?cat=${cat.key}`}
              className="card-i p-6 cursor-pointer hover:bg-bg-3 transition-colors"
              style={{ borderTop: "3px solid var(--accent)" }}
            >
              <div
                className="h-32 mb-4 relative rounded-md overflow-hidden"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 40%, #1a1a1d 0%, #0a0a0c 100%)",
                }}
              >
                <Image
                  src={CATEGORY_IMAGES[cat.key as CategoryKey]}
                  alt={cat.label}
                  fill
                  sizes="(max-width: 640px) 90vw, 250px"
                  style={{
                    objectFit: "contain",
                    padding: 12,
                    filter: "drop-shadow(0 6px 20px rgba(0,0,0,0.7))",
                  }}
                />
              </div>
              <div className="font-display text-[22px] font-extrabold text-text-1 mb-1.5">
                {cat.label}
              </div>
              <div className="font-body text-[13px] text-text-3 leading-relaxed mb-4 min-h-[3.4em]">
                {cat.desc}
              </div>
              <div className="font-display text-[12px] font-bold tracking-[0.08em] uppercase text-[color:var(--accent)]">
                Ver produtos →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
