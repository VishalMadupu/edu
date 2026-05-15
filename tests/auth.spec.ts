import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/ServiceLink/);
});

test('navigation to login', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Click the get started link.
  await page.getByRole('link', { name: /Find a Professional/i }).first().click();

  // Expects page to have a login header.
  await expect(page.getByRole('heading', { name: /Client Login/i })).toBeVisible();
});
