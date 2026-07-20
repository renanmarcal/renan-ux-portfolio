# Plano de implementação — referências Stone e PagSeguro no case C6 Pay

## Objetivo

Incorporar os dois registros visuais de portais financeiros de 2020 ao bloco 03 (“Ideação”) do case C6 Pay, reforçando a evidência de que lojistas usavam Stone e PagBank/PagSeguro como referências ao descrever o resumo financeiro esperado.

Esta tarefa é de evidência narrativa: as imagens não devem sugerir que o projeto copiou concorrentes nem transformar o trecho em um benchmark formal que o texto atual não sustenta.

## Escopo fechado

- Renomear e otimizar os dois PNGs novos.
- Inserir uma comparação visual no bloco 03 do case C6 Pay em português.
- Criar marcação semântica com `figure`, `img` e `figcaption`.
- Preservar proporção, legibilidade, carregamento e estabilidade de layout.
- Criar o CSS local necessário sob `.case-c6-refresh`, sem alterar outros cases.
- Validar desktop, tablet, mobile, teclado, leitor de tela e desempenho básico.
- Depois da aprovação visual em PT, replicar a mesma estrutura em EN e ES com textos traduzidos.

Fora de escopo: mudar metadados globais da página, imagem Open Graph, sitemap, narrativa de outras seções ou criar lightbox/carrossel.

## Assets e nomes finais

| Origem | Conteúdo identificado | Nome final WebP | Fallback |
|---|---|---|---|
| `Gemini_Generated_Image_8goqvr8goqvr8goq.png` | Resumo do portal Stone | `portal-stone-resumo-financeiro-2020.webp` | Não manter PNG no HTML; preservar o original apenas até validar a conversão |
| `Gemini_Generated_Image_kkjworkkjworkkjw.png` | Visão inicial do portal PagSeguro | `portal-pagseguro-visao-financeira-2020.webp` | Não manter PNG no HTML; preservar o original apenas até validar a conversão |

Decisão de nomenclatura: minúsculas, hífens, marca + conteúdo + ano. “PagSeguro” é usado no arquivo porque é a marca exibida na própria interface; a narrativa pode continuar usando “PagBank” se esse foi o termo lembrado pelos participantes.

## Tratamento visual proposto

Adicionar, depois de `.block-body--split` no bloco 03, um `div` de evidências ocupando a largura completa:

- Desktop (`>=1024px`): grid de duas colunas iguais, alinhado pelo topo.
- Tablet e mobile: uma coluna, Stone antes de PagSeguro, preservando a ordem do DOM.
- Cada item é um `figure` com a imagem inteira, sem crop, dentro de uma moldura neutra que reutiliza `--card`, `--line` e o raio já adotado por `.img-slot`.
- Não forçar uma altura igual: as imagens têm proporções diferentes (Stone 2758×1504; PagSeguro 2554×1632) e cortar menus ou dados diminuiria o valor documental.
- Legenda curta abaixo de cada imagem; nenhuma nova cor, sombra forte, logo separado, badge ou interação.
- Gap e margens apenas com tokens existentes. O conjunto mantém a regra texto → imagem de `var(--s-5)`.

Classe sugerida: `.reference-portal-grid` no agrupamento e `.reference-portal` nos `figure`, sempre limitada por `.case-c6-refresh` no CSS enquanto o redesign estiver restrito ao PT.

## Semântica, copy e acessibilidade

Estrutura sugerida:

```html
<div class="reference-portal-grid full-slot" aria-label="Portais citados como referência pelos lojistas">
  <figure class="reference-portal">
    <img ...>
    <figcaption><strong>Stone, 2020.</strong> Resumo com recebimentos do dia, valores futuros e atalhos operacionais.</figcaption>
  </figure>
  <figure class="reference-portal">
    <img ...>
    <figcaption><strong>PagSeguro, 2020.</strong> Visão inicial com saldo, próximas liberações e acessos rápidos.</figcaption>
  </figure>
</div>
```

Alt texts propostos:

- Stone: `Portal da Stone em 2020, com resumo de recebimentos, agenda da semana, simulador e últimas vendas.`
- PagSeguro: `Portal PagSeguro em 2020, com saldo, próximas liberações e atalhos para tarefas financeiras.`

O `alt` descreve o que aparece; o `figcaption` explica por que a imagem importa. Evitar repetir no alt toda a legenda ou usar “imagem de”. Se os arquivos forem recriações geradas a partir de prints, confirmar antes da publicação se a legenda precisa dizer “reconstituição visual” para não apresentá-los como capturas originais.

