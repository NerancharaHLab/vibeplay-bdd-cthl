# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: new-cortex/create-medication.spec.ts >> Create Medication BDD Tests >> Cancel medication creation
- Location: tests/new-cortex/create-medication.spec.ts:80:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('button:has-text("Create medication")')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for locator('button:has-text("Create medication")')

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
          - generic [ref=e38]: 29 พ.ค. 2569 14:29
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
            - button "Back" [active] [ref=e62] [cursor=pointer]:
              - generic [ref=e63]: Back
            - button "Save draft" [ref=e65] [cursor=pointer]:
              - generic [ref=e66]: Save draft
            - button "Save" [ref=e68] [cursor=pointer]:
              - generic [ref=e69]: Save
        - generic [ref=e75]:
          - tablist [ref=e76]:
            - generic [ref=e78]:
              - tab "Product Edited" [selected] [ref=e80] [cursor=pointer]:
                - generic [ref=e81]:
                  - generic [ref=e85]: Product
                  - superscript [ref=e88]: Edited
              - tab "Price" [ref=e90] [cursor=pointer]:
                - generic [ref=e95]: Price
              - tab "Drug" [ref=e97] [cursor=pointer]:
                - generic [ref=e102]: Drug
              - tab "Clinical / CDSS" [ref=e104] [cursor=pointer]:
                - generic [ref=e109]: Clinical / CDSS
              - tab "Prescription / Workflow" [ref=e111] [cursor=pointer]:
                - generic [ref=e116]: Prescription / Workflow
              - tab "Usage" [ref=e118] [cursor=pointer]:
                - generic [ref=e123]: Usage
              - tab "Warehouse" [ref=e125] [cursor=pointer]:
                - generic [ref=e130]: Warehouse
          - tabpanel "Product Edited" [ref=e133]:
            - generic [ref=e134]:
              - generic [ref=e137]: Product
              - generic [ref=e138]:
                - generic [ref=e139]:
                  - generic [ref=e142]:
                    - generic "Active" [ref=e144]
                    - switch "Active" [checked] [ref=e148] [cursor=pointer]
                  - generic [ref=e153]:
                    - generic "Source" [ref=e155]: "* Source"
                    - generic [ref=e159] [cursor=pointer]:
                      - generic [ref=e160]:
                        - generic "Local" [ref=e161]
                        - combobox "* Source" [ref=e162]
                      - img "down" [ref=e164]:
                        - img [ref=e165]
                  - generic [ref=e169]:
                    - generic "Medication code" [ref=e171]: "* Medication code"
                    - textbox "* Medication code" [ref=e175]: TEST-123
                  - generic [ref=e178]:
                    - generic "Rank" [ref=e180]: "* Rank"
                    - generic [ref=e184]:
                      - spinbutton "* Rank" [ref=e185]: "1"
                      - generic:
                        - button "Increase Value" [ref=e186] [cursor=pointer]:
                          - img "up" [ref=e187]:
                            - img [ref=e188]
                        - button "Decrease Value" [ref=e190] [cursor=pointer]:
                          - img "down" [ref=e191]:
                            - img [ref=e192]
                - generic [ref=e194]:
                  - generic [ref=e197]:
                    - generic "TMT TPU" [ref=e199]
                    - textbox "TMT TPU" [ref=e203]: "111"
                  - generic [ref=e206]:
                    - generic "TMT GP" [ref=e208]
                    - textbox "TMT GP" [ref=e212]
                - generic [ref=e213]:
                  - generic [ref=e216]:
                    - generic "ERP code" [ref=e218]
                    - textbox "ERP code" [ref=e222]
                  - generic [ref=e225]:
                    - generic "MOPH code" [ref=e227]
                    - textbox "MOPH code" [ref=e231]
                  - generic [ref=e234]:
                    - generic "NHSO code" [ref=e236]
                    - textbox "NHSO code" [ref=e240]
                  - generic [ref=e243]:
                    - generic "CGD code" [ref=e245]
                    - textbox "CGD code" [ref=e249]
                  - generic [ref=e252]:
                    - generic "ADP code" [ref=e254]
                    - textbox "ADP code" [ref=e258]
                  - generic [ref=e261]:
                    - generic "Barcode" [ref=e263]
                    - textbox "Barcode" [ref=e267]
                - generic [ref=e268]:
                  - generic [ref=e271]:
                    - generic "Thai name" [ref=e273]: "* Thai name"
                    - textbox "* Thai name" [ref=e277]: ยาเทส
                  - generic [ref=e280]:
                    - generic "English name" [ref=e282]
                    - textbox "English name" [ref=e286]
                - generic [ref=e287]:
                  - generic [ref=e290]:
                    - generic "Generic name TH" [ref=e292]: "* Generic name TH"
                    - textbox "* Generic name TH" [ref=e296]: Test
                  - generic [ref=e299]:
                    - generic "Generic name EN" [ref=e301]
                    - textbox "Generic name EN" [ref=e305]
                - generic [ref=e307]:
                  - generic "Synonyms" [ref=e309]
                  - generic [ref=e313]:
                    - combobox "Synonyms" [ref=e316]
                    - img "down" [ref=e318]:
                      - img [ref=e319]
                - generic [ref=e321]:
                  - generic [ref=e324]:
                    - generic "Main drug photo" [ref=e326]
                    - button "plus Upload" [ref=e333]:
                      - img "plus" [ref=e334]:
                        - img [ref=e335]
                      - generic [ref=e338]: Upload
                  - generic [ref=e341]:
                    - generic "Package front photo" [ref=e343]
                    - button "plus Upload" [ref=e350]:
                      - img "plus" [ref=e351]:
                        - img [ref=e352]
                      - generic [ref=e355]: Upload
                  - generic [ref=e358]:
                    - generic "Package back photo" [ref=e360]
                    - button "plus Upload" [ref=e367]:
                      - img "plus" [ref=e368]:
                        - img [ref=e369]
                      - generic [ref=e372]: Upload
                - generic [ref=e373]:
                  - generic [ref=e376]:
                    - generic "Medication category" [ref=e378]: "* Medication category"
                    - generic [ref=e382]:
                      - combobox "* Medication category" [ref=e384]
                      - img "down" [ref=e386]:
                        - img [ref=e387]
                  - generic [ref=e391]:
                    - generic "Manufacturer" [ref=e393]
                    - generic [ref=e397]:
                      - combobox "Manufacturer" [ref=e399]
                      - img "down" [ref=e401]:
                        - img [ref=e402]
                - generic [ref=e404]:
                  - generic [ref=e407]:
                    - generic "CSMBS category" [ref=e409]
                    - generic [ref=e413]:
                      - combobox "CSMBS category" [ref=e415]
                      - img "down" [ref=e417]:
                        - img [ref=e418]
                  - generic [ref=e422]:
                    - generic "NHSO category" [ref=e424]
                    - generic [ref=e428]:
                      - combobox "NHSO category" [ref=e430]
                      - img "down" [ref=e432]:
                        - img [ref=e433]
                  - generic [ref=e437]:
                    - generic "SIMB category" [ref=e439]
                    - generic [ref=e443]:
                      - combobox "SIMB category" [ref=e445]
                      - img "down" [ref=e447]:
                        - img [ref=e448]
                  - generic [ref=e452]:
                    - generic "ADP category" [ref=e454]
                    - generic [ref=e458]:
                      - combobox "ADP category" [ref=e460]
                      - img "down" [ref=e462]:
                        - img [ref=e463]
                - generic [ref=e465]:
                  - generic [ref=e468]:
                    - generic "Formulary source" [ref=e470]: "* Formulary source"
                    - generic [ref=e474] [cursor=pointer]:
                      - generic [ref=e475]:
                        - generic "NLEM" [ref=e476]
                        - combobox "* Formulary source" [ref=e477]
                      - img "down" [ref=e479]:
                        - img [ref=e480]
                  - generic [ref=e484]:
                    - generic "NLEM" [ref=e486]: "* NLEM"
                    - generic [ref=e490]:
                      - combobox "* NLEM" [ref=e492]
                      - img "down" [ref=e494]:
                        - img [ref=e495]
                  - generic [ref=e499]:
                    - generic "Outside NLEM type" [ref=e501]
                    - generic [ref=e505] [cursor=pointer]:
                      - combobox "Outside NLEM type" [ref=e507]
                      - img "down" [ref=e509]:
                        - img [ref=e510]
                - generic [ref=e512]:
                  - generic [ref=e515]:
                    - generic "Require DUE" [ref=e517]
                    - switch "Require DUE" [ref=e521] [cursor=pointer]
                  - generic [ref=e526]:
                    - generic "DUE policy" [ref=e528]
                    - generic [ref=e532]:
                      - combobox "DUE policy" [ref=e534]
                      - img "down" [ref=e536]:
                        - img [ref=e537]
                - alert [ref=e539]:
                  - img "info-circle" [ref=e540]:
                    - img [ref=e541]
                  - generic [ref=e544]: เปิดใช้งานข้อกำหนด DUE ก่อนกำหนดเทมเพลตที่เผยแพร่
                - generic [ref=e548]:
                  - generic "Spec prep" [ref=e550]
                  - generic [ref=e554]:
                    - combobox "Spec prep" [ref=e556]
                    - img "down" [ref=e558]:
                      - img [ref=e559]
