import { Page, expect } from "@playwright/test";
import { HelperBase } from "./helper-base";

export class LoginPracticePage extends HelperBase {
  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  }

  async login(
    username: string,
    password: string,
    userType: "teacher" | "student",
  ) {
    await this.page.locator("#username").fill(username);
    await this.page.locator("#password").fill(password);
    if (userType === "teacher") {
      await this.page.locator('input[value="teach"]').check();
    } else {
      await this.page.locator('input[value="stud"]').check();
    }
    await this.page.locator("#terms").check();
    await this.page.locator("#signInBtn").click();
  }

  async selectUserRole(role: string) {
    await this.page
      .locator("select.form-control")
      .selectOption({ label: role });
  }

  async getErrorMessage(): Promise<string> {
    return (await this.page.locator(".alert-danger").textContent()) || "";
  }

  async verifyLoginSuccess() {
    await expect(this.page).toHaveURL(/shop/);
  }
}
