import { defineCollection, z } from 'astro:content';

import { glob } from 'astro/loaders';

const blogPosts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./posts"}),
  schema: ({ image }) => z.object({
    title: z.string(),
    subTitle: z.string().optional(),
    tags: z.array(z.string()),
    image: image().optional(),
    publishedDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    isPublic: z.boolean(),
  }),
});

export const collections = { blogPosts };
