# Guia de Governança Estrutural e Engenharia Narrativa

Este repositório foi projetado para funcionar além de uma galeria visual estática. Ele opera como um sistema vivo de documentação de produto, onde cada estudo de caso segue uma estratégia unificada de posicionamento de mercado, ancorada em decisões de negócio, viabilidade técnica e ritmo de leitura sênior.

## 1. A Mentalidade de Produto (O Workflow de Tese)

Para afastar os estudos de caso do modelo comum de manuais didáticos de UX, toda narrativa deve ser construída sobre o princípio da relevância de negócio. Quem avalia o portfólio precisa enxergar um designer que opera na linha de frente do produto.

### O princípio da não-obviedade
* **Remova as definições de ferramentas ·** É proibido explicar o que é ou para que serve uma persona, um mapa de jornada ou um protótipo de alta fidelidade. O texto deve focar exclusivamente no insight derivado da ferramenta que alterou o rumo do projeto.
* **Explicite o conflito técnico ·** Um bom caso se sustenta na resolução de tensões reais. Documente o receio da engenharia, as limitações das APIs antigas de backoffice e como o design encontrou saídas viáveis para entregar valor sem estourar o escopo de desenvolvimento.
* **Conecte o layout ao impacto ·** Divida as soluções de interface em forças claras de atuação. Mostre como as mudanças de tela geram eficiência operacional na ponta (redução de chamados de suporte) ou criam janelas de oportunidade para geração de receita institucional (ofertas de crédito contextuais).

## 2. A Engenharia do Ritmo Editorial

A estrutura de leitura deve ser dinâmica e assimétrica para sustentar a atenção de líderes de design e recrutadores em análises rápidas de portfólio.

### Estrutura e alternância de densidade
* **Seções conceituais (Abstração e negociação) ·** Devem ser puramente textuais, focadas na estratégia e quebradas em subtópicos curtos para facilitar a leitura em blocos. Elas preparam o terreno e geram a expectativa necessária para a revelação do design.
* **Seções estruturais (Lógica visual) ·** Utilizam componentes de listagem horizontal macro ou cartões focados em modelos mentais, permitindo o escaneamento rápido e batida de olho instantânea dos principais pilares do novo portal.
* **Seções de tela (Soluções de interface) ·** As imagens de alta fidelidade devem ser intercaladas diretamente entre os parágrafos explicativos. O texto superior introduz a decisão de design e o texto inferior valida o impacto gerado, usando o componente visual como prova real do argumento técnico.

## 3. Diretrizes de Fechamento e Impacto

O encerramento de um estudo de caso deve fechar o ciclo aberto na introdução, demonstrando maturidade sistêmica através de duas validações complementares.
* **A validação técnica ·** Como o comportamento e a resposta positiva do usuário final serviram de argumento para desarmar resistências da engenharia e acelerar a codificação da plataforma.
* **O legado de governança ·** Como o projeto se conectou aos ecossistemas maiores da empresa (como os times centrais de design system), gerando componentes reutilizáveis e eficiência para os desenvolvimentos futuros.

---

### Apêndice · Critérios de Validação em Produção (Linter Visual)

Antes de enviar qualquer alteração ou novo caso para o ambiente de produção, o arquivo HTML deve cumprir estritamente as seguintes restrições de código e estilo.

* **Sintaxe e Pontuação ·** Veto absoluto ao caractere de dois pontos e travessões em tags, conteúdos, metadados ou comentários. Toda a dinâmica de pausa deve ser construída com pontos, vírgulas e parênteses.
* **Capitalização ·** Uso rigoroso do padrão sentence case. Letras maiúsculas apenas em início de frases e nomes próprios (marcas ou siglas). Títulos de subseções, conceitos e termos técnicos permanecem em minúscula.
* **Simetria de Mídias ·** Imagens intercaladas devem possuir margens verticais superiores e inferiores idênticas no CSS para garantir o respiro e impedir que os parágrafos de fechamento fiquem colados ao elemento visual.
* **Responsividade Híbrida ·** O grid assimétrico de duas colunas deve converter para coluna única no mobile, mantendo o scroll horizontal restrito aos componentes autorizados de galeria de cards.

### Critérios de aceitação para o Claude Code
- [ ] O arquivo README.md deve ser totalmente sobrescrito com a nova estrutura de governança.
- [ ] Garanta que nenhuma quebra de Markdown inválida seja introduzida.
- [ ] Realize uma varredura rigorosa para assegurar a ausência total do caractere de dois pontos e de travessões em todo o documento gerado.
