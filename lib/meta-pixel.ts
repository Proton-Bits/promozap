export type PixelGroup =
  | "grupo_18_30"
  | "grupo_31_50"
  | "grupo_50_plus"
  | "achadinhos"
  // Botões da página raiz (app/page.tsx) — separados das landing pages pra
  // dar pra ver cada um no Events Manager.
  | "home_achadinhos"
  | "home_perfumes";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// Sem group (ex.: página raiz, que tem os dois grupos), vai sem content_category.
export function trackPageView(group?: PixelGroup) {
  if (typeof window === "undefined") return;
  window.fbq?.("track", "PageView", group ? { content_category: group } : undefined);
}

export function trackViewContent(group?: PixelGroup) {
  if (typeof window === "undefined") return;
  window.fbq?.("track", "ViewContent", group ? { content_category: group } : undefined);
}

export function trackContact(group: PixelGroup, eventId?: string) {
  if (typeof window === "undefined") return;
  window.fbq?.("track", "Contact", { content_category: group }, eventId ? { eventID: eventId } : undefined);
}

// eventId, quando passado, é o mesmo usado no evento server-side (Conversions
// API, disparado a partir da entrada confirmada no grupo) — a Meta deduplica
// sozinha eventos de Pixel e CAPI que compartilham o event_id, evitando
// contar a mesma pessoa duas vezes (clique no navegador + entrada real).
export function trackLead(group: PixelGroup, eventId?: string) {
  if (typeof window === "undefined") return;
  window.fbq?.("track", "Lead", { content_category: group }, eventId ? { eventID: eventId } : undefined);
}
