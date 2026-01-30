import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

export const GAMES_PATH = "content/games";

const games = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./${GAMES_PATH}` }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string(),
      category: z
        .string()
        .min(2)
        .max(50)
        .transform(val => val.toLowerCase()),
      description: z.string(),
      gameUrl: z.string().url(),
      thumbnail: image().optional(),
      coverImage: image().optional(),
      screenshots: z.array(image()).optional(),
      popular: z.boolean().default(false),
      new: z.boolean().default(false),
      rating: z.number().min(0).max(5).optional(),
      developer: z.string().optional(),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      ogImage: image().or(z.string()).optional(),
      canonicalURL: z.string().optional(),
    }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = { pages, games };
