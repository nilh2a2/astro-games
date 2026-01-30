import { test, expect } from "@playwright/test";

test.describe("Search Functionality", () => {
  test("should load search page", async ({ page }) => {
    await page.goto("/search");
    await expect(page).toHaveTitle(/Search/);
  });

  test("should have search container", async ({ page }) => {
    await page.goto("/search");
    const searchContainer = page.locator("#pagefind-search");
    await expect(searchContainer).toBeVisible();
  });

  test("should load pagefind UI", async ({ page }) => {
    await page.goto("/search");
    // Wait for Pagefind UI to load
    await page.waitForSelector(".pagefind-ui__search-input", {
      timeout: 10000,
    });
    const searchInput = page.locator(".pagefind-ui__search-input");
    await expect(searchInput).toBeVisible();
  });
});
