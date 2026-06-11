import { test } from '@playwright/test';
import { MedicationSteps } from '../../steps/new-cortex/medication.steps';
import { MedicationTestCases } from '../../data/medication.data';
import { groupBy } from '../../utils/test-helpers';

/**
 * Medication — Dynamic BDD Test Suite
 */

const featureGroups = groupBy(MedicationTestCases, 'feature');

test.describe('Medication Master (New Cortex)', () => {
  test.setTimeout(120000); // 2 minutes timeout for navigation-heavy pharmacy flows

  for (const [feature, cases] of Object.entries(featureGroups)) {
    test.describe(feature, () => {
      for (const tc of cases) {
        test(`${tc.id}: ${tc.name}`, { tag: tc.tags }, async ({ page }) => {
          const steps = new MedicationSteps(page);
          await steps.execute(tc);
        });
      }
    });
  }
});
