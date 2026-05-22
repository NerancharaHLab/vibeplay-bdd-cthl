import { test } from '@playwright/test';
import { AdvanceVisitsSteps } from '../../steps/new-cortex/advance-visits.steps';

test.describe('Advance Visits (เปิด Visit ผู้ป่วยนัด) BDD Tests', () => {
  let steps: AdvanceVisitsSteps;

  test.beforeEach(async ({ page }) => {
    steps = new AdvanceVisitsSteps(page);
    await steps.givenUserIsLoggedInToCortex();
  });

  test('Verify UI elements on Advance Visits page', async () => {
    await steps.whenUserNavigatesToAdvanceVisits();
    await steps.thenShouldSeeActionButtons();
  });

  test('Check Filter inputs visibility', async () => {
    await steps.whenUserNavigatesToAdvanceVisits();
    await steps.thenShouldSeeFilterOptions();
  });
});
