/**
 * Modo do site.
 *
 * - "catalog" (padrão): site institucional/mostruário. Sem carrinho, sem
 *   preço, CTA principal é "Solicitar Orçamento".
 * - "ecommerce": loja completa com carrinho + checkout, preços visíveis.
 *
 * Setar via variável de ambiente `NEXT_PUBLIC_MODE`. Como começa com
 * NEXT_PUBLIC_, o valor é embutido no bundle do cliente em build time.
 */
export type SiteMode = "catalog" | "ecommerce";

export const MODE: SiteMode =
  (process.env.NEXT_PUBLIC_MODE as SiteMode) === "ecommerce"
    ? "ecommerce"
    : "catalog";

export const IS_CATALOG = MODE === "catalog";
export const IS_ECOMMERCE = MODE === "ecommerce";
