import { test } from '@playwright/test';
import { LoginSteps } from '../../steps/new-cortex/login.steps';
import { getUsersForRole } from '../../utils/user-roles';

const SITE_NAME = 'new-cortex';
const selectedUsers = process.env.USER_ROLE
  ? getUsersForRole(process.env.USER_ROLE, SITE_NAME)
  : getUsersForRole(undefined, SITE_NAME);

if (selectedUsers.length === 0) {
  throw new Error(
    `No users found for site="${SITE_NAME}"` +
      `${process.env.USER_ROLE ? ` and role="${process.env.USER_ROLE}"` : ''}`
  );
}

test.describe('New Cortex Cloud Login BDD Tests', () => {
  for (const user of selectedUsers) {
    test(`Login test for user: ${user.username}`, {
      tag: ['@functional', '@login', '@new-cortex', '@regression']
    }, async ({ page }) => {
      const steps = new LoginSteps(page);

      await steps.givenUserIsOnLoginPage();
      await steps.whenUserLogsIn(user.username, user.password);
      await steps.thenShouldBeRedirectedToDashboard();
    });
  }
});
