# Backlog

Pendências conhecidas. Marcar com data quando resolvido e mover para `docs/DECISIONS.md`.

## Estrutural (prioridade alta — é a causa raiz do custo alto de token)

- [x] 2026-07-20 · **Unificar tokens de design system** — `tokens.css` novo, com as 25 variáveis antes duplicadas manualmente entre o `:root` de `index.html`/`en/index.html`/`es/index.html` e o `:root` de `case.css`. Os 3 index e `404.html` agora linkam `tokens.css` direto; `case.css` importa via `@import` e mantém só as 5 variáveis exclusivas de case. Motivo: um deploy de tipografia/tamanho no case C6 e na priorização (só tocou `case.css`) não propagou pro index, porque não havia herança real entre os dois `:root`, só coincidência de valores mantida à mão. Ver `docs/DESIGN-SYSTEM.md` (nota 2026-07-20). Não resolve a duplicação de CSS de *layout* (o `<style>` de cada index continua próprio, com o vocabulário de hero/home) nem o footer copiado em 9 arquivos — isso segue dependendo do item abaixo.
- [ ] **Migrar para gerador de site estático (Astro recomendado)** para eliminar a duplicação de CSS embutido em 3 arquivos (`index.html`, `en/index.html`, `es/index.html`) e o footer copiado em 9 arquivos. Conteúdo por idioma em `content/pt.json`/`en.json`/`es.json` (ou frontmatter), componentes reutilizáveis (`CaseCard`, `ContactCard`, `Topbar`, `NextCase`). Manter output 100% estático (zero JS de framework no HTML final) para preservar performance e SEO. Deploy passa a exigir um build step — decidir entre GitHub Action (build automático no push) ou build local + commit do `dist/`.
- [ ] Extrair estilos inline recorrentes dos arquivos de case (`style="grid-template-columns: 4fr 8fr"`, `style="aspect-ratio:auto; height:auto"` etc.) para classes utilitárias em `case.css`.
- [x] 2026-07-09 · Migrar a escala de espaçamento **dentro dos media queries mobile** das home pages (px cru) para `var(--s-1)`…`var(--s-10)` — feito, ver `docs/DECISIONS.md`. Pendente: os valores de **desktop** (fora de media query) nas home pages ainda são px cru — não migrados nesta rodada por não fazer parte da queixa mobile.
- [ ] `.case-grid` gap (`20px`, desktop e mobile, nunca sobrescrito) está fora da grade de 8px — mais próximo de `--s-2`(16) ou `--s-3`(24). Não corrigido junto com a rodada mobile porque afeta desktop também.
- [ ] `.btn-ghost` padding-x (`27px`) e `.btn`/`.case-info` padding-x desktop (`28px`) também fora da grade de 8px — mesmo motivo, adiado por afetar desktop.

## Conteúdo / SEO

- [x] 2026-07-20 · Criar imagem de og:image própria da home (1200×630) — feito em 2026-07-12 (`assets/img/og-hero-{pt,en,es}.jpg`, já referenciados nos 3 `index.html`); item ficou órfão no backlog, sem correção de código nesta sessão.
- [ ] `cases/case-dashboard-carteira-mercado-pago.html`: stub com `[ a preencher ]`, já tem `noindex` mas segue sem conteúdo real — decidir se vira case completo ou é removido do repo.
- [ ] `cases/case-landing-pages-checkout-mercado-pago.html`: existe mas está comentado/oculto na home, sem tradução EN/ES. Decidir: publicar ou remover.

## Acessibilidade / craft

- [x] 2026-07-20 · Checar contraste AA dos textos secundários (`--ink-faint` sobre `--paper-2`) em telas pequenas — calculado via luminância relativa WCAG: 5.0:1 sobre `--paper-2` e 5.37:1 sobre `--paper`, ambos acima do mínimo AA (4.5:1) mesmo para texto normal. Nenhuma correção necessária.
- [ ] Testar `prefers-reduced-motion` de ponta a ponta nas 3 línguas após a migração para Astro (o comportamento é herdado do CSS, mas vale reconfirmar depois de qualquer refactor de build).

## Governança (esta sessão)

- [x] 2026-07-09 · `CLAUDE.md` criado.
- [x] 2026-07-09 · `docs/DESIGN-SYSTEM.md`, `docs/COPY.md`, `docs/DECISIONS.md`, `docs/BACKLOG.md` criados.
- [x] 2026-07-09 · Subagents em `.claude/agents/` (`copy-editor`, `i18n-sync`, `design-guardian`, `case-writer`, `lofi-prototyper`).
- [x] 2026-07-09 · Sandbox persistente de experimentação (`~/Documents/01_Projects/02_Experiments/portfolio-sandbox/`, fora do repo) + agente `sandbox-curator`. Independente da migração Astro abaixo — não depende dela nem a antecipa.
- [ ] Migração Astro (depende de decisão de escopo — ver item estrutural acima). **2026-07-12**: redesign completo da home (hero/pillars/cases/footer, ver `docs/DECISIONS.md`) promovido sem emendar esta migração — decisão consciente de não misturar as duas mudanças na mesma leva, não esquecimento. Segue como próximo passo depois do redesign estabilizado em produção.
