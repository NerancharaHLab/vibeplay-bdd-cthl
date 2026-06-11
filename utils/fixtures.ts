import { test as baseTest } from '@playwright/test';
import { AuthSteps } from '../steps/shared/auth.steps';
import { NavigationSteps } from '../steps/shared/navigation.steps';
import { OpdSteps } from '../steps/new-cortex/opd.steps';
import { IpdSteps } from '../steps/new-cortex/ipd.steps';
import { MedicalRecordSteps } from '../steps/new-cortex/medical-record.steps';
import { PharmacySteps } from '../steps/new-cortex/pharmacy.steps';
import { RegistrationSbhSteps } from '../steps/sbh/registration.steps';
import { ClaimSteps } from '../steps/new-cortex/claim.steps';

/**
 * Unified test fixtures — register all step classes here once.
 * Every spec file can destructure only the steps it needs.
 */
type AllFixtures = {
  auth: AuthSteps;
  nav: NavigationSteps;
  opdSteps: OpdSteps;
  ipdSteps: IpdSteps;
  medicalRecordSteps: MedicalRecordSteps;
  pharmacySteps: PharmacySteps;
  registrationSbhSteps: RegistrationSbhSteps;
  claimSteps: ClaimSteps;
};

export const test = baseTest.extend<AllFixtures>({
  auth: async ({ page }, use) => {
    await use(new AuthSteps(page));
  },
  nav: async ({ page }, use) => {
    await use(new NavigationSteps(page));
  },
  opdSteps: async ({ page }, use) => {
    await use(new OpdSteps(page));
  },
  ipdSteps: async ({ page }, use) => {
    await use(new IpdSteps(page));
  },
  medicalRecordSteps: async ({ page }, use) => {
    await use(new MedicalRecordSteps(page));
  },
  pharmacySteps: async ({ page }, use) => {
    await use(new PharmacySteps(page));
  },
  registrationSbhSteps: async ({ page }, use) => {
    await use(new RegistrationSbhSteps(page));
  },
  claimSteps: async ({ page }, use) => {
    await use(new ClaimSteps(page));
  },
});

export { expect } from '@playwright/test';
