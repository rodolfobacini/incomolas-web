import { test, expect } from "@playwright/test";

const collectPageErrors = (page: import("@playwright/test").Page) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  return errors;
};

test.describe("Home page", () => {
  test("renders without hydration errors", async ({ page }) => {
    const errors = collectPageErrors(page);

    await page.goto("/");
    await expect(page).toHaveTitle(/Incomolas/i);
    await expect(
      page.getByRole("heading", { level: 1, name: /A MOLA CERTA/i }),
    ).toBeVisible();

    await page.waitForLoadState("networkidle");

    const hydrationErrors = errors.filter((e) => /hydrat/i.test(e));
    expect(hydrationErrors, hydrationErrors.join("\n")).toEqual([]);
  });

  test("primary CTAs are visible and clickable", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("link", { name: /Explorar Cat[áa]logo/i }).first(),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Solicitar Or[çc]amento/i }).first(),
    ).toBeVisible();
  });

  test("category bar links navigate to catalog", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("link", { name: /^Academia/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/catalogo/);
  });

  test("featured product card opens product detail", async ({ page }) => {
    await page.goto("/");
    const featuredCard = page
      .locator('[role="link"]')
      .filter({ hasText: /Mola/i })
      .first();
    await featuredCard.click();
    await expect(page).toHaveURL(/\/produto\//);
  });
});
