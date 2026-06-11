# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: new-cortex/create-medication.spec.ts >> Create Medication BDD Tests >> Create a medication with comprehensive details across all tabs
- Location: tests/new-cortex/create-medication.spec.ts:41:7

# Error details

```
TimeoutError: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('button.ant-switch:has(#allowOrderWithoutStock), label:has(#allowOrderWithoutStock) .ant-switch').first()

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
            - textbox "ค้นหา HN/ EN/ VN/ ใบยา" [ref=e29]
          - button "environment ห้องยา A" [ref=e32] [cursor=pointer]:
            - img "environment" [ref=e34]:
              - img [ref=e35]
            - generic [ref=e37]: ห้องยา A
          - generic [ref=e38]: 29 พ.ค. 2569 14:44
          - button "user user1 example down" [ref=e39] [cursor=pointer]:
            - img "user" [ref=e42]:
              - img [ref=e43]
            - generic [ref=e45]:
              - generic [ref=e46]: user1 example
              - img "down" [ref=e48]:
                - img [ref=e49]
    - main [ref=e51]:
      - generic [ref=e52]:
        - generic [ref=e53]:
          - generic [ref=e54]:
            - img "medicine-box" [ref=e55]:
              - img [ref=e56]
            - generic [ref=e58]: Create medication master
          - generic [ref=e60]:
            - button "Back" [ref=e62] [cursor=pointer]:
              - generic [ref=e63]: Back
            - button "Save draft" [ref=e65] [cursor=pointer]:
              - generic [ref=e66]: Save draft
            - button "Save" [ref=e68] [cursor=pointer]:
              - generic [ref=e69]: Save
        - generic [ref=e75]:
          - tablist [ref=e76]:
            - generic [ref=e78]:
              - tab "Product Edited" [ref=e80] [cursor=pointer]:
                - generic [ref=e81]:
                  - generic [ref=e85]: Product
                  - superscript [ref=e88]: Edited
              - tab "Price Edited" [ref=e90] [cursor=pointer]:
                - generic [ref=e91]:
                  - generic [ref=e95]: Price
                  - superscript [ref=e98]: Edited
              - tab "Drug Edited" [ref=e100] [cursor=pointer]:
                - generic [ref=e101]:
                  - generic [ref=e105]: Drug
                  - superscript [ref=e108]: Edited
              - tab "Clinical / CDSS" [ref=e110] [cursor=pointer]:
                - generic [ref=e115]: Clinical / CDSS
              - tab "Prescription / Workflow Edited" [ref=e117] [cursor=pointer]:
                - generic [ref=e118]:
                  - generic [ref=e122]: Prescription / Workflow
                  - superscript [ref=e125]: Edited
              - tab "Usage Edited" [ref=e127] [cursor=pointer]:
                - generic [ref=e128]:
                  - generic [ref=e132]: Usage
                  - superscript [ref=e135]: Edited
              - tab "Warehouse" [selected] [ref=e137] [cursor=pointer]:
                - generic [ref=e142]: Warehouse
          - generic [ref=e144]:
            - text: "* * * * * * * * * * * *"
            - tabpanel "Warehouse" [ref=e145]:
              - generic [ref=e146]:
                - generic [ref=e149]: Warehouse
                - generic [ref=e150]:
                  - alert [ref=e151]:
                    - img "exclamation-circle" [ref=e152]:
                      - img [ref=e153]
                    - generic [ref=e156]: Enable at least one pharmacy location when this medication is orderable, or allow ordering without stock.
                  - generic [ref=e160]:
                    - generic "Allow order without stock" [ref=e162]
                    - switch "Allow order without stock" [ref=e166] [cursor=pointer]
                  - table [ref=e180]:
                    - rowgroup [ref=e186]:
                      - row "Orderable Pharmacy location Warehouse ID Quantity" [ref=e187]:
                        - columnheader "Orderable" [ref=e188]
                        - columnheader "Pharmacy location" [ref=e189]
                        - columnheader "Warehouse ID" [ref=e190]
                        - columnheader "Quantity" [ref=e191]
                    - rowgroup [ref=e192]:
                      - row "ห้องยาชั้น 1 1 -" [ref=e193]:
                        - cell [ref=e194]:
                          - switch [ref=e195] [cursor=pointer]
                        - cell "ห้องยาชั้น 1" [ref=e198]
                        - cell "1" [ref=e199]
                        - cell "-" [ref=e200]
                      - row "ห้องยา A 1 -" [ref=e201]:
                        - cell [ref=e202]:
                          - switch [ref=e203] [cursor=pointer]
                        - cell "ห้องยา A" [ref=e206]
                        - cell "1" [ref=e207]
                        - cell "-" [ref=e208]
```

# Test source

