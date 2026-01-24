import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.string().or(z.date()),
    description: z.string().optional(),
    slug: z.string().optional(),
    banner: z.string().optional(),
    published: z.boolean().optional(),
  }),
});

const legacyBlogCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.mdx', base: './src/content/legacy_blog' }),
  schema: z.object({
    title: z.string(),
    date: z.string().or(z.date()),
    description: z.string().optional(),
  }),
});

export const collections = {
  'blog': blogCollection,
  'legacy_blog': legacyBlogCollection,
};
