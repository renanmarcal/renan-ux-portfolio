# Backlog

Pendências conhecidas. Marcar com data quando resolvido e mover para `docs/DECISIONS.md`.

## Estrutural (prioridade alta — é a causa raiz do custo alto de token)

- [x] 2026-07-20 · **Unificar tokens de design system** — `tokens.css` novo, com as 25 variáveis antes duplicadas manualmente entre o `:root` de `index.html`/`en/index.html`/`es/index.html` e o `:root` de `case.css`. Os 3 index e `404.html` agora linkam `tokens.css` direto; `case.css` importa via `@import` e mantém só as 5 variáveis exclusivas de case. Motivo: um deploy de tipografia/tamanho no case C6 e na priorização (só tocou `case.css`) não propagou pro index, porque não havia herança real entre os dois `:root`, só coincidência de valores mantida à mão. Ver `docs/DESIGN-SYSTEM.md` (nota 2026-07-20). Não resolve a duplicação de CSS de *layout* (o `<style>` de cada index continua próprio, com o vocabulário de hero/home) nem o footer copiado em 9 arquivos — isso segue dependendo do item abaixo.
- [x] 2026-07-21 · **Migrar para Astro** — homes, cases, 404 e sitemap agora são gerados como SSG; CSS, head, topbars, footer e comportamentos foram concentrados em `src/`. O output continua HTML/CSS/JS estático, sem runtime de framework. Preview Cloudflare e validação visual permanecem como etapa pré-produção.
- [ ] Extrair estilos inline recorrentes dos arquivos de case (`style="grid-template-columns: 4fr 8fr"`, `style="aspect-ratio:auto; height:auto"` etc.) para classes utilitárias em `case.css`.
- [x] 2026-07-09 · Migrar a escala de espaçamento **dentro dos media queries mobile** das home pages (px cru) para `var(--s-1)`…`var(--s-10)` — feito, ver `docs/DECISIONS.md`. Pendente: os valores de **desktop** (fora de media query) nas home pages ainda são px cru — não migrados nesta rodada por não fazer parte da queixa mobile.
- [x] 2026-07-21 · `.case-grid` gap (`20px`, desktop e mobile) estava fora da grade de 8px — trocado por `var(--s-3)` (24px) nos 3 index. Motivo real da correção: relato do Renan de elementos "desalinhados" entre parágrafo e card/elemento abaixo.
- [x] 2026-07-21 · `.btn`/`.btn-ghost` padding-x (`28px`/`27px`, e inconsistentes entre si) — ambos trocados por `var(--s-3)` (24px) em `case.css` e nos 3 index. `.case-info` já estava corrigido desde 2026-07-10 (`var(--s-5)`) — a menção anterior a ele aqui estava desatualizada.
- [x] 2026-07-21 · `.keypoint` (`case.css`) tinha `padding-left: var(--s-3)` + `border-left: 3px` = 27px de recuo do texto em relação aos parágrafos irmãos, sem nenhuma compensação — era a causa mais provável do desalinhamento visual relatado. Corrigido com `margin-left: calc(-1 * (var(--s-3) + 3px))`, que joga a borda decorativa para fora da caixa de conteúdo e alinha o texto do `.keypoint` exatamente com o texto ao redor.

## Conteúdo / SEO

- [x] 2026-07-20 · Criar imagem de og:image própria da home (1200×630) — feito em 2026-07-12 (`assets/img/og-hero-{pt,en,es}.jpg`, já referenciados nos 3 `index.html`); item ficou órfão no backlog, sem correção de código nesta sessão.
- [x] 2026-07-21 · `cases/case-dashboard-carteira-mercado-pago.html`: stub com `[ a preencher ]`, sem nenhum link ativo (só aparecia neste backlog) — removido do repo.
- [ ] `cases/case-landing-pages-checkout-mercado-pago.html`: existe, conteúdo completo em PT, mas segue comentado/oculto na home e sem tradução EN/ES — decisão 2026-07-21: manter oculto por enquanto, revisitar depois.
- [x] 2026-07-21 · `sitemap.xml` listava `case-landing-pages-checkout-mercado-pago.html` (sem `hreflang` alternates, diferente dos outros cases) apesar de a página estar oculta na navegação — Google podia indexar uma URL sem link de acesso real no site. Removida a entrada; se o case acima for publicado, adicionar de volta ao sitemap na mesma leva.

## Acessibilidade / craft

- [x] 2026-07-20 · Checar contraste AA dos textos secundários (`--ink-faint` sobre `--paper-2`) em telas pequenas — calculado via luminância relativa WCAG: 5.0:1 sobre `--paper-2` e 5.37:1 sobre `--paper`, ambos acima do mínimo AA (4.5:1) mesmo para texto normal. Nenhuma correção necessária.
- [ ] Testar `prefers-reduced-motion` de ponta a ponta nas 3 línguas após a migração para Astro (o comportamento é herdado do CSS, mas vale reconfirmar depois de qualquer refactor de build).

## Governança (esta sessão)

- [x] 2026-07-09 · `CLAUDE.md` criado.
- [x] 2026-07-09 · `docs/DESIGN-SYSTEM.md`, `docs/COPY.md`, `docs/DECISIONS.md`, `docs/BACKLOG.md` criados.
- [x] 2026-07-09 · Subagents em `.claude/agents/` (`copy-editor`, `i18n-sync`, `design-guardian`, `case-writer`, `lofi-prototyper`).
- [x] 2026-07-09 · Sandbox persistente de experimentação (`~/Documents/01_Projects/02_Experiments/portfolio-sandbox/`, fora do repo) + agente `sandbox-curator`. Independente da migração Astro abaixo — não depende dela nem a antecipa.
- [x] 2026-07-21 · Migração Astro concluída no código; preview Cloudflare e revisão visual permanecem antes da produção.
