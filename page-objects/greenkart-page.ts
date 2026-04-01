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
    await this.searchInput.pressSequentially(product, { delay: 100 });
    
  }

  /**
   * Returns a locator for all visible products after a search.
   * This is used in tests to assert the number of results.
   */
  getVisibleProductsLocator(): Locator {
    return this.visibleProducts;
  }

  async addProductToCart(productName: string) {
    const product = this.visibleProducts.filter({ hasText: productName });
    await product.locator('.product-action button').click();
  }

  // Optional: keep for backward compatibility, but prefer using toHaveCount in tests
  async getSearchResultCount(): Promise<number> {
    return await this.visibleProducts.count();
  }

  async goToCart() {
    await this.cartIcon.click();
    await expect(this.cartPreview).toBeVisible();
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
}