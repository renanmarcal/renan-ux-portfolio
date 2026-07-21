# Design system

Tokens e componentes decididos para o portfólio. Fonte de verdade para qualquer trabalho de design — antes de propor algo novo, checar se já existe aqui. Atualizar este arquivo sempre que uma decisão visual for tomada (ver `docs/DECISIONS.md` para o porquê de cada uma).

**2026-07-20**: todos os tokens abaixo (cor, tipografia base, escala de espaçamento, escala de labels) vivem em `tokens.css`, arquivo único linkado por `index.html`/`en/index.html`/`es/index.html`/`404.html` e importado (`@import`) no topo de `case.css` — este último herda para todos os `cases/*.html` nas 3 línguas automaticamente. Antes, `index.html` e `case.css` mantinham cada um seu próprio `:root` com os mesmos valores copiados manualmente; uma mudança de token não propagava entre os dois. Editar um token agora é editar `tokens.css` uma vez — nunca redefinir essas variáveis em outro lugar. `case.css` mantém só as 5 variáveis exclusivas de página de case (`--topbar-bg`, `--fs-case-section-title`, `--fs-case-narrative`, `--fs-case-card-title`, `--fs-case-card-body`), que não fazem sentido no `tokens.css` compartilhado.

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
- Corpo: `'Figtree', sans-serif`, 16px base, `line-height: 1.5` *(reduzido de 1.625 em 2026-07-12 — feedback direto do Renan: o site parecia "arejado demais" perto de referências como Stripe)*. Variantes de corpo em 14px (`.case-desc`, `.c-card .body-text`, `.prob-list li`, `.metric-inline`) usam `line-height: 1.5` uniforme — antes tinham 4 valores diferentes (1.65/1.45/1.72/1.5), depois consolidados em 1.6, agora recalibrados junto com o corpo em 1.5. Textos de 18px (`.hero-bio`, `.hero-summary`) usam `1.45`. `.body-text` do case (16px, texto principal do corpo do case) usava `1.72` — o mais solto do site — reduzido para `1.5` na mesma passada.
- Labels/kickers: mesma família Figtree (não é mono de verdade, é convenção visual) — ver escala própria abaixo (`--fs-label`/`--ls-label-*`).
- H1 do hero (home): `clamp(56px, 11vw, 160px)` desktop, `letter-spacing: -.05em`, `line-height: .92` *(atualizado 2026-07-12, redesign "grid quebrado" — era 68px fixo desktop/48px/36px, `letter-spacing:-.03em`, `line-height:1.05`; ver `docs/DECISIONS.md`)*. Em `≤900px` o piso do clamp desce para `clamp(30px, 11vw, 160px)` *(30px, não mais 56px — 2026-07-15, ver `docs/DECISIONS.md`: com piso de 56px a última palavra travava e parava de encolher abaixo de ~509px, enquanto a foto, ancorada à direita, seguia avançando — "s" final inevitavelmente engolido em tela estreita)*. A foto do hero (rotacionada, `margin-top` negativo) sobrepõe deliberadamente parte do H1 em desktop — colisão faz parte da composição, não é bug a corrigir. Uma palavra-chave por H1 recebe `.hl { color: var(--accent) }`.
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

- `.wrap`: `max-width: 1440px; margin: 0 auto; padding: 0 48px` (`var(--s-3)`, 24px, abaixo de 768px) — **aumentado de 1120px em 2026-07-16**, alinhado ao padrão de containers largos de referências modernas (Strider ~1440px de conteúdo útil, Square ~1560px), ver `docs/DECISIONS.md`. **Todo** bloco de largura total (hero, cases, footer) usa esta mesma classe — é o que garante alinhamento ponta a ponta entre seções.
- Regra rígida: qualquer container de largura total dentro de um contexto flex/grid precisa de `width: 100%` explícito além de `.wrap` — não confiar em stretch/auto-margin implícitos (ver `.footer > .wrap` em `case.css`).
- O `translateX` calibrado do `.bold-photo` (ver "Hero photo — broken-grid" abaixo) usa `1440px` na fórmula do gutter, não mais `1120px` — qualquer futura mudança de `.wrap` na home precisa atualizar essa fórmula também, ela não deriva de `var()`.

### Blocos de case study (`.block-grid`) em containers largos — não existe fórmula única

