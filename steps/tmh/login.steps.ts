import { Page, test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/tmh/login.page';

export class LoginSteps {
  private loginPage: LoginPage;

  constructor(private page: Page) {
    this.loginPage = new LoginPage(page);
  }

  async givenUserIsOnLoginPage() {
    await test.step('Given the user is on the TMH login page', async () => {
      await this.loginPage.goto();
    });
  }

  async whenUserLogsIn(username: string, password: string) {
    await test.step(`When the user enters credentials and logs in as "${username}"`, async () => {
      await this.loginPage.login(username, password);
    });
  }

  async thenShouldBeRedirectedToDashboard(usernameOrDisplayName?: string) {
    await test.step('Then they should be redirected to the applications page and the dashboard should be visible', async () => {
      await expect(this.page).toHaveURL(/.*cortex.*/);
      await expect(this.page.locator('.ant-layout-content, .ant-layout-header').first()).toBeVisible();
      await expect(this.page.getByText('ยินดีต้อนรับสู่ Cortex')).toBeVisible({ timeout: 15000 });
      if (usernameOrDisplayName) {
        await expect(this.loginPage.profileDropdown.first()).toBeVisible({ timeout: 10000 });
        await expect(this.loginPage.profileDropdown.first()).toContainText(usernameOrDisplayName);
      }
    });
  }
}
