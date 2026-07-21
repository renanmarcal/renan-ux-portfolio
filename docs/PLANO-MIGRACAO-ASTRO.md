# Plano de migração para Astro

**Status:** T6 concluída em 2026-07-21; próxima tarefa: T7 (autorização explícita necessária)
**Data:** 2026-07-21
**Modo de execução:** uma tarefa vertical por sessão Terra; mudanças de produção só após `pode executar` explícito.

## 1. Objetivo

Migrar o portfólio de HTML/CSS/JS estático mantido manualmente para Astro, preservando o site como SSG puro e mantendo sem alteração perceptível:

- todas as URLs atuais;
- layout, copy, imagens e comportamento responsivo;
- PT como idioma padrão, com EN e ES nos prefixos atuais;
- canonical, `hreflang`, Open Graph, JSON-LD, sitemap e 404;
- GA4, Clarity e os nomes/parâmetros dos eventos atuais;
- scripts próprios de animação, magnetismo, progresso e `prefers-reduced-motion`.

O ganho esperado é eliminar duplicação de fonte, principalmente o CSS das três homes, head, topbar, footer, navegação entre cases e scripts repetidos. A migração não é um redesign.

## 2. Evidências do estado atual

- O site ativo tem 10 páginas monitoradas: 3 homes, 2 cases × 3 idiomas e `404.html`.
- Há ainda um case completo, mas oculto e apenas em PT: `cases/case-landing-pages-checkout-mercado-pago.html`.
- `planilha-mei-limite/` é uma landing page independente e continuará fora do sistema de componentes do portfólio.
- Os HTMLs e CSS principais somam aproximadamente 282 KB de fonte; `assets/` tem 49 arquivos e cerca de 31 MB.
- O CSS inline das três homes é quase idêntico. As diferenças funcionais são somente calibrações do hero por idioma, que devem virar propriedades configuráveis em vez de três folhas completas.
- A branch atual `agent/next-portfolio-updates` está 2 commits à frente e 2 atrás de `origin/main`, além de conter alterações locais. `origin/main` já possui o `wrangler.jsonc` criado pela configuração automática do Cloudflare; a branch atual ainda não.

## 3. Decisões arquiteturais

### 3.1 Renderização e runtime

- Usar Astro em `output: "static"`.
- Não instalar `@astrojs/cloudflare`: o adapter é necessário para renderização sob demanda/SSR, não para SSG puro.
- Não adicionar React, Vue, Svelte ou ilhas `client:*`.
- O JavaScript entregue ao navegador será somente o comportamento que já existe no site.
- Fixar Node em uma versão LTS suportada pelo Astro escolhido, com piso de `22.12.0`, em `.nvmrc` e `package.json#engines`.

### 3.2 Compatibilidade de URLs

Configuração-base:

```js
export default defineConfig({
  site: "https://renanmarcal.com",
  output: "static",
  build: {
    format: "preserve",
    inlineStylesheets: "never",
  },
  i18n: {
    defaultLocale: "pt",
    locales: ["pt", "en", "es"],
    routing: { prefixDefaultLocale: false },
  },
});
```

`build.format: "preserve"` permite manter simultaneamente:

- `/` → `index.html`;
- `/en/` e `/es/` → `en/index.html` e `es/index.html`;
- cases com o sufixo `.html`, sem redirect nem mudança de canonical.

Links internos passam a ser absolutos desde a raiz (`/cases/...`, `/en/cases/...`), eliminando cálculo manual de `../`.

### 3.3 Modelo de conteúdo

Adotar um modelo híbrido, adequado ao tamanho atual do site:

- `src/data/locales/*.ts`: UI global, home, CTAs e textos curtos por idioma, tipados.
- `src/data/cases.ts`: manifesto único com slug, status (`active` ou `hidden`), ordem, idiomas disponíveis, metadados SEO, imagem e próximo case.
- `src/case-studies/<slug>/<locale>.astro`: corpo editorial de cada tradução.
- componentes Astro para os padrões repetidos de seção, cards, imagens e métricas.

