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

  // Modal dialog elements (inside iframe)
  readonly modalClinicTrigger: Locator;
  readonly modalDoctorTrigger: Locator;
  readonly modalDoctorSearch: Locator;
  readonly modalDateInput: Locator;
  readonly modalSearchTimeButton: Locator;
  readonly modalCancelButton: Locator;
  readonly modalSaveButton: Locator;
  readonly modalPatientSearchInput: Locator;

  constructor(page: Page) {
    super(page);
    this.iframe = page.frameLocator('iframe').first();

    // Main filters (within iframe context)
    this.dateInput = this.iframe.locator(OpdLocators.appointmentDate);
    this.clinicSelect = this.iframe.locator(OpdLocators.clinicSelect);
    this.doctorSelect = this.iframe.locator(OpdLocators.doctorSelect);
    this.searchButton = this.iframe.locator(OpdLocators.searchButton);
    this.addButton = this.iframe.locator(OpdLocators.addAppointmentButton);

    // Modal dialog elements (within iframe context)
    this.modalClinicTrigger = this.iframe.locator(OpdLocators.modalClinicTrigger);
    this.modalDoctorTrigger = this.iframe.locator(OpdLocators.modalDoctorTrigger);
    this.modalDoctorSearch = this.iframe.locator(OpdLocators.modalDoctorSearch);
    this.modalDateInput = this.iframe.locator(OpdLocators.modalDateInput);
    this.modalSearchTimeButton = this.iframe.locator(OpdLocators.modalSearchTimeButton);
    this.modalCancelButton = this.iframe.locator(OpdLocators.modalCancelButton);
    this.modalSaveButton = this.iframe.locator(OpdLocators.modalSaveButton);
    this.modalPatientSearchInput = this.iframe.locator(OpdLocators.modalPatientSearchInput);
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

  async clickAddAppointment() {
    await this.addButton.waitFor({ state: 'visible', timeout: 15000 });
    await this.addButton.click();
  }

  async fillAppointmentForm(clinic: string, doctorName: string, date: string) {
    // 1. Select Clinic
    await this.modalClinicTrigger.click();
    await this.page.waitForTimeout(1000);
    const clinicOpt = this.iframe.locator('[role="option"], [cmdk-item]').filter({ hasText: clinic }).first();
    await clinicOpt.click();
    await this.page.waitForTimeout(1500); // wait for doctor API to load in background

    // 2. Select Doctor (type name if input is visible, then click option)
    await this.modalDoctorTrigger.click();
    await this.page.waitForTimeout(1000);
    if (await this.modalDoctorSearch.isVisible()) {
      await this.modalDoctorSearch.fill(doctorName);
      await this.page.waitForTimeout(1500);
    }
    const docOpt = this.iframe.locator('[role="option"], [cmdk-item]').filter({ hasText: doctorName }).first();
    await docOpt.click();
    await this.page.waitForTimeout(1000);

    // 3. Fill Date
    await this.modalDateInput.fill(date);
    await this.modalDateInput.press('Enter');
  }

  async searchTimeSlot() {
    await this.modalSearchTimeButton.waitFor({ state: 'visible' });
    await this.modalSearchTimeButton.click();
  }

  async selectTimeSlot(time: string) {
    const slotBtn = this.iframe.locator(OpdLocators.timeSlotButton(time)).first();
    await slotBtn.waitFor({ state: 'visible' });
    await slotBtn.click();
  }

  async linkPatient(hn: string) {
    await this.modalPatientSearchInput.waitFor({ state: 'visible' });
    await this.modalPatientSearchInput.fill(hn);
    await this.modalPatientSearchInput.press('Enter');
    await this.page.waitForTimeout(1500);
    const patientRow = this.iframe.locator(OpdLocators.modalPatientRow(hn)).first();
    await patientRow.click();
  }

  async clickSaveAppointment() {
    await this.modalSaveButton.waitFor({ state: 'visible' });
    await this.modalSaveButton.click();
  }
}
