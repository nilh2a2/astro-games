import type { CollectionEntry } from "astro:content";
import getSortedGames from "./getSortedGames";

const getGamesByCategory = (
  games: CollectionEntry<"games">[],
  category: string
) => {
  return getSortedGames(games).filter(
    game => game.data.category.toLowerCase() === category.toLowerCase()
  );
};

export default getGamesByCategory;
