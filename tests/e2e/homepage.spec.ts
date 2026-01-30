import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should load successfully", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Unblocked Games/);
  });

  test("should display hero section", async ({ page }) => {
    await page.goto("/");
    const hero = page.locator("#hero");
    await expect(hero).toBeVisible();
  });

  test("should display category sections", async ({ page }) => {
    await page.goto("/");
    // Check for at least one category section
    const sections = page.locator("section[id]");
    await expect(sections.first()).toBeVisible();
  });

  test("should display game grids", async ({ page }) => {
    await page.goto("/");
    // Check for game cards
    const gameLinks = page.locator('a[href^="/game/"]');
    await expect(gameLinks.first()).toBeVisible();
  });

  test("should have working navigation", async ({ page }) => {
    await page.goto("/");
    const header = page.locator("header");
    await expect(header).toBeVisible();
  });

  test("should have footer", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });
});
