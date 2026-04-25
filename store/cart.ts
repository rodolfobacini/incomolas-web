"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product } from "@/lib/types";

export interface CartLine {
  slug: string;
  name: string;
  category: string;
  spec: string;
  price: number;
  qty: number;
  imageTone: Product["imageTone"];
  image?: string;
  badgeKey?: string;
}

interface CartState {
  items: CartLine[];
  add: (line: Omit<CartLine, "qty">, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  count: () => number;
  subtotal: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (line, qty = 1) =>
        set((s) => {
          const existing = s.items.find((i) => i.slug === line.slug);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.slug === line.slug ? { ...i, qty: i.qty + qty } : i,
              ),
            };
          }
          return { items: [...s.items, { ...line, qty }] };
        }),
      remove: (slug) =>
        set((s) => ({ items: s.items.filter((i) => i.slug !== slug) })),
      setQty: (slug, qty) =>
        set((s) => ({
          items: s.items
            .map((i) => (i.slug === slug ? { ...i, qty: Math.max(1, qty) } : i))
            .filter((i) => i.qty > 0),
        })),
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((acc, i) => acc + i.qty, 0),
      subtotal: () =>
        get().items.reduce((acc, i) => acc + i.qty * i.price, 0),
    }),
    {
      name: "incomolas-cart",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
