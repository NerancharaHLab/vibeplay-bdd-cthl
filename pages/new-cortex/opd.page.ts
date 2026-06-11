import { Page, Locator, FrameLocator } from '@playwright/test';
import { OpdLocators } from '../../locators/opd.locators';
import { BasePage } from '../base.page';

export class OpdPage extends BasePage {
  readonly iframe: FrameLocator;

  // Main page filters
  readonly dateInput: Locator;
  readonly clinicSelect: Locator;
  readonly doctorSelect: Locator;
  readonly searchButton: Locator;
  readonly addButton: Locator;

  constructor(page: Page) {
    super(page);
    this.iframe = page.frameLocator('iframe').first();

    // Main filters (within iframe context)
    this.dateInput = this.iframe.locator(OpdLocators.appointmentDate);
    this.clinicSelect = this.iframe.locator(OpdLocators.clinicSelect);
    this.doctorSelect = this.iframe.locator(OpdLocators.doctorSelect);
    this.searchButton = this.iframe.locator(OpdLocators.searchButton);
    this.addButton = this.iframe.locator(OpdLocators.addAppointmentButton);
  }

  async goto() {
    await super.goto('/cortex/reception/advance-visits');
  }

  async searchWithFilters(date: string, clinic?: string, doctor?: string) {
    await this.fillInput(this.dateInput, date);
    if (clinic) {
      await this.clinicSelect.click();
      await this.iframe.locator('[role="option"], [cmdk-item]').filter({ hasText: clinic }).first().click();
    }
    if (doctor) {
      await this.doctorSelect.click();
      await this.iframe.locator('[role="option"], [cmdk-item]').filter({ hasText: doctor }).first().click();
    }
    await this.clickElement(this.searchButton);
  }
}
