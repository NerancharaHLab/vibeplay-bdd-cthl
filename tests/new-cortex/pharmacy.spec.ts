import { test } from '@playwright/test';
import { PharmacySteps } from '../../steps/new-cortex/pharmacy.steps';
import { PharmacyTestCases } from '../../data/new-cortex/pharmacy.data';
import { groupBy } from '../../utils/test-helpers';

/**
 * Medication — Dynamic BDD Test Suite
 */

const featureGroups = groupBy(PharmacyTestCases, 'feature');

test.describe('Medication Master (New Cortex)', () => {
  test.setTimeout(120000); // 2 minutes timeout for navigation-heavy pharmacy flows

  for (const [feature, cases] of Object.entries(featureGroups)) {
    test.describe(feature, () => {
      for (const tc of cases) {
        test(`${tc.id}: ${tc.name}`, { tag: tc.tags }, async ({ page }) => {
          const steps = new PharmacySteps(page);
          await steps.execute(tc);
        });
      }
    });
  }
});
