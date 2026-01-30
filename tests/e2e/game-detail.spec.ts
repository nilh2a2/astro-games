import { test, expect } from "@playwright/test";

test.describe("Game Detail Page", () => {
  test("should load game page successfully", async ({ page }) => {
    await page.goto("/game/agent-j/");
    await expect(page).toHaveTitle(/Agent J/);
  });

  test("should display game title", async ({ page }) => {
    await page.goto("/game/agent-j/");
    const title = page.locator("h1").first();
    await expect(title).toContainText("Agent J");
  });

  test("should display game iframe", async ({ page }) => {
    await page.goto("/game/agent-j/");
    const iframe = page.locator("iframe");
    await expect(iframe).toBeVisible();
    await expect(iframe).toHaveAttribute("src", /gamepix/);
  });

  test("should have main content", async ({ page }) => {
    await page.goto("/game/agent-j/");
    const main = page.locator("main");
    await expect(main).toBeVisible();
  });
});
