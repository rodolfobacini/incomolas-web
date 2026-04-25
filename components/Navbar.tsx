"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./ui/Logo";
import { Button } from "./ui/Button";
import { useCart } from "@/store/cart";
import { useEffect, useState } from "react";
import { IS_ECOMMERCE } from "@/lib/mode";

const LINKS = [
  { href: "/catalogo", label: "Catálogo" },
  { href: "/catalogo?cat=academia", label: "Academia" },
  { href: "/catalogo?cat=cama", label: "Cama" },
  { href: "/catalogo?cat=jump", label: "Jump" },
  { href: "/catalogo?cat=industrial", label: "Industrial" },
  { href: "/catalogo?cat=automotivo", label: "Automotivo" },
  { href: "/sobre", label: "Sobre" },
  { href: "/orcamento", label: "Orçamento" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const count = useCart((s) => s.count());

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="nav-i">
      <div className="container-i h-full flex items-center justify-between">
        <Logo />
        <nav className="hidden lg:flex gap-5 items-center">
          {LINKS.map((l) => {
            const baseHref = l.href.split("?")[0];
            const active = pathname === baseHref || (baseHref !== "/" && pathname.startsWith(baseHref));
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`font-display text-[13px] font-semibold tracking-[0.07em] uppercase transition-colors ${
                  active ? "text-[color:var(--accent)]" : "text-text-2 hover:text-text-1"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex gap-2.5 items-center">
          {IS_ECOMMERCE && (
            <Link
              href="/carrinho"
              className="relative grid place-items-center w-[38px] h-[38px] rounded-md bg-bg-3 border border-[var(--border)] hover:border-[var(--border-2)] transition-colors"
              aria-label="Carrinho"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--text-2)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {mounted && count > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] grid place-items-center rounded-full text-white font-display font-bold text-[10px]"
                  style={{ background: "var(--accent)" }}
                >
                  {count}
                </span>
              )}
            </Link>
          )}
          <Button href="/orcamento" variant="primary" size="sm">
            Solicitar Orçamento
          </Button>
        </div>
      </div>
    </header>
  );
}
