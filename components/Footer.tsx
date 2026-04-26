import Link from "next/link";
import { Logo } from "./ui/Logo";

export function Footer() {
  return (
    <footer className="bg-bg-2 border-t border-[var(--border)]">
      <div className="border-b border-[var(--border)] py-14">
        <div className="container-i grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1.2fr] gap-10">
          <div>
            <Logo size="lg" />
            <p className="font-body text-[13px] text-text-3 leading-relaxed mt-5 mb-5 max-w-[34ch]">
              Fabricantes de molas de alta resistência para academias,
              equipamentos esportivos e aplicações industriais. Sediada em
              Maringá/PR, atendemos em todo o Brasil.
            </p>
            <div className="flex flex-col gap-1.5">
              <div className="font-body text-[13px] text-text-3">
                <strong className="text-text-2 font-medium">Endereço:</strong>{" "}
                Av. Prefeito Sincler Sambatti, 4242 — Jardim Bertioga, Maringá/PR
              </div>
              <div className="font-body text-[13px] text-text-3">
                <strong className="text-text-2 font-medium">CEP:</strong>{" "}
                87055-405
              </div>
              <div className="font-body text-[13px] text-text-3">
                <strong className="text-text-2 font-medium">Horário:</strong>{" "}
                Seg – Sex · 8h às 18h
              </div>
            </div>
          </div>
          <div>
            <FooterColTitle>Produtos</FooterColTitle>
            <nav className="flex flex-col gap-2.5">
              <FootLink href="/catalogo?cat=academia">Molas para Academia</FootLink>
              <FootLink href="/catalogo?cat=cama">Cama Elástica</FootLink>
              <FootLink href="/catalogo?cat=jump">Jump / Mini Cama</FootLink>
              <FootLink href="/catalogo?cat=industrial">Aplicações Industriais</FootLink>
              <FootLink href="/orcamento">Molas Sob Medida</FootLink>
              <FootLink href="/catalogo">Catálogo Completo</FootLink>
            </nav>
          </div>
          <div>
            <FooterColTitle>Empresa</FooterColTitle>
            <nav className="flex flex-col gap-2.5">
              <FootLink href="/sobre">Quem Somos</FootLink>
              <FootLink href="/sobre">Qualidade & Garantia</FootLink>
              <FootLink href="/orcamento">Atacado & Distribuidores</FootLink>
              <FootLink href="/sobre">Política de Troca</FootLink>
              <FootLink href="/sobre">Privacidade</FootLink>
              <FootLink href="/orcamento">Contato</FootLink>
            </nav>
          </div>
          <div>
            <FooterColTitle>Contato</FooterColTitle>
            <Block label="Telefone" value="(44) 3255-1912" />
            <Block label="E-mail" value="contato@incomolas.com.br" />
            <div className="font-display text-[10px] font-bold tracking-[0.14em] uppercase text-text-3 mb-1 mt-3">
              Formas de pagamento
            </div>
            <div className="flex gap-1.5 flex-wrap mt-2">
              {["Pix", "Boleto", "Cartão", "Transferência"].map((c) => (
                <span
                  key={c}
                  className="font-display text-[10px] font-bold uppercase bg-bg-3 border border-[var(--border)] rounded-sm px-2 py-0.5 text-text-3"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="py-5">
        <div className="container-i flex flex-wrap items-center justify-between gap-3">
          <div className="font-body text-[12px] text-text-3">
            © 2026 Incomolas Indústria de Molas · Todos os direitos reservados
          </div>
          <div className="flex gap-6">
            <Link className="font-body text-[12px] text-text-3 hover:text-text-2" href="#">
              Termos
            </Link>
            <Link className="font-body text-[12px] text-text-3 hover:text-text-2" href="#">
              Privacidade
            </Link>
            <Link className="font-body text-[12px] text-text-3 hover:text-text-2" href="#">
              Trocas
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColTitle({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="font-display text-[11px] font-bold tracking-[0.14em] uppercase mb-4"
      style={{ color: "var(--accent)" }}
    >
      {children}
    </div>
  );
}

function FootLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="font-body text-[14px] text-text-2 hover:text-text-1 transition-colors no-underline"
    >
      {children}
    </Link>
  );
}

function Block({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-3">
      <div className="font-display text-[10px] font-bold tracking-[0.14em] uppercase text-text-3 mb-1">
        {label}
      </div>
      <div className="font-body text-[14px] text-text-2">{value}</div>
    </div>
  );
}
