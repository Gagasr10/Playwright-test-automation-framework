import { Page, expect } from "@playwright/test";
import { HelperBase } from "./helper-base";

export class CheckoutPage extends HelperBase {
  private nameInput = this.page.locator('input[name="name"]');
  private addressInput = this.page.locator("textarea");
  private countrySelect = this.page.locator("select");
  private cityInput = this.page.locator('input[name="city"]');
  private stateInput = this.page.locator('input[name="state"]');
  private zipInput = this.page.locator('input[name="zip"]');
  private paymentMethodRadio = (value: string) => this.page.locator(`input[value="${value}"]`);
  private placeOrderButton = this.page.locator('button:has-text("Place Order")');
  private successMessage = this.page.locator(".wrapperTwo span");

  constructor(page: Page) {
    super(page);
  }

  async fillDetails(
    name: string,
    address: string,
    country: string,
    city: string,
    state: string,
    zip: string,
    paymentMethod: 'cod' | 'netbanking' | 'card'
  ) {
    await this.nameInput.waitFor({ state: "visible" });
    await this.nameInput.fill(name);
    await this.addressInput.fill(address);
    await this.countrySelect.selectOption(country);
    await this.cityInput.fill(city);
    await this.stateInput.fill(state);
    await this.zipInput.fill(zip);
    await this.paymentMethodRadio(paymentMethod).check();
  }

  async submitOrder() {
    await this.placeOrderButton.click();
    await this.successMessage.waitFor({ state: "visible" });
  }

  async verifyOrderSuccess() {
    await expect(this.successMessage).toHaveText('Thank you, your order has been placed successfully');
  }
}