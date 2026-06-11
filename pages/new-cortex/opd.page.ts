import { Page, Locator } from '@playwright/test';
import { OpdLocators } from '../../locators/opd.locators';
import { BasePage } from '../base.page';

export class OpdPage extends BasePage {
  readonly dateInput: Locator;
  readonly clinicSelect: Locator;
  readonly doctorSelect: Locator;
  readonly searchButton: Locator;
  readonly addButton: Locator;

  constructor(page: Page) {
    super(page);
    this.dateInput = page.locator(OpdLocators.appointmentDate);
    this.clinicSelect = page.locator(OpdLocators.clinicSelect);
    this.doctorSelect = page.locator(OpdLocators.doctorSelect);
    this.searchButton = page.locator(OpdLocators.searchButton);
    this.addButton = page.locator(OpdLocators.addAppointmentButton);
  }

  async goto() {
    await super.goto('/cortex/reception/advance-visits');
  }

  async searchWithFilters(date: string, clinic?: string, doctor?: string) {
    await this.fillInput(this.dateInput, date);
    if (clinic) {
      await this.selectOption(this.clinicSelect, clinic);
    }
    if (doctor) {
      await this.selectOption(this.doctorSelect, doctor);
    }
    await this.clickElement(this.searchButton);
  }
}
