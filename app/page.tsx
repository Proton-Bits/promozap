import type { Metadata } from "next";
import Image from "next/image";
import type { CSSProperties } from "react";
import { sites, type SiteConfig } from "@/lib/sites";
import { hexToRgbTriplet } from "@/lib/color";
import { resolverSite } from "@/lib/promozap-admin";
import MetaPixel from "@/components/MetaPixel";
import PixelTracker from "@/components/PixelTracker";
import WhatsappButton from "@/components/WhatsappButton";

// Página raiz: um card pra cada grupo. Cada botão se comporta igual ao da
// landing page correspondente — mesmo link de convite (resolvido ao vivo no
// promozap-admin), mesmo trackingGroup no Pixel e clique registrado no slug
// dela. Ou seja, os cliques daqui entram nas métricas de achadinhos-1 e
// perfumes-1.
const grupos = [
  {
    slug: "achadinhos-1",
    titulo: "Grupo Achadinhos",
    descricao: "Achadinhos baratos e virais do Mercado Livre, Shopee e AliExpress.",
  },
  {
    slug: "perfumes-1",
    titulo: "Grupo Perfumes",
    descricao: "Promoções de perfumes 100% originais do Mercado Livre.",
  },
] as const;

// Pixel único da PromoZap (ver PIXEL.md) — o PageView daqui vai sem
// content_category; cada botão manda Contact/Lead com o grupo dele.
const pixelId = sites["perfumes-1"].metaPixelId;
const brandAccent = sites["achadinhos-1"].accent;

export const metadata: Metadata = {
  title: "PromoZap — Escolha seu grupo",
};

function themeFor(accent: string) {
  return {
    "--accent": accent,
    "--accent-rgb": hexToRgbTriplet(accent),
  } as CSSProperties;
}

export default async function Page({
  searchParams,
}: Readonly<{
  searchParams: Promise<{ fbclid?: string }>;
}>) {
  const { fbclid } = await searchParams;
  const resolvidos = await Promise.all(
    grupos.map(async (grupo) => ({
      ...grupo,
      site: (await resolverSite(grupo.slug, sites[grupo.slug])) as SiteConfig,
    })),
  );

  return (
    <>
      <MetaPixel pixelId={pixelId} />
      <PixelTracker />

      <section className="hero" style={themeFor(brandAccent)}>
        <div className="particles" aria-hidden="true">
          {Array.from({ length: 7 }).map((_, i) => (
            <span className="p" key={i} />
          ))}
        </div>

        <div className="hero-inner">
          <div className="grupos">
            {resolvidos.map(({ slug, titulo, descricao, site }) => (
              <div className="grupo-card" key={slug} style={themeFor(site.accent)}>
                <Image
                  src={site.logoSrc}
                  alt={site.logoAlt}
                  width={144}
                  height={144}
                  className="grupo-img"
                  priority
                />
                <h2>{titulo}</h2>
                <p>{descricao}</p>
                <WhatsappButton
                  href={site.whatsappLink}
                  trackingGroup={site.trackingGroup}
                  slug={slug}
                  fbclid={fbclid ?? null}
                >
                  <span>Entrar no grupo</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12.04 2c-5.5 0-9.96-4.46-9.96 9.96 0 1.76.46 3.45 1.32 4.95L2 22l5.24-1.37a9.9 9.9 0 0 0 4.8 1.22h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm0 18.2h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.11.82.83-3.03-.2-.31a8.2 8.2 0 0 1-1.26-4.4c0-4.55 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.41a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.7 8.25-8.25 8.25Zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.4-.12-.56.13-.17.25-.65.81-.79.97-.15.17-.29.19-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.22-1.46-1.37-1.71-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43-.14-.01-.31-.01-.48-.01-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.23.89 2.41 1.02 2.58.12.17 1.75 2.67 4.25 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.1-.23-.16-.48-.28Z" />
                  </svg>
                </WhatsappButton>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="foot-brand">
          Promo<span style={themeFor(brandAccent)}>Zap</span>
        </div>
        <p>🛍️👍 Afiliado oficial Mercado Livre · 100% gratuito · Links seguros</p>
        <p style={{ marginTop: 6 }}>©2026 PromoZap — Todos os direitos reservados.</p>
      </footer>
    </>
  );
}
