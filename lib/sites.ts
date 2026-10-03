import type { PixelGroup } from "@/lib/meta-pixel";

// Configuração central das landing pages da família PromoZap.
//
// Cada página compartilha o mesmo layout (components/LandingPage.tsx) e só
// varia por conteúdo, cor de destaque, mascote e link do grupo — é isso que
// permite ter várias páginas (perfumes, achadinhos, futuras verticais) sem
// duplicar HTML/CSS.
export type SiteConfig = {
  slug: string;
  /** <title> da aba do navegador. */
  pageTitle: string;
  brandName: string;
  logoSrc: string;
  logoAlt: string;
  headline: {
    top: string;
    bottomPre: string;
    highlight: string;
    bottomPost: string;
  };
  statsLeft: string;
  statsRight: string;
  subtitle: string;
  whatsappLink: string;
  /** Cor de destaque em hex, ex: "#F5C400". */
  accent: string;
  metaPixelId?: string;
  footerTagline: string;
  trackingGroup?: PixelGroup;
  bannerText?: string;
  liveStatsValues?: number[];
  recentJoiners?: number;
  statsInterval?: number;
};

export const sites = {
  "perfumes-1": {
    slug: "perfumes-1",
    pageTitle: "PromoZap Perfumes",
    brandName: "PromoZap Perfumes",
    logoSrc: "/logo-perfume.png",
    logoAlt: "PromoZap Perfumes",
    headline: {
      top: "Chega de pagar caro",
      bottomPre: "em ",
      highlight: "perfume",
      bottomPost: "!",
    },
    statsLeft: "100% gratuito",
    statsRight: "+10.000 membros",
    subtitle:
      "Receba as melhores promoções de perfumes 100% originais do Mercado Livre, direto no seu WhatsApp — de graça 🔥",
    whatsappLink: "https://chat.whatsapp.com/LZdU6ArMeDD3LHj0e2erZu?s=cl&p=i&mlu=4&ilr=4",
    accent: "#F5C400",
    metaPixelId: "1589913826198522",
    footerTagline: "📦👍 Afiliado oficial Mercado Livre · 100% gratuito · Links seguros",
    trackingGroup: "grupo_18_30",
    bannerText: "🚨Últimas vagas gratuitas no GRUPO PREMIUM— Entre Agora!🚨",
    liveStatsValues: [180, 190, 175, 185],
    recentJoiners: 3,
    statsInterval: 3600000,
  },
  "perfumes-2": {
    slug: "perfumes-2",
    pageTitle: "PromoZap Perfumes",
    brandName: "PromoZap Perfumes",
    logoSrc: "/logo-perfume.png",
    logoAlt: "PromoZap Perfumes",
    headline: {
      top: "Chega de pagar caro",
      bottomPre: "em ",
      highlight: "perfume",
      bottomPost: "!",
    },
    statsLeft: "100% gratuito",
    statsRight: "+10.000 membros",
    subtitle:
      "Receba as melhores promoções de perfumes 100% originais do Mercado Livre, direto no seu WhatsApp — de graça 🔥",
    // TODO: clone da página de perfumes para uma segunda origem de tráfego —
    // trocar pelo link do grupo/campanha específico desta página.
    whatsappLink: "https://chat.whatsapp.com/J5iJyofmKxaAvZmW7T9V4f?s=cl&p=i&mlu=4&ilr=4",
    accent: "#F5C400",
    metaPixelId: "1589913826198522",
    footerTagline: "📦👍 Afiliado oficial Mercado Livre · 100% gratuito · Links seguros",
    trackingGroup: "grupo_31_50",
    bannerText: "🚨Últimas vagas gratuitas no GRUPO PREMIUM— Entre Agora!🚨",
    liveStatsValues: [150, 160, 140, 155],
    recentJoiners: 2,
    statsInterval: 3600000,
  },
  "perfumes-3": {
    slug: "perfumes-3",
    pageTitle: "PromoZap Perfumes",
    brandName: "PromoZap Perfumes",
    logoSrc: "/logo-perfume.png",
    logoAlt: "PromoZap Perfumes",
    headline: {
      top: "Chega de pagar caro",
      bottomPre: "em ",
      highlight: "perfume",
      bottomPost: "!",
    },
    statsLeft: "100% gratuito",
    statsRight: "+10.000 membros",
    subtitle:
      "Receba as melhores promoções de perfumes 100% originais do Mercado Livre, direto no seu WhatsApp — de graça 🔥",
    // TODO: clone da página de perfumes para uma terceira origem de tráfego —
    // trocar pelo link do grupo/campanha específico desta página.
    whatsappLink: "https://chat.whatsapp.com/HwX9qAx1Gtr4tDBM1JfrXw?s=cl&p=i&mlu=4&ilr=4",
    accent: "#F5C400",
    metaPixelId: "1589913826198522",
    footerTagline: "📦👍 Afiliado oficial Mercado Livre · 100% gratuito · Links seguros",
    trackingGroup: "grupo_50_plus",
    bannerText: "🚨Últimas vagas gratuitas no GRUPO PREMIUM— Entre Agora!🚨",
    liveStatsValues: [80, 90, 70, 85],
    recentJoiners: 1,
    statsInterval: 3600000,
  },
  "achadinhos-1": {
    slug: "achadinhos-1",
    pageTitle: "PromoZap Achadinhos",
    brandName: "PromoZap Achadinhos",
    logoSrc: "/mascote-hero.png",
    logoAlt: "PromoZap Achadinhos",
    headline: {
      top: "Ache os melhores",
      bottomPre: "",
      highlight: "achadinhos",
      bottomPost: " da internet!",
    },
    statsLeft: "100% gratuito",
    statsRight: "Vagas abertas",
    subtitle:
      "Receba os achadinhos mais baratos e virais do Mercado Livre, Shopee e AliExpress, direto no seu WhatsApp — de graça 🔥",
    whatsappLink: "https://chat.whatsapp.com/K6hKMl1SKKeDXX1MgSUnvv?s=cl&p=i&mlu=4&ilr=4",
    accent: "#FF5B27",
    footerTagline: "🛍️👍 Curadoria diária de achadinhos · 100% gratuito · Links seguros",
    trackingGroup: "achadinhos",
    bannerText: "🚨Últimas vagas gratuitas no GRUPO PREMIUM— Entre Agora!🚨",
    liveStatsValues: [200, 210, 180, 190],
    recentJoiners: 5,
    statsInterval: 3000,
  },
} as const satisfies Record<string, SiteConfig>;

export type SiteSlug = keyof typeof sites;