**Decisão 2026-07-16, depois de 2 tentativas rejeitadas** (ver `docs/DECISIONS.md` para o histórico completo): com `.wrap` em 1440px, um `.block-grid` de 1 coluna só com `.block-body { max-width: 62ch }` deixa uma faixa vazia enorme à direita do texto em blocos só-texto. A tentação é resolver isso com uma regra CSS genérica aplicada a todo `.block-grid` — **foi tentado duas vezes e rejeitado nas duas**: uma coluna sticky pro eyebrow só empurrou o peso pra esquerda; um split h2/corpo aplicado a tudo quebrou seções que tinham imagem de suporte ou grid de cards logo após o texto.

**Regra: a composição de cada bloco depende da forma do conteúdo dele, decidida bloco a bloco — nunca por um seletor genérico em `.block-grid` inteiro.** Três formas identificadas até agora, cada uma com sua ferramenta:

1. **Texto + 1 imagem de suporte lado a lado** → `.b-split` explícito no HTML, com `style="grid-template-columns: <a>fr <b>fr"` escolhido por bloco (não um valor fixo — depende de quão dominante a imagem deve ser). Ex.: `5fr 7fr` (texto/imagem) quando o parágrafo é curto e a imagem deve pesar mais.
2. **Texto longo + imagem que deve ocupar a largura toda, abaixo (não ao lado)** → classe `.block-body--split` no `.block-body` (h2 numa coluna, parágrafos na coluna de leitura ao lado — só ativa via `@media (min-width:1024px)` e seletor `:has()`, nunca em `.block-body` genérico) **seguido** de um `.img-slot.full-slot` separado, fora do split, full-bleed.
3. **Texto curto + grid de cards (ou só título + cards, sem parágrafo)** → fica 100% empilhado, sem nenhuma regra de coluna. É a forma mais comum (intros de bloco antes de um `.idea-grid`) e não precisa de tratamento especial — o `.wrap` maior já dá respiro suficiente ao grid de cards por si só.

**Antes de aplicar qualquer uma das 3 formas a um bloco novo, ler o conteúdo real dele** (parágrafo curto ou longo? tem imagem de suporte 1:1 com o texto, ou os elementos visuais são cards/full-width?) — a forma errada aplicada "de qualquer jeito" já produziu 2 resultados rejeitados nesta mesma decisão.

`.idea-grid-2` (grids de cards em 2 colunas) ganhou `grid-template-columns: repeat(auto-fit, minmax(360px,1fr))` em `≥1024px` — evita 1 card órfão esticado quando o grid tem número ímpar de itens (ex. 5 cards). Vídeos embedados (`.img-slot:has(iframe)`) ganharam teto `max-width: 1120px` no mesmo breakpoint — sem isso, um iframe 16:9 full-width em 1440px de conteúdo fica com ~756px de altura, grande demais.

**Cases, tipografia e grids (2026-07-19):** títulos de seção usam 36px, narrativa 18px, títulos de card 20px e corpo de card 16px em desktop. A ≤1023px, título e narrativa passam para 32px e 16px. Grids genéricos de três cards passam a uma coluna a ≤900px; grids de duas colunas permanecem até 768px. No C6, a validação mantém quatro critérios em 2×2 até 768px, quando empilha. A composição específica usa `.case-c6`, não uma classe experimental.

## Componentes

### Botões (`.btn`, `.btn-primary`, `.btn-ghost`)
Único sistema de botão do site. `.btn-primary`: fundo `--accent`, texto claro, usado para a ação principal (WhatsApp). `.btn-ghost`: borda `--line`, usado para ação secundária. Transições sempre `cubic-bezier(.16,1,.3,1)`.

### Topbar (`.topbar`, `.topbar-nav`)
Sticky, fundo translúcido com blur. Nas home pages: menu-âncora minimalista (Sobre/Cases/Contato — ou tradução), sem avatar (avatar grande já vive no hero). Nas páginas de case: breadcrumb + progress-bar (padrão mais antigo, mantido). No mobile (≤430px), `.topbar-nav` reduz `gap` e `.topbar-nav a` reduz `font-size`/`letter-spacing` — a largura combinada do menu-âncora + seletor de idioma fica bem perto do limite da viewport em telas de 375px, sem folga real.
**404 (`404.html`) desde 2026-07-13**: passou a linkar `case.css` em vez de duplicar um subconjunto de tokens num `<style>` local, e ganhou a topbar de breadcrumb das páginas de case (link "← Renan Marçal" + `.crumb` com o nome da página) — sem `.progress-bar` (não há conteúdo pra rolar). Antes era uma página isolada, sem `.wrap`/topbar, com layout centralizado full-viewport próprio; o bloco central (código, H1, texto, link de volta) continua centralizado, agora dentro de `calc(100dvh - 52px)` (a altura da topbar).

