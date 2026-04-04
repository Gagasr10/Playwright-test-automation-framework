import { test, expect } from '../../test-options';

test.describe('Login Practice - Radio & Checkbox', () => {
  test.beforeEach(async ({ pageManager }) => {
    await pageManager.getLoginPracticePage().goto();
  });

  test('Select admin radio button', async ({ pageManager }) => {
    await pageManager.getLoginPracticePage().selectAdminRadio();
    await expect(pageManager.getLoginPracticePage().isAdminRadioChecked()).resolves.toBe(true);
    await expect(pageManager.getLoginPracticePage().isUserRadioChecked()).resolves.toBe(false);
  });

  test('Select user radio button', async ({ pageManager }) => {
    await pageManager.getLoginPracticePage().selectUserRadio();
    await expect(pageManager.getLoginPracticePage().isUserRadioChecked()).resolves.toBe(true);
    await expect(pageManager.getLoginPracticePage().isAdminRadioChecked()).resolves.toBe(false);
  });

  test('Check terms checkbox', async ({ pageManager }) => {
    await pageManager.getLoginPracticePage().checkTermsCheckbox();
    await expect(pageManager.getLoginPracticePage().isTermsCheckboxChecked()).resolves.toBe(true);
    await pageManager.getLoginPracticePage().uncheckTermsCheckbox();
    await expect(pageManager.getLoginPracticePage().isTermsCheckboxChecked()).resolves.toBe(false);
  });
});