# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: new-cortex/scratch.spec.ts >> Scrape Medication Master DOM
- Location: tests/new-cortex/scratch.spec.ts:6:5

# Error details

```
TimeoutError: page.click: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('text="Medication master"')

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
          - generic [ref=e31]: 29 พ.ค. 2569 12:36
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
  7  |   const users = getUsersForRole(undefined, 'new-cortex');
  8  |   const user = users[0]; // admin
  9  |   
  10 |   const steps = new LoginSteps(page);
  11 |   await steps.givenUserIsOnLoginPage();
  12 |   await steps.whenUserLogsIn(user.username, user.password);
  13 |   await steps.thenShouldBeRedirectedToDashboard();
  14 | 
  15 |   // Navigate to Pharmacy (ห้องยา)
  16 |   // Assuming the text is "ห้องยา"
  17 |   await page.click('text="ห้องยา"');
  18 |   await page.waitForTimeout(3000);
  19 | 
  20 |   // Click on "Medication master"
> 21 |   await page.click('text="Medication master"');
     |              ^ TimeoutError: page.click: Timeout 10000ms exceeded.
  22 |   await page.waitForTimeout(3000);
  23 | 
  24 |   // Click on "Create medication" or similar. I'll search for 'Create', 'Add', 'เพิ่ม'
  25 |   try {
  26 |     await page.click('text="Create medication"');
  27 |   } catch (e) {
  28 |     try {
  29 |       await page.click('button:has-text("Create")');
  30 |     } catch (e2) {
  31 |       try {
  32 |         await page.click('button:has-text("เพิ่ม")');
  33 |       } catch (e3) {
  34 |         console.log("Could not find create button. Dumping full page.");
  35 |       }
  36 |     }
  37 |   }
  38 |   
  39 |   await page.waitForTimeout(3000);
  40 | 
  41 |   // Dump the DOM
  42 |   const html = await page.content();
  43 |   fs.writeFileSync('/Users/neranchara/.gemini/antigravity-ide/brain/e812a6c5-5412-4893-b280-d2d93f795f1e/scratch/medication-dom.html', html);
  44 |   
  45 |   // Also take a screenshot for reference
  46 |   await page.screenshot({ path: '/Users/neranchara/.gemini/antigravity-ide/brain/e812a6c5-5412-4893-b280-d2d93f795f1e/scratch/medication.png', fullPage: true });
  47 | });
  48 | 
```