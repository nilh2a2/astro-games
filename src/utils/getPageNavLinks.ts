import { getCollection } from "astro:content";

export interface PageNavLink {
  slug: string;
  title: string;
  href: string;
}

/**
 * Gets navigation links from the pages content collection
 * Returns an array of page links with title and href
 */
export async function getPageNavLinks(): Promise<PageNavLink[]> {
  const pages = await getCollection("pages");

  return pages.map(page => ({
    slug: page.id.replace(/\.md$/, ""),
    title: page.data.title,
    href: `/${page.id.replace(/\.md$/, "")}`,
  }));
}
