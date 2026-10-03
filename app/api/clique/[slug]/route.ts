import { registrarClique } from "@/lib/promozap-admin";
import { NextRequest } from "next/server";

// Proxy same-origin pro promozap-admin — o navegador chama esta rota (via
// navigator.sendBeacon no clique do botão do WhatsApp), nunca a do
// promozap-admin diretamente, porque a chave de API fica só no servidor
// (PROMOZAP_ADMIN_API_KEY). Responde rápido e não bloqueia nada: quem chama
// é fire-and-forget (ver components/WhatsappButton.tsx).
export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const body = (await req.json().catch(() => ({}))) as {
    inviteLink?: string;
    fbclid?: string | null;
    eventId?: string | null;
  };

  if (!body.inviteLink) {
    return Response.json({ error: "inviteLink obrigatório" }, { status: 400 });
  }

  try {
    const ok = await registrarClique(slug, body.inviteLink, body.fbclid ?? null, body.eventId ?? null);
    return Response.json({ ok });
  } catch (err) {
    console.error(`[api/clique/${slug}] Falha ao registrar clique:`, err);
    return Response.json({ ok: false }, { status: 502 });
  }
}
