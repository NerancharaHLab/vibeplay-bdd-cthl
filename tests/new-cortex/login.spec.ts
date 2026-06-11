import { test } from '@playwright/test';
import { LoginSteps } from '../../steps/new-cortex/login.steps';
import { LoginTestCases } from '../../data/new-cortex/login.data';

/**
 * Login (New Cortex) — Dynamic BDD Test Suite
 */

test.describe('Login (New Cortex)', () => {
  for (const tc of LoginTestCases) {
    test(`${tc.id}: ${tc.name}`, { tag: tc.tags }, async ({ page }) => {
      const steps = new LoginSteps(page);
      await steps.execute(tc);
    });
  }
});
