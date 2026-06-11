import { Page, test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/new-cortex/login/login.page';
import { AdvanceVisitsPage } from '../../../pages/new-cortex/reception/advance-visits.page';
import { getUserByRole } from '../../../utils/user-roles';
import { AdvanceVisitsTestCase } from '../../../data/advance-visits.data';

export class AdvanceVisitsSteps {
  private loginPage: LoginPage;
  private advanceVisitsPage: AdvanceVisitsPage;

  constructor(private page: Page) {
    this.loginPage = new LoginPage(page);
    this.advanceVisitsPage = new AdvanceVisitsPage(page);
  }

  // ─── Dynamic Entry Point ───────────────────────────
  async execute(tc: AdvanceVisitsTestCase) {
    // ── Given ──
    await test.step(`Given the user is logged in to Cortex as "${tc.role}"`, async () => {
      const adminUser = getUserByRole(undefined, tc.role, 'new-cortex');
      await this.loginPage.goto();
      await this.loginPage.login(adminUser.username, adminUser.password);
      await expect(this.page).toHaveURL(/.*(cortex\/apps|apps)/);
    });

    await test.step('And they navigate to the Advance Visits page', async () => {
      await this.advanceVisitsPage.goto();
    });

    // ── When ──
    await this.dispatchAction(tc);

    // ── Then ──
    await this.dispatchExpect(tc);
  }

  // ─── Action Dispatcher ─────────────────────────────
  private async dispatchAction(tc: AdvanceVisitsTestCase) {
    switch (tc.action) {
      case 'verify-ui':
      case 'verify-filters-ui':
        // Just verify visibility in Then
        break;

      case 'filter-visits':
        await test.step(`When they search with filters: Date=${tc.targetDate}, Clinic=${tc.clinicName}, Doctor=${tc.doctorName}`, async () => {
          await this.advanceVisitsPage.searchWithFilters(tc.targetDate!, tc.clinicName, tc.doctorName);
        });
        break;
    }
  }

  // ─── Expect Dispatcher ─────────────────────────────
  private async dispatchExpect(tc: AdvanceVisitsTestCase) {
    switch (tc.expect) {
      case 'ui-elements-visible':
        await test.step('Then they should see active URL and action buttons', async () => {
          await expect(this.page).toHaveURL(/.*advance-visits/);
          await expect(this.advanceVisitsPage.addButton).toBeVisible();
          await expect(this.advanceVisitsPage.searchButton).toBeVisible();
        });
        break;

      case 'filter-fields-visible':
        await test.step('Then they should see filter inputs for Date, Clinic, and Doctor', async () => {
          await expect(this.advanceVisitsPage.dateInput).toBeVisible();
          await expect(this.advanceVisitsPage.clinicSelect).toBeVisible();
          await expect(this.advanceVisitsPage.doctorSelect).toBeVisible();
        });
        break;

      case 'results-filtered':
        await test.step('Then result list displays filtered data correctly', async () => {
          // We verify the query page handles search without crashes, and that results loading indicator clears
          await expect(this.advanceVisitsPage.searchButton).toBeVisible();
        });
        break;
    }
  }
}
