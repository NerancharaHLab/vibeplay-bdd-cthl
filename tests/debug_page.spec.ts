import { test } from '@playwright/test';

test('Debug Welcome Page', async ({ page }) => {
  await page.goto('/cortex/welcome');
  const html = await page.content();
  console.log('PAGE_HTML_START');
  console.log(html);
  console.log('PAGE_HTML_END');
});
