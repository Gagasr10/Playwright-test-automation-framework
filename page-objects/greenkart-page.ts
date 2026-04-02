import { Page, expect, Locator } from '@playwright/test';
import { HelperBase } from './helper-base';

export class GreenKartPage extends HelperBase {
  private searchInput = this.page.locator('.search-keyword');
  private visibleProducts = this.page.locator('.product:visible');
  private cartIcon = this.page.locator('.cart-icon img');
  private proceedToCheckout = this.page.locator('.cart-preview .action-block button');
  private cartPreview = this.page.locator('.cart-preview');

  constructor(page: Page) {
    super(page);
  }

  async search(product: string) {
    await this.searchInput.clear();
    await this.searchInput.pressSequentially(product, { delay: 100 });
  }

  getVisibleProductsLocator(): Locator {
    return this.visibleProducts;
  }

  async addProductToCart(productName: string) {
    const product = this.visibleProducts.filter({ hasText: productName });
    await product.locator('.product-action button').first().click();
  }

  async getSearchResultCount(): Promise<number> {
    return await this.visibleProducts.count();
  }

  async goToCart() {
    await this.cartIcon.click();
    await expect(this.cartPreview).toBeVisible();
  }

  async closeCart() {
  await this.page.keyboard.press('Escape'); // press Esc to close
  await expect(this.cartPreview).not.toBeVisible();
}

  async proceedToCheckoutPage() {
    await this.proceedToCheckout.click();
  }

  async verifyProductInCart(productName: string) {
    await this.cartIcon.click();
    await this.cartPreview.waitFor({ state: 'visible' });
    await expect(
      this.cartPreview.locator('.cart-items .product-name')
    ).toContainText(productName);
  }

  async clearCart() {
    // Clear localStorage and reload
    await this.page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await this.page.reload();
    await this.page.waitForLoadState('networkidle');
  }
}