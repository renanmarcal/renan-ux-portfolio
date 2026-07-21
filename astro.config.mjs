import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://renanmarcal.com",
  output: "static",
  build: {
    format: "preserve",
    inlineStylesheets: "never"
  },
  i18n: {
    defaultLocale: "pt",
    locales: ["pt", "en", "es"],
    routing: {
      prefixDefaultLocale: false
    }
  }
});
