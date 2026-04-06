import { test, expect } from '../../test-options';

test.describe('Automation Practice - Table', () => {
  test.beforeEach(async ({ pageManager }) => {
    await pageManager.getAutomationPracticePage().goto();
  });

  test('Get table data and verify values', async ({ pageManager }) => {
    const data = await pageManager.getAutomationPracticePage().getTableData();
    expect(data.length).toBeGreaterThan(1);
    expect(data[0]).toContain('Instructor');
    const allText = data.flat().join(' ');
    expect(allText).toContain('Rahul Shetty');
  });
});
