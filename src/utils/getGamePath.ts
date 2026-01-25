import type { CollectionEntry } from "astro:content";

const getGamePath = (game: CollectionEntry<"games">) => {
  return `/game/${game.data.slug}/`;
};

export const getCategoryPath = (category: string) => {
  return `/category/${category.toLowerCase()}/`;
};

export default getGamePath;
