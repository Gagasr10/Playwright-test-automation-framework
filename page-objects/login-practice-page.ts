import { Page, expect } from "@playwright/test";
import { HelperBase } from "./helper-base";

export class LoginPracticePage extends HelperBase {
  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  }

  async login(username: string, password: string, userType: "teacher" | "student" | "consultant") {
    const dropdown = this.page.locator("select.form-control");
    if (userType === "teacher") {
      await dropdown.selectOption({ label: "Teacher" });
    } else if (userType === "student") {
      await dropdown.selectOption({ label: "Student" });
    } else {
      await dropdown.selectOption({ label: "Consultant" });
    }

    await this.page.locator("#username").fill(username);
    await this.page.locator("#password").fill(password);
    await this.page.locator("#terms").check();
    await this.page.locator("#signInBtn").click();
  }

  async selectUserRole(role: string) {
    await this.page.locator("select.form-control").selectOption({ label: role });
  }

  async getErrorMessage(): Promise<string> {
    const errorDiv = this.page.locator(".alert-danger");
    await errorDiv.waitFor({ state: "visible", timeout: 5000 });
    const text = (await errorDiv.textContent()) || "";
    return text.trim();
  }

  async verifyLoginSuccess() {
    await expect(this.page).toHaveURL(/shop/);
  }

  // New methods for radio buttons and checkbox
  async selectAdminRadio() {
    await this.page.locator('input[value="admin"]').check();
  }

  async selectUserRadio() {
    await this.page.locator('input[value="user"]').check();
  }

  async isAdminRadioChecked(): Promise<boolean> {
    return await this.page.locator('input[value="admin"]').isChecked();
  }

  async isUserRadioChecked(): Promise<boolean> {
    return await this.page.locator('input[value="user"]').isChecked();
  }

  async checkTermsCheckbox() {
    await this.page.locator("#terms").check();
  }

  async uncheckTermsCheckbox() {
    await this.page.locator("#terms").uncheck();
  }

  async isTermsCheckboxChecked(): Promise<boolean> {
    return await this.page.locator("#terms").isChecked();
  }
}