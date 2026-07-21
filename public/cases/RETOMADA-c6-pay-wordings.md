# Retomada — novos wordings case C6 Pay

## Status
Wordings novos das 7 seções (b01–b07) + ajustes de métrica **já aplicados em PT**:
- `cases/case-portal-b2b-c6-bank.html`
- `index.html` (métrica −50% → −28% no card do case)

**Ainda não validado visualmente pelo Renan** (ele ia conferir no Chrome, que foi aberto via `open -a "Google Chrome"` porque a extensão claude-in-chrome bloqueia `file://`).

**Ainda não replicado para EN/ES** — protocolo do projeto (`CLAUDE.md`) exige paridade de idiomas antes de considerar a tarefa concluída. Falta:
- `en/cases/case-portal-b2b-c6-bank.html`
- `es/cases/case-portal-b2b-c6-bank.html`
- Conferir se `en/index.html` e `es/index.html` também têm a métrica de tempo em tela para corrigir lá.

## O que mudou (referência caso precise conferir)

### Hero (`case-portal-b2b-c6-bank.html`)
Linha "Impacto" agora tem dois valores juntos: `−36% em chamados de suporte · −28% tempo em tela` (antes só tinha o −36%).

### Seção 01 (O contexto)
- H2 novo: "Uma plataforma que precisava acompanhar um novo momento do produto"
- Corpo novo (parágrafo único, mais longo)
- Lista "Experiência do usuário" e "Impacto no negócio" reescritas (2 rodadas de correção do Renan, versão final aplicada)

### Seção 02 (Colaboração)
- H2 novo: "Entendendo o problema antes de desenhar"
- Corpo trocou de 1 parágrafo curto para 4 parágrafos

### Seção 03 (Ideação e lógica)
- H2 mantido: "Transformando dados em uma visão financeira clara"
- Corpo reescrito 2x (versão final é a que fala em "grade semanal fixa" e "lógica inversa")
- 3 cards renomeados: "Uma visão consolidada da operação", "A informação passou a seguir a rotina do lojista", "Menos interpretação, mais tomada de decisão"

### Seção 04 (Visão financeira)
- H2 novo: "Uma única visão para responder a principal dúvida do lojista"
- Corpo virou 3 parágrafos (era 2)

### Seção 05 (Fechamento de caixa)
- H2 novo: "Tornando divergências mais fáceis de investigar"
- Corpo virou 3 parágrafos (era 2)

### Seção 06 (Fundamentação)
- H2 novo: "Validando decisões ao longo do projeto"
- Corpo reescrito
- **Card novo adicionado**: "Design Critiques" (agora são 5 cards no total, grid continua `idea-grid-2` = 2 colunas, último card sobra sozinho na linha — Renan nunca respondeu se queria 3 colunas, ficou a decisão default)
- Card "Análise de outros players" renomeado para "Benchmark"
- Demais cards (CX, Engenharia, Testes com usuários) com texto reescrito

### Seção 07 (Impacto)
- H2 novo: "Mais autonomia para os lojistas e menos demanda para o suporte"
- Corpo virou 4 parágrafos com números concretos: chamados de suporte −36%, tempo em tela −28% (antes era texto vago "quase pela metade")

## Próximos passos
1. Renan valida visualmente em PT no Chrome.
2. Se aprovado, replicar wordings para EN e ES (pode usar o agente `i18n-sync` conforme `CLAUDE.md` do projeto).
3. Conferir/corrigir métrica de tempo em tela em `en/index.html` e `es/index.html` se existir lá também.
4. Deploy (push para `main`) só quando pedido explicitamente — não fazer sozinho.

## Prompt pronto para colar na próxima conversa

```
Continuando o case C6 Pay do portfolio. Já apliquei todos os wordings novos das 7 seções em PT
(cases/case-portal-b2b-c6-bank.html e index.html) — detalhes em
cases/RETOMADA-c6-pay-wordings.md. Preciso: 1) confirmar se validei visualmente, 2) replicar
para EN/ES respeitando paridade de idiomas do CLAUDE.md do projeto, 3) decidir se o grid da
seção 06 (5 cards) fica em 2 ou 3 colunas.
```
