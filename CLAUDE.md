# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based games website that displays and embeds browser games. The site uses Astro's content collections to manage game data stored as markdown files with frontmatter, and renders them with a clean, responsive UI.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production (includes type checking, build, and pagefind indexing)
npm run build

# Preview production build
npm run preview

# Type checking only
npm run sync
astro check

# Code formatting
npm run format        # Format all files
npm run format:check  # Check formatting without changes

# Linting
npm run lint
```

## Architecture

### Content-First Architecture Principle

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

The project uses Astro's content collections with three main collections defined in `src/content.config.ts`:

1. **games** (`content/games/`): Game entries with markdown files
   - Each game has frontmatter with metadata (title, slug, category, description, gameUrl, etc.)
   - Categories: action, racing, sports, puzzle, adventure, strategy
   - Boolean flags: featured, popular, new
   - Images stored alongside markdown files (AVIF/WebP format)

2. **pages** (`content/pages/`): Static pages (about, privacy, terms, contact, help)

3. **ui** (`content/ui/`): UI text strings and labels
   - `en.json` contains all user-facing text (navigation, buttons, messages, etc.)
   - Structured as nested JSON for organization (nav, footer, pagination, etc.)
   - Accessed via `getUiText()` utility function

### Routing Structure

- `/` - Homepage with featured carousel, category previews, and recently added games
- `/game/[slug]/` - Individual game detail pages with embedded iframe player
- `/category/[category]/` - Category listing pages
- `/[slug]` - Static pages from the pages collection
- `/search` - Search functionality (uses Pagefind)

### Key Utilities

Located in `src/utils/`:

- `getSortedGames.ts` - Sorts games by modDatetime or pubDatetime (most recent first)
- `gameFilter.ts` - Filters out draft games and unpublished games (based on pubDatetime)
- `getGamesByCategory.ts` - Filters games by category
- `getRelatedGames.ts` - Finds related games based on category
- `getGamePath.ts` - Generates paths for games and categories
- `getUiText.ts` - Retrieves UI text strings from content/ui/en.json via dot notation

### Configuration

- `src/config.ts` - Site-wide settings including:
  - Site metadata (title, description, URL)
  - Pagination settings (gamesPerPage: 12, gamesPerIndex: 8)
  - Feature toggles (showCategories, showFeatured)
  - Carousel and recent games limits

- `astro.config.ts` - Astro configuration with:
  - Tailwind CSS v4 via Vite plugin
  - Sitemap integration
  - Markdown plugins (remark-toc, remark-collapse)
  - Shiki syntax highlighting with custom transformers
  - Experimental font loading from Google Fonts

### Path Aliases

TypeScript path alias `@/*` maps to `./src/*` (configured in tsconfig.json)

### Build Process

The build command chains multiple steps:
1. `astro check` - Type checking
2. `astro build` - Build static site
3. `pagefind --site dist` - Generate search index
4. `cp -r dist/pagefind public/` - Copy search index to public

### Game Content Structure

Each game markdown file should include:
- Required: title, slug, category, description, gameUrl, pubDatetime
- Optional: fullDescription, howToPlay, thumbnail, coverImage, featured, popular, new, rating, developer, modDatetime

Game URLs are typically embedded iframes from game distribution platforms.

### Styling

- Uses Tailwind CSS v4 with custom theme
- Custom CSS classes: `app-layout`, `app-prose` for consistent styling
- Theme switching support (light/dark mode)
- Responsive design with mobile-first approach
