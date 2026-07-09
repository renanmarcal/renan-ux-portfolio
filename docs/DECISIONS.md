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
