"use client";

import { trackContact, trackLead, type PixelGroup } from "@/lib/meta-pixel";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// O clique leva o usuário para fora do site (chat.whatsapp.com). Disparar o
// evento via navegação direta do <a href> roda no mesmo instante em que o
// navegador já está saindo da página — em conexões lentas ou no navegador
// in-app do Instagram/Facebook (que é o que abre ao clicar no anúncio), o
// pedido de rede do Pixel pode não terminar de ser enviado, e o evento se
// perde. Por isso: abre a aba primeiro (precisa rodar dentro do clique do
// usuário, senão vira pop-up bloqueado) e só then dispara o Pixel — a aba
// original continua viva tempo suficiente pro request completar.
export default function WhatsappButton({
  href,
  children,
  trackingGroup,
  slug,
  fbclid,
}: Readonly<{
  href: string;
  children: React.ReactNode;
  trackingGroup?: PixelGroup;
  /** Slug da landing page no promozap-admin — presente, registra o clique de verdade (ver app/api/clique/[slug]). */
  slug?: string;
  fbclid?: string | null;
}>) {
  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    window.open(href, "_blank");

    // Mesmo event_id no Pixel (aqui) e no evento server-side que o
    // promozap-admin dispara quando a entrada no grupo é confirmada — a Meta
    // deduplica sozinha os dois lados.
    const eventId = crypto.randomUUID();

    if (trackingGroup) {
      trackContact(trackingGroup, eventId);
      trackLead(trackingGroup, eventId);
    } else {
      window.fbq?.("track", "Contact");
      window.fbq?.("track", "Lead");
    }

    // Registro do clique de verdade (LinkCurto no promozap-admin) — não
    // bloqueia a navegação: sendBeacon é fire-and-forget, sobrevive mesmo
    // que a aba perca o foco logo em seguida.
    if (slug) {
      const payload = JSON.stringify({ inviteLink: href, fbclid: fbclid ?? null, eventId });
      navigator.sendBeacon?.(`/api/clique/${slug}`, new Blob([payload], { type: "application/json" }));
    }
  }

  return (
    <a href={href} className="btn-whats" onClick={handleClick}>
      {children}
    </a>
  );
}
