# Analytics

Como o rastreamento de dados do portfólio funciona — o que está instalado, o que é rastreado, e como adicionar um evento novo sem redescobrir o padrão.

## O que está instalado (todas as 10 páginas do portfólio: 3 home + 2 cases × 3 línguas + `404.html`; também replicado em `planilha-mei-limite/index.html`, que é uma landing page de produto fora do portfólio, só PT)

- **Google Analytics 4** (`G-M66N19ZT36`, via `gtag.js`) — pageviews automáticos + eventos customizados (ver abaixo).
- **Microsoft Clarity** (`xl7ajvipib`, via `clarity.ms/tag`) — gravador de sessão/heatmap, captura cliques/scroll/rage-clicks automaticamente sem instrumentação, mais visão própria do tráfego vindo do Bing (Webmaster Tools/Bing Ads).
- ~~**Contentsquare**~~ — removido em 2026-07-15 (auditoria de Core Web Vitals): baixava 583 KB e ~2s no `<head>`, era o maior contribuinte pro LCP/TBT ruins no mobile (score 83, LCP 3.7s). Era redundante em propósito com o Clarity (os dois cobrem sessão/heatmap); a única cobertura exclusiva do Contentsquare não compensava o custo de performance.

Os dois scripts ficam no `<head>`, logo depois do favicon e antes do CSS, replicados nas 10 páginas (sem exceção — não há injeção via JS externo nem tag manager). **`404.html` também está incluído** — é o caso mais valioso de "não perder detalhe": link quebrado, URL digitada errada, backlink desatualizado, tudo isso vira pageview + evento igual a qualquer outra página.

## Eventos customizados do GA4

GA4 sozinho só rastreia pageview — para saber qual botão/área específica foi clicada (não só que a página foi vista), cada elemento relevante tem `data-gtag-*` attributes e um único listener delegado no JS captura o clique e chama `gtag('event', ...)`.

### O padrão (`data-gtag-event` + `data-gtag-*`)

Qualquer elemento clicável que precise virar evento no GA4 recebe:
```html
<a ... data-gtag-event="nome_do_evento" data-gtag-algum-parametro="valor">
```
Um listener delegado (no bloco `<script>` do fim de cada página, dentro da mesma IIFE que já cuida do `IntersectionObserver`) escuta clique em qualquer `[data-gtag-event]`, converte automaticamente todo `data-gtag-*` (exceto o próprio `data-gtag-event`) num parâmetro do evento, e adiciona `page_lang` (lido de `document.documentElement.lang`) em todo evento — assim dá pra comparar PT/EN/ES no GA4 sem precisar olhar a URL.

```js
document.addEventListener('click', e => {
  const el = e.target.closest('[data-gtag-event]');
  if (!el || typeof gtag !== 'function') return;
  const params = { page_lang: document.documentElement.lang };
  for (const attr of el.attributes) {
    if (attr.name.startsWith('data-gtag-') && attr.name !== 'data-gtag-event') {
      params[attr.name.slice('data-gtag-'.length).replace(/-/g, '_')] = attr.value;
    }
  }
  gtag('event', el.dataset.gtagEvent, params);
});
```

**Para adicionar um evento novo em qualquer elemento futuro**: só adicionar os `data-gtag-*` attributes no HTML — o JS já existente captura automaticamente, não precisa tocar no script. Só editar o script se o *mecanismo* de captura mudar (ex. trocar de delegação por listeners individuais), não para adicionar um evento novo.

### Eventos em uso hoje

| Evento | Onde | Parâmetros | Valores possíveis |
|---|---|---|---|
| `whatsapp_click` | CTA primário (hero, footer, footer do case) | `location` | `hero`, `footer`, `case_footer` |
| `linkedin_click` | CTA secundário do hero + link no ticker de fechamento (footer da home e do case) | `location` | `hero`, `footer`, `case_footer` |
| `case_card_click` | Cards de case na home | `case` | `portal-c6-bank`, `priorizacao-visitas` |
| `topbar_nav_click` | Menu-âncora do topbar (home) | `target` | `about`, `cases`, `contact` |
| `lang_switch_click` | Seletor de idioma (PT · EN · ES), na home e dentro de cada case | `target_lang` | `pt`, `en`, `es` |
| `logo_home_click` | Link "← Renan Marçal" que volta pra home, no topo de cada case e do 404 | `location` | `case`, `404` |
| `next_case_click` | Link "próximo case" (dentro de um case) | `case` | slug do case de destino |
| `404_return_click` | Link "voltar pro portfólio" na página 404 | — | — |
| `checkout_click` | CTA de compra na landing page `planilha-mei-limite/` (hero + pós-demo + bloco de preço + barra fixa) | `location` | `hero`, `demo`, `preco`, `sticky_bar` |

## Pendência conhecida

`cases/case-landing-pages-checkout-mercado-pago.html` não tem nenhum analytics instalado (sem GA4, sem Clarity, sem eventos) e só existe em PT. O card que leva a ele na home está comentado (`<!-- case landing pages: temporariamente oculto -->`, index.html ~610-623) — página inativa, por isso ficou fora da instrumentação de 2026-07-15. Se o card for reativado, replicar a infra completa (scripts do head + listener + `data-gtag-event` nos links + versões EN/ES) antes.

Todo parâmetro usa valores **em inglês, consistentes entre as 3 línguas** (ex. `target="about"` mesmo na versão PT, onde o link mostra "Sobre") — de propósito, para o relatório do GA4 agregar PT/EN/ES no mesmo valor em vez de fragmentar em "Sobre"/"About"/"Sobre mí" como 3 linhas separadas.

## O que NÃO fazer

- Não duplicar a lógica do listener em cada página com pequenas variações — é o mesmo bloco de JS nas 10 páginas, byte a byte (checar com diff antes de considerar uma mudança concluída, mesmo padrão usado pro CSS embutido). Nas 9 páginas do site, o listener vive dentro da IIFE que já cuida do `IntersectionObserver`; em `404.html` (que não tem reveal animation) ele vive na sua própria IIFE — o corpo do listener em si é idêntico.
- Não inventar um novo nome de evento para a mesma ação em lugares diferentes (ex. não criar `whatsapp_hero_click` separado de `whatsapp_click` com `location=hero`) — usar o parâmetro pra diferenciar, não o nome do evento, senão o GA4 fragmenta o relatório.
- Não usar `onclick` inline nos elementos — o padrão é `data-gtag-*` + o listener delegado, que centraliza a lógica de captura num único lugar por página.
- Não esquecer de propagar um evento novo pras 3 línguas — mesma regra de paridade do resto do site.