```ts
  135 |     isHighAlert?: boolean;
  136 |     isChemotherapy?: boolean;
  137 |     isAddictive?: boolean;
  138 |     isWarfarin?: boolean;
  139 |   }) {
  140 |     // Switch to Drug tab where these switches are located in this UI version
  141 |     await this.clickTab('Drug');
  142 |     await this.page.waitForTimeout(500);
  143 | 
  144 |     const handleSwitch = async (id: string, label: string, value: boolean) => {
  145 |       const selectors = [
  146 |         this.page.getByRole('switch', { name: label, exact: true }),
  147 |         this.page.locator(`button.ant-switch:has(#${id})`),
  148 |         this.page.locator(`label[for="${id}"]`).locator('xpath=following-sibling::button[@role="switch"] | xpath=ancestor::div[contains(@class, "ant-form-item")]//button[@role="switch"]'),
  149 |         this.page.locator(`#${id}`)
  150 |       ];
  151 |       
  152 |       let el = selectors[0];
  153 |       for (const sel of selectors) {
  154 |         try {
  155 |           if (await sel.first().isVisible({ timeout: 1000 })) {
  156 |             el = sel.first();
  157 |             break;
  158 |           }
  159 |         } catch (e) {}
  160 |       }
  161 | 
  162 |       try {
  163 |         const isChecked = await el.getAttribute('aria-checked') === 'true' || await el.isChecked();
  164 |         if (isChecked !== value) {
  165 |           await el.click({ force: true });
  166 |         }
  167 |       } catch (e) {
  168 |         // Fallback: just click it
  169 |         await el.click({ force: true });
  170 |       }
  171 |     };
  172 | 
  173 |     if (data.isHighAlert !== undefined) {
  174 |       await handleSwitch('isHighAlertDrug', 'High alert drug', data.isHighAlert);
  175 |     }
  176 |     if (data.isChemotherapy !== undefined) {
  177 |       await handleSwitch('isChemotherapy', 'Chemotherapy', data.isChemotherapy);
  178 |     }
  179 |     if (data.isAddictive !== undefined) {
  180 |       await handleSwitch('isAddictive', 'Addictive', data.isAddictive);
  181 |     }
  182 |     if (data.isWarfarin !== undefined) {
  183 |       await handleSwitch('isWarfarin', 'Warfarin', data.isWarfarin);
  184 |     }
  185 | 
  186 |     // Switch back to Clinical / CDSS tab to continue expected flow
  187 |     await this.clickTab('Clinical / CDSS');
  188 |     await this.page.waitForTimeout(500);
  189 |   }
  190 | 
  191 |   // --- PRESCRIPTION TAB METHODS ---
  192 |   async fillPrescriptionTab(data: {
  193 |     maxDispense: string;
  194 |   }) {
  195 |     await this.fill(CreateMedicationLocators.maxDispenseInput, data.maxDispense);
  196 |   }
  197 | 
  198 |   // --- USAGE TAB METHODS ---
  199 |   async fillUsageTab(data: {
  200 |     minDay?: string;
  201 |     maxDay?: string;
  202 |     maxUsageDuration?: string;
  203 |     syntax?: string;
  204 |     instruction?: string;
  205 |   }) {
  206 |     if (data.minDay) {
  207 |       await this.fill(CreateMedicationLocators.minDayInput, data.minDay);
  208 |     }
  209 |     if (data.maxDay) {
  210 |       await this.fill(CreateMedicationLocators.maxDayInput, data.maxDay);
  211 |     }
  212 |     if (data.maxUsageDuration) {
  213 |       await this.fill(CreateMedicationLocators.maxUsageDurationInput, data.maxUsageDuration);
  214 |     }
  215 |     if (data.syntax) {
  216 |       await this.fill(CreateMedicationLocators.syntaxInput, data.syntax);
  217 |     }
  218 |     if (data.instruction) {
  219 |       await this.fill(CreateMedicationLocators.instructionInput, data.instruction);
  220 |     }
  221 |   }
  222 | 
  223 |   // --- WAREHOUSE TAB METHODS ---
  224 |   async fillWarehouseTab(data: {
  225 |     allowOrderWithoutStock?: boolean;
  226 |   }) {
  227 |     if (data.allowOrderWithoutStock !== undefined) {
  228 |       const el = this.page.locator(CreateMedicationLocators.allowOrderWithoutStockSwitch).first();
  229 |       try {
  230 |         const isChecked = await el.getAttribute('aria-checked') === 'true';
  231 |         if (isChecked !== data.allowOrderWithoutStock) {
  232 |           await el.click({ force: true });
  233 |         }
  234 |       } catch (e) {
> 235 |         await el.click({ force: true });
      |                  ^ TimeoutError: locator.click: Timeout 10000ms exceeded.
  236 |       }
  237 |     }
  238 |   }
  239 | 
  240 |   async clickSave() {
  241 |     await this.saveButton.click();
  242 |   }
  243 | 
  244 |   async clickCancel() {
  245 |     await this.cancelButton.click();
  246 |     await this.page.waitForTimeout(1000);
  247 |     // Handle discard confirmation modal if it appears (either modal or popconfirm)
  248 |     try {
  249 |       const confirmBtn = this.page.locator('.ant-modal-confirm-btns button.ant-btn-primary, .ant-popover button:has-text("Yes"), .ant-popconfirm button:has-text("ตกลง"), button:has-text("Yes"), button:has-text("ตกลง"), button:has-text("OK")').first();
  250 |       if (await confirmBtn.isVisible({ timeout: 3000 })) {
  251 |         console.log('Discard confirmation modal detected, clicking confirm...');
  252 |         await confirmBtn.click();
  253 |         await this.page.waitForTimeout(1000);
  254 |       }
  255 |     } catch (e) {
  256 |       console.log('No confirmation modal appeared, proceeding...', e.message);
  257 |     }
  258 |   }
  259 | 
  260 |   async getErrorMessagesCount() {
  261 |     try {
  262 |       await this.page.locator(CreateMedicationLocators.errorMessage).first().waitFor({ state: 'visible', timeout: 5000 });
  263 |     } catch (e) {
  264 |       console.log('No error messages became visible within 5s');
  265 |     }
  266 |     return await this.page.locator(CreateMedicationLocators.errorMessage).count();
  267 |   }
  268 | }
  269 | 
```