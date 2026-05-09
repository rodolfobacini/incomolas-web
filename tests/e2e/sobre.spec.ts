import { test, expect } from "@playwright/test";

test.describe("Sobre page", () => {
  test("displays company info from Maringá Online", async ({ page }) => {
    await page.goto("/sobre");

    await expect(
      page.getByRole("heading", { name: /Mola é o nosso/i }),
    ).toBeVisible();

    // Updated company facts (use .first() since values appear in multiple sections)
    await expect(
      page.getByText(/Rua Pioneira Laura Sordi Leonardo, 478/i).first(),
    ).toBeVisible();
    await expect(page.getByText(/Jardim Hanover/i).first()).toBeVisible();
    await expect(page.getByText(/Maring[áa]\s*\/\s*PR/i).first()).toBeVisible();
    await expect(page.getByText(/87065-629/).first()).toBeVisible();
    await expect(page.getByText(/\(44\)\s*3029-7627/).first()).toBeVisible();
  });

  test("renders embedded Google Maps iframe pointing at the factory", async ({
    page,
  }) => {
    await page.goto("/sobre");

    const map = page.frameLocator(
      'iframe[title*="Mapa da Incomolas"]',
    );
    // Frame loads from google.com/maps
    const iframeSrc = await page
      .locator('iframe[title*="Mapa da Incomolas"]')
      .getAttribute("src");
    expect(iframeSrc).toContain("google.com/maps");
    expect(iframeSrc).toContain("Laura+Sordi+Leonardo");

    // Sanity probe inside the iframe (optional, may be blocked by Google CSP)
    void map;
  });

  test("'Como chegar' link uses Google Maps directions", async ({ page }) => {
    await page.goto("/sobre");
    const link = page.getByRole("link", { name: /Como chegar/i });
    await expect(link).toBeVisible();
    const href = await link.getAttribute("href");
    expect(href).toContain("google.com/maps/dir");
    expect(href).toContain("Laura+Sordi+Leonardo");
  });

  test("'Ligar' link uses tel: with the right phone", async ({ page }) => {
    await page.goto("/sobre");
    const tel = page.getByRole("link", { name: /Ligar.*3029-7627/i });
    await expect(tel).toBeVisible();
    await expect(tel).toHaveAttribute("href", "tel:+554430297627");
  });
});
