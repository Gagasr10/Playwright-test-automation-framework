import { Page, expect } from "@playwright/test";
import { HelperBase } from "./helper-base";

export class AutomationPracticePage extends HelperBase {
  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  }

  async selectRadio(value: string) {
    await this.page.locator(`input[value="${value}"]`).check();
  }

  async checkOption(value: string) {
    await this.page.locator(`input[value="${value}"]`).check();
  }

  async uncheckOption(value: string) {
    await this.page.locator(`input[value="${value}"]`).uncheck();
  }

  async selectDropdownOption(text: string) {
    await this.page
      .locator("#dropdown-class-example")
      .selectOption({ label: text });
  }

  async isRadioSelected(value: string): Promise<boolean> {
    return await this.page.locator(`input[value="${value}"]`).isChecked();
  }

  async isOptionChecked(value: string): Promise<boolean> {
    return await this.page.locator(`input[value="${value}"]`).isChecked();
  }

  async getSelectedDropdownValue(): Promise<string> {
    return await this.page.locator("#dropdown-class-example").inputValue();
  }

  async handleAlertAndAccept(name: string) {
    await this.page.locator("#name").fill(name);
    const dialogPromise = new Promise<void>((resolve) => {
      this.page.once("dialog", async (dialog) => {
        expect(dialog.message()).toBe(
          `Hello ${name}, share this practice page and share your knowledge`,
        );
        await dialog.accept();
        resolve();
      });
    });
    await this.page.locator("#alertbtn").click();
    await dialogPromise;
  }

  async handleConfirmAndAccept(name: string) {
    await this.page.locator("#name").fill(name);
    const dialogPromise = new Promise<void>((resolve) => {
      this.page.once("dialog", async (dialog) => {
        expect(dialog.message()).toBe(
          `Hello ${name}, Are you sure you want to confirm?`,
        );
        await dialog.accept();
        resolve();
      });
    });
    await this.page.locator("#confirmbtn").click();
    await dialogPromise;
  }

  async switchToIframe() {
    return this.page.frameLocator("#courses-iframe");
  }

  async getTableData(): Promise<string[][]> {
    const rows = await this.page.locator("table#product tr").all();
    const data: string[][] = [];
    for (let i = 0; i < rows.length; i++) {
      const cells = await rows[i].locator("td, th").allTextContents();
      data.push(cells);
    }
    return data;
  }
}
