import { test, expect } from '../../test-options';

test.describe('Login Practice - User Roles', () => {
  test.beforeEach(async ({ pageManager }) => {
    await pageManager.getLoginPracticePage().goto();
  });

  test('Select user role from dropdown and verify', async ({ pageManager }) => {
    await pageManager.getLoginPracticePage().selectUserRole('Teacher');
    await expect(pageManager.getLoginPracticePage().getSelectedUserRole()).resolves.toBe('teach');

    await pageManager.getLoginPracticePage().selectUserRole('Student');
    await expect(pageManager.getLoginPracticePage().getSelectedUserRole()).resolves.toBe('stud');
  });
});