Não converter todo case para JSON. Os cases têm composições heterogêneas e markup editorial específico; um schema de blocos JSON agora aumentaria a complexidade e o risco de regressão. Content Collections podem ser reavaliadas quando houver volume real de cases com estrutura repetível.

### 3.4 Componentes e layouts

Estrutura-alvo inicial:

```text
src/
  pages/
    index.astro
    404.astro
    en/index.astro
    es/index.astro
    cases/[slug].astro
    en/cases/[slug].astro
    es/cases/[slug].astro
    sitemap.xml.ts
  layouts/
    BaseLayout.astro
    HomeLayout.astro
    CaseLayout.astro
  components/
    SeoHead.astro
    AnalyticsHead.astro
    HomeTopbar.astro
    CaseTopbar.astro
    LanguageSwitch.astro
    CaseCard.astro
    NextCase.astro
    SiteFooter.astro
    scripts/HomeBehavior.astro
    scripts/CaseBehavior.astro
  case-studies/
    portal-b2b-c6-bank/{pt,en,es}.astro
    priorizacao-visitas-comerciais-mercado-pago/{pt,en,es}.astro
    landing-pages-checkout-mercado-pago/pt.astro
  data/
    locales/{pt,en,es}.ts
    cases.ts
  styles/
    tokens.css
    home.css
    case.css
public/
  assets/
  planilha-mei-limite/
  favicon.svg
  robots.txt
  llms.txt
  BingSiteAuth.xml
```

O CSS deve ser extraído primeiro sem reorganização visual. As diferenças do hero entre PT, EN e ES viram custom properties fornecidas pelo dado do idioma. Estilos inline recorrentes só viram classes utilitárias depois que o build equivalente estiver aprovado, em commit separado.

Os scripts existentes devem começar em componentes com `<script is:inline>` para preservar ordem e semântica de execução. Bundling ou refatoração dos scripts fica para uma otimização posterior, depois da paridade.

### 3.5 SEO e analytics

- `SeoHead.astro` recebe metadados tipados e gera canonical, OG, `hreflang` PT/EN/ES e `x-default` a partir do mesmo manifesto de rotas.
- `sitemap.xml.ts` gera `/sitemap.xml` a partir desse manifesto, preservando `changefreq`, prioridade, alternates e `x-default`.
- O case oculto continua fora da home e do sitemap. A migração não decide sua publicação.
- `AnalyticsHead.astro` centraliza GA4 e Clarity.
- O listener delegado de `[data-gtag-event]` continua único em fonte e mantém `page_lang` e todos os nomes/parâmetros documentados em `docs/ANALYTICS.md`.
- `404.astro` também mantém analytics e eventos.

### 3.6 Assets e página independente

- Mover assets estáticos sem transformação para `public/`; não adotar `astro:assets` nesta migração.
- Não recomprimir, renomear ou redimensionar imagens durante a troca de arquitetura.
- Copiar `planilha-mei-limite/` sem alteração para `public/planilha-mei-limite/`.
- Migrar o case oculto para Astro porque ele depende de `case.css`, mas manter seu status e visibilidade atuais.

### 3.7 Build e deploy

Usar o Workers Builds já conectado ao GitHub, não criar uma segunda pipeline em GitHub Actions.

- Build command no Cloudflare: `npm run build`.
- Deploy command: `npx wrangler deploy`.
- `wrangler.jsonc`: `name: "renan-ux-portfolio"`, `assets.directory: "./dist"` e `assets.not_found_handling: "404-page"`.
- Não commitar `dist/`.
- Atualizar `docs/ARCHITECTURE.md` e `README.md` após o primeiro preview validado.
- Deploy para produção continua condicionado a pedido explícito.

## 4. Sequência de execução para Terra

Cada tarefa abaixo termina com build verde e commit próprio. Não executar todas na mesma sessão.

### T0 — Preparar uma base limpa

**Escopo**

