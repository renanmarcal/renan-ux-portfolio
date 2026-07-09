# Backlog

Pendências conhecidas. Marcar com data quando resolvido e mover para `docs/DECISIONS.md`.

## Estrutural (prioridade alta — é a causa raiz do custo alto de token)

- [ ] **Migrar para gerador de site estático (Astro recomendado)** para eliminar a duplicação de CSS embutido em 3 arquivos (`index.html`, `en/index.html`, `es/index.html`) e o footer copiado em 9 arquivos. Conteúdo por idioma em `content/pt.json`/`en.json`/`es.json` (ou frontmatter), componentes reutilizáveis (`CaseCard`, `ContactCard`, `Topbar`, `NextCase`). Manter output 100% estático (zero JS de framework no HTML final) para preservar performance e SEO. Deploy passa a exigir um build step — decidir entre GitHub Action (build automático no push) ou build local + commit do `dist/`.
- [ ] Extrair estilos inline recorrentes dos arquivos de case (`style="grid-template-columns: 4fr 8fr"`, `style="aspect-ratio:auto; height:auto"` etc.) para classes utilitárias em `case.css`.
- [ ] Migrar a escala de espaçamento das home pages (px cru) para as mesmas variáveis `--s-1`…`--s-10` que `case.css` já usa.

## Conteúdo / SEO

- [ ] Criar imagem de og:image própria da home (1200×630) — hoje aponta para o thumb de um case (`thumb-priorizacao-visitas-comerciais.png`).
- [ ] `cases/case-dashboard-carteira-mercado-pago.html`: stub com `[ a preencher ]`, já tem `noindex` mas segue sem conteúdo real — decidir se vira case completo ou é removido do repo.
- [ ] `cases/case-landing-pages-checkout-mercado-pago.html`: existe mas está comentado/oculto na home, sem tradução EN/ES. Decidir: publicar ou remover.

## Acessibilidade / craft

- [ ] Checar contraste AA dos textos secundários (`--ink-faint` sobre `--paper-2`) em telas pequenas.
- [ ] Testar `prefers-reduced-motion` de ponta a ponta nas 3 línguas após a migração para Astro (o comportamento é herdado do CSS, mas vale reconfirmar depois de qualquer refactor de build).

## Governança (esta sessão)

- [x] 2026-07-09 · `CLAUDE.md` criado.
- [x] 2026-07-09 · `docs/DESIGN-SYSTEM.md`, `docs/COPY.md`, `docs/DECISIONS.md`, `docs/BACKLOG.md` criados.
- [x] 2026-07-09 · Subagents em `.claude/agents/` (`copy-editor`, `i18n-sync`, `design-guardian`, `case-writer`, `lofi-prototyper`).
- [x] 2026-07-09 · Sandbox persistente de experimentação (`~/Documents/portfolio-sandbox/`, fora do repo) + agente `sandbox-curator`. Independente da migração Astro abaixo — não depende dela nem a antecipa.
- [ ] Migração Astro (depende de decisão de escopo — ver item estrutural acima).
