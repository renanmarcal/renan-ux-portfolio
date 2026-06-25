# Portfólio Renan Marçal

Site estático de portfólio de product design, escrito em HTML e CSS puro, sem etapa de build, publicado via GitHub Pages em https://renanmarcal.github.io/renan-ux-portfolio.

Este documento é a especificação técnica e o manual de governança do projeto. Quem for manter ou estender o repositório deve ler as seções de arquitetura e, principalmente, as linhas vermelhas de design de informação antes de escrever qualquer conteúdo.

## Tese e estratégia

O portfólio existe para sustentar uma narrativa de senioridade. Cada case é construído ao redor de decisões de produto, engenharia e negócio, não de uma descrição cronológica de tarefas. A escrita evita o tom didático de manual de UX (sem definições de dicionário para personas ou jornadas) e privilegia restrições reais, trade-offs técnicos e impacto.

A leitura precisa ser escaneável. Títulos curtos, blocos de texto com largura controlada, subtítulos que entregam o ponto antes do parágrafo. O ritmo visual é editorial, inspirado em produtos de engenharia como Stripe, Vercel e Linear.

## Stack e estrutura

Sem framework, sem dependências, sem bundler. Só arquivos servidos diretamente.

```
/
├── index.html          ← home, com CSS próprio embutido no <style>
├── case.css            ← folha de estilo compartilhada pelas páginas de case
├── 404.html            ← página de erro, com CSS próprio
├── favicon.svg         ← favicon e imagem social provisória
├── README.md           ← este documento
├── assets/
│   └── img/            ← logos (svg) e capturas de tela dos cases
└── cases/
    ├── case-priorizacao-visitas-comerciais-mercado-pago.html
    ├── case-landing-pages-checkout-mercado-pago.html
    ├── case-portal-b2b-c6-bank.html
    └── case-dashboard-carteira-mercado-pago.html
```

As fontes (Instrument Sans no corpo, Geist Mono em metadados, Bricolage Grotesque nos títulos) carregam por `<link>` com `preconnect` no `<head>` de cada página, nunca por `@import`.

## Status dos cases

| Case | Empresa, período | Estado | Na home |
|---|---|---|---|
| Priorização de visitas comerciais | Mercado Pago, 2024–2025 | completo | sim |
| Landing pages de adquirência | Mercado Pago, 2021–2022 | completo | sim |
| Portal de gestão C6 Pay | PayGo e C6 Bank, 2020–2021 | completo | sim |
| Dashboard de carteira | Mercado Pago, 2023–2024 | esqueleto (só o hero) | não |

## Arquitetura de componentes críticos

### Grid assimétrico da home

A listagem de cases (`.case-grid`) quebra a simetria linear a partir de 900px de largura. O primeiro card assume destaque macro, ocupando a largura inteira da seção com um split interno equilibrado de duas colunas. O segundo e o terceiro card ficam lado a lado, cada um em uma coluna. Abaixo de 720px tudo colapsa para coluna única, com a imagem (`.case-thumb`) sangrando de ponta a ponta no topo do card em proporção 16 por 10.

O miolo de texto de cada card (`.case-info`) é um grid de coluna única com três linhas explícitas (`auto 1fr auto`). O título ocupa a primeira linha, a descrição absorve o espaço elástico na linha do meio (`1fr`) e o bloco de tags trava na base. Assim as tags de cards vizinhos ficam alinhadas na mesma altura, independente do tamanho do texto.

### Grade da seção 03 nos cases

A seção de ideação (`.idea-grid`) apresenta três cartões de raciocínio. A construção preenche a largura com três colunas iguais (`repeat(3, 1fr)`) quando há espaço, evitando os buracos vazios que uma largura fixa deixaria. Quando o espaço lateral diminui (abaixo de 768px) os cartões empilham direto para uma coluna única, pulando o estágio de duas colunas de propósito, já que com três cartões o layout de duas colunas deixaria uma célula órfã vazia.

