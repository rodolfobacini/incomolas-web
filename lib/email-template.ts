import { getProduct } from "./products";

export interface QuoteSubmission {
  nome: string;
  email: string;
  telefone: string;
  tipoMola: string;
  quantidade: string;
  detalhes: string;
  productSlug?: string;
}

const CATEGORIA_LABEL: Record<string, string> = {
  academia: "Academia",
  cama: "Cama Elástica",
  jump: "Jump / Mini Cama",
  industrial: "Industrial",
  automotivo: "Automotivo",
  custom: "Sob medida",
};

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

export function renderQuoteEmail(data: QuoteSubmission): RenderedEmail {
  const product = data.productSlug ? getProduct(data.productSlug) : undefined;
  const tipo =
    CATEGORIA_LABEL[data.tipoMola] ?? data.tipoMola ?? "Não informado";

  const subject = product
    ? `[Orçamento Incomolas] ${product.name} — ${data.nome}`
    : `[Orçamento Incomolas] ${tipo} — ${data.nome}`;

  const now = new Date().toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    dateStyle: "long",
    timeStyle: "short",
  });

  const html = htmlTemplate({ data, product, tipo, when: now });
  const text = textTemplate({ data, product, tipo, when: now });

  return { subject, html, text };
}

function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:10px 14px;background:#f7f6f3;font-family:'Barlow Condensed',Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:#6b6a68;width:38%;border-bottom:1px solid #e7e5e0;">
        ${escapeHtml(label)}
      </td>
      <td style="padding:10px 14px;font-family:Arial,sans-serif;font-size:14px;color:#1a1a1a;border-bottom:1px solid #e7e5e0;">
        ${value}
      </td>
    </tr>`;
}

function htmlTemplate({
  data,
  product,
  tipo,
  when,
}: {
  data: QuoteSubmission;
  product: ReturnType<typeof getProduct>;
  tipo: string;
  when: string;
}): string {
  const productBlock = product
    ? `
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 20px 0;background:#0e0e0f;border-radius:8px;overflow:hidden;">
      <tr>
        <td style="padding:18px 20px;">
          <div style="font-family:'Barlow Condensed',Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#e8631a;margin-bottom:6px;">
            Produto consultado
          </div>
          <div style="font-family:'Barlow Condensed',Arial,sans-serif;font-size:22px;font-weight:800;color:#f2f1ef;line-height:1.1;margin-bottom:6px;">
            ${escapeHtml(product.name)}
          </div>
          <div style="font-family:'Courier New',monospace;font-size:12px;color:#a8a7a4;">
            REF ${escapeHtml(product.ref)} · ${escapeHtml(product.spec)}
          </div>
        </td>
      </tr>
    </table>`
    : "";

  const detalhes = data.detalhes?.trim()
    ? escapeHtml(data.detalhes).replace(/\n/g, "<br>")
    : '<em style="color:#888;">Não informado</em>';

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Novo orçamento — Incomolas</title>
</head>
<body style="margin:0;padding:0;background:#f0eee9;font-family:Arial,sans-serif;color:#1a1a1a;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f0eee9;padding:24px 12px;">
    <tr>
      <td align="center">
        <table cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.08);">

          <!-- HEADER -->
          <tr>
            <td style="background:#0e0e0f;padding:22px 28px;">
              <div style="font-family:'Barlow Condensed',Arial,sans-serif;font-size:24px;font-weight:900;color:#f2f1ef;letter-spacing:-0.3px;line-height:1;">
                INCOMOLAS
              </div>
              <div style="height:3px;width:34px;background:#e8631a;margin-top:4px;"></div>
              <div style="font-family:'Barlow Condensed',Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#a8a7a4;margin-top:14px;">
                Nova solicitação de orçamento
              </div>
            </td>
          </tr>

          <!-- TITLE -->
          <tr>
            <td style="padding:28px 28px 8px 28px;">
              <h1 style="margin:0 0 6px 0;font-family:'Barlow Condensed',Arial,sans-serif;font-size:28px;font-weight:800;color:#1a1a1a;line-height:1.15;">
                ${escapeHtml(data.nome)}
              </h1>
              <p style="margin:0;font-family:Arial,sans-serif;font-size:13px;color:#6b6a68;">
                solicitou um orçamento via incomolas.com.br
              </p>
              <p style="margin:6px 0 0 0;font-family:'Courier New',monospace;font-size:12px;color:#888;">
                ${escapeHtml(when)}
              </p>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding:18px 28px 28px 28px;">

              ${productBlock}

              <!-- Dados do solicitante -->
              <div style="font-family:'Barlow Condensed',Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#e8631a;margin:0 0 10px 0;">
                Dados do solicitante
              </div>
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid #e7e5e0;border-radius:8px;overflow:hidden;margin-bottom:24px;">
                ${row("Nome / Empresa", escapeHtml(data.nome))}
                ${row(
                  "E-mail",
                  `<a href="mailto:${escapeHtml(data.email)}" style="color:#e8631a;text-decoration:none;">${escapeHtml(data.email)}</a>`,
                )}
                ${row(
                  "WhatsApp",
                  `<a href="https://wa.me/55${escapeHtml(onlyDigits(data.telefone))}" style="color:#e8631a;text-decoration:none;">${escapeHtml(data.telefone)}</a>`,
                )}
              </table>

              <!-- Detalhes do pedido -->
              <div style="font-family:'Barlow Condensed',Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#e8631a;margin:0 0 10px 0;">
                Detalhes do pedido
              </div>
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid #e7e5e0;border-radius:8px;overflow:hidden;margin-bottom:18px;">
                ${row("Categoria", escapeHtml(tipo))}
                ${row(
                  "Quantidade estimada",
                  data.quantidade?.trim()
                    ? escapeHtml(data.quantidade)
                    : '<em style="color:#888;">Não informada</em>',
                )}
              </table>

              <!-- Especificações -->
              <div style="font-family:'Barlow Condensed',Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#e8631a;margin:0 0 10px 0;">
                Especificações / Observações
              </div>
              <div style="background:#f7f6f3;border:1px solid #e7e5e0;border-radius:8px;padding:14px 16px;font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#1a1a1a;">
                ${detalhes}
              </div>

              <!-- CTA -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:28px;">
                <tr>
                  <td align="center">
                    <a href="https://wa.me/55${escapeHtml(onlyDigits(data.telefone))}" style="display:inline-block;background:#e8631a;color:#fff;font-family:'Barlow Condensed',Arial,sans-serif;font-size:14px;font-weight:700;letter-spacing:1px;text-transform:uppercase;text-decoration:none;padding:12px 28px;border-radius:6px;">
                      Responder via WhatsApp
                    </a>
                    <a href="mailto:${escapeHtml(data.email)}?subject=Re%3A%20${encodeURIComponent("Orçamento Incomolas")}" style="display:inline-block;background:transparent;color:#1a1a1a;font-family:'Barlow Condensed',Arial,sans-serif;font-size:14px;font-weight:700;letter-spacing:1px;text-transform:uppercase;text-decoration:none;padding:12px 24px;border:1.5px solid #d6d4ce;border-radius:6px;margin-left:6px;">
                      Responder por e-mail
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:18px 28px;background:#f7f6f3;border-top:1px solid #e7e5e0;">
              <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;color:#6b6a68;line-height:1.6;">
                Este e-mail foi gerado automaticamente pelo formulário de orçamento de
                <a href="https://incomolas.com.br" style="color:#e8631a;text-decoration:none;">incomolas.com.br</a>.
                Responda a este e-mail para entrar em contato direto com ${escapeHtml(data.nome)}.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function textTemplate({
  data,
  product,
  tipo,
  when,
}: {
  data: QuoteSubmission;
  product: ReturnType<typeof getProduct>;
  tipo: string;
  when: string;
}): string {
  const lines = [
    "INCOMOLAS — Nova solicitação de orçamento",
    "==========================================",
    `Recebido em: ${when}`,
    "",
  ];
  if (product) {
    lines.push("PRODUTO CONSULTADO");
    lines.push("------------------");
    lines.push(`Nome: ${product.name}`);
    lines.push(`REF:  ${product.ref}`);
    lines.push(`Spec: ${product.spec}`);
    lines.push("");
  }
  lines.push("DADOS DO SOLICITANTE");
  lines.push("--------------------");
  lines.push(`Nome / Empresa: ${data.nome}`);
  lines.push(`E-mail:         ${data.email}`);
  lines.push(`WhatsApp:       ${data.telefone}`);
  lines.push("");
  lines.push("DETALHES DO PEDIDO");
  lines.push("------------------");
  lines.push(`Categoria:  ${tipo}`);
  lines.push(`Quantidade: ${data.quantidade || "(não informada)"}`);
  lines.push("");
  lines.push("ESPECIFICAÇÕES / OBSERVAÇÕES");
  lines.push("----------------------------");
  lines.push(data.detalhes?.trim() || "(não informado)");
  lines.push("");
  lines.push("--");
  lines.push("Enviado pelo formulário em incomolas.com.br/orcamento");
  return lines.join("\n");
}

function escapeHtml(s: string | undefined | null): string {
  if (!s) return "";
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function onlyDigits(s: string | undefined | null): string {
  return (s ?? "").replace(/\D+/g, "");
}
