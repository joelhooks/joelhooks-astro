import { defineConfig } from 'astro/config';

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import mdx from "@astrojs/mdx";

// https://astro.build/config
import react from "@astrojs/react";
import remarkEmoji from '@fec/remark-a11y-emoji';
import remarkInlineLinks from 'remark-inline-links';
import remarkGfm from 'remark-gfm';
import remarkEmbedImages from 'remark-embed-images'

// https://astro.build/config
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
import prefetch from "@astrojs/prefetch";

// https://astro.build/config
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: 'https://joelhooks.com',
  integrations: [tailwind(), mdx({
    remarkPlugins: [remarkEmoji, remarkInlineLinks, remarkGfm, remarkEmbedImages],
    extendPlugins: false
  }), react(), sitemap(), prefetch(), partytown()]
});