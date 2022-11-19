import { defineConfig } from 'astro/config';

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import mdx from "@astrojs/mdx";

// https://astro.build/config
import react from "@astrojs/react";

import remarkEmoji from 'remark-emoji'

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), mdx({
    remarkPlugins: [remarkEmoji],
    extendPlugins: false
  }), react()]
});