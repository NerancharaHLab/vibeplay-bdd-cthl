import { Page, Locator } from '@playwright/test';
import { AppsLocators } from '../../locators/opd-apps.locators';

export class AppsPage {
  readonly page: Page;
  readonly medicalRecordCard: Locator;

  constructor(page: Page) {
    this.page = page;
    this.medicalRecordCard = page.getByText('เวชระเบียน').first();
  }

  async openMedicalRecord() {
    await this.medicalRecordCard.click();
    await this.page.waitForURL(/.*(cortex\/medical-record|medical-record|search-patient)/);
  }
}
