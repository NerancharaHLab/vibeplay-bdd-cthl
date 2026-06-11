import { test } from '@playwright/test';
import { MedicalRecordSteps } from '../../steps/new-cortex/medical-record.steps';
import { MedicalRecordTestCases } from '../../data/new-cortex/medical-record.data';
import { RegistrationSbhTestCases } from '../../data/sbh/registration.data';
import { groupBy } from '../../utils/test-helpers';

/**
 * Medical Record & Registration (New Cortex) — Dynamic BDD Test Suite
 */

// Combine both datasets for execution under Medical Record module
const combinedCases = [
  ...MedicalRecordTestCases,
  ...RegistrationSbhTestCases.map(tc => ({
    ...tc,
    // Map @sbh tag to @new-cortex for tags consistency on the New Cortex site
    tags: tc.tags.map(t => t === '@sbh' ? '@new-cortex' : t)
  }))
];

const featureGroups = groupBy(combinedCases, 'feature');

test.describe('Medical Record (New Cortex)', () => {
  for (const [feature, cases] of Object.entries(featureGroups)) {
    test.describe(feature, () => {
      for (const tc of cases) {
        test(`${tc.id}: ${tc.name}`, { tag: tc.tags }, async ({ page }) => {
          const steps = new MedicalRecordSteps(page);
          await steps.execute(tc);
        });
      }
    });
  }
});
