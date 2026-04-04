import { test, expect } from '../../test-options';

test.describe('Login Practice - Login', () => {
  test.beforeEach(async ({ pageManager }) => {
    await pageManager.getLoginPracticePage().goto();
  });

  test('Successful login with teacher role', async ({ pageManager }) => {
    // Use the correct credentials from the page
    await pageManager.getLoginPracticePage().login(
      'rahulshettyacademy',
      'Learning@830$3mK2',
      'teacher'
    );
    await pageManager.getLoginPracticePage().verifyLoginSuccess();
  });

  test('Failed login with incorrect credentials', async ({ pageManager }) => {
    await pageManager.getLoginPracticePage().login('wrong', 'wrong', 'student');
    const error = await pageManager.getLoginPracticePage().getErrorMessage();
    expect(error).toContain('Incorrect');
  });
});