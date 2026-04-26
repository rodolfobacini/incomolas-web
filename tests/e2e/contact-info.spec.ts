import { test, expect } from "@playwright/test";

test.describe("Contact info consistency", () => {
  test("footer shows Maringá address and phone", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
    await expect(
      footer.getByText(/Av\. Prefeito Sincler Sambatti, 4242/i).first(),
    ).toBeVisible();
    await expect(footer.getByText(/Maring[áa]\s*\/\s*PR/i).first()).toBeVisible();
    await expect(footer.getByText(/87055-405/).first()).toBeVisible();
    await expect(footer.getByText(/\(44\)\s*3255-1912/).first()).toBeVisible();
  });

  test("WhatsApp floating button uses real phone", async ({ page }) => {
    await page.goto("/");
    const wa = page.getByRole("link", { name: /Falar no WhatsApp/i });
    await expect(wa).toHaveAttribute("href", /wa\.me\/554432551912/);
  });

  test("orçamento page shows visit address with Maringá and Sincler", async ({
    page,
  }) => {
    await page.goto("/orcamento");
    await expect(
      page.getByText(/Av\. Pref\. Sincler Sambatti, 4242/i).first(),
    ).toBeVisible();
    await expect(
      page.getByText(/Jardim Bertioga, Maring[áa]\/PR/i).first(),
    ).toBeVisible();
  });

  test("no leftover São Paulo references on public pages", async ({ page }) => {
    for (const path of ["/", "/sobre", "/orcamento"]) {
      await page.goto(path);
      const body = await page.locator("body").innerText();
      expect(body, `Found 'São Paulo' on ${path}`).not.toMatch(/S[ãa]o\s+Paulo/i);
      expect(body, `Found 'Av. Paulista' on ${path}`).not.toMatch(/Av\.\s*Paulista/i);
    }
  });
});
