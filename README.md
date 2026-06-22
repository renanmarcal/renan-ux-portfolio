# renanmarcal.github.io

Portfólio de Product Design — Renan Marçal

## Estrutura

```
/
├── index.html              ← home com os 4 cases
├── case.css                ← CSS compartilhado de todos os cases
├── cases/
│   ├── caso-1-crm.html     ✅ completo (narrativa a revisar)
│   ├── caso-2-dashboard.html  🔲 esqueleto — conteúdo a desenvolver
│   ├── caso-3-lp.html      ✅ completo (narrativa a revisar)
│   └── caso-4-c6.html      🔲 esqueleto — conteúdo a desenvolver
└── assets/
    └── img/                ← screenshots e imagens dos cases
```

## Status dos cases

| Case | Estrutura | Narrativa | Imagens |
|---|---|---|---|
| CRM Mobile (MP 2024–2025) | ✅ | 🔲 revisar | 🔲 |
| Dashboard de Carteira (MP 2023–2024) | 🔲 esqueleto | 🔲 | 🔲 |
| Sistema de Landing Pages (MP 2021–2022) | ✅ | 🔲 revisar | 🔲 |
| Portal C6 Bank (PayGo 2020–2021) | 🔲 esqueleto | 🔲 | 🔲 |

## Configurar no GitHub Pages

1. Criar repo: `renanmarcal.github.io`
2. Push de todos os arquivos na raiz
3. Settings → Pages → Source: `main` branch, pasta `/` (root)
4. URL ficará disponível em: `https://renanmarcal.github.io`

## Convenções

- Todo CSS compartilhado vem do `case.css` na raiz
- Cases ficam em `cases/` e referenciam `../case.css`
- Imagens ficam em `assets/img/`
- Slots de imagem sem conteúdo usam `.img-slot` com `.slot-mark` descritivo
- Métricas sem dado usam `<div class="m-val ph">[ a preencher ]</div>`
