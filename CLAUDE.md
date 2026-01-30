# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based games website that displays and embeds browser games. The site uses Astro's content collections to manage game data stored as markdown files with frontmatter, and renders them with a clean, responsive UI.

## Development

### Quality Checks

**MANDATORY REQUIREMENT:**

After making ANY code changes and before committing, you MUST run these quality checks and fix all errors:

```bash
npm run check    # TypeScript + ESLint + Prettier
npm test         # Build + E2E tests
npm run format   # Auto-fix formatting
```

**This is STRICTLY REQUIRED:**
- Run ALL three commands after code changes, before every commit
- Read error output carefully
- Fix ALL reported issues
- Re-run checks until they pass

**No exceptions.** These checks ensure code quality, prevent bugs, and maintain consistency across the codebase.

## Architecture

This is an Astro-based static site using content collections for data management, with strict content-code separation and responsive design.

### Content-First Principle

This project follows strict **content-code separation**:

- **`/content/`** - All user-facing content including game data, static pages, and UI text strings
- **`/src/`** - Implementation code with NO hardcoded text

**Usage:**
- Access UI strings via `getUiText('nav.search')` using dot notation
- Example: `getUiText('buttons.viewAll')` returns "View All"
- For placeholders: `getUiText('categories.pageTitle').replace('{category}', 'Action')`

**Rules:**
- NEVER hardcode user-facing text in components or pages
- ALL text strings must be in `content/ui/en.json`
- This includes labels, buttons, messages, page titles, etc.

### Content Collections

The project uses Astro's content collections defined in `src/content.config.ts`:

**1. games** (`content/games/`)
- Game entries as markdown files with frontmatter metadata
- Required fields: title, slug, category, description, gameUrl, pubDatetime
- Optional fields: fullDescription, howToPlay, thumbnail, coverImage, featured, popular, new, rating, developer, modDatetime, isMainGame
- Categories: action, racing, sports, puzzle, adventure, strategy
- Boolean flags: featured, popular, new, isMainGame
- Images stored alongside markdown files (AVIF/WebP format)
- Game URLs are typically embedded iframes from game distribution platforms

**2. pages** (`content/pages/`)
- Static pages: about, privacy, terms, contact, help

**3. ui** (`content/ui/`)
- `en.json` contains all user-facing text (navigation, buttons, messages, etc.)
- Structured as nested JSON for organization (nav, footer, pagination, etc.)
- Accessed via `getUiText()` utility function

### Routing

- `/` - Homepage with featured carousel, category previews, and recently added games
- `/game/[slug]/` - Individual game detail pages with embedded iframe player
- `/category/[category]/` - Category listing pages
- `/[slug]` - Static pages from the pages collection
- `/search` - Search functionality (uses Pagefind)

### Key Utilities

Located in `src/utils/`:

- **`getSortedGames.ts`** - Sorts games by modDatetime or pubDatetime (most recent first)
- **`gameFilter.ts`** - Filters out draft games and unpublished games (based on pubDatetime)
- **`getGamesByCategory.ts`** - Filters games by category
- **`getRelatedGames.ts`** - Finds related games based on category
- **`getGamePath.ts`** - Generates paths for games and categories
- **`getUiText.ts`** - Retrieves UI text strings from content/ui/en.json via dot notation
- **`getMainGame.ts`** - Finds and validates the main game for single game mode

## Styling

- Uses Tailwind CSS v4 with custom theme
- Custom CSS classes: `app-layout`, `app-prose` for consistent styling
- Theme switching support (light/dark mode)
- Responsive design with mobile-first approach

## Configuration

### Site Configuration (`src/config.ts`)

Site-wide settings:
- Site metadata (title, description, URL)
- Pagination settings (gamesPerPage: 12, gamesPerIndex: 8)
- Feature toggles (showCategories, showFeatured)
- Carousel and recent games limits
- **Single Game Mode** (`singleGameMode`): When enabled, displays one game as the main homepage content

#### Single Game Mode

Enable single game mode to feature one game prominently:

1. Set `singleGameMode: true` in `src/config.ts`
2. Mark one game with `isMainGame: true` in its frontmatter
3. The homepage will redirect to that game's detail page
4. Accessing the game's URL directly will redirect back to homepage

**Validation:**
- Exactly one game must have `isMainGame: true` when single game mode is enabled
- Multiple games with `isMainGame: true` will throw an error
- No game with `isMainGame: true` will throw an error when mode is enabled

### Astro Configuration (`astro.config.ts`)

Build and integration settings:
- Tailwind CSS v4 via Vite plugin
- Sitemap integration
- Markdown plugins (remark-toc, remark-collapse)
- Shiki syntax highlighting with custom transformers
- Experimental font loading from Google Fonts

### Path Aliases

TypeScript path alias `@/*` maps to `./src/*` (configured in tsconfig.json)

