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
Regra herdada do `case.css`: texto → imagem sempre `--s-5` (40px). `case.css` usa `var(--s-N)` em toda parte; nas home pages (`index.html`/`en`/`es`) todo valor **dentro de media query** também já usa `var(--s-N)` — só os valores de **desktop** (fora de media query) ainda são px cru equivalente, ver `docs/BACKLOG.md`.

## Layout

- `.wrap`: `max-width: 1120px; margin: 0 auto; padding: 0 48px` (`var(--s-3)`, 24px, abaixo de 768px). **Todo** bloco de largura total (hero, cases, footer) usa esta mesma classe — é o que garante alinhamento ponta a ponta entre seções.
- Regra rígida: qualquer container de largura total dentro de um contexto flex/grid precisa de `width: 100%` explícito além de `.wrap` — não confiar em stretch/auto-margin implícitos (ver `.footer > .wrap` em `case.css`).

## Componentes

### Botões (`.btn`, `.btn-primary`, `.btn-ghost`)
Único sistema de botão do site. `.btn-primary`: fundo `--accent`, texto claro, usado para a ação principal (WhatsApp). `.btn-ghost`: borda `--line`, usado para ação secundária. Transições sempre `cubic-bezier(.16,1,.3,1)`.

### Topbar (`.topbar`, `.topbar-nav`)
Sticky, fundo translúcido com blur. Nas home pages: menu-âncora minimalista (Sobre/Cases/Contato — ou tradução), sem avatar (avatar grande já vive no hero). Nas páginas de case: breadcrumb + progress-bar (padrão mais antigo, mantido). No mobile (≤430px), `.topbar-nav` reduz `gap` e `.topbar-nav a` reduz `font-size`/`letter-spacing` — a largura combinada do menu-âncora + seletor de idioma fica bem perto do limite da viewport em telas de 375px, sem folga real.

### Hero photo (`.hero-photo`)
Foto circular, `aspect-ratio: 1/1`, `border-radius: 50%`, `border: 1px solid var(--line)`. Largura `clamp(196px, 25vw, 310px)` desktop. No mobile (≤900px) é **48px**, pequena, ao lado do kicker "Product Designer · São Paulo" — não mais grande e empilhada acima/abaixo do H1. `.hero-top-grid` usa `grid-template-areas` para reposicionar kicker/H1/foto de forma independente por breakpoint (ver "Padrões e armadilhas de CSS" abaixo) — desktop: `"kicker photo" "h1 photo"` (foto à direita, altura pareada ao texto via `align-self:center`); mobile: `"photo kicker" "h1 h1"` (foto pequena ao lado do kicker, H1 ocupa a linha inteira abaixo). **Nunca usar `order` pra reordenar a foto no mobile** — a técnica de `grid-template-areas` já resolve reordenação sem inverter a hierarquia "H1 de impacto > identidade" que é o ponto central do hero (usar `order:-1` pra empurrar a foto antes do H1 já foi testado e revertido por esse motivo).

### Case card (`.case-card`, `.case-metrics`)
Card com thumb + kicker + título + descrição curta (1–2 frases) + **2 métricas** (`.case-metric-val` + `.case-metric-label`) + tag/link. Se o case não tem número de resultado, usar métrica de escala (países, plataformas) — nunca deixar sem métrica nem inventar número.

### Contact card / pré-footer (`.contact-card`)
**Regra fixa: outline only, nunca fill sólido.** `border: 1px solid var(--line); border-radius: 16px`, sem `background`. Layout: título+subtítulo à esquerda, um único CTA à direita (nunca múltiplos links secundários dentro do card). Vive dentro de `.footer-inner` (flex, centralizado verticalmente) dentro de `.footer` (`min-height: 78vh` **só em desktop** — abaixo de 768px vira `min-height: auto`, senão o card empilhado/compacto sobra num vão de faixa vazia). Linha de copyright fica **fora** do card, numa faixa própria ancorada no fim do footer (`.footer-rule` + `.footer-copy`).

### Next case (`.next-case`)
Bloco de navegação cruzada entre os dois cases ativos, no fim de cada case study, antes do footer.

### Pillars (`.pillars`)
Faixa de 4 colunas desktop, **1 coluna já a partir de 768px** (não um estágio intermediário de 2x2) com os verbos do processo (Entendo/Planejo/Construo/Acompanho — ou tradução). Regra: como os itens são numerados/enumerados (01–04), um grid 2x2 no mobile lê mal — a leitura sequencial pede 1 coluna direto.

## Animação

- Reveal on scroll via `IntersectionObserver` + classes `[data-reveal="up"|"fade"]`, sempre com `@media (prefers-reduced-motion: reduce)` desativando tudo.
- Timing padrão de hover/transição: `cubic-bezier(.16,1,.3,1)`.
- H1 usa `.h1-line` com `slideUp` por linha, delay escalonado.

