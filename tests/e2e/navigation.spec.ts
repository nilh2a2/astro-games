import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("should navigate between pages without errors", async ({ page }) => {
    // Start at homepage
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Check if we're in single game mode (has game iframe) or normal mode
    const iframe = page.locator("iframe");
    const isSingleGameMode = await iframe.isVisible().catch(() => false);

    if (!isSingleGameMode) {
      // Only check homepage title if not in single game mode
      await expect(page).toHaveTitle(/Unblocked Games/);

      // Navigate to a game
      const gameLink = page.locator('a[href^="/game/"]').first();
      if ((await gameLink.count()) > 0) {
        await gameLink.click();
        await expect(page.locator("main")).toBeVisible();
      }

      // Go back to homepage
      await page.goto("/");
      await expect(page).toHaveTitle(/Unblocked Games/);

      // Navigate to a category
      const categoryLink = page.locator('a[href^="/category/"]').first();
      if ((await categoryLink.count()) > 0) {
        await categoryLink.click();
        await expect(page.locator("main")).toBeVisible();
      }
    } else {
      // In single game mode, just verify the game page loaded
      await expect(page.locator("main")).toBeVisible();
      await expect(iframe).toBeVisible();
    }
  });

  test("should not have 404 errors on main pages", async ({ page }) => {
    const pages = ["/", "/category/action/", "/game/agent-j/", "/search"];

    for (const url of pages) {
      const response = await page.goto(url);
      expect(response?.status()).toBeLessThan(400);
    }
  });
});
