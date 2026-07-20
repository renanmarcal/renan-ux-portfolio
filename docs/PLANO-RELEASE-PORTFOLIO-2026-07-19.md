# Plano de release — case C6 e escala tipográfica dos cases

## Objetivo

Publicar a revisão do case C6 Pay sem levar o experimento isolado para produção de forma inconsistente. A entrega promove a escala tipográfica validada no C6 para o sistema de páginas de case, mantém as composições específicas do C6 isoladas, sincroniza PT/EN/ES e passa por QA responsivo antes do merge em `main`.

Este arquivo é o contrato de execução da próxima sessão Terra. Não ampliar o escopo durante a execução; qualquer decisão transversal nova volta para Sol.

## Baseline e estratégia de Git

- Produção atual: `origin/main` em `b2c2454`.
- `main` local está um commit à frente: `c6bc2bb`, uma tentativa anterior de colocar duas imagens legadas lado a lado no C6 PT/EN/ES.
- O worktree sobre esse commit está misto e contém mudanças de outros projetos e arquivos locais.
- Não reescrever nem resetar o histórico local.
- Criar `agent/case-system-refresh` a partir do `main` local atual, preservar o worktree e fazer staging somente por caminhos/hunks explícitos.
- O PR incluirá o commit local anterior, mas deverá ser integrado com **squash merge**; assim, o commit transitório não chega ao histórico de produção como uma decisão independente.
- Não usar `git add -A`, `git commit -a` ou push direto em `main`.

## Evidências da auditoria Sol

### Consumidores de `case.css`

| Página/família | Situação | Impacto planejado |
|---|---|---|
| C6 Pay PT | Pública, 8 seções, experimento aprovado | Estrutura/copy atual + promoção da escala |
| C6 Pay EN/ES | Públicas, ainda com 7 seções e estrutura antiga | Sincronização completa com PT |
| Priorização PT/EN/ES | Públicas e estruturalmente alinhadas | Escala global, skip link e QA; sem reescrever copy |
| Landing Pages PT | Indexada no sitemap, card oculto na home | Recebe escala global e QA; sem reabrir narrativa |
| Dashboard | Stub `noindex` | Apenas smoke test; não entra no escopo editorial |
| 404 | Compartilha `case.css`, sem blocos de case | Smoke test; escala nova não deve afetá-la |
| Home PT/EN/ES | Não carrega `case.css` | Nenhum impacto desta promoção |
| Planilha MEI | Projeto separado | Fora do release e intocada |

### Medições atuais

- Auditoria de 9 páginas em 1440, 1024, 768 e 390 px: zero overflow horizontal real.
- C6 PT atual: H2 `36px`, narrativa `18px`, card `20/16px` no desktop.
- C6 EN/ES: H2 `32px`, narrativa `16px`, card `18/14px`.
- Priorização: H2 mistura `32px` e `36px` conforme a seção; narrativa `16px`, card `18/14px`.
- Simulação da escala promovida: zero overflow em todas as páginas e idiomas.
- Risco encontrado entre 769–899 px: grids de três cards chegam a `203px` por coluna em 769 px; títulos ficam com até três linhas e a composição perde legibilidade antes do breakpoint atual de 768 px.

## Decisões de design system

### 1. Escala tipográfica global das páginas de case

Criar tokens semânticos em `case.css` e documentá-los em `docs/DESIGN-SYSTEM.md`:

| Função | `>=1024px` | `<=1023px` |
|---|---:|---:|
| Título de seção `.block h2` | 36px | 32px |
| Narrativa direta `.block-body > .body-text` | 18px / 1.5 | 16px / 1.5 |
| Título de card `.c-card .sub-h` | 20px / 1.25 | 20px / 1.25 |
| Corpo/lista de card | 16px / 1.5 | 16px / 1.5 |

Nomes sugeridos:

```css
--fs-case-section-title: 36px;
--fs-case-narrative: 18px;
--fs-case-card-title: 20px;
--fs-case-card-body: 16px;
```

No breakpoint `<=1023px`, sobrescrever apenas título de seção e narrativa para `32px` e `16px`. Não duplicar esses valores sob `.case-c6-refresh`.

### 2. Responsividade dos grids de cards

- Grids genéricos de três cards não devem manter três colunas abaixo de 900 px.
- Em `<=900px`, `.idea-grid` de três cards vira uma coluna para evitar cards de ~203–247 px.
- `.idea-grid-2` continua em duas colunas até `768px`, pois a simulação mostrou ~317 px por card em 769 px, ainda confortável.
- O grid de quatro resultados do C6 continua 2×2 em telas largas e uma coluna em `<=768px`; ele é uma composição específica, não deve ser capturado pela regra genérica de três cards.
- Não introduzir um estágio 2+1 com card órfão esticado.

### 3. Escopo local versus global

Promover globalmente:

- Tokens e seletores da escala tipográfica.
- Breakpoint de grids de três cards.
- Componente `.skip-link`; adicionar o markup e `main#main-content` às páginas longas públicas.
- Padrões já existentes `.block-body--split`, `.img-slot`, `.full-slot` e tokens de espaçamento.

