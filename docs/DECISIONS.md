# Decisions

Log curto de decisões de design/produto do portfólio. Uma entrada por decisão, com data e porquê — serve para não relitigar em sessões futuras. Ordem cronológica.

- **2026-07-09 · Auditoria comparativa com denilsonsilva.com.br** — motivou toda a rodada de redesign abaixo: falta de CTA primário, hero sem frase de impacto, pré-footer sem conversão, cards de case sem métricas.

- **2026-07-09 · H1 vira frase de impacto, nome sai do H1** — "Renan Marçal" deixa de ser o H1 e vira identidade na topbar; o H1 passa a comunicar posicionamento ("Transformo sistemas complexos em eficiência"), com uma palavra-chave destacada em `--accent`. Por quê: identidade > nome quando o objetivo é convencer um recrutador/líder em segundos.

- **2026-07-09 · H1 peso 600, não 700** — bold 700 lido como "forte demais" visualmente. Regra: títulos grandes usam Work Sans 600, nunca 700.

- **2026-07-09 · Foto circular no hero, ~40% maior que a primeira versão** — fica à direita do H1 (H1 à esquerda), altura pareada ao bloco de texto via `align-self:center` + `aspect-ratio:1/1`, não `align-items:stretch` (evita elipse).

- **2026-07-09 · CTA primário aponta para WhatsApp** — conversão mais direta no contexto BR. Mensagem pré-preenchida menciona "conversar sobre uma oportunidade" (não genérica).

- **2026-07-09 · Sistema de botões criado (`.btn-primary`/`.btn-ghost`)** — antes o site não tinha nenhum componente de botão; os 3 links do hero tinham peso visual idêntico. Ver `docs/DESIGN-SYSTEM.md`.

- **2026-07-09 · Topbar: menu-âncora substitui avatar+nome** — "Sobre · Cases · Contato" no lugar do bloco avatar+nome. Por quê: o avatar grande já vive no hero: repetir no topbar era redundante.

- **2026-07-09 · Cards de case ganham métricas, mas nem todo case tem número de resultado** — quando não há métrica de impacto real (caso Priorização), usar métrica de **escala** (países, plataformas) em vez de inventar ou deixar vazio. Não forçar número onde não existe.

- **2026-07-09 · Pré-footer: card outline, nunca fill sólido** — primeira versão usava `background: var(--ink)` (preto sólido); rejeitada por ficar com "efeito fosco" ruim contra o fundo. Regra fixa: `.contact-card` é sempre `border: 1px solid var(--line)`, sem fill.

- **2026-07-09 · Footer com altura fixa em vh, não em padding fixo** — o pré-footer precisa ocupar uma faixa substancial da viewport (`min-height: 78vh`), replicando o padrão que o site já usava antes (`60vh`) e pareando com a altura do hero (que cresceu ~25% na mesma rodada). A linha de copyright fica numa faixa separada, ancorada no fim do footer — não junto ao card.

- **2026-07-09 · Alinhamento do card do footer é regra, não sugestão** — `.footer > .wrap { width: 100% }` explícito para garantir que o card e a linha de baixo fiquem ponta a ponta com o `.wrap` do hero, sem depender de comportamento implícito de flexbox (stretch/auto-margin).

- **2026-07-09 · Grid do hero-bottom com `grid-column` explícito** — bio+CTA sempre coluna 1 (esquerda), stats sempre coluna 2 (direita). Antes dependia de auto-placement do CSS Grid, que é correto mas frágil de raciocinar; explicitar remove ambiguidade para sessões futuras.

- **2026-07-09 · Paridade EN/ES é obrigatória antes de "concluído"** — as versões EN/ES estavam defasadas (estrutura antiga, pré-redesign). Regra adotada: qualquer mudança aprovada em PT se propaga às outras duas línguas antes de considerar a tarefa fechada, a menos que avisado do contrário.

- **2026-07-09 · Sem automação de browser para validar edições locais** — Renan reloads manualmente; ver `feedback_browser_automation` na memória de longo prazo do Claude.

- **2026-07-09 · Framework de governança (CLAUDE.md, docs/, subagents) proposto para reduzir custo de token** — diagnóstico: duplicação estrutural (footer repetido em 9 arquivos, CSS colado em 3 páginas) é o maior gargalo, não falta de subagents. Ordem de execução acordada: docs de governança → migração para gerador de site estático (Astro) → subagents por cima disso.

