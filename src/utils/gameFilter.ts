import type { CollectionEntry } from "astro:content";

export function gameFilter({ data }: CollectionEntry<"games">) {
  try {
    const publishDate = new Date(data.pubDatetime);
    if (isNaN(publishDate.getTime())) {
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.warn(
          `Invalid publish date for game: ${data.title || "unknown"}`
        );
      }
      return import.meta.env.DEV;
    }
    const isPublishTimePassed = Date.now() > publishDate.getTime();
    return import.meta.env.DEV || isPublishTimePassed;
  } catch (error) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.warn(
        `Error parsing date for game: ${data.title || "unknown"}`,
        error
      );
    }
    return import.meta.env.DEV;
  }
}
