import { test, expect } from '../../test-options';

test.describe('Automation Practice - Dropdown', () => {
  test.beforeEach(async ({ pageManager }) => {
    await pageManager.getAutomationPracticePage().goto();
  });

  test('Select dropdown options', async ({ pageManager }) => {
    await pageManager.getAutomationPracticePage().selectDropdownOption('Option1');
    await expect(pageManager.getAutomationPracticePage().getSelectedDropdownValue()).resolves.toBe('option1');

    await pageManager.getAutomationPracticePage().selectDropdownOption('Option2');
    await expect(pageManager.getAutomationPracticePage().getSelectedDropdownValue()).resolves.toBe('option2');

    await pageManager.getAutomationPracticePage().selectDropdownOption('Option3');
    await expect(pageManager.getAutomationPracticePage().getSelectedDropdownValue()).resolves.toBe('option3');
  });
});