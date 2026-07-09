# Design system

Tokens e componentes decididos para o portfólio. Fonte de verdade para qualquer trabalho de design — antes de propor algo novo, checar se já existe aqui. Atualizar este arquivo sempre que uma decisão visual for tomada (ver `docs/DECISIONS.md` para o porquê de cada uma).

## Tokens de cor

```css
--paper:    #f3efe7   /* fundo principal */
--paper-2:  #ece7dc   /* fundo de seções alternadas (pillars, footer) */
--card:     #faf7f2   /* fundo de cards (case-card) */
--ink:      #1c1916   /* texto principal */
--ink-soft: #5c554b   /* texto secundário */
--ink-faint:#766b5c   /* labels, metadados */
--line:     #d8d0c0   /* bordas e divisores — único tom de borda no site */
--accent:   #b8451f   /* laranja queimado — CTA, destaque, hover */
--accent-2: #2f5d50   /* verde — uso pontual (badge "Escolhida" em explorações) */
```

Regra: nunca introduzir uma cor fora desta paleta sem atualizar este arquivo.

## Tipografia

- Display/headings: `'Work Sans', sans-serif` — peso **600 sempre**, nunca 700 (decisão 2026-07-09: bold 700 lido como "forte demais").
- Corpo: `'Figtree', sans-serif`, 16px base, `line-height: 1.625`.
- Labels/kickers/mono-style: mesma família Figtree, mas uppercase + `letter-spacing` alto (`.1em`–`.18em`) em tamanhos pequenos (9–11px) — não é uma fonte mono de verdade, é convenção visual.
- H1 do hero: 68px desktop / 48px tablet (900px) / 36px mobile (430px), `letter-spacing: -.03em`, `line-height: 1.05`. Uma palavra-chave por H1 recebe `.hl { color: var(--accent) }`.
- Sem ponto final em H1 de hero (decisão de craft: frase de impacto não fecha com pontuação).

## Escala de espaçamento (base 8px)

```
--s-1  8px   --s-2  16px   --s-3  24px   --s-4  32px   --s-5  40px
--s-6  48px  --s-7  64px   --s-8  80px   --s-9  96px   --s-10 120px
```
Regra herdada do `case.css`: texto → imagem sempre `--s-5` (40px). Usar essas variáveis em `case.css`; o CSS embutido das home pages (`index.html`/`en`/`es`) ainda usa px cru equivalente — ver `docs/BACKLOG.md`.

## Layout

- `.wrap`: `max-width: 1120px; margin: 0 auto; padding: 0 48px` (`22px` abaixo de 768px). **Todo** bloco de largura total (hero, cases, footer) usa esta mesma classe — é o que garante alinhamento ponta a ponta entre seções.
- Regra rígida: qualquer container de largura total dentro de um contexto flex/grid precisa de `width: 100%` explícito além de `.wrap` — não confiar em stretch/auto-margin implícitos (ver `.footer > .wrap` em `case.css`).

## Componentes

### Botões (`.btn`, `.btn-primary`, `.btn-ghost`)
Único sistema de botão do site. `.btn-primary`: fundo `--accent`, texto claro, usado para a ação principal (WhatsApp). `.btn-ghost`: borda `--line`, usado para ação secundária. Transições sempre `cubic-bezier(.16,1,.3,1)`.

### Topbar (`.topbar`, `.topbar-nav`)
Sticky, fundo translúcido com blur. Nas home pages: menu-âncora minimalista (Sobre/Cases/Contato — ou tradução), sem avatar (avatar grande já vive no hero). Nas páginas de case: breadcrumb + progress-bar (padrão mais antigo, mantido).

### Hero photo (`.hero-photo`)
Foto circular, `aspect-ratio: 1/1`, `align-self: center` (nunca `stretch`, senão vira elipse), `border: 1px solid var(--line)`. Largura `clamp(196px, 25vw, 310px)` desktop / `135px` mobile.

### Case card (`.case-card`, `.case-metrics`)
Card com thumb + kicker + título + descrição curta (1–2 frases) + **2 métricas** (`.case-metric-val` + `.case-metric-label`) + tag/link. Se o case não tem número de resultado, usar métrica de escala (países, plataformas) — nunca deixar sem métrica nem inventar número.

### Contact card / pré-footer (`.contact-card`)
**Regra fixa: outline only, nunca fill sólido.** `border: 1px solid var(--line); border-radius: 16px`, sem `background`. Layout: título+subtítulo à esquerda, um único CTA à direita (nunca múltiplos links secundários dentro do card). Vive dentro de `.footer-inner` (flex, centralizado verticalmente) dentro de `.footer` (`min-height: 78vh`). Linha de copyright fica **fora** do card, numa faixa própria ancorada no fim do footer (`.footer-rule` + `.footer-copy`).

### Next case (`.next-case`)
Bloco de navegação cruzada entre os dois cases ativos, no fim de cada case study, antes do footer.

### Pillars (`.pillars`)
Faixa de 4 colunas (2 no mobile) com os verbos do processo (Entendo/Planejo/Construo/Acompanho — ou tradução). Sem alterações recentes.

## Animação

- Reveal on scroll via `IntersectionObserver` + classes `[data-reveal="up"|"fade"]`, sempre com `@media (prefers-reduced-motion: reduce)` desativando tudo.
- Timing padrão de hover/transição: `cubic-bezier(.16,1,.3,1)`.
- H1 usa `.h1-line` com `slideUp` por linha, delay escalonado.

## O que NÃO fazer

- Não usar preto sólido (`--ink` como background) em cards de CTA — decisão já testada e revertida.
- Não deixar métricas de case vazias nem inventar números sem base real.
- Não usar peso 700 em títulos grandes.
- Não introduzir nova cor sem atualizar este arquivo.
