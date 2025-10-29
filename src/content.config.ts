import { defineCollection, z } from 'astro:content';

import { glob } from 'astro/loaders';

const blogPosts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./posts"}),
  schema: ({ image }) => z.object({
    title: z.string(),
    subTitle: z.string().optional(),
    tags: z.array(z.string()),
    image: image().optional(),
    publishedDate: z.string().transform(str => new Date(str)),
    updatedDate: z.string().optional().transform(str => str ? new Date(str) : null),
    isPublic: z.boolean(),
  }),
});

export const collections = { blogPosts };
