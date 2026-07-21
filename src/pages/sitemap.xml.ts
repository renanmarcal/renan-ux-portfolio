import fixture from "../../fixtures/public-routes.json";

const routeById = new Map(fixture.routes.map((route) => [route.id, route]));
const caseAlternates = new Map(fixture.translationGroups.map((group) => [group.id, group.alternates]));

export function GET() {
  const entries = fixture.sitemap.routeIds.map((routeId) => {
    const route = routeById.get(routeId);
    if (!route) throw new Error(`Rota ausente do sitemap: ${routeId}`);
    const alternates = route.alternates ?? caseAlternates.get(routeId.startsWith("portal-c6") ? "portal-c6" : "priorizacao-visitas");
    const changefreq = routeId.startsWith("home-") ? "monthly" : "yearly";
    const priority = routeId.startsWith("home-") ? "1.0" : "0.8";
    return `  <url>\n    <loc>${fixture.site}${route.url}</loc>\n${Object.entries(alternates ?? {}).map(([lang, href]) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${href}"/>`).join("\n")}\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  }).join("\n\n");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n\n${entries}\n\n</urlset>\n`, { headers: { "Content-Type": "application/xml" } });
}
