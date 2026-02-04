import type { CollectionEntry } from "astro:content";
import { gameFilter } from "./gameFilter";

export function getUniqueCategories(games: CollectionEntry<"games">[]) {
  const filteredGames = games.filter(gameFilter);
  const categories = new Set(filteredGames.map(game => game.data.category));
  return Array.from(categories).sort();
}
