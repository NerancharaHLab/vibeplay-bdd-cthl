import { test } from '@playwright/test';
import { MedicalRecordSearchSteps } from '../../steps/new-cortex/medical-record-search.steps';

test.describe('Medical Record Search BDD Tests', () => {
  let steps: MedicalRecordSearchSteps;

  test.beforeEach(async ({ page }) => {
    steps = new MedicalRecordSearchSteps(page);
    await steps.givenUserIsLoggedInAndNavigatesToMedicalRecord();
  });

  test('Verify search fields presence from UI', async () => {
    await steps.thenShouldSeeAllSearchFields();
  });

  test('Perform search by HN', async () => {
    const testHN = '1234567';
    await steps.whenUserSearchesByHN(testHN);
  });

  test('Clear search results', async () => {
    await steps.whenUserFillsSearchHN('9999999');
    await steps.andClicksClearSearch();
    await steps.thenSearchHNShouldBeEmpty();
  });
});