- concluir ou guardar as alterações locais atuais;
- integrar `origin/main`, incluindo `wrangler.jsonc`;
- criar branch exclusiva de migração;
- registrar inventário das URLs e metadados atuais em fixture de verificação.

**Aceite**

- `git status` limpo na nova branch;
- branch contém tanto os commits atuais do portfólio quanto a configuração Cloudflare de `origin/main`;
- nenhuma mudança visual ou de conteúdo.

### T1 — Scaffold Astro e contrato de build

**Arquivos principais**

- `package.json`, `package-lock.json`, `.nvmrc`, `astro.config.mjs`, `tsconfig.json`;
- `wrangler.jsonc`, `.gitignore`;
- `scripts/verify-build.mjs`.

**Trabalho**

- instalar somente Astro e dependências de checagem necessárias;
- configurar SSG, `format: "preserve"` e CSS externo;
- preparar `public/` e copiar os artefatos independentes;
- fazer `verify-build` falhar se uma URL esperada, asset crítico ou metadado obrigatório desaparecer.

**Aceite**

- `npm ci && npm run build` gera `dist/`;
- o verificador reconhece a árvore exata de URLs esperada;
- `dist/` não contém `.git`, `docs`, fontes `.astro` ou arquivos privados.

### T2 — Migrar a home PT como piloto

**Arquivos principais**

- `src/pages/index.astro`;
- layouts/componentes compartilhados;
- `src/data/locales/pt.ts`;
- `src/styles/tokens.css`, `src/styles/home.css`;
- script de comportamento da home.

**Aceite**

- conteúdo, atributos, links, eventos e metadados de `/` equivalentes ao HTML atual;
- nenhuma mudança de token, espaçamento, tipografia ou imagem;
- não há `client:*` nem runtime de framework;
- CSS da home existe uma única vez na fonte.

### T3 — Propagar a home para EN e ES

**Arquivos principais**

- `src/pages/en/index.astro`, `src/pages/es/index.astro`;
- `src/data/locales/en.ts`, `src/data/locales/es.ts`;
- `LanguageSwitch.astro` e dados de calibração do hero.

**Aceite**

- `/`, `/en/` e `/es/` usam o mesmo layout e CSS;
- `lang`, copy, canonical, OG, JSON-LD, alternates, CTAs e eventos continuam próprios de cada idioma;
- calibração da foto do hero preserva os três valores aprovados.

### T4 — Migrar um case completo nos três idiomas

Usar `priorizacao-visitas-comerciais-mercado-pago` como piloto por ter paridade estrutural já documentada.

**Arquivos principais**

- `CaseLayout.astro`, `CaseTopbar.astro`, `NextCase.astro`, `SiteFooter.astro`;
- `src/styles/case.css`;
- três corpos localizados do case piloto;
- rotas PT/EN/ES de case.

**Aceite**

- três URLs `.html` idênticas às atuais;
- hierarquia, classes específicas, imagens, alt texts, embeds, progress bar, next case, footer e analytics preservados;
- `prefers-reduced-motion` preservado;
- layout e footer existem uma única vez na fonte.

### T5 — Migrar os cases restantes

**Escopo**

- Portal C6 Pay em PT/EN/ES;
- Landing Pages em PT, mantendo-o oculto;
- extrair apenas componentes realmente repetidos entre os cases;
- converter estilos inline recorrentes em utilitários num commit separado da portagem de conteúdo.

**Aceite**

- seis cases ativos com paridade de idioma;
- case oculto acessível na URL antiga, mas ausente da home e do sitemap;
- nenhuma alteração editorial;
- nenhuma classe experimental escapa para outros cases.

### T6 — Fechar SEO, 404, analytics e documentação

**Escopo**

- `SeoHead.astro`, `AnalyticsHead.astro`, `404.astro`, `sitemap.xml.ts`;
- atualizar `README.md`, `CLAUDE.md`, `docs/ARCHITECTURE.md`, `docs/ANALYTICS.md`, `docs/BACKLOG.md` e `docs/DECISIONS.md`;
- remover somente os HTML/CSS legados que já tenham substituto verificado.

