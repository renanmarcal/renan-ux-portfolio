# Arquitetura do repositório

## Visão geral

O portfólio é gerado pelo Astro como site estático. `npm run build` produz `dist/`, sem adapter SSR ou runtime de framework no navegador.

O domínio `renanmarcal.com` é servido por um projeto Cloudflare Workers chamado `renan-ux-portfolio`. O Wrangler publica somente `assets.directory: "./dist"`, com `not_found_handling: "404-page"`. O workflow legado do GitHub Pages não serve o domínio customizado.

O português é a fonte principal do conteúdo. As versões em inglês e espanhol ficam em diretórios próprios e espelham a estrutura das páginas em português.

## Deploy: onde olhar quando algo não aparece no ar

Um `git push` bem-sucedido em `main` **não garante** que o site foi atualizado. O deploy real acontece depois, no Cloudflare, e pode falhar silenciosamente sem nenhum sinal no terminal do git.

Se uma mudança publicada não aparecer em `renanmarcal.com`:

1. Confirme que o commit chegou em `origin/main` (`git ls-remote origin refs/heads/main`).
2. Vá no painel Cloudflare → **Workers & Pages → renan-ux-portfolio → Builds** e veja se o build daquele commit específico teve sucesso ou falhou. É o único lugar onde o erro real aparece — não aparece no GitHub, no terminal, nem em `gh run list` (isso só mostra o workflow legado do GitHub Pages, que é irrelevante aqui).
3. Se falhou, abra o log do build. Uma causa já conhecida:
   - **`Asset too large` / arquivo `.git/objects/pack/*.pack` acima de 25 MiB**: o Wrangler publica o diretório inteiro como assets estáticos, incluindo `.git/`, a menos que exista um `.assetsignore` (mesma sintaxe do `.gitignore`, mas o `.gitignore` em si não tem nenhum efeito sobre o que o Wrangler publica). O arquivo `.assetsignore` na raiz do repo já exclui `.git`, `.github`, `node_modules`, `.wrangler` e `wrangler.jsonc` — se um novo diretório pesado for adicionado ao repo (ex. ferramentas de build, cache), adicionar ali também.
4. Enquanto o build falha, o Cloudflare continua servindo a última versão publicada com sucesso, sem avisar visualmente que está desatualizada (a página carrega normalmente, só que com conteúdo antigo).

## Estrutura de arquivos

| Caminho | Função |
| --- | --- |
| `src/pages/` | Rotas Astro, incluindo 404 e sitemap. |
| `src/case-studies/` | Corpos editoriais localizados dos cases. |
| `src/components/` | Layout, navegação, footer, SEO e scripts compartilhados. |
| `src/styles/` | Tokens e estilos de home, case e 404. |
| `public/assets/` | Imagens, ícones e outros recursos estáticos. |
| `public/planilha-mei-limite/` | Landing independente, mantida fora do Astro. |
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
