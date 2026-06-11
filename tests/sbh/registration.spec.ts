import { test } from '@playwright/test';
import { RegistrationSbhSteps } from '../../steps/sbh/registration.steps';
import { RegistrationSbhTestCases } from '../../data/registration-sbh.data';
import { groupBy } from '../../utils/test-helpers';

/**
 * Registration SBH — Dynamic BDD Test Suite
 */

const featureGroups = groupBy(RegistrationSbhTestCases, 'feature');

test.describe('Registration SBH', () => {
  for (const [feature, cases] of Object.entries(featureGroups)) {
    test.describe(feature, () => {
      for (const tc of cases) {
        test(`${tc.id}: ${tc.name}`, { tag: tc.tags }, async ({ page }) => {
          const steps = new RegistrationSbhSteps(page);
          await steps.execute(tc);
        });
      }
    });
  }
});
