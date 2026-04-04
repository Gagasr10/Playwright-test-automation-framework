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

  async getErrorMessage(): Promise<string> {
    const errorDiv = this.page.locator(".alert-danger");
    // Wait for the error message to become visible (max 5 seconds)
    await errorDiv.waitFor({ state: "visible", timeout: 5000 });
    const text = (await errorDiv.textContent()) || "";
    return text.trim();
  }

  async verifyLoginSuccess() {
    await expect(this.page).toHaveURL(/shop/);
  }
}