# Implementation Plan: Single Game Mode

## Affected Files

### New Files
- `src/utils/getMainGame.ts` - Utility to find and validate the main game

### Modified Files
- `src/content.config.ts` - Add `isMainGame` field to games schema
- `src/config.ts` - Add `singleGameMode` boolean toggle
- `src/pages/index.astro` - Conditional rendering based on single game mode
- `src/pages/game/[...slug]/index.astro` - Add redirect for main game

## Overview

This feature enables a "single-game-focused" site mode where one game's detail page becomes the homepage. This is a common SEO strategy for online game sites where the entire site is built around one primary game while still offering other games as secondary content.

When enabled, the homepage (`/`) will display the full game detail page for the designated main game, and the original game URL will redirect to the homepage to maintain a single canonical URL.

## Implementation Steps

### Step 1: Update Content Schema

**File:** `src/content.config.ts`

Add an optional `isMainGame` boolean field to the games collection schema:

```typescript
const games = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      // ... existing fields ...
      isMainGame: z.boolean().optional(),
    }),
});
```

This field marks which game should be featured as the main page when single game mode is enabled.

### Step 2: Add Site Configuration Toggle

**File:** `src/config.ts`

Add a `singleGameMode` boolean to enable/disable this feature:

```typescript
const getSiteConfig = () => {
  return {
    // ... existing config ...
    singleGameMode: false, // Set to true to enable single game mode
  } as const;
};
```

### Step 3: Create Main Game Utility

**File:** `src/utils/getMainGame.ts` (new file)

Create a utility function that:
- Finds the game with `isMainGame: true`
- Validates that exactly one game has this flag (if singleGameMode is enabled)
- Throws build errors for configuration issues

```typescript
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
```

**Error Handling:**
- If `singleGameMode` is `true` and no game has `isMainGame: true` → Build fails
- If multiple games have `isMainGame: true` → Build fails (regardless of mode)
- If `singleGameMode` is `false` → Normal homepage behavior

### Step 4: Update Homepage

**File:** `src/pages/index.astro`

Modify the homepage to conditionally render either the game detail page or the normal homepage:

```typescript
---
import { getCollection } from "astro:content";
import { SITE } from "@/config";
import { getMainGame } from "@/utils/getMainGame";
import GameDetails from "@/layouts/GameDetails.astro";
// ... existing imports for normal homepage ...

const games = await getCollection("games");
const sortedGames = getSortedGames(games);

// Check if single game mode is enabled
const mainGame = getMainGame(games);

if (SITE.singleGameMode && mainGame) {
  // Render game detail page as homepage
  return Astro.redirect(`/game/${mainGame.data.slug}/`, 302);
  // OR render directly:
  // <GameDetails game={mainGame} games={sortedGames} />
}

// Otherwise, render normal homepage
// ... existing homepage code ...
---
```

**Note:** We can either redirect to the game page or render the GameDetails component directly. Rendering directly is cleaner for SEO.

### Step 5: Add Redirect from Original Game URL

**File:** `src/pages/game/[...slug]/index.astro`

Add logic to redirect the main game's original URL to the homepage:

```typescript
---
import { SITE } from "@/config";
import { getMainGame } from "@/utils/getMainGame";
// ... existing imports ...

export async function getStaticPaths() {
  // ... existing code ...
}

const { game } = Astro.props;

// If single game mode is enabled and this is the main game, redirect to homepage
if (SITE.singleGameMode) {
  const games = await getCollection("games");
  const mainGame = getMainGame(games);

  if (mainGame && game.data.slug === mainGame.data.slug) {
    return Astro.redirect("/", 301);
  }
}

// ... rest of existing code ...
---
```

This ensures the main game has only one canonical URL (`/`) for better SEO.

### Step 6: Testing

After implementation, test the following scenarios:

1. **Normal mode** (`singleGameMode: false`):
   - Homepage shows normal multi-game layout
   - All game URLs work normally
   - No build errors

2. **Single game mode enabled** (`singleGameMode: true`):
   - Homepage shows the main game's detail page
   - Main game's original URL redirects to `/`
   - Other games remain accessible at their URLs
   - Build succeeds with exactly one `isMainGame: true`

3. **Error cases**:
   - Build fails if `singleGameMode: true` but no game has `isMainGame: true`
   - Build fails if multiple games have `isMainGame: true`

## Conclusion

This implementation provides a flexible way to switch between a multi-game portal and a single-game-focused site using simple configuration. The build-time validation ensures configuration errors are caught early, and the redirect strategy maintains clean SEO with a single canonical URL for the main game.

The feature is backward compatible - existing sites continue to work normally with `singleGameMode: false`, and enabling the feature requires only setting the config flag and marking one game with `isMainGame: true`.
