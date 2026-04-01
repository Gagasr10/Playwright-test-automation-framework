import { test, expect } from '../../test-options';

test.describe('GreenKart Search', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(''); // uses baseURL from config
  });

  test('Search for "ca" returns 4 results', async ({ pageManager }) => {
    await pageManager.getGreenKartPage().search('ca');
    await expect(pageManager.getGreenKartPage().getVisibleProductsLocator()).toHaveCount(4);
  });

  test('Search for "br" returns 2 results', async ({ pageManager }) => {
    await pageManager.getGreenKartPage().search('br');
    await expect(pageManager.getGreenKartPage().getVisibleProductsLocator()).toHaveCount(2);
  });

  test('Search for "cu" returns 2 results', async ({ pageManager }) => {
    await pageManager.getGreenKartPage().search('cu');
    await expect(pageManager.getGreenKartPage().getVisibleProductsLocator()).toHaveCount(2);
  });


  test('Search for non‑existing product shows no results', async ({ pageManager }) => {
    await pageManager.getGreenKartPage().search('xyz123');
    await expect(pageManager.getGreenKartPage().getVisibleProductsLocator()).toHaveCount(0);
  });
});