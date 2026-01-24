import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string().or(z.date()),
    description: z.string().optional(),
    slug: z.string().optional(),
    banner: z.string().optional(),
  }),
});

const legacyBlogCollection = defineCollection({
  type: 'content',
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