Nota importante. Esta grade substituiu uma galeria anterior de scroll horizontal com snapping. A versão atual não tem transbordo horizontal. Nenhuma parte do site rola na horizontal, o que mantém a rolagem vertical limpa em qualquer viewport.

### Casca compartilhada dos cases

Todo case usa a mesma estrutura externa, uma `.topbar` fixa com barra de progresso, um `.hero` de duas colunas e uma sequência de blocos `.block` contendo `.wrap` e `.block-grid`. O `.block-grid` é coluna única e o indicador de seção aparece como um eyebrow acima do título h2, no formato número, conector e label, em Geist Mono na cor de destaque. O hero reúne os metadados em micro-cards de fundo sutil (`.spec`), num grid de duas colunas que fecha em dois por dois quando os campos são curtos.

### Animação de entrada

Cada elemento marcado com `data-reveal="up"` ou `data-reveal="fade"` entra em cena por um IntersectionObserver que adiciona a classe `.in`. O atraso vem de `data-d="1"`, `data-d="2"` ou `data-d="3"`. A classe `.in` é aplicada só por JavaScript, então não aparece no HTML estático e não deve ser tratada como órfã numa auditoria. Há respeito a `prefers-reduced-motion`, que desliga as transições.

## Linhas vermelhas de design de informação

Estas regras são rígidas e prevalecem sobre preferência pessoal. Conteúdo novo que as viole deve ser corrigido antes de publicar.

1. Proibido o caractere de dois pontos e o travessão (o traço longo) em qualquer texto, título, tag, classe, comentário ou metadado. A pontuação permitida é ponto final, vírgula e parênteses. Hífens e o traço de intervalo de datas seguem válidos.
2. Capitalização em sentence case. Maiúscula só no início da frase e em nomes próprios, marcas e siglas. Subtítulos, conceitos técnicos e labels ficam em minúscula.
3. Narrativa em primeira pessoa, mantendo o singular nas seções de execução individual e o plural apenas onde o trabalho foi de fato coletivo.
4. Sem métricas inventadas. Quando não há número validado, descreve-se o impacto de forma qualitativa.
5. Grafia padronizada de marcas. Escreva sempre C6 Bank, C6 Pay, PayGo, Stone, Stripe e Mercado Pago exatamente assim, com a mesma caixa, em todas as páginas.

## Como adicionar um novo case

1. Duplique um case completo como ponto de partida. Use o de visitas comerciais para um case mais textual (cartões `.tldr`, `.ba` e `.keypoint`) ou o do C6 para um case com telas e imagens intercaladas (`.img-slot`, `.slot-pair`, `.case-figure` e `.idea-grid`).
2. Mantenha a casca intacta. Ajuste só o conteúdo dos blocos.
3. Numere os blocos com `id="bNN"`, `data-stage="NN"` e `data-name="..."` em sequência.
4. Toda imagem de conteúdo precisa de `width`, `height` e `loading="lazy"` para reservar espaço e evitar salto de layout durante o carregamento.
5. Adicione o card correspondente na home e a miniatura em `assets/img`.
6. Releia as linhas vermelhas e passe o olho no texto procurando dois pontos, travessões e capitalização indevida.

## Roadmap

- Finalizar o case de dashboard de carteira, hoje só com o hero. Faltam os blocos de conteúdo e a entrada na home.
- Produzir uma capa social real e substituir a imagem social provisória (a propriedade og image), que ainda aponta para o favicon nas páginas sem captura dedicada.
- Avaliar miniaturas definitivas para os cards da home, hoje em capturas de tela provisórias.
- Revisar o case de dashboard para alinhar a grafia de marcas com o padrão das demais páginas.

## Publicação

1. Faça push para a branch `main`.
2. Em Settings, na seção Pages, defina a origem como `main` e a pasta raiz.
3. O site fica disponível em https://renanmarcal.github.io/renan-ux-portfolio.
