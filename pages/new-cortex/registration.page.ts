import { Page, Locator, FrameLocator } from '@playwright/test';
import { RegistrationLocators } from '../../locators/registration.locators';
import { BasePage } from '../base.page';

export class RegistrationPage extends BasePage {
  readonly iframe: FrameLocator;

  // Create patient elements
  readonly createNewPatientButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly idCardInput: Locator;
  readonly submitButton: Locator;

  // Visit / Appointment elements
  readonly addAppointmentButton: Locator;
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
    this.iframe = page.frameLocator(RegistrationLocators.iframe).first();

    // Create patient elements
    this.createNewPatientButton = this.iframe.getByTestId('create-patient-button');
    this.firstNameInput = page.locator(RegistrationLocators.firstNameInput);
    this.lastNameInput = page.locator(RegistrationLocators.lastNameInput);
    this.idCardInput = page.locator(RegistrationLocators.idCardInput);
    this.submitButton = page.locator(RegistrationLocators.submitButton);

    // Visit / Appointment elements (inside iframe)
    this.addAppointmentButton = this.iframe.locator(RegistrationLocators.addAppointmentButton);
    this.modalClinicTrigger = this.iframe.locator(RegistrationLocators.modalClinicTrigger);
    this.modalDoctorTrigger = this.iframe.locator(RegistrationLocators.modalDoctorTrigger);
    this.modalDoctorSearch = this.iframe.locator(RegistrationLocators.modalDoctorSearch);
    this.modalDateInput = this.iframe.locator(RegistrationLocators.modalDateInput);
    this.modalSearchTimeButton = this.iframe.locator(RegistrationLocators.modalSearchTimeButton);
    this.modalCancelButton = this.iframe.locator(RegistrationLocators.modalCancelButton);
    this.modalSaveButton = this.iframe.locator(RegistrationLocators.modalSaveButton);
    this.modalPatientSearchInput = this.iframe.locator(RegistrationLocators.modalPatientSearchInput);
  }

  // --- Patient Creation Methods ---
  async clickCreateNewPatient() {
    await this.createNewPatientButton.waitFor({ state: 'visible', timeout: 15000 });
    await this.createNewPatientButton.click();
  }

  async fillPatientInfo(firstName: string, lastName: string, idCard: string) {
    await this.firstNameInput.waitFor({ state: 'visible' });
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.idCardInput.fill(idCard);
  }

  async clickSavePatient() {
    await this.submitButton.click();
  }

  // --- Visit / Appointment Creation Methods ---
  async clickAddAppointment() {
    await this.addAppointmentButton.waitFor({ state: 'visible', timeout: 15000 });
    await this.addAppointmentButton.click();
  }

  async fillAppointmentForm(clinic: string, doctorName: string, date: string) {
    // 1. Select Clinic
    await this.modalClinicTrigger.click();
    await this.page.waitForTimeout(1000);
    const clinicOpt = this.iframe.locator('[role="option"], [cmdk-item]').filter({ hasText: clinic }).first();
    await clinicOpt.click();
    await this.page.waitForTimeout(1500); // Wait for doctors API to load

    // 2. Select Doctor
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
    const slotBtn = this.iframe.locator(RegistrationLocators.timeSlotButton(time)).first();
    await slotBtn.waitFor({ state: 'visible' });
    await slotBtn.click();
  }

  async linkPatient(hn: string) {
    await this.modalPatientSearchInput.waitFor({ state: 'visible' });
    await this.modalPatientSearchInput.fill(hn);
    await this.modalPatientSearchInput.press('Enter');
    await this.page.waitForTimeout(1500);
    const patientRow = this.iframe.locator(RegistrationLocators.modalPatientRow(hn)).first();
    await patientRow.click();
  }

  async clickSaveAppointment() {
    await this.modalSaveButton.waitFor({ state: 'visible' });
    await this.modalSaveButton.click();
  }
}