### Hero photo — broken-grid (`.bold-photo`)
**Componente atual da home desde 2026-07-12.** Foto rotacionada (-3deg desktop, -2deg mobile), `border-radius: 24%/24%` (squircle, não círculo). `margin-left: auto` alinha à direita; `margin-top: calc(var(--s-9) * -1.5)` desktop (calc(var(--s-6) * -1) mobile) puxa a foto pra cima, sobrepondo deliberadamente parte do H1 — é o "grid quebrado" que dá nome ao componente, não um bug de espaçamento a corrigir. Borda com spotlight cônico que acompanha o cursor (`::after` + `conic-gradient`, ângulo via custom property `--spot-angle` atualizada por JS em `pointermove`). Sem squircle real de CSS puro — `border-radius` elíptico simula.

**Largura desktop (`≥901px`)**: `clamp(220px, 32vw, 380px)`, com `transform: translateX(max(0px, min(90px, calc((100vw - 1120px)/2 - 8px)))) rotate(-3deg)` — o deslocamento (90px PT, 17px EN, 48px ES — varia por idioma porque a palavra final tem largura diferente) expõe metade do "s" final da última linha do H1 em telas largas, mantendo a colisão como composição sem engolir a palavra inteira. Teto limitado ao gutter real do `.wrap` para nunca gerar scroll horizontal.

**Largura mobile (`≤900px`, 2026-07-15, curva de tablet corrigida em 2026-07-15)**: calibrada em **runtime por JS** (`calibrateBoldPhoto()`, no primeiro IIFE de cada home page), não por valor estático — a largura da última palavra escala com o font-size clampado do H1 enquanto a posição da foto escala com a viewport e os paddings são fixos, então nenhum conjunto de valores CSS estáticos fecha a cobertura do "s" de forma consistente em toda a faixa mobile (medido: calibração por amostragem de pontos oscilava de 46% a 653% de cobertura entre larguras vizinhas). O calibrador mede o retângulo do último glifo do `.bold-h1 .hl` via `Range`, em `document.fonts.ready` + resize debounced (120ms) + `orientationchange`, e escreve a largura resultante na custom property `--bp-w` do elemento; o CSS estático (`clamp(88px, 32vw, 160px)` PT, `37vw` EN, `35vw` ES) é só o fallback no-JS.

Lógica do JS (`maxW` é o mesmo clamp do desktop — `min(380, max(220, 0.32·vw))` — avaliado na viewport atual, o que faz a fronteira 900/901px fechar sem salto):
- Se a largura que mira o meio do "s" (`desired`) ainda cabe dentro de `maxW`: usa `max(96, desired)` — mesmo comportamento mobile de sempre (foto mira o "s").
- Se `desired` estoura `maxW` (a partir de ~530px, a palavra já ficou distante demais pra mirar sem estourar o teto): interpola linearmente de `200px` em `530px` até `maxW` em `900px`, em vez de travar no teto — essa branch existe porque a primeira versão usava `Math.max(desired, growW)` incondicional, que forçava um piso de 160px até em larguras mobile pequenas (320-430px) e explodiu a cobertura do "s" pra 237-653%; a correção só entra quando a mira no "s" já não é mais alcançável.
- Above ~900px a foto para de mirar o "s" e passa a só crescer suavemente até o valor do desktop — decisão do usuário: "crescer suavemente até o desktop" em vez de tentar continuar mirando o "s" numa faixa onde a palavra já está longe demais pra isso fazer sentido.

**Nunca substituir o calibrador por constantes fixas por idioma** — o H1 já trocou de copy 2x (ver `docs/DECISIONS.md`) e uma constante derivada da largura da palavra quebra silenciosamente na próxima troca. **Nunca reintroduzir um `Math.max(desired, growFloor)` incondicional** — quebra a faixa mobile pequena, que já correu perto do teto de cobertura aceitável.

**Regra herdada, ainda válida**: nunca usar `order` pra reordenar a foto no mobile — aqui a foto já é irmã direta do H1 na ordem do DOM (`.bold-stage`), então nenhuma técnica de reordenação é necessária.

