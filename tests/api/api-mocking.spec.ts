import { test, expect } from '@playwright/test';
import tagsMock from '../../test-data/tags.json';

test.describe('Mocking API Responses', () => {
  test('Mock /api/tags response', async ({ page }) => {
    await page.route('**/api/tags', async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify(tagsMock),
      });
    });

    await page.goto('https://conduit.bondaracademy.com/');

    await expect(page.locator('.tag-list')).toContainText(tagsMock.tags[0]);
    await expect(page.locator('.tag-list')).toContainText(tagsMock.tags[1]);
  });

  test('Mock articles list to be empty', async ({ page }) => {
    await page.route('**/api/articles*', async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({ articles: [], articlesCount: 0 }),
      });
    });

    await page.goto('https://conduit.bondaracademy.com/');

    await expect(page.locator('.article-preview')).toHaveCount(0);
    await expect(page.locator('.article-preview')).toContainText('No articles are here... yet');
  });
});
