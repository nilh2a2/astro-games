import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should work correctly based on single game mode configuration", async ({
    page,
  }) => {
    await page.goto("/");

    // Wait for page to load (use domcontentloaded instead of networkidle for pages with iframes)
    await page.waitForLoadState("domcontentloaded");

    // Check if homepage redirects (single game mode enabled)
    // or loads normally (single game mode disabled)
    // Check for game iframe to determine if we're on a game page
    const iframe = page.locator("iframe");
    const iframeVisible = await iframe.isVisible().catch(() => false);

    if (iframeVisible) {
      // Single game mode is ENABLED
      // Homepage redirected to a game page
      await expect(page).toHaveURL(/\/(game\/.+\/)?$/);

      // Should display game iframe
      await expect(iframe).toBeVisible();

      // Should have header and footer
      const header = page.locator("header");
      await expect(header).toBeVisible();
      const footer = page.locator("footer");
      await expect(footer).toBeVisible();
    } else {
      // Single game mode is DISABLED
      // Homepage should load normally
      await expect(page).toHaveURL("/");
      await expect(page).toHaveTitle(/Unblocked Games/);

      // Should display hero section
      const hero = page.locator("#hero");
      await expect(hero).toBeVisible();

      // Should display category sections
      const sections = page.locator("section[id]");
      await expect(sections.first()).toBeVisible();

      // Should display game grids
      const gameLinks = page.locator('a[href^="/game/"]');
      await expect(gameLinks.first()).toBeVisible();
      const count = await gameLinks.count();
      expect(count).toBeGreaterThan(1);

      // Should have working navigation
      const header = page.locator("header");
      await expect(header).toBeVisible();

      // Should have footer
      const footer = page.locator("footer");
      await expect(footer).toBeVisible();
    }
  });
});
