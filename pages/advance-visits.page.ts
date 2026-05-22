import { Page, Locator } from '@playwright/test';
import { AdvanceVisitsLocators } from '../locators/advance-visits.locators';

export class AdvanceVisitsPage {
  readonly page: Page;
  readonly dateInput: Locator;
  readonly clinicSelect: Locator;
  readonly doctorSelect: Locator;
  readonly searchButton: Locator;
  readonly addButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dateInput = page.locator(AdvanceVisitsLocators.appointmentDate);
    this.clinicSelect = page.locator(AdvanceVisitsLocators.clinicSelect);
    this.doctorSelect = page.locator(AdvanceVisitsLocators.doctorSelect);
    this.searchButton = page.locator(AdvanceVisitsLocators.searchButton);
    this.addButton = page.locator(AdvanceVisitsLocators.addAppointmentButton);
  }

  async goto() {
    // Navigate directly to the advance-visits URL from the screenshot
    await this.page.goto('/cortex/reception/advance-visits');
  }

  async searchWithFilters(date: string) {
    await this.dateInput.fill(date);
    await this.searchButton.click();
  }
}
