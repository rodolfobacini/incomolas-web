export function brl(n: number): string {
  return n.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function brlFull(n: number): string {
  return `R$ ${brl(n)}`;
}
