import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const dist = resolve(root, "dist");
const fixture = JSON.parse(
  readFileSync(resolve(root, "fixtures/public-routes.json"), "utf8")
);
const failures = [];

function readOutput(output) {
  const file = resolve(dist, output);
  if (!existsSync(file)) {
    failures.push(`arquivo ausente: dist/${output}`);
    return "";
  }

  return readFileSync(file, "utf8");
}

function matchValue(html, expression) {
  const match = html.match(expression);
  return match?.[1]?.replaceAll("&amp;", "&");
}

function expectEqual(route, field, actual, expected) {
  if (actual !== expected) {
    failures.push(`${route.id}: ${field} esperado ${expected ?? "ausente"}, recebido ${actual ?? "ausente"}`);
  }
}

function expectIncludes(route, html, value, label) {
  if (!html.includes(value)) {
    failures.push(`${route.id}: ${label} ausente (${value})`);
  }
}

for (const route of fixture.routes) {
  const html = readOutput(route.output);
  if (!html) continue;

  expectEqual(route, "lang", matchValue(html, /<html lang="([^"]+)"/), route.lang);
  expectEqual(route, "title", matchValue(html, /<title>([^<]+)<\/title>/), route.title);

  for (const [field, expression] of Object.entries({
    canonical: /<link rel="canonical" href="([^"]+)"/,
    ogUrl: /<meta property="og:url" content="([^"]+)"/,
    ogImage: /<meta property="og:image" content="([^"]+)"/
  })) {
    if (route[field] !== undefined) {
      expectEqual(route, field, matchValue(html, expression), route[field]);
    }
  }

  if (route.analytics) {
    expectIncludes(route, html, fixture.analytics.ga4MeasurementId, "GA4");
    expectIncludes(route, html, fixture.analytics.clarityProjectId, "Clarity");
  }

  if (route.ogImage) {
    const imagePath = new URL(route.ogImage).pathname.replace(/^\//, "");
    if (!existsSync(resolve(dist, imagePath))) {
      failures.push(`${route.id}: imagem Open Graph ausente (${imagePath})`);
    }
  }

  if (route.alternates) {
    for (const [lang, href] of Object.entries(route.alternates)) {
      expectIncludes(route, html, `hreflang="${lang}" href="${href}"`, `alternate ${lang}`);
    }
  }
}

for (const group of fixture.translationGroups) {
  for (const routeId of group.routeIds) {
    const route = fixture.routes.find((candidate) => candidate.id === routeId);
    const html = route && readOutput(route.output);
    if (!route || !html) continue;

    for (const [lang, href] of Object.entries(group.alternates)) {
      expectIncludes(route, html, `hreflang="${lang}" href="${href}"`, `${group.id} alternate ${lang}`);
    }
  }
}

const sitemap = readOutput(fixture.sitemap.output);
for (const routeId of fixture.sitemap.routeIds) {
  const route = fixture.routes.find((candidate) => candidate.id === routeId);
  if (route) {
    expectIncludes(route, sitemap, `<loc>${fixture.site}${route.url}</loc>`, "entrada no sitemap");
  }
}

for (const route of fixture.routes.filter((candidate) => !candidate.indexable)) {
  if (route.canonical && sitemap.includes(`<loc>${route.canonical}</loc>`)) {
    failures.push(`${route.id}: rota não indexável aparece no sitemap`);
  }
}

for (const item of fixture.passthrough) {
  if (!existsSync(resolve(dist, item.output))) {
    failures.push(`artefato estático ausente: dist/${item.output}`);
  }
}

for (const forbidden of [".git", ".github", "docs", ".private", "node_modules"]) {
  if (existsSync(resolve(dist, forbidden))) {
    failures.push(`artefato interno publicado: dist/${forbidden}`);
  }
}

const outputFiles = fixture.routes.map((route) => readOutput(route.output)).join("\n");
if (outputFiles.includes("client:")) {
  failures.push("diretiva client: encontrada no output");
}
if (outputFiles.includes("[ a preencher ]")) {
  failures.push("placeholder [ a preencher ] encontrado no output");
}

if (failures.length > 0) {
  console.error("Verificação do build falhou:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Build validado: ${fixture.routes.length} rotas, ${fixture.routes.filter((route) => route.indexable).length} indexáveis e ${fixture.routes.filter((route) => route.analytics).length} monitoradas.`
);