## Padrões e armadilhas de CSS (reaproveitar em vez de redescobrir)

### Reordenar elementos por breakpoint: `grid-template-areas`, não `order`
Quando um elemento precisa mudar de posição relativa a outros dependendo do breakpoint (ex. foto do hero antes/depois do H1), a técnica certa é achatar os elementos como irmãos diretos de um grid e dar um `grid-template-areas` diferente por breakpoint — não envolver em `<div>`s aninhadas nem usar `order` isoladamente. `order` sozinho muda a ordem visual mas pode inverter uma hierarquia pretendida sem deixar isso óbvio no CSS (foi exatamente o bug do avatar aparecendo antes do H1 no mobile). `grid-template-areas` deixa a intenção de cada breakpoint explícita e legível: basta ler o nome das áreas pra saber o que vem onde.

### Duas armadilhas de cascata CSS já mordidas nesta base
1. **Especificidade vence ordem de declaração, mesmo entre `@media` diferentes.** Se dois breakpoints que podem estar ativos ao mesmo tempo (ex. `≤768px` e `≤430px` — todo viewport `≤430px` também satisfaz `≤768px`) têm seletores de especificidade diferente pro mesmo elemento (ex. `.pillar` genérico vs. `.pillar:nth-child(3)`), o mais específico vence **independente de qual vem primeiro no arquivo**. Evitar seletores `:nth-child`/`:first-child`/`:last-child` que só fazem sentido pra um layout específico (ex. um grid 2x2) sobrevivendo para um breakpoint com layout diferente (ex. 1 coluna) sem re-declarar explicitamente.
2. **Com especificidade igual, quem vem depois no arquivo vence — mesmo que a regra "depois" não esteja dentro de nenhum `@media`.** Um override dentro de `@media (max-width:900px){ .hero-kicker{margin-bottom:0} } `, se escrito **antes** da regra base `.hero-kicker{margin-bottom:20px}` no arquivo, perde pra regra base (que não tem media query, então está sempre "ativa", e como specificidade é igual, a posição no arquivo decide). Regra prática: overrides de mobile para uma propriedade devem ficar **depois** da regra base daquela classe no arquivo (mesmo padrão que `h1{font-size:68px}` seguido de `@media{h1{font-size:48px}}` logo abaixo já usa corretamente).

## Mobile

Breakpoints em uso: 900px (colapso de grids para 1 coluna), 768px (`.wrap` reduz padding, cards empilham), 430px (ajuste fino de tipografia/espaçamento pra tela pequena).

**Regra que evita o erro já cometido nesta sessão**: qualquer padding, `min-height`, ou tamanho calibrado para o hero/footer em desktop precisa de uma contraparte explícita em pelo menos um desses breakpoints — nunca assumir que "vai encolher sozinho". Antes de considerar uma mudança de espaçamento/altura no hero ou no footer como concluída, checar os 3 breakpoints, não só desktop.

**Regra de espaçamento (todo padding/margin/gap vira token)**: todo valor de padding/margin/gap, em qualquer breakpoint, se expressa como `var(--s-N)` — nunca um número em px solto. Se um valor não cai limpo em nenhum token da escala (`--s-1` a `--s-10`), isso é sinal para reconsiderar o valor, não para criar um px avulso. Exceção deliberada: tamanhos de elemento (ex. `.hero-photo { width: 48px }`, `grid-template-columns: 48px 1fr`) não são "espaçamento" no sentido de ritmo de layout — ficam como px literal. Motivo da regra: uma auditoria encontrou 8 valores de espaçamento mobile fora da grade de 8px (22px, 36px, 56px, 28px, 20px — todos "quase" um token, nunca exatamente), todos escritos como px cru em vez de `var(--s-N)` — a causa raiz era justamente a ausência de token, que torna fácil digitar um número aproximado sem perceber o desvio. Ver `docs/DECISIONS.md` para a tabela completa da correção.

## O que NÃO fazer

- Não usar preto sólido (`--ink` como background) em cards de CTA — decisão já testada e revertida.
- Não deixar métricas de case vazias nem inventar números sem base real.
- Não usar peso 700 em títulos grandes.
- Não introduzir nova cor sem atualizar este arquivo.
- Não usar `order` pra reordenar elementos do hero no mobile sem revisar se isso inverte a hierarquia H1-primeiro — usar `grid-template-areas`.
- Não dar um `min-height`/`padding` novo ao hero ou ao footer sem também definir o valor mobile na mesma tacada.
- Não escrever um valor de padding/margin/gap em px cru dentro de um `@media` — sempre `var(--s-N)`.
- Não deixar um `:nth-child`/`:first-child`/`:last-child` pensado para um breakpoint "vazar" para outro com layout diferente sem checar a especificidade.