Manter específico do C6:

- `.context-evidence` e `.context-problems`.
- `.discovery-evidence`, `.discovery-priorities` e modo `--text-only`.
- `.reference-portal-grid`, `.reference-portal` e recorte 16:9.
- Teto de largura do mockup do hero.
- Grid 2×2 da validação/resultados.
- H1/spec/breadcrumb compactos em `<=600px`.

Ao concluir a validação, renomear `.case-c6-refresh` para uma classe permanente como `.case-c6` nos três idiomas; “refresh” não deve virar dependência de produção.

## Case C6 Pay

### Estrutura aprovada do PT

1. Contexto — imagem legada + três problemas.
2. Descoberta — título “Encontrar vendas não bastava para fechar o caixa”, dois parágrafos e dois cards; a imagem antiga permanece com `hidden` por decisão do usuário.
3. Ideação — referências Stone e PagSeguro em cards visuais alinhados 16:9.
4. Lógica — três decisões.
5. Visão financeira.
6. Fechamento de caixa.
7. Fundamentação/validação — quatro cards em 2×2.
8. Impacto.

Não reabrir a arquitetura ou a voz do PT durante Terra.

### Paridade EN/ES

- PT é a fonte de verdade.
- Replicar as oito seções, classes, ordem de elementos, imagens, dimensões e comportamento responsivo em EN e ES.
- Traduzir com fidelidade, preservando autoria, perguntas concretas e períodos contínuos; não reintroduzir frases-veredito, antíteses “não X, mas Y” ou cadência telegráfica.
- Localizar skip link, `data-name`, alt texts e legendas.
- As três versões devem terminar com a mesma contagem estrutural: 8 `.block`, 7 `.block-body--split`, 12 `.c-card`.

### Novos assets Stone/PagSeguro

Converter e renomear:

- `Gemini_Generated_Image_8goqvr8goqvr8goq.png` → `portal-stone-resumo-financeiro-2020.webp`
- `Gemini_Generated_Image_kkjworkkjworkkjw.png` → `portal-pagseguro-visao-financeira-2020.webp`

Regras:

- Redimensionar para 1600 px de largura; é suficiente para exibição ~650 px e telas 2×.
- Exportar WebP com qualidade inicial 82 e comparar textos pequenos/logos com o original.
- Meta de 250–500 KB por arquivo; legibilidade tem prioridade sobre a meta.
- Declarar dimensões reais do WebP, `loading="lazy"` e `decoding="async"`.
- Referenciar somente os nomes semânticos no HTML.
- Não commitar os PNGs `Gemini_Generated_*`.
- Não alterar Open Graph, title, description ou sitemap por causa dessas imagens.

## Classificação do worktree

### Incluir no release

- `case.css`
- `cases/case-portal-b2b-c6-bank.html`
- `en/cases/case-portal-b2b-c6-bank.html`
- `es/cases/case-portal-b2b-c6-bank.html`
- `cases/case-priorizacao-visitas-comerciais-mercado-pago.html` — somente skip link/estrutura necessária; preservar métricas reais
- `en/cases/case-priorizacao-visitas-comerciais-mercado-pago.html` — skip link
- `es/cases/case-priorizacao-visitas-comerciais-mercado-pago.html` — skip link
- `cases/case-landing-pages-checkout-mercado-pago.html` — skip link e compatibilidade da escala, sem mudança editorial
- `assets/img/portal-stone-resumo-financeiro-2020.webp`
- `assets/img/portal-pagseguro-visao-financeira-2020.webp`
- `docs/COPY.md` — atualizar bloco 02 e paridade final
- `docs/DECISIONS.md` — registrar decisão consolidada, substituindo o status “experimental”
- `docs/DESIGN-SYSTEM.md` — registrar tokens, breakpoint e classe permanente

### Excluir e deixar intocado

- `planilha-mei-limite/index.html`
- `.claude/agents/lofi-prototyper.md`
- `.claude/agents/sandbox-curator.md`
- `CLAUDE.md`
- `docs/BACKLOG.md`
- `assets/img/renan-avatar-original.png.bak`
- `assets/img/1. Criar um agendamento.png`
- `assets/img/2. Registrar atendimento.png`
- `cases/RETOMADA-c6-pay-wordings.md`
- `docs/HANDOFF-REVISAO-PRE-DEPLOY.md`
- `docs/PLANO-REFERENCIAS-STONE-PAGSEGURO-C6.md`
- este plano, depois que suas decisões forem consolidadas nos três documentos permanentes

Os PNGs `1. Criar...` e `2. Registrar...` são fontes de alta resolução, enquanto o site já usa versões otimizadas `fluxo-*.jpg/.webp`; não há referência a eles no HTML.

### Remover durante Terra

Autorizado pelo usuário:

- `assets/linkedin-banner.html`
- `assets/img/linkedin-banner.png`

