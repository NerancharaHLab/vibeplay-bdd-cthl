import { Page, test } from '@playwright/test';
import { IpdOrdersPage } from '../../pages/ipd-orders.page';
import { getRoute } from '../../utils/test-helpers';

/**
 * Shared navigation steps — common navigation flows reusable across modules.
 */
export class NavigationSteps {
  private ipdOrdersPage: IpdOrdersPage;

  constructor(private page: Page) {
    this.ipdOrdersPage = new IpdOrdersPage(page);
  }

  async openPatientWorkspace(hn: string, ward: string) {
    await test.step(`When the user opens patient workspace HN "${hn}" in ward "${ward}"`, async () => {
      await this.ipdOrdersPage.navigateToIpdSelectWard();
      await this.ipdOrdersPage.selectWardAndPatient(ward, hn);
    });
  }

  async navigateToIpdSummary() {
    await test.step('And the user navigates to the IPD Summary page', async () => {
      await this.ipdOrdersPage.openIpdSummary();
    });
  }

  async navigateToModule(path: string) {
    await test.step(`When the user navigates to "${path}"`, async () => {
      await this.page.goto(getRoute(path));
      await this.page.waitForLoadState('domcontentloaded');
    });
  }
}
