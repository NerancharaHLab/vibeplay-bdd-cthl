import { test } from '@playwright/test';
import { ClaimSteps } from '../../steps/new-cortex/claim.steps';
import { ClaimTestCases } from '../../data/new-cortex/claim.data';
import { groupBy } from '../../utils/test-helpers';

/**
 * Claim (New Cortex) — Dynamic BDD Test Suite
 */

const featureGroups = groupBy(ClaimTestCases, 'feature');

test.describe('Claim (New Cortex)', () => {
  for (const [feature, cases] of Object.entries(featureGroups)) {
    test.describe(feature, () => {
      for (const tc of cases) {
        test(`${tc.id}: ${tc.name}`, { tag: tc.tags }, async ({ page }) => {
          const steps = new ClaimSteps(page);
          await steps.execute(tc);
        });
      }
    });
  }
});
