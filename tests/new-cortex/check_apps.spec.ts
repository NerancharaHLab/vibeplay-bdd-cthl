import { test } from '@playwright/test';
import { CheckAppsSteps } from '../../steps/new-cortex/check_apps.steps';

test('Check Nutrition module', async ({ page }) => {
  const steps = new CheckAppsSteps(page);

  await steps.givenUserIsLoggedInAsSuperUser();
  await steps.whenUserNavigatesToAppsPage();
  await steps.andOpensNutritionModule();
  await steps.thenShouldTakeFullPageScreenshot();
});
