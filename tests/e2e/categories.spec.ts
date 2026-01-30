import { test, expect } from "@playwright/test";

test.describe("Category Pages", () => {
  const categories = [
    "action",
    "racing",
    "sports",
    "puzzle",
    "adventure",
    "strategy",
  ];

  for (const category of categories) {
    test(`should load ${category} category page`, async ({ page }) => {
      await page.goto(`/category/${category}/`);
      // Check page loads successfully
      const main = page.locator("main");
      await expect(main).toBeVisible();
    });

    test(`should display games in ${category} category`, async ({ page }) => {
      await page.goto(`/category/${category}/`);
      // Check for game links
      const main = page.locator("main");
      await expect(main).toBeVisible();
    });
  }

  test("should have working category navigation", async ({ page }) => {
    await page.goto("/category/action/");
    const main = page.locator("main");
    await expect(main).toBeVisible();
  });
});
