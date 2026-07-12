# CLAUDE.md

Portfólio de produto de Renan Marçal. Público-alvo: líderes de design/produto em processos de contratação e consultoria — craft impecável importa tanto quanto o conteúdo.

## Mapa do projeto

- Site estático puro (HTML + CSS + JS inline), sem build step. Deploy = commit direto na `main` do GitHub Pages (`renanmarcal.github.io/renan-ux-portfolio`).
- 3 idiomas, PT é a fonte da verdade: `index.html` (PT), `en/index.html`, `es/index.html` — cada um com seu próprio `<style>` embutido (hoje duplicado, ver `docs/BACKLOG.md`).
- `case.css` é compartilhado por **todos** os cases nas 3 línguas — editar uma vez, vale para PT/EN/ES.
- `cases/*.html`, `en/cases/*.html`, `es/cases/*.html` — mesma estrutura, 1 arquivo por case por idioma.
- `README.md` contém o linter editorial do projeto (sentence case, veto a dois-pontos/travessões em conteúdo). Sempre respeitar.

## Antes de qualquer trabalho de design/copy

Ler, nesta ordem: `docs/DESIGN-SYSTEM.md` (tokens e componentes já decididos), `docs/COPY.md` (copies canônicos por idioma), `docs/DECISIONS.md` (porquês, para não relitigar). Não redescobrir por releitura de CSS o que já está documentado ali.

Para qualquer trabalho de rastreamento/analytics (GA4, Contentsquare, novo evento de clique): ler `docs/ANALYTICS.md` primeiro — tem o padrão de `data-gtag-event` já em uso e a lista de eventos existentes, pra não inventar um mecanismo novo nem duplicar um evento com nome diferente.

## Protocolo operacional (aprendido por correção direta do Renan)

- **Nunca abrir Chrome/browser tools para validar edições locais.** Editar e parar — ele recarrega o navegador por conta própria. Exceção: só se ele pedir explicitamente uma checagem visual.
- **Feedback pontual vai direto para o código.** Não precisa plano nem pergunta prévia para ajustes pequenos e claros (copy, espaçamento, cor, cópia de CTA). Aplicar e resumir o que mudou.
- Quando um pedido não é verificável sem inspeção visual (ex. "essa seção tem que ter a mesma altura que aquela"), resolver com uma técnica CSS determinística (ex. `min-height` compartilhado, `width:100%` explícito em vez de confiar em auto-margin/stretch) e explicar a lógica — não adivinhar.
- **Mudanças de design/estrutura (não pontuais) passam por plano** e só avançam após "pode executar" explícito, mesmo que o plano já tenha sido aprovado antes — não presumir autorização automática de uma fase para a próxima.
- **Paridade de idiomas**: qualquer mudança de conteúdo ou design aprovada em PT deve ser replicada em EN e ES antes de considerar a tarefa concluída — a menos que o Renan diga explicitamente "só PT por enquanto".
- **Deploy (push para `main`) só acontece quando pedido explicitamente.** Commitar apenas os arquivos relacionados ao trabalho da sessão — nunca `git add -A` (o repo tem arquivos soltos de outros projetos, ex. `assets/linkedin-banner.html`).

## Como economizar token nesta base

- Antes de reescrever um arquivo inteiro (`Write`), preferir `Edit` cirúrgico — os arquivos de idioma são grandes só porque o CSS está duplicado, não porque o conteúdo mudou muito.
- Para "ideias novas que precisam de validação em baixa fidelidade" antes de qualquer código de produção: usar o agente `lofi-prototyper` (protótipo isolado no scratchpad, nunca no site, some no fim da sessão).
- Para uma ideia (fonte, átomo, molécula, organismo) que precisa amadurecer por mais de uma sessão antes de virar código de produção: usar o agente `sandbox-curator`, que trabalha em `~/Documents/01_Projetos/portfolio-sandbox/` (fora deste repo) com um ledger de maturidade (draft → testing → validated → promoted/discarded). Só lê `docs/DESIGN-SYSTEM.md` inteiro no momento da promoção — nunca antes.
- Para propagar uma mudança já aprovada em PT para EN/ES: usar o agente `i18n-sync` em vez de reabrir os 3 arquivos manualmente.
- Para revisar copy contra `docs/COPY.md` e o linter do README: usar o agente `copy-editor`.
- Para auditar um diff contra `docs/DESIGN-SYSTEM.md` sem reescrever nada: usar o agente `design-guardian`.
