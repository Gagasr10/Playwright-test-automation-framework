import { test, expect } from '../../test-options';

test.describe('GreenKart Checkout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('');
    const { GreenKartPage } = await import('../../page-objects/greenkart-page');
    const greenKart = new GreenKartPage(page);
    await greenKart.clearCart();
  });

  test('Complete checkout process for a single product', async ({ page, pageManager }) => {
    await pageManager.getGreenKartPage().search('ca');
    await pageManager.getGreenKartPage().addProductToCart('Cashews');
    await pageManager.getGreenKartPage().goToCart();

    await pageManager.getCartPage().proceedToCheckout();

    // Step 1: On the order summary page, click "Place Order"
    const placeOrderButton = page.locator('button:has-text("Place Order")');
    await expect(placeOrderButton).toBeVisible();
    await placeOrderButton.click();

    // Step 2: Wait for the checkbox to appear on the next page
    const checkbox = page.locator('.chkAgree');
    await checkbox.waitFor({ state: 'visible', timeout: 10000 });
    await checkbox.check();

    // Step 3: Click the "Proceed" button
    const proceedButton = page.locator('button:has-text("Proceed")');
    await proceedButton.click();

    // Step 4: Verify the success message
    await expect(page.locator('body')).toContainText('Thank you, your order has been placed successfully');
  });
});