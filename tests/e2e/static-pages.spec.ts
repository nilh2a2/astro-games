import { test, expect } from "@playwright/test";

test.describe("Static Pages", () => {
  const pages = ["about", "privacy", "terms", "contact", "help"];

  for (const pageName of pages) {
    test(`should load ${pageName} page`, async ({ page }) => {
      await page.goto(`/${pageName}`);
      // Check page loads without 404
      const main = page.locator("main");
      await expect(main).toBeVisible();
    });
  }
});
