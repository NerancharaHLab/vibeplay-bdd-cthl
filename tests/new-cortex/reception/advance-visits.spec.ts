import { test } from '@playwright/test';
import { AdvanceVisitsSteps } from '../../../steps/new-cortex/reception/advance-visits.steps';
import { AdvanceVisitsTestCases } from '../../../data/advance-visits.data';
import { groupBy } from '../../../utils/test-helpers';

/**
 * Advance Visits (เปิด Visit ผู้ป่วยนัด) — Dynamic BDD Test Suite
 */

const featureGroups = groupBy(AdvanceVisitsTestCases, 'feature');

test.describe('Advance Visits (New Cortex)', () => {
  for (const [feature, cases] of Object.entries(featureGroups)) {
    test.describe(feature, () => {
      for (const tc of cases) {
        test(`${tc.id}: ${tc.name}`, { tag: tc.tags }, async ({ page }) => {
          const steps = new AdvanceVisitsSteps(page);
          await steps.execute(tc);
        });
      }
    });
  }
});
