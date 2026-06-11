import { test as baseTest } from '@playwright/test';
import { AuthSteps } from '../steps/shared/auth.steps';
import { NavigationSteps } from '../steps/shared/navigation.steps';
import { AdvanceVisitsSteps } from '../steps/new-cortex/advance-visits.steps';
import { IpdOrdersSteps } from '../steps/new-cortex/ipd-orders.steps';
import { MedicalRecordSteps } from '../steps/new-cortex/medical-record.steps';
import { MedicationSteps } from '../steps/new-cortex/medication.steps';
import { RegistrationSbhSteps } from '../steps/sbh/registration.steps';
import { RegistrationNewCortexSteps } from '../steps/new-cortex/registration.steps';


/**
 * Unified test fixtures — register all step classes here once.
 * Every spec file can destructure only the steps it needs.
 */
type AllFixtures = {
  auth: AuthSteps;
  nav: NavigationSteps;
  advanceVisitsSteps: AdvanceVisitsSteps;
  ipdOrdersSteps: IpdOrdersSteps;
  medicalRecordSteps: MedicalRecordSteps;
  medicationSteps: MedicationSteps;
  registrationSbhSteps: RegistrationSbhSteps;
  registrationNewCortexSteps: RegistrationNewCortexSteps;
};

export const test = baseTest.extend<AllFixtures>({
  auth: async ({ page }, use) => {
    await use(new AuthSteps(page));
  },
  nav: async ({ page }, use) => {
    await use(new NavigationSteps(page));
  },
  advanceVisitsSteps: async ({ page }, use) => {
    await use(new AdvanceVisitsSteps(page));
  },
  ipdOrdersSteps: async ({ page }, use) => {
    await use(new IpdOrdersSteps(page));
  },
  medicalRecordSteps: async ({ page }, use) => {
    await use(new MedicalRecordSteps(page));
  },
  medicationSteps: async ({ page }, use) => {
    await use(new MedicationSteps(page));
  },
  registrationSbhSteps: async ({ page }, use) => {
    await use(new RegistrationSbhSteps(page));
  },
  registrationNewCortexSteps: async ({ page }, use) => {
    await use(new RegistrationNewCortexSteps(page));
  },
});

export { expect } from '@playwright/test';
