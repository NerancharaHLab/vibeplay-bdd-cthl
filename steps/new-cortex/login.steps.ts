import { Page, test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/new-cortex/login.page';
import { getUserByRole } from '../../utils/user-roles';
import { LoginTestCase } from '../../data/new-cortex/login.data';

export class LoginSteps {
  private loginPage: LoginPage;

  constructor(private page: Page) {
    this.loginPage = new LoginPage(page);
  }

  // ─── Dynamic Entry Point ───────────────────────────
  async execute(tc: LoginTestCase) {
    const user = getUserByRole(undefined, tc.role, 'new-cortex');

    // ── Given ──
    await this.givenUserIsOnLoginPage();

    // ── When ──
    await test.step(`When user logs in as "${tc.role}"`, async () => {
      await this.loginPage.login(user.username, user.password);
    });

    // ── Then ──
    if (tc.expect === 'success-and-redirected') {
      await this.thenShouldBeRedirectedToDashboard(user.displayName || user.username);
    }
  }

  // ─── Helper Methods (for reuse in other steps) ─────
  async givenUserIsOnLoginPage() {
    await test.step('Given the user is on the Cortex login page', async () => {
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
