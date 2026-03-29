import {Page} from '@playwright/test';

export class HelperBase {
    protected page: Page

    constructor(page: Page) {
        this.page = page;
    }

    async generateRandomEmail(): Promise<string> {
        const timestamp = Date.now()
        return `user${timestamp}@test.com`
    }

    async waitForNumberOfSeconds(timeInSeconds: number) {
        await this.page.waitForTimeout(timeInSeconds * 1000)
    }

    async takeScreenshot(name: string) {
        await this.page.screenshot({ path: `screenshots/${name}.png` })
  }

    async getCurrentUrl(): Promise<string> {
        return this.page.url()
    }

    async waitPageLoad() {
        await this.page.waitForLoadState('networkidle')
}

}