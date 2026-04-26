import { test, expect } from "@playwright/test";

const PUBLIC_ROUTES = [
  { path: "/", titleRe: /Incomolas/i, mustHaveText: /A MOLA CERTA/i },
  { path: "/catalogo", titleRe: /Incomolas/i, mustHaveText: /Cat[áa]logo/i },
  { path: "/sobre", titleRe: /Quem Somos/i, mustHaveText: /ofício/i },
  { path: "/orcamento", titleRe: /Incomolas/i, mustHaveText: /Or[çc]amento/i },
];

test.describe("Public routes render and stay error-free", () => {
  for (const route of PUBLIC_ROUTES) {
    test(`renders ${route.path}`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (err) => errors.push(err.message));
      page.on("console", (msg) => {
        if (msg.type() === "error") errors.push(msg.text());
      });

      const response = await page.goto(route.path);
      expect(response?.status(), `HTTP status on ${route.path}`).toBeLessThan(400);
      await expect(page).toHaveTitle(route.titleRe);
      await expect(page.getByText(route.mustHaveText).first()).toBeVisible();
      await page.waitForLoadState("networkidle");

      const hydrationErrors = errors.filter((e) => /hydrat/i.test(e));
      expect(
        hydrationErrors,
        `${route.path}\n${hydrationErrors.join("\n")}`,
      ).toEqual([]);
    });
  }
});