**Aceite**

- sitemap contém somente as 9 páginas indexáveis atuais e todos os alternates esperados;
- 404 customizado retorna status 404 via Wrangler;
- lista de eventos e parâmetros coincide com `docs/ANALYTICS.md`;
- backlog marca a migração resolvida e mantém follow-ups fora de escopo.

### T7 — Preview Cloudflare e corte de produção

**Pré-condição:** autorização explícita do Renan.

**Trabalho**

- configurar Workers Builds com Node compatível e `npm run build`;
- gerar preview da branch;
- Renan faz a validação visual nos breakpoints e idiomas;
- só depois promover para `main`/produção.

**Aceite**

- build e preview Cloudflare verdes;
- domínio, 404, assets, analytics e rotas antigas funcionam;
- rollback disponível pela versão anterior do Worker.

## 5. Verificação automatizada

Criar um comando único:

```sh
npm run verify
```

Ele deve executar, no mínimo:

```sh
astro check
astro build
node scripts/verify-build.mjs
```

O verificador de build deve checar:

- presença das 3 homes, 6 cases ativos, case oculto, 404 e landing MEI;
- caminhos `.html` dos cases;
- `html[lang]`, title, canonical, OG URL/imagem e alternates por página;
- GA4 e Clarity nas 10 páginas monitoradas;
- eventos documentados e atributo `page_lang`;
- links internos apontando para arquivos existentes;
- imagens críticas existentes e sem troca de caminho;
- case oculto ausente do sitemap;
- inexistência de diretivas `client:*` e bundles de frameworks UI;
- ausência de placeholders como `[ a preencher ]`;
- ausência de arquivos internos/privados em `dist/`.

Para validar o comportamento Cloudflare localmente, depois do build:

```sh
npx wrangler dev
```

Em outro terminal, testar com `curl` as respostas 200 das rotas principais e uma URL inexistente retornando 404. O agente não abre browser para validação visual; essa revisão permanece com o Renan, conforme `CLAUDE.md`.

## 6. Critério de aceite global

A migração está concluída somente quando:

1. `npm run verify` passa em ambiente limpo após `npm ci`.
2. Todas as URLs e metadados públicos atuais permanecem compatíveis.
3. Não existe CSS completo duplicado entre idiomas na fonte.
4. Head, topbars, language switch, footer, next case e analytics têm fonte única.
5. O output é HTML/CSS/JS estático, sem adapter SSR e sem runtime de framework UI.
6. PT/EN/ES mantêm paridade de estrutura e seus textos aprovados.
7. O preview Cloudflare foi revisado antes da produção.
8. O deploy de produção foi autorizado explicitamente.

## 7. Fora de escopo

- redesign, troca de copy ou nova direção visual;
- publicar/traduzir o case oculto;
- adotar CMS ou Content Collections antes de haver necessidade comprovada;
- otimizar/recomprimir imagens ou trocar para `astro:assets`;
- self-host de fontes;
- View Transitions ou novas animações;
- SSR, endpoints dinâmicos, bindings ou sessões Cloudflare;
- refatorar a landing `planilha-mei-limite` para componentes Astro.

## 8. Referências técnicas

- Astro, configuração e `build.format`: https://docs.astro.build/en/reference/configuration-reference/
- Astro, i18n: https://docs.astro.build/en/guides/internationalization/
- Astro, componentes sem JavaScript de cliente por padrão: https://docs.astro.build/en/concepts/islands/
- Cloudflare, Astro estático em Workers: https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/
- Cloudflare Workers Builds: https://developers.cloudflare.com/workers/ci-cd/builds/configuration/
- Cloudflare, SSG e custom 404: https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/

## 9. Handoff atual

