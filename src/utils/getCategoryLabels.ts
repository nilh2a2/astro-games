import type { CollectionEntry } from "astro:content";

export interface CategoryLabel {
  slug: string;
  label: string;
}

/**
 * Capitalizes the first letter of a string
 */
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Converts a category slug to a display label
 * Example: "action" -> "Action Games"
 */
export function formatCategoryLabel(category: string): string {
  return `${capitalize(category)} Games`;
}

/**
 * Gets unique categories from games and generates display labels
 * Returns an array of category objects with slug and formatted label
 */
export function getCategoryLabels(
  games: CollectionEntry<"games">[]
): CategoryLabel[] {
  const uniqueCategories = new Set<string>();

  games.forEach(game => {
    uniqueCategories.add(game.data.category.toLowerCase());
  });

  return Array.from(uniqueCategories)
    .sort()
    .map(category => ({
      slug: category,
      label: formatCategoryLabel(category),
    }));
}

/**
 * Gets a single category label by slug
 * Example: getCategoryLabel("action") -> "Action Games"
 */
export function getCategoryLabel(category: string): string {
  return formatCategoryLabel(category);
}
