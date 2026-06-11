import { test } from '@playwright/test';
import { MedicalRecordSteps } from '../../steps/new-cortex/medical-record.steps';
import { MedicalRecordTestCases } from '../../data/new-cortex/medical-record.data';
import { groupBy } from '../../utils/test-helpers';

/**
 * Medical Record & Patient Profiles (New Cortex) — Dynamic BDD Test Suite
 * Handles Search, Edit Profile, and Audit Trails
 */

const featureGroups = groupBy(MedicalRecordTestCases, 'feature');

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
