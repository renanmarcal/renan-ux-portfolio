# Design system

Tokens e componentes decididos para o portfólio. Fonte de verdade para qualquer trabalho de design — antes de propor algo novo, checar se já existe aqui. Atualizar este arquivo sempre que uma decisão visual for tomada (ver `docs/DECISIONS.md` para o porquê de cada uma).

## Tokens de cor

```css
--paper:    #f3efe7   /* fundo principal */
--paper-2:  #ece7dc   /* fundo de seções alternadas (pillars, footer) */
--card:     #faf7f2   /* fundo de cards (case-card) */
--ink:      #1c1916   /* texto principal */
--ink-soft: #5c554b   /* texto secundário */
--ink-faint:#6a6052   /* labels, metadados — escurecido em 2026-07-10 pra passar WCAG AA, ver docs/DECISIONS.md */
--line:     #d8d0c0   /* bordas e divisores — único tom de borda no site */
--accent:   #b8451f   /* laranja queimado — CTA, destaque, hover */
--accent-2: #2f5d50   /* verde — uso pontual (badge "Escolhida" em explorações) */
```

Regra: nunca introduzir uma cor fora desta paleta sem atualizar este arquivo.

## Tipografia

- Display/headings: `'Work Sans', sans-serif` — peso **600 sempre**, nunca 700 (decisão 2026-07-09: bold 700 lido como "forte demais").
- Corpo: `'Figtree', sans-serif`, 16px base, `line-height: 1.625`. Variantes de corpo em 14px (`.case-desc`, `.stat-val`, `.c-card .body-text`, `.prob-list li`) usam `line-height: 1.6` uniforme — antes tinham 4 valores diferentes (1.65/1.45/1.72/1.5) sem razão aparente.
- Labels/kickers: mesma família Figtree (não é mono de verdade, é convenção visual) — ver escala própria abaixo (`--fs-label`/`--ls-label-*`).
- H1 do hero (home): 68px desktop / 48px tablet (900px) / 36px mobile (430px), `letter-spacing: -.03em`, `line-height: 1.05`. Uma palavra-chave por H1 recebe `.hl { color: var(--accent) }`.
- H1 de case study (`case.css`, diferente e **intencionalmente** maior — registro de contexto, não hero de impacto): 80px desktop / 64px (900px) / 52px (768px) / 44px (430px), `line-height: .94`.
- Sem ponto final em H1 de hero (decisão de craft: frase de impacto não fecha com pontuação).

## Escala de labels/kickers (`--fs-label`, `--ls-label-wide`, `--ls-label-tight`)

```css
--fs-label: 11px          /* tamanho único — era 9/10/11px espalhados em 19 seletores */
--ls-label-wide:  .14em   /* labels em uppercase: kicker, nav, tags, lang-switch, breadcrumb, seta */
--ls-label-tight: .08em   /* labels só com dígitos ou sem uppercase: num, footer-copy, stage-num */
```

Toda a família de textos pequenos do site (kickers, nav, tags de case, métricas, breadcrumb, paginação, rodapé) usa esses 2 tokens — antes eram ~7 valores de letter-spacing (.06em–.18em) e 3 tamanhos (9/10/11px) espalhados por `index.html`/`case.css`/`404.html` sob nomes diferentes, mas coincidindo em valores idênticos (ex. `.hero-kicker`, `.kicker` e `.code` já eram exatamente o mesmo estilo com 3 nomes). Consolidado em 2026-07-10 — ver `docs/DECISIONS.md`.

**Regra de contraste**: `--ink-faint` só é usado nessa família (nunca em corpo de texto) — o valor do token já garante ≥4.5:1 (WCAG AA) contra os 3 fundos do site (`--paper`, `--paper-2`, `--card`). Não usar `--ink-faint` em texto menor que `--fs-label` (11px) nem introduzir um tom mais claro sem recalcular o contraste.

## Escala de espaçamento (base 8px)

