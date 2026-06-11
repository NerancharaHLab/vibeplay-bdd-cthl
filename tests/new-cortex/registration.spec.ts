import { test } from '@playwright/test';
import { RegistrationNewCortexSteps } from '../../steps/new-cortex/registration.steps';
import { RegistrationSbhTestCases } from '../../data/registration-sbh.data';
import { groupBy } from '../../utils/test-helpers';

/**
 * Registration (New Cortex) — Dynamic BDD Test Suite
 */

const featureGroups = groupBy(RegistrationSbhTestCases, 'feature');

test.describe('Registration (New Cortex)', () => {
  for (const [feature, cases] of Object.entries(featureGroups)) {
    test.describe(feature, () => {
      for (const tc of cases) {
        // Map @sbh tag to @new-cortex for tags consistency on the New Cortex site
        const tags = tc.tags.map(t => t === '@sbh' ? '@new-cortex' : t);
        test(`${tc.id}: ${tc.name}`, { tag: tags }, async ({ page }) => {
          const steps = new RegistrationNewCortexSteps(page);
          await steps.execute(tc);
        });
      }
    });
  }
});
