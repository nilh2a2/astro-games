import uiStrings from "../../content/ui/en.json";

/**
 * Retrieves UI text by dot-notation path (e.g., "nav.posts")
 * @param path - Dot-separated path to the UI string
 * @returns The UI text string
 */
export function getUiText(path: string): string {
  const keys = path.split(".");
  let value: unknown = uiStrings;

  for (const key of keys) {
    value = (value as Record<string, unknown>)?.[key];
  }

  if (typeof value !== "string") {
    return path;
  }

  return value;
}

/**
 * Retrieves an array of UI text (e.g., month names)
 * @param path - Dot-separated path to the UI array
 * @returns The UI text array
 */
export function getUiArray(path: string): string[] {
  const keys = path.split(".");
  let value: unknown = uiStrings;

  for (const key of keys) {
    value = (value as Record<string, unknown>)?.[key];
  }

  if (!Array.isArray(value)) {
    return [];
  }

  return value;
}

// Export the entire strings object for direct access if needed
export { uiStrings };
