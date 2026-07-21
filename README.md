# Portfólio de Renan Marçal

Portfólio de produto de Renan Marçal, com estudos de caso sobre a criação e evolução de experiências digitais para plataformas e operações complexas.

Visite o portfólio em [renanmarcal.com](https://renanmarcal.com).

## Cases em destaque

- **Portal B2B C6 Bank**: redesenho de uma experiência financeira para ajudar empresas a acompanhar vendas, fluxo de caixa e decisões operacionais.
- **Priorização de visitas comerciais no Mercado Pago**: estruturação de uma ferramenta para apoiar a definição de prioridades da operação comercial.
- **Landing pages de checkout no Mercado Pago**: trabalho sobre páginas de conversão e a clareza da jornada de pagamento.

## Tecnologias e características

- Astro em modo estático, sem runtime de framework no navegador.
- HTML, CSS e JavaScript estáticos gerados por `npm run build`.
- Versões em português, inglês e espanhol.
- Cases com layout responsivo e estilos compartilhados em `case.css`.
- Analytics com Google Analytics 4 e Microsoft Clarity.
- Deploy via Cloudflare Workers (`dist/`).

## Estrutura do repositório

```text
src/pages/          Rotas Astro
src/components/     Layouts e comportamentos compartilhados
src/case-studies/   Corpos editoriais localizados dos cases
src/styles/         Tokens e estilos compartilhados
public/assets/      Imagens, ícones e recursos estáticos
public/planilha-mei-limite/ Landing independente preservada
docs/               Documentação interna do projeto
```

## Executar localmente

Instale as dependências e inicie o servidor de desenvolvimento:

```sh
npm ci
npm run dev
```

Para validar o contrato público antes de publicar, use `npm run verify`.

## Contato

- [LinkedIn](https://linkedin.com/in/rnmrc90)
- [WhatsApp](https://wa.me/5511966101996)
