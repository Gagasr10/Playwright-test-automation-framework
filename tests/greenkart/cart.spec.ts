import { test, expect } from '../../test-options';

test.describe('GreenKart Cart', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('');
    const { GreenKartPage } = await import('../../page-objects/greenkart-page');
    const greenKart = new GreenKartPage(page);
    await greenKart.clearCart();
  });

  test('Add a single product to cart and verify', async ({ pageManager }) => {
    await pageManager.getGreenKartPage().search('ca');
    await pageManager.getGreenKartPage().addProductToCart('Cashews');
    await pageManager.getGreenKartPage().verifyProductInCart('Cashews');
  });

  test('Add multiple products to cart and verify cart count', async ({ pageManager }) => {
    // Add Cashews
    await pageManager.getGreenKartPage().search('ca');
    await pageManager.getGreenKartPage().addProductToCart('Cashews');

    // Add Almonds
    await pageManager.getGreenKartPage().search('alm');
    await pageManager.getGreenKartPage().addProductToCart('Almonds');

    // Open cart and verify count
    await pageManager.getGreenKartPage().goToCart();
    const count = await pageManager.getCartPage().getCartItemCount();
    expect(count).toBe(2);
  });
});