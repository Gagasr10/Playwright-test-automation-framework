import { Page, expect } from "@playwright/test";
import { HelperBase } from "./helper-base";

export class GreenKartPage extends HelperBase {
  private searchInput = this.page.locator(".search-keyword");
  private products = this.page.locator(".product");
  private cartIcon = this.page.locator(".cart-icon img");
  private proceedToCheckout = this.page.locator(
    ".cart-preview .action-block button",
  );
  private cartPreview = this.page.locator(".cart-preview"); // Added for waiting

  constructor(page: Page) {
    super(page);
  }

  async search(product: string) {
    await this.searchInput.fill(product);
    await this.products.first().waitFor({ state: "visible" });
  }

  async addProductToCart(productName: string) {
    const product = this.products.filter({ hasText: productName });
    await product.locator(".product-action button").click();
  }

  async getSearchResultsCount(): Promise<number> {
    return await this.products.count();
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
    await this.cartPreview.waitFor({ state: "visible" });
    await expect(
      this.cartPreview.locator(".cart-items .product-name"),
    ).toContainText(productName);
  }
}
