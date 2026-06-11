import { test } from '@playwright/test';
import { OpdSteps } from '../../steps/new-cortex/opd.steps';
import { OpdTestCases } from '../../data/new-cortex/opd.data';
import { groupBy } from '../../utils/test-helpers';

/**
 * OPD (เปิด Visit ผู้ป่วยนัด) — Dynamic BDD Test Suite
 */

const featureGroups = groupBy(OpdTestCases, 'feature');

test.describe('OPD (New Cortex)', () => {
  for (const [feature, cases] of Object.entries(featureGroups)) {
    test.describe(feature, () => {
      for (const tc of cases) {
        test(`${tc.id}: ${tc.name}`, { tag: tc.tags }, async ({ page }) => {
          const steps = new OpdSteps(page);
          await steps.execute(tc);
        });
      }
    });
  }
});
