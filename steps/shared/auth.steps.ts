import { Page, test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
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
      await expect(this.page).toHaveURL(/.*(cortex\/apps|apps)/);
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

  async thenShouldBeRedirectedToDashboard() {
    await test.step('Then should be redirected to the dashboard', async () => {
      await expect(this.page).toHaveURL(/.*(cortex\/apps|apps)/);
      await expect(
        this.page.locator('.ant-layout-content, .ant-layout-header').first()
      ).toBeVisible();
    });
  }
}