### Hero photo — circular (`.hero-photo`, depreciado na home)
**Não usado na home desde 2026-07-12** — substituído pelo `.bold-photo` acima. Mantido aqui só como histórico, caso o padrão circular volte a ser necessário em outro contexto. Foto circular, `aspect-ratio: 1/1`, `border-radius: 50%`, `border: 1px solid var(--line)`. Largura `clamp(196px, 25vw, 310px)` desktop, 48px mobile ao lado do kicker. Usava `.hero-top-grid` com `grid-template-areas` pra reposicionar kicker/H1/foto por breakpoint (desktop: `"kicker photo" "h1 photo"`; mobile: `"photo kicker" "h1 h1"`) — essa técnica de `grid-template-areas` (em vez de `order`) continua sendo a referência certa caso outra página precise reordenar elementos por breakpoint.

### Case card (`.case-card`, `.case-metrics`)
Card com thumb + kicker + título + descrição curta (1–2 frases) + **2 métricas** + convite de leitura. Se o case não tem número de resultado, usar métrica de escala (países, plataformas) — nunca deixar sem métrica nem inventar número.
**Atualizado 2026-07-12**: métricas usam o átomo `.metric-inline` (`.m-val` + `.m-label` na mesma linha, valor em accent, 14px — substitui o par empilhado `.case-metric-val`/`.case-metric-label` de 24px, agora depreciado nesta página). Rodapé do card virou `.case-invite` — link de texto simples ("Ver case", ganha cor accent no hover) — substitui o par tag+seta (`.case-footer`/`.case-tag`/`.case-arrow`, agora depreciados aqui); a tag de plataforma (Web/Mobile) deixou de ser exibida no card. Hover do card ganhou `background: var(--paper-2)` além do `border-color`/`transform`/`box-shadow` já existentes.

### Contact card / pré-footer (`.contact-card`) — depreciado em todo o site
**Regra fixa (histórica, ainda documentada por referência): outline only, nunca fill sólido.** `border: 1px solid var(--line); border-radius: 16px`, sem `background`. Layout: título+subtítulo à esquerda, um único CTA à direita.
**Não usado em lugar nenhum desde 2026-07-13** — a home trocou em 2026-07-12 (ver "Footer split" abaixo), e o `case.css` (compartilhado por todas as páginas de case, PT/EN/ES) seguiu no dia seguinte, fechando a consistência entre home e cases. A regra "outline only" e o princípio de "um único CTA" continuam valendo — foram herdados pelo `.f3-grid`, não abandonados.

### Footer split (`.f3-grid`)
**Componente de pré-footer de todo o site desde 2026-07-13** (home desde 2026-07-12, páginas de case desde 2026-07-13) — substitui `.contact-card` em toda parte. Ecoa a composição do hero: título de 2 linhas (`.f-title`, `clamp(40px, 6vw, 72px)`, uma palavra em `.hl`) à esquerda, subtítulo + CTA único (`.f3-cta`) numa coluna própria à direita — mesma regra de "um único CTA" herdada do contact-card. Abaixo do grid, `.close-ticker` replica a gramática do `.bold-ticker` do hero (fonte mono, itens separados por gap, não por middot) com localização + link de LinkedIn com hover — abre e fecha a página na mesma linguagem visual. `.footer-inner` muda de `align-items: center` (contact-card, centralizado verticalmente) para `align-items: flex-end` (footer split, ancorado embaixo) — mobile vira `flex-start`. Nas páginas de case, o CTA do footer também ganhou a física magnética (`.magnet`) que já existia no hero/footer da home — antes essas páginas não tinham nenhuma interação magnética.

### Next case (`.next-case`)
Bloco de navegação cruzada entre os dois cases ativos, no fim de cada case study, antes do footer.

### Pillars (`.pillars`)
Faixa de 4 colunas desktop, **1 coluna já a partir de 768px** (não um estágio intermediário de 2x2) com os verbos do processo. Regra: como os itens são numerados/enumerados (01–04), um grid 2x2 no mobile lê mal — a leitura sequencial pede 1 coluna direto.
**Copy atual (desde 2026-07-12)**: Compreendo/Estruturo/Construo/Valido — era Entendo/Planejo/Construo/Acompanho, ver `docs/COPY.md` para o texto completo e o porquê da troca do 04. Padding interno ganhou mais ar (`0 var(--s-6)` colunas, `var(--s-3)` entre num/verbo/descrição, era `32px`/`12px` cru) e `.pillar-desc` ganhou `max-width: 26ch` pra não esticar linha em telas largas. **Avaliada e descartada uma versão com animação de "trilha"** (linha conectando os 4 passos, acendendo em sequência) — decisão consciente de simplicidade na promoção, não dívida pendente; o protótipo existiu em sandbox (`organism-pillars-bold-trail`, ver `LEDGER.md` no sandbox) mas não foi integrado.

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