- **2026-07-09 · Avatar do hero atualizado** — foto anterior (`1772931858427.png`, headshot genérico) substituída pela versão ajustada gerada em `assets/img/ChatGPT Image 9 de jul...png`, renomeada para o nome semântico já referenciado nas 3 línguas (`assets/img/renan-avatar.png`). Zero mudança de HTML necessária — o nome do arquivo é a fonte de estabilidade.

- **2026-07-09 · CTA secundário do hero: "Ver cases" → "Ver LinkedIn"** — o link para o LinkedIn tinha sumido do hero inteiro durante o redesign (os 3 ícones originais viraram só o CTA do WhatsApp). Como a navegação para `#cases` já está coberta pelo menu-âncora do topbar (Sobre/Cases/Contato), o segundo botão do hero foi liberado para reassumir a função de expor o LinkedIn.

- **2026-07-09 · Case Priorização: métrica de escala substituída por métrica de negócio real** — Renan trouxe os números reais (+15% produtividade diária, −5% churn), então a regra anterior ("este case não tem resultado real, usar escala") ficou obsoleta. Trocado em 3 lugares: card da home (3 países/2 plataformas → as duas métricas de negócio), spec do hero do case (Alcance → Impacto), e o bloco 07 inteiro (heading + parágrafo + spec) — que antes só falava de alcance cross-market, agora lidera com o resultado de negócio e mantém o alcance (3 mercados, versão desktop) como contexto de apoio na prosa, não mais como o número em destaque. Conferido: nenhum vestígio de "Alcance/3 países/2 plataformas" restante em nenhuma das 3 línguas.

- **2026-07-09 · Adaptação mobile do hero e footer (correção de "impactos" desktop-only)** — auditoria read-only encontrou 4 mudanças desta sessão que nunca ganharam contraparte mobile: (1) `.footer{min-height:78vh}` sem override, gerando ~200px de espaço morto no card compacto empilhado; (2) `.hero-photo` com `order:-1` a 900px, empurrando a foto de 135px pra *antes* do H1 — o oposto da decisão "H1 de impacto > identidade" registrada acima; (3) padding do hero (72/48/48/88 = ~256px) sem nenhuma redução em nenhum breakpoint; (4) topbar-nav + lang-switch ocupando ~100% da largura disponível a 375px, sem folga. Corrigido: footer ganha `min-height:auto` abaixo de 768px; `order:-1` removido (ordem natural do DOM já põe H1 antes da foto); hero ganha reduções em 900px e 430px espelhando o padrão que `case.css` já usava; topbar-nav ganha `gap`/`font-size` menores a 430px. Aplicado idêntico em PT/EN/ES (os 3 `<style>` embutidos são espelhados) e em `case.css` (footer, compartilhado pelos cases). Regra geral daqui pra frente documentada em `docs/DESIGN-SYSTEM.md` § Mobile: todo ajuste de padding/`min-height` do hero ou footer precisa checar os 3 breakpoints antes de ser considerado concluído.

- **2026-07-09 · 3 bugs visuais nascidos do fix mobile anterior, corrigidos** — Renan reportou visualmente e os 3 foram confirmados por leitura estática do CSS, sem browser. (1) Avatar com espaço vazio em cima: `.hero-top-grid{gap:40px}` herdado do desktop somava com `margin-top:20px` do próprio `.hero-photo`, dando 60px; reduzido pra um único `gap:24px` no grid, sem margin redundante. (2) Divisor sumindo entre o 3º e 4º pillar no mobile: pegadinha de especificidade CSS — `.pillar:nth-child(3){border-bottom:none}` do breakpoint 768px (mais específico que a regra genérica) continuava valendo dentro do breakpoint 430px mesmo vindo antes no arquivo, porque especificidade vence ordem de declaração quando os dois `@media` estão ativos ao mesmo tempo. Corrigido com um `nth-child(3)` de mesma especificidade dentro do próprio bloco 430px. (3) Card do footer colado na linha de baixo: o espaçamento que vinha de graça do `min-height:78vh` + `align-items:center` sumiu quando o fix anterior trocou pra `min-height:auto`; adicionado `margin-bottom:40px` explícito em `.footer-inner`. Lição: ao trocar "espaçamento por efeito colateral de um layout maior" (vh, flex-grow) por "espaçamento direto", sempre conferir se não ficou uma dependência implícita que precisa virar `margin`/`gap` explícito.
