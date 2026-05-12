import Image from "next/image";
import { PDF_EXTRACTED_PRODUCTS } from "@/lib/pdf-extracted-products";

export function PdfExtractGallery() {
  return (
    <section className="py-20 border-b border-[var(--border)]">
      <div className="container-i">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <span className="section-label">Novo do catálogo</span>
            <h2 className="font-display text-[42px] font-extrabold text-text-1 leading-tight">
              Produtos extraídos dos PDFs
            </h2>
            <p className="mt-2 font-mono text-[12px] text-text-3">
              Imagens em fundo preto prontas para vitrine.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PDF_EXTRACTED_PRODUCTS.map((item) => (
            <article key={item.id} className="card-i overflow-hidden">
              <div className="relative aspect-square bg-black">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain p-5"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-4">
                <p className="font-display text-[16px] font-bold text-text-1">{item.name}</p>
                <p className="mt-1 font-mono text-[12px] text-text-3">
                  {item.catalog} · página {item.page}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
