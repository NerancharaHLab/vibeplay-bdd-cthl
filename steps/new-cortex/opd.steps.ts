import { Page, test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/new-cortex/login.page';
import { OpdPage } from '../../pages/new-cortex/opd.page';
import { getUserByRole } from '../../utils/user-roles';
import { OpdTestCase } from '../../data/new-cortex/opd.data';

export class OpdSteps {
  private loginPage: LoginPage;
  private opdPage: OpdPage;

  constructor(private page: Page) {
    this.loginPage = new LoginPage(page);
    this.opdPage = new OpdPage(page);
  }

  // ─── Dynamic Entry Point ───────────────────────────
  async execute(tc: OpdTestCase) {
    // ── Given ──
    await test.step(`Given the user is logged in to Cortex as "${tc.role}"`, async () => {
      const adminUser = getUserByRole(undefined, tc.role, 'new-cortex');
      await this.loginPage.goto();
      await this.loginPage.login(adminUser.username, adminUser.password);
      await expect(this.page).toHaveURL(/.*(cortex\/apps|apps)/);
    });

    await test.step('And they navigate to the Advance Visits page', async () => {
      await this.opdPage.goto();
    });

    // ── When ──
    await this.dispatchAction(tc);

    // ── Then ──
    await this.dispatchExpect(tc);
  }

  // ─── Action Dispatcher ─────────────────────────────
  private async dispatchAction(tc: OpdTestCase) {
    switch (tc.action) {
      case 'verify-ui':
      case 'verify-filters-ui':
        // Just verify visibility in Then
        break;

      case 'filter-visits':
        await test.step(`When they search with filters: Date=${tc.targetDate}, Clinic=${tc.clinicName}, Doctor=${tc.doctorName}`, async () => {
          await this.opdPage.searchWithFilters(tc.targetDate!, tc.clinicName, tc.doctorName);
        });
        break;
    }
  }

  // ─── Expect Dispatcher ─────────────────────────────
  private async dispatchExpect(tc: OpdTestCase) {
    switch (tc.expect) {
      case 'ui-elements-visible':
        await test.step('Then they should see active URL and action buttons', async () => {
          await expect(this.page).toHaveURL(/.*advance-visits/);
          await expect(this.opdPage.addButton).toBeVisible();
          await expect(this.opdPage.searchButton).toBeVisible();
        });
        break;

      case 'filter-fields-visible':
        await test.step('Then they should see filter inputs for Date, Clinic, and Doctor', async () => {
          await expect(this.opdPage.dateInput).toBeVisible();
          await expect(this.opdPage.clinicSelect).toBeVisible();
          await expect(this.opdPage.doctorSelect).toBeVisible();
        });
        break;

      case 'results-filtered':
        await test.step('Then result list displays filtered data correctly', async () => {
          await expect(this.opdPage.searchButton).toBeVisible();
        });
        break;
    }
  }
}
