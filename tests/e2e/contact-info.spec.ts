import { test, expect } from "@playwright/test";

test.describe("Contact info consistency", () => {
  test("footer shows Maringá address and phone", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
    await expect(
      footer.getByText(/Rua Pioneira Laura Sordi Leonardo, 478/i).first(),
    ).toBeVisible();
    await expect(footer.getByText(/Maring[áa]\s*\/\s*PR/i).first()).toBeVisible();
    await expect(footer.getByText(/87065-629/).first()).toBeVisible();
    await expect(footer.getByText(/\(44\)\s*99707-2664/).first()).toBeVisible();
  });

  test("WhatsApp floating button uses real phone", async ({ page }) => {
    await page.goto("/");
    const wa = page.getByRole("link", { name: /Falar no WhatsApp/i });
    await expect(wa).toHaveAttribute("href", /wa\.me\/5544997072664/);
  });

  test("orçamento page shows visit address with Maringá and Laura Sordi", async ({
    page,
  }) => {
    await page.goto("/orcamento");
    await expect(
      page.getByText(/Rua Pion\. Laura Sordi Leonardo, 478/i).first(),
    ).toBeVisible();
    await expect(
      page.getByText(/Jardim Hanover, Maring[áa]\/PR/i).first(),
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
