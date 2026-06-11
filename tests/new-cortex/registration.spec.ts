import { test } from '@playwright/test';
import { RegistrationSteps } from '../../steps/new-cortex/registration.steps';
import { RegistrationTestCases } from '../../data/new-cortex/registration.data';
import { groupBy } from '../../utils/test-helpers';

/**
 * Registration (New Cortex) — Dynamic BDD Test Suite
 * Handles Patient Creation & Visit/Appointment Creation
 */

const featureGroups = groupBy(RegistrationTestCases, 'feature');

test.describe('Registration (New Cortex)', () => {
  for (const [feature, cases] of Object.entries(featureGroups)) {
    test.describe(feature, () => {
      for (const tc of cases) {
        test(`${tc.id}: ${tc.name}`, { tag: tc.tags }, async ({ page }) => {
          const steps = new RegistrationSteps(page);
          await steps.execute(tc);
        });
      }
    });
  }
});
