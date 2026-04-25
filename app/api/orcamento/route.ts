import { NextResponse } from "next/server";
import { Resend } from "resend";
import { renderQuoteEmail, type QuoteSubmission } from "@/lib/email-template";

export const runtime = "nodejs";

const TO = process.env.EMAIL_TO ?? "incomolas@gmail.com";
const FROM = process.env.EMAIL_FROM ?? "Incomolas Orçamentos <onboarding@resend.dev>";

export async function POST(req: Request) {
  let payload: QuoteSubmission;
  try {
    payload = (await req.json()) as QuoteSubmission;
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  // validação básica
  const required = ["nome", "email", "telefone"] as const;
  for (const k of required) {
    if (!payload[k] || String(payload[k]).trim().length < 2) {
      return NextResponse.json(
        { ok: false, error: `missing_${k}` },
        { status: 400 },
      );
    }
  }
  if (!/^\S+@\S+\.\S+$/.test(payload.email)) {
    return NextResponse.json(
      { ok: false, error: "invalid_email" },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const { subject, html, text } = renderQuoteEmail(payload);

  // Sem API key configurada → loga no servidor e retorna ok (para dev)
  if (!apiKey) {
    console.warn(
      "[orcamento] RESEND_API_KEY não configurada — e-mail não foi enviado.",
    );
    console.info("[orcamento] subject:", subject);
    console.info("[orcamento] to:", TO);
    console.info("[orcamento] text:\n", text);
    return NextResponse.json({
      ok: true,
      delivered: false,
      reason: "missing_api_key",
    });
  }

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: payload.email,
      subject,
      html,
      text,
    });

    if (result.error) {
      console.error("[orcamento] Resend error:", result.error);
      return NextResponse.json(
        { ok: false, error: "send_failed" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, delivered: true, id: result.data?.id });
  } catch (err) {
    console.error("[orcamento] unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "send_failed" },
      { status: 502 },
    );
  }
}
