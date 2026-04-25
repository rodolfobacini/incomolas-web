import { Suspense } from "react";
import Link from "next/link";
import { CatalogClient } from "@/components/catalog/CatalogClient";

export const metadata = {
  title: "Catálogo de Molas — Incomolas",
};

export default function CatalogoPage() {
  return (
    <>
      {/* breadcrumb */}
      <div className="py-3.5 border-b border-[var(--border)]">
        <div className="container-i flex items-center gap-2">
          <Link className="font-body text-[13px] text-text-3 hover:text-text-2" href="/">
            Início
          </Link>
          <span className="text-[var(--border-2)]">›</span>
          <span className="font-body text-[13px] text-text-2">Catálogo</span>
        </div>
      </div>

      <Suspense
        fallback={<div className="container-i py-20 text-text-3">Carregando catálogo…</div>}
      >
        <CatalogClient />
      </Suspense>
    </>
  );
}
