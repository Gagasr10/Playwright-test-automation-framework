import { test, expect } from '../../test-options';

test.describe('Automation Practice - Radio & Checkbox', () => {
  test.beforeEach(async ({ pageManager }) => {
    await pageManager.getAutomationPracticePage().goto();
  });

  test('Select radio buttons', async ({ pageManager }) => {
    await pageManager.getAutomationPracticePage().selectRadio('radio1');
    await expect(pageManager.getAutomationPracticePage().isRadioSelected('radio1')).resolves.toBe(true);

    await pageManager.getAutomationPracticePage().selectRadio('radio2');
    await expect(pageManager.getAutomationPracticePage().isRadioSelected('radio2')).resolves.toBe(true);
    await expect(pageManager.getAutomationPracticePage().isRadioSelected('radio1')).resolves.toBe(false);
  });

  test('Check and uncheck checkboxes', async ({ pageManager }) => {
    await pageManager.getAutomationPracticePage().checkOption('option1');
    await expect(pageManager.getAutomationPracticePage().isOptionChecked('option1')).resolves.toBe(true);

    await pageManager.getAutomationPracticePage().uncheckOption('option1');
    await expect(pageManager.getAutomationPracticePage().isOptionChecked('option1')).resolves.toBe(false);
  });
});