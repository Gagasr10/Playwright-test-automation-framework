import { test, expect } from '../../test-options';

test.describe('GreenKart Mobile Search', () => {
  test('Search on mobile returns correct results', async ({ page }) => {
    await page.goto('');
    // Make the search input visible
    await page.evaluate(() => {
      const input = document.querySelector('.search-keyword') as HTMLElement;
      if (input) {
        input.style.display = 'block';
        input.style.visibility = 'visible';
        input.style.opacity = '1';
        const parent = input.closest('.search');
        if (parent) (parent as HTMLElement).style.display = 'block';
      }
    });
    await expect(page.locator('.search-keyword')).toBeVisible({ timeout: 5000 });
    await page.locator('.search-keyword').fill('ca');
    // Click the search button to trigger the filter
    await page.locator('.search-button').click();
    // Wait for exactly 4 visible products
    await expect(page.locator('.product:visible')).toHaveCount(4, { timeout: 10000 });
  });
});