import { test as base, Page } from '@playwright/test';
import { PageManager } from './page-objects/page-manager';

export type TestOptions = {
  pageManager: PageManager;
};

export const test = base.extend<TestOptions>({
  pageManager: async ({ page }, use) => {
    const pm = new PageManager(page);
    await use(pm);
  },
});

export { expect } from '@playwright/test';