## SEO e desempenho

- Os nomes finais descrevem marca, assunto e período sem keyword stuffing.
- Usar WebP com qualidade visual suficiente para preservar textos pequenos; meta inicial: cada arquivo abaixo de 500 KB, ajustada se a leitura da interface exigir mais.
- Declarar `width` e `height` reais da versão exportada para evitar CLS.
- Usar `loading="lazy"` e `decoding="async"`, pois o bloco 03 está abaixo da dobra.
- Não adicionar as imagens a Open Graph, JSON-LD ou sitemap: elas são evidência secundária, e o hero atual continua representando melhor o case.
- Não alterar title/meta description apenas pela inclusão das imagens; o conteúdo principal e a intenção de busca da página permanecem os mesmos.

## Tarefas verticais para execução (Terra)

### T1 — Preparar os assets

1. Confirmar qual PNG corresponde a cada marca.
2. Converter para WebP nos nomes definidos, sem redimensionar na primeira exportação.
3. Comparar visualmente o original e o WebP, principalmente textos pequenos, logos e bordas.
4. Registrar tamanho final; só remover os PNGs genéricos depois de confirmar que não são referenciados em nenhum lugar.

Aceite: nomes semânticos, nenhuma referência aos nomes Gemini, texto da interface legível e peso dentro da meta ou exceção justificada.

### T2 — Inserir semântica e conteúdo no PT

1. Alterar apenas `cases/case-portal-b2b-c6-bank.html` no bloco 03.
2. Inserir o grid após o texto existente, mantendo Stone antes de PagSeguro.
3. Adicionar dimensões, lazy loading, async decoding, alt e legendas.

Aceite: as imagens reforçam diretamente o parágrafo existente, a ordem de leitura do DOM faz sentido e não há alegação nova de processo ou resultado.

### T3 — Compor o layout responsivo

1. Adicionar regras localizadas em `case.css` sob `.case-c6-refresh`.
2. Reutilizar tokens e átomos do design system.
3. Usar duas colunas apenas quando houver largura útil; empilhar abaixo de 1024px.
4. Verificar que imagens não são cortadas e não geram scroll horizontal.

Aceite: comparação clara em desktop, leitura confortável em mobile, sem nova cor/componente ornamental e sem regressão em outros cases.

### T4 — Validar e registrar

1. Fazer inspeção visual em 1440, 1024, 768, 430 e 320 px.
2. Conferir CLS, dimensões, lazy loading, alt/figcaption e ordem de leitura.
3. Rodar busca por nomes antigos e checagem de links/assets.
4. Registrar a decisão final em `docs/DECISIONS.md` e, se o padrão virar reutilizável, o componente em `docs/DESIGN-SYSTEM.md`.

Aceite: zero assets quebrados, zero overflow, nenhuma mudança visual fora do C6 PT e documentação atualizada.

### T5 — Paridade EN/ES após aprovação do PT

Replicar somente a estrutura aprovada nos dois arquivos traduzidos, com `aria-label`, alt e legendas localizados. Antes disso, revisar a divergência editorial: EN/ES ainda descrevem “competitor analysis” com Stone, Stripe e PagSeguro, enquanto o PT atual enquadra as marcas como referências citadas pelos lojistas.

Aceite: estrutura equivalente nos três idiomas e copy coerente com a evidência real do projeto.

## Arquivos relevantes

- `assets/img/Gemini_Generated_Image_8goqvr8goqvr8goq.png`
- `assets/img/Gemini_Generated_Image_kkjworkkjworkkjw.png`
- `cases/case-portal-b2b-c6-bank.html`
- `case.css`
- `en/cases/case-portal-b2b-c6-bank.html`
- `es/cases/case-portal-b2b-c6-bank.html`
- `docs/DECISIONS.md`
- `docs/DESIGN-SYSTEM.md`

## Verificação sugerida

```sh
rg -n "Gemini_Generated|portal-stone-resumo-financeiro-2020|portal-pagseguro-visao-financeira-2020" assets cases en es
```

Além do comando, a tarefa exige revisão visual responsiva; a validação não deve ser considerada completa apenas por busca textual.

## Dúvida que precisa ser fechada antes da publicação

Os nomes indicam que os arquivos passaram pelo Gemini. Confirmar se são capturas originais, restaurações/upscales de capturas ou recriações geradas. Se forem recriações, a interface deve ser apresentada como “reconstituição visual baseada no portal de 2020”, não como print documental original.
