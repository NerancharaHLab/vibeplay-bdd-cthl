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
    // ── Given ──
    await this.givenUserIsOnLoginPage();

    // ── When ──
    await test.step(`When user logs in (action: ${tc.action})`, async () => {
      if (tc.username && tc.password) {
        await this.loginPage.login(tc.username, tc.password);
      } else {
        const user = getUserByRole(undefined, tc.role, 'new-cortex');
        await this.loginPage.login(user.username, user.password);
      }
    });

    // ── Then ──
    if (tc.expect === 'success-and-redirected') {
      const user = getUserByRole(undefined, tc.role, 'new-cortex');
      await this.thenShouldBeRedirectedToDashboard(user.displayName || user.username);
    } else if (tc.expect === 'error-invalid-credentials') {
      await this.thenShouldShowInvalidCredentialsError();
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

  async thenShouldShowInvalidCredentialsError() {
    await test.step('Then they should see the red invalid credentials error message "Invalid username or password." on the login screen', async () => {
      // Keycloak displays error notifications within a red alert box (often having class alert-error or id input-error)
      const errorAlert = this.page.locator([
        '.alert-error',
        '#input-error',
        '.kc-feedback-text',
        'text="Invalid username or password."',
        'text="ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"'
      ].join(', ')).first();
      
      await expect(errorAlert).toBeVisible({ timeout: 15000 });
      await expect(errorAlert).toContainText(/Invalid username or password\.|ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง/i);
    });
  }
}
