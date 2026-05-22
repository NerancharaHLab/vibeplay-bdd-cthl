import { Page, Locator, FrameLocator } from '@playwright/test';
import { MedicalRecordLocators } from '../locators/medical-record.locators';

export class MedicalRecordPage {
  readonly page: Page;
  readonly iframe: FrameLocator;

  // Search fields
  readonly searchHNInput: Locator;
  readonly searchNameInput: Locator;
  readonly searchButton: Locator;
  readonly clearButton: Locator;

  // Create patient
  readonly createNewPatientButton: Locator;

  // Registration form (for create new patient)
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly idCardInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.iframe = page.frameLocator(MedicalRecordLocators.iframe);

    // Search elements within iframe
    this.searchHNInput = this.iframe.locator(MedicalRecordLocators.searchHN);
    this.searchNameInput = this.iframe.locator(MedicalRecordLocators.searchName);
    this.searchButton = this.iframe.locator(MedicalRecordLocators.searchButton);
    this.clearButton = this.iframe.locator(MedicalRecordLocators.clearButton);

    this.createNewPatientButton = this.iframe.locator(MedicalRecordLocators.createNewPatientButton);

    // Registration form (may be in different context when implemented)
    this.firstNameInput = page.locator(MedicalRecordLocators.firstNameInput);
    this.lastNameInput = page.locator(MedicalRecordLocators.lastNameInput);
    this.idCardInput = page.locator(MedicalRecordLocators.idCardInput);
    this.submitButton = page.locator(MedicalRecordLocators.submitButton);
  }

  async searchByHN(hn: string) {
    await this.searchHNInput.fill(hn);
    await this.searchButton.click();
  }

  async clearSearch() {
    await this.clearButton.click();
  }

  async clickCreateNewPatient() {
    await this.createNewPatientButton.click();
  }

  async fillPatientInfo(firstName: string, lastName: string, idCard: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.idCardInput.fill(idCard);
  }
}