```
--s-1  8px   --s-2  16px   --s-3  24px   --s-4  32px   --s-5  40px
--s-6  48px  --s-7  64px   --s-8  80px   --s-9  96px   --s-10 120px
--s-11 128px  (teto — só padding-top do hero em desktop)
```
Regra herdada do `case.css`: texto → imagem sempre `--s-5` (40px). `case.css` usa `var(--s-N)` em toda parte; nas home pages (`index.html`/`en`/`es`) todo valor **dentro de media query** também já usa `var(--s-N)` — só os valores de **desktop** (fora de media query) ainda são px cru equivalente, ver `docs/BACKLOG.md`.

## Ritmo vertical desktop (home)

As transições entre as seções principais da home (hero→pillars, pillars→cases, cases→footer) devem cair em um destes 3 valores — nunca um número solto:

- **192px** (`--s-9`+`--s-9`) — hero→pillars
- **216px** (`--s-9` do `.pillars` + 144px do `.cases`, este último ainda não tokenizado) — pillars→cases
- **192px** — cases→footer

O ritmo bloco-a-bloco das páginas de case (`.block` em `case.css`, sempre 240px = `--s-10`+`--s-10`) é o trecho mais disciplinado do site e serve de referência — a home não tinha o mesmo tratamento até 2026-07-10 (ver `docs/DECISIONS.md`).

**Regra de hierarquia**: um elemento de navegação secundária (ex. `.next-title`, o link "próximo case") nunca pode ter fonte maior que um título de seção real (ex. `.cases-header h2`) — já aconteceu ao contrário e foi corrigido em 2026-07-10.

## Ritmo vertical mobile

**Regra geral: o ritmo mobile é exatamente metade do valor desktop correspondente**, usando só `var(--s-6)` (48px) nos dois lados de cada seção principal — mais fácil de manter do que inventar uma escala mobile paralela.

- Home (`index.html`/`en`/`es`, ≤768px): hero→pillars = pillars→cases = cases→footer = **96px** (48+48, metade do 192px desktop).
- Case study (`case.css`): hero→bloco 01 = bloco→bloco = bloco→next-case = next-case→footer = **160px** a ≤768px, **128px** a ≤430px — usa `var(--s-8)`/`var(--s-7)` nos dois lados de cada transição, mesma lógica do `.block` (que já reduzia 120→80→64) agora estendida a `.hero-img-strip`, `.next-case` e ao `padding-top` do `.footer` (que antes ficavam parados no valor desktop em qualquer breakpoint).

**Regra de proporção H1:corpo no menor breakpoint**: o H1 encolhe bastante de desktop pro mobile (68→36px na home, 80→44px no case), mas o texto de abertura (`.hero-bio`/`.hero-summary`) não pode ficar parado no mesmo tamanho do desktop, senão a proporção de hierarquia desaba (chegou a cair de 3.78:1 pra 2.0:1 na home). Os dois recebem `font-size: 16px` (o tamanho-base do corpo do site) só a ≤430px — não um valor proporcional exato ao encolhimento do H1, que ficaria pequeno demais pra leitura confortável em tela de celular.

O padding de abertura do hero mobile não acompanha 1:1 o crescimento do desktop (que foi de 72→128px, +78%) — um aumento proporcional empurraria demais o conteúdo pra baixo numa tela pequena. Em vez disso, sobe um degrau de token por breakpoint (48→64px a 900px, 40→48px a 430px).

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
- Não criar um novo tamanho/letter-spacing pra família de labels — usar `--fs-label`/`--ls-label-wide`/`--ls-label-tight`. Se nenhum dos 2 serve, é sinal de que o caso de uso não é realmente um "label".
- Não usar `--ink-faint` fora da família de labels (nunca em corpo de texto) — o token só tem contraste WCAG AA garantido no tamanho `--fs-label`.
- Não deixar a transição entre 2 seções da home fora de 192/216px sem atualizar a tabela de "Ritmo vertical desktop".
- Não dar a um elemento de navegação secundária (next-case, breadcrumb) uma fonte maior que um título de seção real — já aconteceu ao contrário, foi corrigido.
