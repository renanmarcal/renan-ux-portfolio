# Arquitetura do repositório

## Visão geral

O portfólio é um site estático feito com HTML, CSS e JavaScript. Não há etapa de build. O deploy é feito pelo GitHub Pages a partir da branch `main`.

O português é a fonte principal do conteúdo. As versões em inglês e espanhol ficam em diretórios próprios e espelham a estrutura das páginas em português.

## Estrutura de arquivos

| Caminho | Função |
| --- | --- |
| `index.html` | Página inicial em português. |
| `cases/` | Cases em português. |
| `en/` | Página inicial e cases em inglês. |
| `es/` | Página inicial e cases em espanhol. |
| `assets/` | Imagens, ícones e outros recursos estáticos. |
| `case.css` | Estilos compartilhados pelas páginas de case nos três idiomas. |
| `404.html` | Página de erro do site. |
| `CNAME` | Domínio personalizado usado pelo GitHub Pages. |
| `docs/` | Documentação interna do projeto. |
| `CLAUDE.md` | Instruções para agentes que trabalham neste repositório. |

## Documentação interna

| Arquivo | Função |
| --- | --- |
| `docs/ANALYTICS.md` | Implementação, eventos e manutenção de analytics. |
| `docs/ARCHITECTURE.md` | Estrutura técnica e organização factual do repositório. |
| `docs/BACKLOG.md` | Pendências conhecidas e itens futuros. |
| `docs/COPY.md` | Copies aprovados por idioma. |
| `docs/DECISIONS.md` | Histórico de decisões de design e produto. |
| `docs/DESIGN-SYSTEM.md` | Tokens, componentes e regras visuais vigentes. |
| `docs/EDITORIAL-GUIDELINES.md` | Diretrizes para narrativa, linguagem e publicação de conteúdo visível. |
| `docs/HANDOFF-REVISAO-PRE-DEPLOY.md` | Handoff de uma revisão anterior antes de deploy. |
| `docs/PLANO-REFERENCIAS-STONE-PAGSEGURO-C6.md` | Plano de referências para o case C6. |
| `docs/PLANO-RELEASE-PORTFOLIO-2026-07-19.md` | Plano de release registrado em 2026-07-19. |
