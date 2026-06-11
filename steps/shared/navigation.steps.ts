import { Page, test } from '@playwright/test';
import { IpdPage } from '../../pages/new-cortex/ipd.page';
import { getRoute } from '../../utils/test-helpers';

/**
 * Shared navigation steps — common navigation flows reusable across modules.
 */
export class NavigationSteps {
  private ipdPage: IpdPage;

  constructor(private page: Page) {
    this.ipdPage = new IpdPage(page);
  }

  async openPatientWorkspace(hn: string, ward: string) {
    await test.step(`When the user opens patient workspace HN "${hn}" in ward "${ward}"`, async () => {
      await this.ipdPage.navigateToIpdSelectWard();
      await this.ipdPage.selectWardAndPatient(ward, hn);
    });
  }

  async navigateToIpdSummary() {
    await test.step('And the user navigates to the IPD Summary page', async () => {
      await this.ipdPage.openIpdSummary();
    });
  }

  async navigateToModule(path: string) {
    await test.step(`When the user navigates to "${path}"`, async () => {
      await this.page.goto(getRoute(path));
      await this.page.waitForLoadState('domcontentloaded');
    });
  }
}