- **Objetivo:** migrar o portfólio para Astro sem alterar URLs, conteúdo, SEO, analytics ou comportamento visível.
- **Decisão atual:** SSG puro, `build.format: "preserve"`, Workers Builds e modelo híbrido de conteúdo descrito neste plano.
- **Feito na T0:** alterações locais consolidadas em `89f8229`; `origin/main` integrado em `d484c8a`; branch de execução criada como `chore/astro-migration`; fixture pública criada em `fixtures/public-routes.json`.
- **Feito na T1:** Astro 7.1.3, check, TypeScript e Wrangler 4.112.0 fixados no lockfile; SSG configurado; `wrangler.jsonc` aponta para `./dist` com 404 explícito; o site legado está em `public/` como ponte transitória; `scripts/verify-build.mjs` valida o contrato público.
- **Feito na T2:** `/` é gerada por `src/pages/index.astro`; `HomeLayout.astro` concentra head, SEO, JSON-LD e analytics; `home.css` e `tokens.css` são folhas externas; `HomeBehavior.astro` contém o listener delegado, reveals, magnetismo e o calibrador da foto. A cópia transitória `public/index.html` foi removida, mas o HTML legado da raiz permanece somente como referência até T6.
- **Feito na T3:** `HomePage.astro` concentra a estrutura das três homes; `/`, `/en/` e `/es/` usam os mesmos layout, CSS e comportamento, alimentados por `src/data/locales/{pt,en,es}.ts`. Cada idioma preserva copy, CTAs, eventos, canonical, OG e JSON-LD próprios, bem como a calibração aprovada do hero (PT `90px/32vw`, EN `17px/37vw`, ES `48px/35vw`). As cópias transitórias `public/en/index.html` e `public/es/index.html` foram removidas após as rotas Astro equivalentes serem criadas.
- **Feito na T4:** as três URLs de priorização de visitas são geradas por rotas Astro e mantêm seus corpos editoriais localizados. `CaseLayout.astro`, `CaseTopbar.astro`, `SiteFooter.astro`, `CaseBehavior.astro` e `src/styles/case.css` concentram head, analytics, topbar, footer, progress bar, reveals, eventos e magnetismo. As cópias transitórias correspondentes em `public/` foram removidas. O corpo editorial ainda é carregado dos HTMLs legados de referência, até a remoção final prevista na T6.
- **Feito na T5:** as três URLs do Portal C6 Pay e a URL privada de Landing Pages são geradas por Astro. `CaseLayout.astro` foi generalizado para canonical, OG e alternates por case, sem alterar o contrato de priorização. Landing Pages mantém a ausência de seletor de idioma, GA4 e Clarity, além de continuar fora da home e do sitemap. As quatro cópias transitórias correspondentes em `public/` foram removidas.
- **Feito na T6:** `404.astro` e `sitemap.xml.ts` substituem os arquivos estáticos transitórios; 404 mantém GA4, Clarity e os eventos documentados; o sitemap mantém somente as 9 URLs indexáveis e seus alternates. Corpos editoriais dos cases foram transferidos para `src/case-studies/`, permitindo remover os HTMLs/CSS legados da raiz e de `public/`. `README.md`, `CLAUDE.md` e a documentação técnica foram atualizados para Astro e Cloudflare `dist/`.
- **Próxima tarefa:** T7 — preview Cloudflare da branch e revisão visual do Renan. Requer autorização explícita antes de qualquer preview/deploy.
- **Arquivos relevantes:** `src/pages/404.astro`, `src/pages/sitemap.xml.ts`, `src/case-studies/`, `src/components/{CasePage,CaseTopbar,SiteFooter,HomePage}.astro`, `src/components/scripts/{CaseBehavior,HomeBehavior,NotFoundBehavior}.astro`, `src/layouts/{CaseLayout,HomeLayout}.astro`, `src/data/{cases,locales/{pt,en,es}}.ts`, `src/styles/{tokens,home,case,not-found}.css`, `fixtures/public-routes.json`, `scripts/verify-build.mjs`.
- **Verificação concluída:** `npm run verify` passa sem diagnósticos, com 11 rotas, 9 indexáveis e 10 páginas monitoradas. A validação visual continua pendente para o Renan, sem uso de browser pelo agente.