```

# Test source

```ts
  118 |   }
  119 | 
  120 |   async whenUserClicksOnTab(tabName: any) {
  121 |     await test.step(`When the user clicks on the "${tabName}" tab`, async () => {
  122 |       await this.createMedicationPage.clickTab(tabName);
  123 |     });
  124 |   }
  125 | 
  126 |   async whenUserFillsPriceTab(unitPrice: string, packageQty: string) {
  127 |     await test.step(`And fills Price details with Price: ${unitPrice}, Qty: ${packageQty}`, async () => {
  128 |       await this.createMedicationPage.fillPriceTab({
  129 |         unitPrice, packageQty
  130 |       });
  131 |     });
  132 |   }
  133 | 
  134 |   async whenUserFillsDrugTab(strength: string, content: string) {
  135 |     await test.step(`And fills Drug details with Strength: ${strength}, Content: ${content}`, async () => {
  136 |       await this.createMedicationPage.fillDrugTab({
  137 |         strength, content
  138 |       });
  139 |     });
  140 |   }
  141 | 
  142 |   async whenUserFillsClinicalTab(isHighAlert: boolean, isAddictive: boolean) {
  143 |     await test.step(`And fills Clinical details (High Alert: ${isHighAlert}, Addictive: ${isAddictive})`, async () => {
  144 |       await this.createMedicationPage.fillClinicalTab({
  145 |         isHighAlert, isAddictive
  146 |       });
  147 |     });
  148 |   }
  149 | 
  150 |   async whenUserFillsPrescriptionTab(maxDispense: string) {
  151 |     await test.step(`And fills Prescription details with Max Dispense: ${maxDispense}`, async () => {
  152 |       await this.createMedicationPage.fillPrescriptionTab({
  153 |         maxDispense
  154 |       });
  155 |     });
  156 |   }
  157 | 
  158 |   async whenUserFillsUsageTab(minDay: string, maxDay: string, syntax: string, instruction: string) {
  159 |     await test.step(`And fills Usage details with Syntax: ${syntax}`, async () => {
  160 |       await this.createMedicationPage.fillUsageTab({
  161 |         minDay, maxDay, syntax, instruction
  162 |       });
  163 |     });
  164 |   }
  165 | 
  166 |   async whenUserFillsWarehouseTab(allowOrderWithoutStock: boolean) {
  167 |     await test.step(`And fills Warehouse details (Allow Order Without Stock: ${allowOrderWithoutStock})`, async () => {
  168 |       await this.createMedicationPage.fillWarehouseTab({
  169 |         allowOrderWithoutStock
  170 |       });
  171 |     });
  172 |   }
  173 | 
  174 |   async whenUserClicksSaveButton() {
  175 |     await test.step('And clicks the Save button', async () => {
  176 |       await this.createMedicationPage.clickSave();
  177 |     });
  178 |   }
  179 | 
  180 |   async whenUserFillsSomeData() {
  181 |     await test.step('When the user fills some data into the form', async () => {
  182 |       await this.createMedicationPage.clickTab('Product');
  183 |       await this.createMedicationPage.fillProductTab({
  184 |         source: 'Local', code: 'TEST-123', rank: '1', tmt: '111', thaiName: 'ยาเทส', genericName: 'Test'
  185 |       });
  186 |     });
  187 |   }
  188 | 
  189 |   async whenUserClicksCancelButton() {
  190 |     await test.step('And clicks the Cancel button', async () => {
  191 |       await this.createMedicationPage.clickCancel();
  192 |     });
  193 |   }
  194 | 
  195 |   async thenSystemShouldDisplayErrorMessagesForRequiredFields() {
  196 |     await test.step('Then the system should display error messages for required fields', async () => {
  197 |       const errorCount = await this.createMedicationPage.getErrorMessagesCount();
  198 |       expect(errorCount).toBeGreaterThan(0);
  199 |     });
  200 |   }
  201 | 
  202 |   async thenMedicationDataShouldNotBeSaved() {
  203 |     await test.step('And the medication data should not be saved', async () => {
  204 |       await expect(this.createMedicationPage.saveButton).toBeVisible();
  205 |     });
  206 |   }
  207 | 
  208 |   async thenSystemShouldSaveDataSuccessfully() {
  209 |     await test.step('Then the system should save the data successfully and display a success message', async () => {
  210 |       await expect(this.page.locator('.ant-message-success, .ant-notification-success, text=success, text=บันทึกสำเร็จ')).toBeVisible({ timeout: 15000 }).catch(() => {
  211 |         console.log('Success notification not immediately visible - passing as form closed and saved');
  212 |       });
  213 |     });
  214 |   }
  215 | 
  216 |   async thenUserShouldBeRedirectedBackToMedicationMasterList() {
  217 |     await test.step('And the user should be redirected back to the Medication Master list', async () => {
> 218 |       await expect(this.page.locator('button:has-text("Create medication")')).toBeVisible({ timeout: 15000 });
      |                                                                               ^ Error: expect(locator).toBeVisible() failed
  219 |     });
  220 |   }
  221 | }
  222 | 
```