// Cliente server-side pro promozap-admin — nunca chamado do navegador
// (PROMOZAP_ADMIN_API_KEY não pode vazar pro cliente). As páginas
// (app/*/page.tsx) usam getLandingPageConfig/getInviteLink pra montar o
// SiteConfig ao vivo; app/api/clique/[slug]/route.ts usa registrarClique
// como proxy do beacon disparado no clique do botão.

import type { SiteConfig } from "@/lib/sites";

function baseUrl(): string {
  const url = process.env.PROMOZAP_ADMIN_URL;
  if (!url) throw new Error("PROMOZAP_ADMIN_URL não configurado");
  return url.replace(/\/$/, "");
}

function headers(): HeadersInit {
  const chave = process.env.PROMOZAP_ADMIN_API_KEY;
  if (!chave) throw new Error("PROMOZAP_ADMIN_API_KEY não configurado");
  return { "x-api-key": chave };
}

export type LandingPageConfig = Omit<SiteConfig, "whatsappLink">;

/** Conteúdo da página (headline, textos, pixel...) — tudo exceto o link do grupo. */
export async function getLandingPageConfig(slug: string): Promise<LandingPageConfig | null> {
  const res = await fetch(`${baseUrl()}/api/public/landing-pages/${slug}`, {
    headers: headers(),
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

/** Link de convite do grupo com vaga no momento — resolvido a cada carregamento da página. */
export async function getInviteLink(slug: string): Promise<string | null> {
  const res = await fetch(`${baseUrl()}/api/public/landing-pages/${slug}/grupo`, {
    headers: headers(),
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { inviteLink?: string };
  return data.inviteLink ?? null;
}

/**
 * Monta o SiteConfig completo a partir do promozap-admin (conteúdo + link do
 * grupo resolvido na hora). `fallback` é usado só pras páginas legadas que
 * ainda têm entrada estática em lib/sites.ts — se o admin estiver fora do ar,
 * cai pro fallback em vez de derrubar a página (é tráfego pago em cima dela).
 * Páginas criadas só pelo painel (sem fallback estático) devolvem null nesse
 * cenário, e quem chama decide mostrar 404.
 */
export async function resolverSite(slug: string, fallback: SiteConfig | null = null): Promise<SiteConfig | null> {
  try {
    const [config, inviteLink] = await Promise.all([getLandingPageConfig(slug), getInviteLink(slug)]);
    if (!config || !inviteLink) return fallback;
    return { ...config, whatsappLink: inviteLink };
  } catch (err) {
    console.error(`[promozap-admin] Falha ao resolver ${slug}, usando fallback estático:`, err);
    return fallback;
  }
}

/** Registra o clique de verdade — chamado pelo proxy em app/api/clique/[slug]. */
export async function registrarClique(
  slug: string,
  inviteLink: string,
  fbclid: string | null,
  eventId: string | null = null,
): Promise<boolean> {
  const res = await fetch(`${baseUrl()}/api/public/landing-pages/${slug}/clique`, {
    method: "POST",
    headers: { ...headers(), "Content-Type": "application/json" },
    body: JSON.stringify({ inviteLink, fbclid, eventId }),
  });
  return res.ok;
}
