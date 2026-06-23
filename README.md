# renanmarcal.github.io/renan-ux-portfolio

Portfólio de Product Design — Renan Marçal. Site estático em HTML/CSS, sem build, publicado via GitHub Pages.

## Estrutura

```
/
├── index.html          ← home; lista os cases publicados (CSS inline próprio)
├── case.css            ← CSS compartilhado por todas as páginas de case
├── 404.html            ← página de erro (CSS inline próprio)
├── favicon.svg         ← favicon e og:image provisório
├── README.md
├── assets/
│   └── img/            ← logos e imagens (logo-mercado-pago.svg, logo-c6-bank.svg)
└── cases/
    ├── case-priorizacao-visitas-comerciais-mercado-pago.html  ✅ completo
    ├── case-landing-pages-checkout-mercado-pago.html          ✅ completo
    ├── case-dashboard-carteira-mercado-pago.html              🔲 esqueleto
    └── case-portal-b2b-c6-bank.html                           🔲 esqueleto
```

## Status dos cases

| Case | Empresa · Período | Estrutura | Link na home |
|---|---|---|---|
| Priorização de visitas comerciais | Mercado Pago · 2024–2025 | ✅ completo (padrão tldr) | ✅ |
| Landing pages de adquirência | Mercado Pago · 2021–2022 | ✅ completo (padrão slots) | ✅ |
| Dashboard de carteira | Mercado Pago · 2023–2024 | 🔲 esqueleto | — |
| Portal B2B C6 Bank | PayGo · C6 Bank · 2020–2021 | 🔲 esqueleto | — |

## Dois padrões estruturais de bloco

Os cases usam a mesma casca (`.topbar`, `.hero`, `.block` > `.wrap` > `.block-grid`), mas o miolo de cada bloco segue um de dois padrões. Ao desenvolver um case novo, escolha **um** e mantenha consistência interna.

**Padrão A — slots de imagem** (ex.: `case-landing-pages...`)
Para cases com telas/protótipos a exibir. Usa `.img-slot` (com `.slot-corner`/`.slot-mark`), `.slot-pair`, `.full-slot`, `.audit-grid`, `.metric-row`, `.role-note`, `.ba`.

**Padrão B — cartões tldr** (ex.: `case-priorizacao-visitas...`)
Para cases mais textuais, sem imagem. Usa `.tldr` com `.tldr-card` (`.tldr-label` + `.tldr-text`), `.keypoint` e `.ba`.

## Sistema de pills (3 estados)

A pill de cada bloco é `<span class="stage X">`, com `X` em um de três valores:

| Classe | Visual | Uso |
|---|---|---|
| `problema` | borda, sem fundo | contexto e diagnóstico |
| `discovery` | fundo escuro (ink) | virada narrativa |
| `solucao` | fundo accent | entrega e fechamento |

> As classes `definicao`, `hipotese`, `sinais`, `resultado` ainda existem no `case.css` e são usadas pelo case de landing-pages (padrão A). Para cases novos, prefira o sistema de 3 estados acima.

## Convenções

- CSS compartilhado vem do `case.css` na raiz; cases referenciam `../case.css`.
- Fontes (Google Fonts) carregam via `<link>` + `preconnect` no `<head>` de cada página — **não** via `@import`.
- Cada bloco usa `id="bNN"`, `data-stage="NN"`, `data-name="..."`.
- Animação de entrada: `data-reveal="up|fade"` + `data-d="1|2|3"` (delay), ativada por IntersectionObserver no script de cada página.
- Métricas sem dado: `<div class="m-val ph">[ a preencher ]</div>` (padrão A).
- `og:image` aponta provisoriamente para o `favicon.svg`. Ao ter uma capa real, suba `assets/img/og-cover.png` e atualize as 5 páginas (use URL absoluta do GitHub Pages).

## Publicar no GitHub Pages

1. Push para a branch `main`.
2. Settings → Pages → Source: `main`, pasta `/` (root).
3. Disponível em `https://renanmarcal.github.io/renan-ux-portfolio`.
