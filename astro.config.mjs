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
import { unified } from '@astrojs/markdown-remark';

// https://astro.build/config
export default defineConfig({
  site: 'https://joelhooks.com',
  prefetch: true, // Built-in prefetch in Astro 3+
  image: {
    service: { entrypoint: 'astro/assets/services/noop' }
  },
  markdown: {
    processor: unified({
      remarkPlugins: [remarkEmoji, remarkInlineLinks, remarkGfm]
    })
  },
  integrations: [
    tailwind(),
    mdx(),
    react(),
    sitemap(),
    partytown()
  ]
});
