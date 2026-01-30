import type { CollectionEntry } from "astro:content";
import { SITE } from "@/config";

export function getMainGame(
  games: CollectionEntry<"games">[]
): CollectionEntry<"games"> | null {
  const mainGames = games.filter(game => game.data.isMainGame === true);

  if (SITE.singleGameMode) {
    // Single game mode is enabled - strict validation
    if (mainGames.length === 0) {
      throw new Error(
        "singleGameMode is enabled but no game has isMainGame set to true. " +
          "Please set isMainGame: true in one game's frontmatter."
      );
    }

    if (mainGames.length > 1) {
      const gameNames = mainGames.map(g => g.data.title).join(", ");
      throw new Error(
        `Multiple games have isMainGame set to true: ${gameNames}. ` +
          "Only one game can be the main game."
      );
    }

    return mainGames[0];
  }

  // Single game mode is disabled - validation only
  if (mainGames.length > 1) {
    const gameNames = mainGames.map(g => g.data.title).join(", ");
    throw new Error(
      `Multiple games have isMainGame set to true: ${gameNames}. ` +
        "Only one game can be the main game."
    );
  }

  return mainGames[0] || null;
}
