# Meta Pixel — PromoZap

## Visão Geral

O projeto utiliza **um único Pixel Meta** compartilhado entre as páginas de perfumes, com segmentação por faixa etária feita através do parâmetro `content_category` enviado em cada evento.

| Item | Valor |
|---|---|
| **Pixel ID** | `1589913826198522` |
| **Plataforma** | Meta (Facebook / Instagram) |
| **Eventos implementados** | `PageView`, `ViewContent`, `Contact`, `Lead` |
| **Status** | ✅ Ativo em 3 páginas |

---

## Mapeamento de Páginas e Faixas Etárias

Cada página de perfumes tem seu próprio grupo de WhatsApp e sua segmentação de público no Meta Ads Manager. O `content_category` enviado pelo pixel permite diferenciar as conversões por faixa etária.

| Página | URL | Faixa Etária | `content_category` | Grupo WhatsApp |
|---|---|---|---|---|
| **Perfumes 1** | `/perfumes-1` | 18-30 anos | `grupo_18_30` | [Entrar no grupo](https://chat.whatsapp.com/LZdU6ArMeDD3LHj0e2erZu?s=cl&p=i&mlu=4&ilr=4) |
| **Perfumes 2** | `/perfumes-2` | 31-50 anos | `grupo_31_50` | [Entrar no grupo](https://chat.whatsapp.com/J5iJyofmKxaAvZmW7T9V4f?s=cl&p=i&mlu=4&ilr=4) |
| **Perfumes 3** | `/perfumes-3` | 50+ anos | `grupo_50_plus` | [Entrar no grupo](https://chat.whatsapp.com/HwX9qAx1Gtr4tDBM1JfrXw?s=cl&p=i&mlu=4&ilr=4) |
| **Achadinhos** | `/achadinhos-1` | Sem pixel | — | [Entrar no grupo](https://chat.whatsapp.com/K6hKMl1SKKeDXX1MgSUnvv?s=cl&p=i&mlu=4&ilr=4) |
| **Raiz — botão Achadinhos** | `/` | Todas | `home_achadinhos` | Funil de `achadinhos-1` (landing page `home-achadinhos` no admin) |
| **Raiz — botão Perfumes** | `/` | Todas | `home_perfumes` | Funil de `perfumes-1` (landing page `home-perfumes` no admin) |

> Na raiz (`/`) o `PageView`/`ViewContent` vai sem `content_category` (a página tem os dois grupos); só `Contact`/`Lead` levam a categoria do botão clicado.

> `/achadinhos-1` não possui pixel configurado. Ele tem seu próprio grupo do WhatsApp de forma independente.

---

## Eventos Disparados

Quando o usuário clica no botão **"Quero entrar grátis"**, são enviados **2 eventos** para o Meta Pixel:

| Evento | Quando | Significado |
|---|---|---|
| `Contact` | No clique do WhatsApp | Usuário demonstrou interesse |
| `Lead` | No clique do WhatsApp | Usuário entrou no grupo (conversão principal) |

Ambos enviam o `content_category` correspondente à página (`grupo_18_30`, `grupo_31_50`, `grupo_50_plus` ou `achadinhos`).

> O fallback para páginas sem `trackingGroup` também dispara ambos os eventos (`Contact` + `Lead`), porém sem `content_category`.

---

## Métricas por Faixa Etária

Temos 3 métricas principais monitoradas por cada faixa etária:

| Métrica | O que mede |
|---|---|
| **PageView** | Quantas pessoas acessaram cada landing page |
| **Contact** | Cliques no botão do WhatsApp (interesse) |
| **Lead** | Usuários que entraram no grupo (conversão final) |

Exemplo de dados esperados por página:

```
/perfumes-1 (grupo_18_30)
├── PageView:  1.250
├── Contact:     89
└── Lead:        42

/perfumes-2 (grupo_31_50)
├── PageView:    980
├── Contact:     67
└── Lead:        31

/perfumes-3 (grupo_50_plus)
├── PageView:    540
├── Contact:     38
└── Lead:        18
```

---

## Como Consultar no Meta Events Manager

### 1. Acessar o painel

```
https://www.facebook.com/events_manager2/
```

### 2. Selecionar o pixel

- Buscar por ID: `1589913826198522`

### 3. Visualizar eventos por faixa etária

- Aba **Events** → Clique em **Breakdown** → **Custom Parameter** → `content_category`
- Filtrar por: `grupo_18_30`, `grupo_31_50` ou `grupo_50_plus`

### 4. Ver conversões por página

- Aba **Conversions** → Selecionar evento `Lead`
- Aplicar filtro `content_category = grupo_18_30` para ver apenas conversões da página `/perfumes-1`

---

## Como Usar no Meta Ads Manager

### 1. Criar Conversões Personalizadas

Criar 3 conversões personalizadas, uma para cada faixa etária:

```
Conversão: "Lead 18-30"
Filtro: event = "Lead" AND content_category = "grupo_18_30"
Prioridade: Alta (usar como objetivo de otimização)

Conversão: "Lead 31-50"
Filtro: event = "Lead" AND content_category = "grupo_31_50"
Prioridade: Alta

Conversão: "Lead 50+"
Filtro: event = "Lead" AND content_category = "grupo_50_plus"
Prioridade: Alta
```

### 2. Estrutura de Campanha Recomendada

```
Campanha: PromoZap Perfumes
├── Conjunto 1: Público 18-30 anos → Link: /perfumes-1
│   ├── Anúncio 1: Criativo A
│   └── Anúncio 2: Criativo B
├── Conjunto 2: Público 31-50 anos → Link: /perfumes-2
│   ├── Anúncio 3: Criativo C
│   └── Anúncio 4: Criativo D
└── Conjunto 3: Público 50+ anos → Link: /perfumes-3
    ├── Anúncio 5: Criativo E
    └── Anúncio 6: Criativo F
```

### 3. Otimização

- Usar as conversões personalizadas como **objetivo de otimização** de cada conjunto
- Acompanhar **CPL (Custo por Lead)** por faixa etária
- Aumentar orçamento do conjunto com menor CPL
- Pausar ou reduzir orçamento de conjuntos com CPL muito alto
- Criar **públicos personalizados** de `ViewContent` para remarketing

---

## Arquivos do Projeto Relacionados

| Arquivo | Função |
|---|---|
| `lib/meta-pixel.ts` | Definição dos tipos de eventos e grupos de pixel |
| `lib/sites.ts` | Configuração central de todas as páginas (ID, grupo, link WhatsApp) |
| `components/MetaPixel.tsx` | Código base do Pixel (inicialização fbq) |
| `components/PixelTracker.tsx` | Dispara PageView + ViewContent no carregamento |
| `components/WhatsappButton.tsx` | Dispara Contact + Lead no clique do WhatsApp |
| `components/LiveStatsCycler.tsx` | Contador online dinâmico |
| `components/LandingPage.tsx` | Renderiza condicionalmente pixel, banner e contadores |
| `app/perfumes-1/page.tsx` | Página 18-30 anos |
| `app/perfumes-2/page.tsx` | Página 31-50 anos |
| `app/perfumes-3/page.tsx` | Página 50+ anos |
| `app/achadinhos-1/page.tsx` | Página Achadinhos (sem pixel) |

---

## Resumo para Apresentação

> O PromoZap utiliza **um único Pixel Meta (ID: 1589913826198522)** distribuído por 3 landing pages, cada uma segmentada por faixa etária via `content_category`:
>
> - **18-30 anos** → `/perfumes-1`
> - **31-50 anos** → `/perfumes-2`
> - **50+ anos** → `/perfumes-3`
>
> Quando o usuário clica em **"Quero entrar grátis"**, são enviados dois eventos: **Contact** (interesse) e **Lead** (conversão), permitindo medir o funil completo por faixa etária no Meta Events Manager.
