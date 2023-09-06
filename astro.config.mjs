import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: process.env.VERCEL_URL || "",
  integrations: [sitemap(), partytown(), mdx()],
});
