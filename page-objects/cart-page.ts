import { Page, expect } from "@playwright/test";
import { HelperBase } from "./helper-base";

export class CartPage extends HelperBase {
  private cartTable = this.page.locator(".cart-table");
  private cartItems = this.page.locator(".cart-item");
  private proceedButton = this.page.locator(
    ".cart-preview .action-block button",
  );
  private placeOrderButton = this.page.locator(
    'button:has-text("Place Order")',
  );

  constructor(page: Page) {
    super(page);
  }

  async getCartItemCount(): Promise<number> {
    // Wait for at least one cart item to be present before counting
    await this.cartItems.first().waitFor({ state: "attached" });
    return await this.cartItems.count();
  }

  async verifyCartContains(productName: string) {
    // The expect will auto-wait for the text to appear
    await expect(this.cartTable).toContainText(productName);
  }

  async proceedToCheckout() {
    await this.proceedButton.click();
    // Wait for the checkout page to load – wait for the "Place Order" button to be visible
    await this.placeOrderButton.waitFor({ state: "visible" });
  }

  async placeOrder() {
    await this.placeOrderButton.click();
    // Wait for the order confirmation message (or next page element)
    // This is optional; the next page object will handle its own waits.
  }
}
