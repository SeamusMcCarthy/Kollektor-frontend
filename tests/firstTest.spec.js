// @ts-check
const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/");
});

test.describe.configure({ mode: "parallel" });

// test.describe("Initial connectivity trial", () => {
test("Confirms we are on the homepage", async ({ page }) => {
  await page.locator("text=Categories").click();
  await page.locator("text=Guitar").click();
});

test("Test login - invalid details", async ({ page }) => {
  await page.locator("text=Authenticate").click();
  await page.locator("text=Email").fill("invalid@email.com");
  await page.locator("text=Password").type("invalid");
  await page.locator("text=Log in").click();
  const locator = page.locator("text=An error occurred");
  await expect(locator).toBeVisible();
});

test("Test login - valid details", async ({ page }) => {
  await page.locator("text=Authenticate").click();
  await page.locator("text=Email").fill("test_dummy10@test.com");
  await page.locator("text=Password").fill("testtest");
  await page.locator("text=Log in").click();
  const locator = page.locator("text=Guitar");
  await expect(locator).toBeVisible();
});
// });
