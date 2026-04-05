import { test } from '../../test-options';

test.describe('Automation Practice - Alert & Confirm', () => {
  test.beforeEach(async ({ pageManager }) => {
    await pageManager.getAutomationPracticePage().goto();
  });

  test('Handle alert dialog', async ({ pageManager }) => {
    await pageManager.getAutomationPracticePage().handleAlertAndAccept('John');
  });

  test('Handle confirm dialog', async ({ pageManager }) => {
    await pageManager.getAutomationPracticePage().handleConfirmAndAccept('Jane');
  });
});
