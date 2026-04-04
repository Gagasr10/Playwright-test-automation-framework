import { test, expect } from '@playwright/test';

test.describe('Modify API Response', () => {
  test('Change first article title', async ({ page }) => {
    await page.route('**/api/articles*', async (route) => {
      const response = await route.fetch();
      const body = await response.json();
      if (body.articles && body.articles.length > 0) {
        body.articles[0].title = 'Modified Article Title';
      }
      await route.fulfill({ response, body: JSON.stringify(body) });
    });

    await page.goto('https://conduit.bondaracademy.com/');

    const firstArticleTitle = page.locator('.article-preview h1').first();
    await expect(firstArticleTitle).toHaveText('Modified Article Title');
  });
});
