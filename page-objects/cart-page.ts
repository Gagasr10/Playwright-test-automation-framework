import { Page, expect } from "@playwright/test";
import { HelperBase } from "./helper-base";

export class CartPage extends HelperBase {
  private cartPreview = this.page.locator(".cart-preview");
  private cartItems = this.cartPreview.locator(".cart-item");
  private proceedButton = this.page.locator(".cart-preview .action-block button");
  private placeOrderButton = this.page.locator('button:has-text("Place Order")');

  constructor(page: Page) {
    super(page);
  }

  async getCartItemCount(): Promise<number> {
    await this.cartPreview.waitFor({ state: "visible" });
    await this.cartItems.first().waitFor({ state: "attached" });
    return await this.cartItems.count();
  }

  async verifyCartContains(productName: string) {
    await this.cartPreview.waitFor({ state: "visible" });
    await expect(this.cartPreview).toContainText(productName);
  }

  async proceedToCheckout() {
    await this.proceedButton.click();
  }

  async placeOrder() {
    await this.placeOrderButton.click();
  }
}