Como ambos estão não rastreados, a remoção limpa o worktree, mas não gera diff ou commit.

### Corrigir/excluir como regressão acidental

O worktree PT de Priorização mudou:

```text
+15% produtividade diária · −5% churn
```

para bullets sem sinal (`· 15%`, `· 5%`). Essa alteração perde o sentido positivo/negativo das métricas e contradiz `docs/COPY.md`. Não deve entrar no release; preservar `+15%` e `−5%`.

## Tarefas para Terra

### T1 — Preparar branch e escopo

1. Confirmar `git status -sb` e criar `agent/case-system-refresh` a partir do `main` local.
2. Não tocar na Planilha MEI nem nos arquivos classificados como excluídos.
3. Remover somente os dois arquivos de banner autorizados.
4. Corrigir a regressão das métricas de Priorização antes de qualquer staging desse arquivo.

Aceite: branch de trabalho criada, nenhum arquivo fora do escopo staged e worktree misto preservado.

### T2 — Promover o design system

1. Criar tokens semânticos da escala e mover as regras tipográficas para seletores globais de case.
2. Remover duplicação tipográfica do escopo experimental do C6.
3. Implementar breakpoint de três cards em `<=900px`, preservando grids de duas colunas e a validação 2×2 do C6.
4. Renomear `.case-c6-refresh` para `.case-c6`.
5. Completar skip links nas páginas longas públicas.
6. Atualizar `docs/DESIGN-SYSTEM.md`.

Aceite: nenhuma página depende de `.case-c6-refresh`; a escala computada é uniforme e grids não ficam com cards estreitos no tablet.

### T3 — Fechar o C6 PT e os assets

1. Converter/renomear Stone e PagSeguro e atualizar as referências.
2. Preservar seção 02 apenas com texto/cards e a imagem marcada `hidden`.
3. Conferir alt, captions, dimensões, lazy loading e ordem DOM.
4. Atualizar `docs/COPY.md` com o bloco 02 realmente aprovado.

Aceite: zero `Gemini_Generated` no HTML, imagens alinhadas, sem label removido e sem asset acima do limite sem justificativa.

### T4 — Sincronizar EN/ES

1. Replicar estrutura e componentes do PT.
2. Traduzir copy/alt/captions sem inventar fatos.
3. Garantir contagens estruturais idênticas e navegação de idioma correta.

Aceite: PT/EN/ES com 8 seções, 7 splits e 12 cards; nenhum locale mantém a antiga seção “Collaboration/Colaboración” ou “Ideation and logic/Ideación y lógica”.

### T5 — QA sistêmico

Matriz visual obrigatória:

- C6 PT, Priorização PT e Landing Pages PT: 1440, 1024, 900, 768 e 390 px.
- C6 EN/ES e Priorização EN/ES: 1440 e 390 px.
- Dashboard e 404: smoke test em 1440 e 390 px.

Em cada viewport conferir:

- zero overflow horizontal;
- hierarquia H1/H2/corpo/cards;
- títulos sem sobreposição ou cortes;
- grids e ordem DOM;
- imagens sem distorção;
- skip link via teclado;
- topbar, idioma, próximo case e footer;
- `prefers-reduced-motion` sem conteúdo invisível.

Checks mínimos:

```sh
git diff --check
rg -n "case-c6-refresh|Gemini_Generated|linkedin-banner" case.css cases en es assets docs
rg -n "15% produtividade diária|5% churn" cases/case-priorizacao-visitas-comerciais-mercado-pago.html
```

Também rodar uma checagem de referências locais e uma auditoria DOM automatizada em 1440/1024/900/769/768/390 para todos os consumidores de `case.css`.

### T6 — Commits e publicação

Fazer staging por arquivo/hunk explícito e criar commits coerentes:

1. `feat(case-system): promote typography and responsive case patterns`
2. `feat(c6-pay): restructure case and add 2020 portal references`
3. `docs(portfolio): consolidate case design and copy decisions`

Depois:

1. Revisar `git diff --cached` antes de cada commit.
2. Push de `agent/case-system-refresh`.
3. Abrir PR draft para `main` com resumo, matriz de QA e lista explícita de arquivos excluídos.
4. Abrir o preview local final para aprovação do usuário.
5. Após aprovação, usar squash merge para que produção receba um único commit coerente.
6. Monitorar o deploy do GitHub Pages e validar home + C6 + Priorização nas URLs públicas.

## Critério final de aceite

O release só está pronto quando:

- a escala 36/18/20/16 é sistema, não exceção do PT;
- PT/EN/ES do C6 têm estrutura equivalente;
- o tablet não comprime grids de três cards;
- Planilha MEI e arquivos locais continuam fora do diff;
- as métricas de Priorização mantêm `+15%` e `−5%`;
- os assets novos têm nomes semânticos, peso adequado e dimensões explícitas;
- não há overflow em nenhum consumidor de `case.css`;
- o PR mostra somente mudanças intencionais e o deploy público passa no smoke test.
