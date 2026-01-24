import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import remarkEmoji from '@fec/remark-a11y-emoji';
import remarkInlineLinks from 'remark-inline-links';
import remarkGfm from 'remark-gfm';
// import remarkEmbedImages from 'remark-embed-images'; // Disabled for Astro 4 compat
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: 'https://joelhooks.com',
  prefetch: true, // Built-in prefetch in Astro 3+
  integrations: [
    tailwind(),
    mdx({
      remarkPlugins: [remarkEmoji, remarkInlineLinks, remarkGfm]
      // Note: removed deprecated extendPlugins option
    }),
    react(),
    sitemap(),
    partytown()
  ]
});
