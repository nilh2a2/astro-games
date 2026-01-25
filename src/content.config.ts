import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

export const GAMES_PATH = "content/games";

const games = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./${GAMES_PATH}` }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string(),
      category: z.enum(["action", "racing", "sports", "puzzle", "adventure", "strategy"]),
      description: z.string(),
      fullDescription: z.string().optional(),
      howToPlay: z.string().optional(),
      gameUrl: z.string().url(),
      thumbnail: image().optional(),
      coverImage: image().optional(),
      screenshots: z.array(image()).optional(),
      featured: z.boolean().default(false),
      popular: z.boolean().default(false),
      new: z.boolean().default(false),
      rating: z.number().min(0).max(5).optional(),
      playCount: z.number().default(0),
      developer: z.string().optional(),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      draft: z.boolean().default(false),
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
