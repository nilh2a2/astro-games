import type { CollectionEntry } from "astro:content";
import getSortedGames from "./getSortedGames";

const getRelatedGames = (
  games: CollectionEntry<"games">[],
  currentGame: CollectionEntry<"games">,
  limit: number = 4
) => {
  const relatedGames = getSortedGames(games)
    .filter(
      game =>
        game.id !== currentGame.id &&
        game.data.category === currentGame.data.category
    )
    .slice(0, limit);

  // If not enough games in the same category, fill with games from other categories
  if (relatedGames.length < limit) {
    const otherGames = getSortedGames(games)
      .filter(game => game.id !== currentGame.id && !relatedGames.includes(game))
      .slice(0, limit - relatedGames.length);
    relatedGames.push(...otherGames);
  }

  return relatedGames;
};

export default getRelatedGames;
