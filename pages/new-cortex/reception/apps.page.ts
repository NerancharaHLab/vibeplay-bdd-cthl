import { Page, Locator } from '@playwright/test';
import { AppsLocators } from '../../../locators/new-cortex/reception/apps.locators';

export class AppsPage {
  readonly page: Page;
  readonly medicalRecordCard: Locator;

  constructor(page: Page) {
    this.page = page;
    this.medicalRecordCard = page.locator(AppsLocators.medicalRecordCard);
  }

  async openMedicalRecord() {
    await this.medicalRecordCard.click();
    await this.page.waitForURL(/.*cortex\/medical-record/);
  }
}
