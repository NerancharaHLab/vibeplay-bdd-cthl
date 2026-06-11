import { Page, test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/new-cortex/login.page';
import { getUserByRole } from '../../utils/user-roles';

/**
 * Shared authentication steps — reusable across all modules.
 * Replaces copy-pasted `givenUserIsLoggedInAs` in every steps class.
 */
export class AuthSteps {
  private loginPage: LoginPage;

  constructor(private page: Page) {
    this.loginPage = new LoginPage(page);
  }

  async givenUserIsLoggedInAs(role: string, site = 'new-cortex') {
    await test.step(`Given the user is logged in as "${role}"`, async () => {
      const user = getUserByRole(undefined, role, site);
      await this.loginPage.goto();
      await this.loginPage.login(user.username, user.password);
      await expect(this.page).toHaveURL(/.*cortex.*/);
      await expect(this.page.getByText('ยินดีต้อนรับสู่ Cortex')).toBeVisible({ timeout: 15000 });
      await expect(this.loginPage.profileDropdown.first()).toBeVisible({ timeout: 10000 });
      await expect(this.loginPage.profileDropdown.first()).toContainText(user.displayName || user.username);
    });
  }

  async givenUserIsOnLoginPage() {
    await test.step('Given the user is on the Cortex login page', async () => {
      await this.loginPage.goto();
    });
  }

  async whenUserLogsIn(username: string, password: string) {
    await test.step(`When the user logs in as "${username}"`, async () => {
      await this.loginPage.login(username, password);
    });
  }

  async thenShouldBeRedirectedToDashboard(usernameOrDisplayName?: string) {
    await test.step('Then should be redirected to the dashboard', async () => {
      await expect(this.page).toHaveURL(/.*cortex.*/);
      await expect(
        this.page.locator('.ant-layout-content, .ant-layout-header').first()
      ).toBeVisible();
      await expect(this.page.getByText('ยินดีต้อนรับสู่ Cortex')).toBeVisible({ timeout: 15000 });
      if (usernameOrDisplayName) {
        await expect(this.loginPage.profileDropdown.first()).toBeVisible({ timeout: 10000 });
        await expect(this.loginPage.profileDropdown.first()).toContainText(usernameOrDisplayName);
      }
    });
  }
}
