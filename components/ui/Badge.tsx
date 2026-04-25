import type { ProductBadge } from "@/lib/types";
import { cn } from "@/lib/cn";

const KIND_CLASS: Record<ProductBadge["kind"], string> = {
  estoque: "badge-green",
  atacado: "badge-accent",
  sobmedida: "badge-steel",
  kit: "badge-neutral",
  par: "badge-neutral",
  consulte: "badge-neutral",
  neutro: "badge-neutral",
};

export function Badge({
  kind = "neutro",
  children,
  className,
}: {
  kind?: ProductBadge["kind"] | "estoque" | "atacado" | "sobmedida" | "kit" | "par" | "consulte" | "neutro";
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("badge", KIND_CLASS[kind], className)}>{children}</span>
  );
}
