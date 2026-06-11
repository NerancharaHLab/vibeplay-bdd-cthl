import { test } from '@playwright/test';
import { IpdOrdersSteps } from '../../steps/new-cortex/ipd-orders.steps';
import { IpdOrderTestCases } from '../../data/ipd-orders.data';
import { groupBy } from '../../utils/test-helpers';

/**
 * IPD Physician Orders — Dynamic BDD Test Suite
 *
 * ทุก test case มาจาก data/ipd-orders.data.ts
 * เพิ่ม test ใหม่ได้โดยแค่เพิ่ม object ใน array — ไม่ต้องแก้ไฟล์นี้
 */

const featureGroups = groupBy(IpdOrderTestCases, 'feature');

test.describe('IPD Physician Orders (New Cortex)', () => {
  for (const [feature, cases] of Object.entries(featureGroups)) {
    test.describe(feature, () => {
      for (const tc of cases) {
        test(`${tc.id}: ${tc.name}`, { tag: tc.tags }, async ({ page }) => {
          const steps = new IpdOrdersSteps(page);
          await steps.execute(tc);
        });
      }
    });
  }
});
