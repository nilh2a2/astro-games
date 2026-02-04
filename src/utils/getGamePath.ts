import type { CollectionEntry } from "astro:content";

export function getGamePath(game: CollectionEntry<"games">) {
  return `/game/${game.data.slug}/`;
}

export function getCategoryPath(category: string) {
  return `/category/${category.toLowerCase()}/`;
}
