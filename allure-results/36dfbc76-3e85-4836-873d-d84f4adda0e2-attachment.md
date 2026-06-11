# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: new-cortex/scratch.spec.ts >> Scrape Medication Master DOM
- Location: tests/new-cortex/scratch.spec.ts:6:5

# Error details

```
TimeoutError: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('div,span').filter({ hasText: 'Medication master' }).first()

```

# Page snapshot

```yaml
- generic [ref=e4]:
  - complementary:
    - button "menu-fold" [ref=e5] [cursor=pointer]:
      - img "menu-fold" [ref=e7]:
        - img [ref=e8]
  - generic [ref=e10]:
    - banner [ref=e11]:
      - generic:
        - generic [ref=e14]:
          - img "logo" [ref=e16] [cursor=pointer]
          - button "Back" [ref=e17] [cursor=pointer]:
            - img "arrow-left" [ref=e19]:
              - img [ref=e20]
          - heading "CORTEX" [level=3] [ref=e22]
        - generic [ref=e23]:
          - generic [ref=e24]:
            - img "search" [ref=e26]:
              - img [ref=e27]
            - textbox "ค้นหา HN/ EN/ VN/ ใบยา" [disabled] [ref=e29]
          - generic [ref=e31]: 29 พ.ค. 2569 12:56
          - button "user HLAB 1 Test down" [ref=e32] [cursor=pointer]:
            - img "user" [ref=e35]:
              - img [ref=e36]
            - generic [ref=e38]:
              - generic [ref=e39]: HLAB 1 Test
              - img "down" [ref=e41]:
                - img [ref=e42]
    - main [ref=e44]:
      - generic [ref=e46]:
        - heading "เลือกห้องยา" [level=1] [ref=e47]
        - generic [ref=e48]:
          - img "environment" [ref=e50]:
            - img [ref=e51]
          - generic [ref=e53]:
            - generic: เลือกห้องยา
            - combobox [ref=e54]
          - img "down" [ref=e56]:
            - img [ref=e57]
        - button "ส่ง" [disabled] [ref=e59]:
          - generic: ส่ง
```

# Test source

```ts
  1  | import { test } from '@playwright/test';
  2  | import { LoginSteps } from '../../steps/new-cortex/login.steps';
  3  | import { getUsersForRole } from '../../utils/user-roles';
  4  | import * as fs from 'fs';
  5  | 
  6  | test('Scrape Medication Master DOM', async ({ page }) => {
  7  |   test.setTimeout(120000); // 2 minutes timeout for this specific test
  8  | 
  9  |   const users = getUsersForRole(undefined, 'new-cortex');
  10 |   const user = users[0]; // admin
  11 |   
  12 |   const steps = new LoginSteps(page);
  13 |   await steps.givenUserIsOnLoginPage();
  14 |   await steps.whenUserLogsIn(user.username, user.password);
  15 |   await steps.thenShouldBeRedirectedToDashboard();
  16 | 
  17 |   // Wait for the app menu to load
  18 |   await page.waitForTimeout(5000);
  19 | 
  20 |   // Navigate to Pharmacy (ห้องยา)
  21 |   console.log('Clicking ห้องยา');
  22 |   try {
  23 |     await page.click('text="ห้องยา"', { timeout: 15000 });
  24 |   } catch (e) {
  25 |     // try finding by class or other generic ways if text fails
  26 |     console.log('Failed to click ห้องยา text, trying alternative');
  27 |     await page.locator('div,span').filter({ hasText: 'ห้องยา' }).first().click();
  28 |   }
  29 |   
  30 |   await page.waitForTimeout(5000);
  31 | 
  32 |   // Click on "Medication master"
  33 |   console.log('Clicking Medication master');
  34 |   try {
  35 |     await page.click('text="Medication master"', { timeout: 15000 });
  36 |   } catch (e) {
  37 |     console.log('Failed to click Medication master text');
> 38 |     await page.locator('div,span').filter({ hasText: 'Medication master' }).first().click();
     |                                                                                     ^ TimeoutError: locator.click: Timeout 10000ms exceeded.
  39 |   }
  40 | 
  41 |   await page.waitForTimeout(5000);
  42 | 
  43 |   // Click on "Create medication" or similar.
  44 |   console.log('Looking for create button');
  45 |   try {
  46 |     await page.click('text="Create medication"', { timeout: 5000 });
  47 |   } catch (e) {
  48 |     try {
  49 |       await page.click('button:has-text("Create")', { timeout: 5000 });
  50 |     } catch (e2) {
  51 |       try {
  52 |         await page.click('button:has-text("เพิ่ม")', { timeout: 5000 });
  53 |       } catch (e3) {
  54 |         console.log("Could not find create button. Dumping whatever is here.");
  55 |       }
  56 |     }
  57 |   }
  58 |   
  59 |   await page.waitForTimeout(5000);
  60 | 
  61 |   // Dump the DOM
  62 |   const html = await page.content();
  63 |   fs.writeFileSync('/Users/neranchara/.gemini/antigravity-ide/brain/e812a6c5-5412-4893-b280-d2d93f795f1e/scratch/medication-dom.html', html);
  64 |   
  65 |   // Also take a screenshot for reference
  66 |   await page.screenshot({ path: '/Users/neranchara/.gemini/antigravity-ide/brain/e812a6c5-5412-4893-b280-d2d93f795f1e/scratch/medication.png', fullPage: true });
  67 | });
  68 | 
```