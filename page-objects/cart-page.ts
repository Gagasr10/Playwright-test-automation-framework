import { Page, expect } from "@playwright/test";
import { HelperBase } from "./helper-base";

export class CartPage extends HelperBase {
  private cartPreview = this.page.locator(".cart-preview");
  private cartItems = this.cartPreview.locator(".cart-item"); // Scoped to the open cart
  private proceedButton = this.page.locator(".cart-preview .action-block button");
  private placeOrderButton = this.page.locator('button:has-text("Place Order")');

  constructor(page: Page) {
    super(page);
  }

  async getCartItemCount(): Promise<number> {
    // Ensure the cart preview is visible before counting
    await this.cartPreview.waitFor({ state: "visible" });
    // Wait for at least one cart item to be attached
    await this.cartItems.first().waitFor({ state: "attached" });
    return await this.cartItems.count();
  }

  async verifyCartContains(productName: string) {
    await this.cartPreview.waitFor({ state: "visible" });
    await expect(this.cartPreview).toContainText(productName);
  }

  async proceedToCheckout() {
    await this.proceedButton.click();
    await this.placeOrderButton.waitFor({ state: "visible" });
  }

  async placeOrder() {
    await this.placeOrderButton.click();
  }
}