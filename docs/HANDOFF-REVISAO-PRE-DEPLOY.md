# Handoff — revisão sistêmica antes do deploy

## Estado atual

- Repositório: `renanmarcal/renan-ux-portfolio`
- Branch atual: `main`
- `main` está 1 commit à frente de `origin/main`:
  - `c6bc2bb fix(c6-pay): coloca imagens do legado lado a lado na seção 01`
- GitHub CLI 2.94.0 instalado em `~/.local/bin/gh`.
- Autenticação concluída como `renanmarcal`.
- Nenhum novo commit ou push foi feito nesta sessão.

## Objetivo da próxima sessão (Sol)

Revisar o conjunto acumulado de mudanças antes de produção, separar alterações locais de alterações sistêmicas, medir o impacto do novo design system em todas as páginas e produzir um plano de rollout seguro para desktop e mobile.

## Restrições confirmadas

- `planilha-mei-limite/` é um projeto separado que compartilha a URL e deve ficar fora deste deploy.
- O banner do LinkedIn pode ser removido, mas a remoção deve acontecer apenas na futura execução, depois do escopo fechado:
  - `assets/linkedin-banner.html`
  - `assets/img/linkedin-banner.png`
- Não incluir automaticamente arquivos `.claude/`, backup `.bak` ou documentos temporários sem classificá-los durante a revisão.
- Não usar `git add -A` enquanto o worktree continuar misto.
- Não fazer push direto antes da revisão completa.

## Mudanças que exigem auditoria

### Case C6 Pay

- Revisão estrutural, editorial e tipográfica isolada por `.case-c6-refresh`.
- Seção 02 reestruturada como descoberta; imagem preservada no HTML com `hidden`.
- Seção 03 recebeu as referências visuais Stone e PagSeguro.
- Novos PNGs ainda usam nomes genéricos `Gemini_Generated_*`; precisam de decisão de proveniência, nomes semânticos e otimização antes do deploy.

### Design system compartilhado

- `case.css` contém alterações compartilhadas por várias páginas e overrides locais do C6.
- A escala tipográfica maior precisa ser avaliada como sistema antes de ser promovida para outros cases.
- Revisar se as decisões novas pertencem ao C6 apenas ou devem virar tokens/regras globais.
- Verificar impacto de `.wrap`, `.block-body--split`, grids, cards, imagens, labels e breakpoints em todas as páginas que carregam `case.css`.

## Inventário inicial do worktree

Modificados:

- `.claude/agents/lofi-prototyper.md`
- `.claude/agents/sandbox-curator.md`
- `CLAUDE.md`
- `case.css`
- `cases/case-portal-b2b-c6-bank.html`
- `cases/case-priorizacao-visitas-comerciais-mercado-pago.html`
- `docs/BACKLOG.md`
- `docs/COPY.md`
- `docs/DECISIONS.md`
- `docs/DESIGN-SYSTEM.md`
- `planilha-mei-limite/index.html` — fora do deploy

Não rastreados:

- `assets/img/1. Criar um agendamento.png`
- `assets/img/2. Registrar atendimento.png`
- `assets/img/Gemini_Generated_Image_8goqvr8goqvr8goq.png`
- `assets/img/Gemini_Generated_Image_kkjworkkjworkkjw.png`
- `assets/img/linkedin-banner.png` — remover na execução
- `assets/img/renan-avatar-original.png.bak`
- `assets/linkedin-banner.html` — remover na execução
- `cases/RETOMADA-c6-pay-wordings.md`
- `docs/PLANO-REFERENCIAS-STONE-PAGSEGURO-C6.md`

## Perguntas que Sol deve fechar

1. Qual é o baseline real: `origin/main`, o commit local `c6bc2bb` ou o worktree completo?
2. Quais alterações são específicas do C6 e quais devem escalar para o design system?
3. Se a tipografia maior escalar, quais páginas, componentes e breakpoints precisam mudar juntos?
4. Quais arquivos auxiliares são documentação permanente, temporária ou configuração local?
5. O deploy deve ser dividido em commits/PRs verticais ou publicado como uma única mudança coordenada?
6. Quais páginas precisam de comparação visual desktop/mobile antes de aprovar o rollout?

## Saída esperada de Sol

- Matriz de impacto por página e breakpoint.
- Decisão explícita de escopo local versus global.
- Inventário de arquivos incluídos, excluídos e removidos.
- Sequência de commits pequenos e coerentes.
- Critérios de aceite visuais, editoriais, responsivos e técnicos.
- Comandos de validação e estratégia de push/PR/deploy.

## Comando para iniciar

```sh
cd "/Users/renanmarcal/Documents/01_Projects/01_Active Projects/renan-ux-portfolio"
codex -p sol
```

Na nova sessão, pedir para ler primeiro este arquivo e o `AGENTS.md` fornecido pelo usuário antes de investigar ou alterar código.
