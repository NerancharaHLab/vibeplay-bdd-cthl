# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: new-cortex/create-medication.spec.ts >> Create Medication BDD Tests >> Create a medication with comprehensive details across all tabs
- Location: tests/new-cortex/create-medication.spec.ts:37:7

# Error details

```
TimeoutError: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('button.ant-switch:has(#isHighAlertDrug), label:has(#isHighAlertDrug) .ant-switch').first()

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
          - generic [ref=e38]: 29 พ.ค. 2569 14:28
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
              - tab "Clinical / CDSS" [active] [selected] [ref=e110] [cursor=pointer]:
                - generic [ref=e115]: Clinical / CDSS
              - tab "Prescription / Workflow" [ref=e117] [cursor=pointer]:
                - generic [ref=e122]: Prescription / Workflow
              - tab "Usage" [ref=e124] [cursor=pointer]:
                - generic [ref=e129]: Usage
              - tab "Warehouse" [ref=e131] [cursor=pointer]:
                - generic [ref=e136]: Warehouse
          - generic [ref=e138]:
            - text: "* * * * * * * * * * * *"
            - tabpanel "Clinical / CDSS" [ref=e139]:
              - generic [ref=e140]:
                - generic [ref=e143]: Clinical / CDSS
                - generic [ref=e144]:
                  - generic [ref=e145]:
                    - alert [ref=e146]:
                      - img "info-circle" [ref=e147]:
                        - img [ref=e148]
                      - generic [ref=e151]: No CDSS rules configured for this medication.
                    - generic [ref=e152]:
                      - generic [ref=e153]:
                        - generic [ref=e154]: Pregnancy
                        - generic [ref=e155]: "0"
                      - generic [ref=e156]:
                        - generic [ref=e157]: Lactation
                        - generic [ref=e158]: "0"
                      - generic [ref=e159]:
                        - generic [ref=e160]: Renal dose
                        - generic [ref=e161]: "0"
                      - generic [ref=e162]:
                        - generic [ref=e163]: Hepatic dose
                        - generic [ref=e164]: "0"
                      - generic [ref=e165]:
                        - generic [ref=e166]: Fall risk
                        - generic [ref=e167]: "0"
                      - generic [ref=e168]:
                        - generic [ref=e169]: Disease contraindication
                        - generic [ref=e170]: "0"
                      - generic [ref=e171]:
                        - generic [ref=e172]: Pediatric
                        - generic [ref=e173]: "0"
                      - generic [ref=e174]:
                        - generic [ref=e175]: Dose range
                        - generic [ref=e176]: "0"
                      - generic [ref=e177]:
                        - generic [ref=e178]: Pharmacogenomics
                        - generic [ref=e179]: "0"
                  - generic [ref=e180]:
                    - generic [ref=e183]:
                      - generic "Duplication rule" [ref=e185]
                      - generic [ref=e189]:
                        - combobox "Duplication rule" [ref=e191]
                        - img "down" [ref=e193]:
                          - img [ref=e194]
                    - generic [ref=e198]:
                      - generic "Target diagnosis codes" [ref=e200]
                      - generic [ref=e204]:
                        - combobox "Target diagnosis codes" [ref=e207]
                        - img "down" [ref=e209]:
                          - img [ref=e210]
                  - separator [ref=e212]
                  - generic [ref=e213]:
                    - generic [ref=e214]:
                      - heading "Pregnancy safety rules" [level=5] [ref=e215]
                      - button "plus Add rule" [ref=e216] [cursor=pointer]:
                        - img "plus" [ref=e218]:
                          - img [ref=e219]
                        - generic [ref=e222]: Add rule
                    - generic [ref=e223]: No pregnancy rules configured.
                  - separator [ref=e224]
                  - generic [ref=e225]:
                    - generic [ref=e226]:
                      - heading "Lactation safety rules" [level=5] [ref=e227]
                      - button "plus Add rule" [ref=e228] [cursor=pointer]:
                        - img "plus" [ref=e230]:
                          - img [ref=e231]
                        - generic [ref=e234]: Add rule
                    - generic [ref=e235]: No lactation rules configured.
                  - separator [ref=e236]
                  - generic [ref=e237]:
                    - generic [ref=e238]:
                      - heading "Kidney dose adjustments" [level=5] [ref=e239]
                      - button "plus Add rule" [ref=e240] [cursor=pointer]:
                        - img "plus" [ref=e242]:
                          - img [ref=e243]
                        - generic [ref=e246]: Add rule
                    - generic [ref=e247]: No kidney dose adjustments configured.
                  - separator [ref=e248]
                  - generic [ref=e249]:
                    - generic [ref=e250]:
                      - heading "Renal replacement therapies" [level=5] [ref=e251]
                      - button "plus Add rule" [ref=e252] [cursor=pointer]:
                        - img "plus" [ref=e254]:
                          - img [ref=e255]
                        - generic [ref=e258]: Add rule
                    - generic [ref=e259]: No renal replacement therapy rules configured.
                  - separator [ref=e260]
                  - generic [ref=e261]:
                    - generic [ref=e262]:
                      - heading "Hepatic dose adjustments" [level=5] [ref=e263]
                      - button "plus Add rule" [ref=e264] [cursor=pointer]:
                        - img "plus" [ref=e266]:
                          - img [ref=e267]
                        - generic [ref=e270]: Add rule
                    - generic [ref=e271]: No hepatic dose adjustments configured.
                  - separator [ref=e272]
                  - generic [ref=e273]:
                    - generic [ref=e274]:
                      - heading "Fall risk rules" [level=5] [ref=e275]
                      - button "plus Add rule" [ref=e276] [cursor=pointer]:
                        - img "plus" [ref=e278]:
                          - img [ref=e279]
                        - generic [ref=e282]: Add rule
                    - generic [ref=e283]: No fall risk rules configured.
                  - separator [ref=e284]
                  - generic [ref=e285]:
                    - generic [ref=e286]:
                      - heading "Disease contraindication rules" [level=5] [ref=e287]
                      - button "plus Add rule" [ref=e288] [cursor=pointer]:
                        - img "plus" [ref=e290]:
                          - img [ref=e291]
                        - generic [ref=e294]: Add rule
                    - generic [ref=e295]: No disease contraindication rules configured.
                  - separator [ref=e296]
                  - generic [ref=e297]:
                    - generic [ref=e298]:
                      - heading "Pediatric safety rules" [level=5] [ref=e299]
                      - button "plus Add rule" [ref=e300] [cursor=pointer]:
                        - img "plus" [ref=e302]:
                          - img [ref=e303]
                        - generic [ref=e306]: Add rule
                    - generic [ref=e307]: No pediatric safety rules configured.
                  - separator [ref=e308]
                  - generic [ref=e309]:
                    - generic [ref=e310]:
                      - heading "Dose range rules" [level=5] [ref=e311]
                      - button "plus Add rule" [ref=e312] [cursor=pointer]:
                        - img "plus" [ref=e314]:
                          - img [ref=e315]
                        - generic [ref=e318]: Add rule
                    - generic [ref=e319]: No dose range rules configured.
                  - separator [ref=e320]
                  - generic [ref=e321]:
                    - generic [ref=e322]:
                      - heading "Pharmacogenomics rules" [level=5] [ref=e323]
                      - button "plus Add rule" [ref=e324] [cursor=pointer]:
                        - img "plus" [ref=e326]:
                          - img [ref=e327]
                        - generic [ref=e330]: Add rule
                    - generic [ref=e331]: No pharmacogenomics rules configured.
```

# Test source

```ts
  25  |     switch (tabName) {
  26  |       case 'Product': selector = CreateMedicationLocators.tabProduct; break;
  27  |       case 'Price': selector = CreateMedicationLocators.tabPrice; break;
  28  |       case 'Drug': selector = CreateMedicationLocators.tabDrug; break;
  29  |       case 'Clinical / CDSS': selector = CreateMedicationLocators.tabClinical; break;
  30  |       case 'Prescription / Workflow': selector = CreateMedicationLocators.tabPrescription; break;
  31  |       case 'Usage': selector = CreateMedicationLocators.tabUsage; break;
  32  |       case 'Warehouse': selector = CreateMedicationLocators.tabWarehouse; break;
  33  |     }
  34  |     await this.click(selector);
  35  |     await this.page.waitForTimeout(1000); // Wait for tab animation/loading
  36  |   }
  37  | 
  38  |   // --- PRODUCT TAB METHODS ---
  39  |   async fillProductTab(data: {
  40  |     source: string;
  41  |     code: string;
  42  |     rank: string;
  43  |     tmt: string;
  44  |     thaiName: string;
  45  |     genericName: string;
  46  |     englishName?: string;
  47  |     barcode?: string;
  48  |   }) {
  49  |     // Select Source
  50  |     await this.click(CreateMedicationLocators.sourceTypeSelect);
  51  |     await this.page.locator(`.ant-select-item-option-content:has-text("${data.source}")`).first().click();
  52  |     await this.page.waitForTimeout(500);
  53  | 
  54  |     // Text inputs
  55  |     await this.fill(CreateMedicationLocators.medicationCodeInput, data.code);
  56  |     await this.fill(CreateMedicationLocators.rankInput, data.rank);
  57  |     await this.fill(CreateMedicationLocators.tmtTpuInput, data.tmt);
  58  |     await this.fill(CreateMedicationLocators.thaiNameInput, data.thaiName);
  59  |     await this.fill(CreateMedicationLocators.genericNameThInput, data.genericName);
  60  |     
  61  |     if (data.englishName) {
  62  |       await this.fill(CreateMedicationLocators.englishNameInput, data.englishName);
  63  |     }
  64  |     if (data.barcode) {
  65  |       await this.fill(CreateMedicationLocators.barcodeInput, data.barcode);
  66  |     }
  67  |   }
  68  | 
  69  |   // --- PRICE TAB METHODS ---
  70  |   async fillPriceTab(data: {
  71  |     unitPrice: string;
  72  |     packageQty: string;
  73  |     packageUnit?: string;
  74  |   }) {
  75  |     await this.fill(CreateMedicationLocators.defaultUnitPriceInput, data.unitPrice);
  76  |     await this.fill(CreateMedicationLocators.packageQuantityInput, data.packageQty);
  77  |     
  78  |     if (data.packageUnit) {
  79  |       await this.click(CreateMedicationLocators.packageUnitSelect);
  80  |       await this.page.locator(`.ant-select-item-option-content:has-text("${data.packageUnit}")`).first().click();
  81  |     }
  82  |   }
  83  | 
  84  |   // --- DRUG TAB METHODS ---
  85  |   async fillDrugTab(data: {
  86  |     strength: string;
  87  |     content: string;
  88  |     dosageForm?: string;
  89  |     route?: string;
  90  |     dispenseUnit?: string;
  91  |   }) {
  92  |     await this.fill(CreateMedicationLocators.strengthInput, data.strength);
  93  |     await this.fill(CreateMedicationLocators.contentInput, data.content);
  94  |     
  95  |     if (data.dosageForm) {
  96  |       await this.click(CreateMedicationLocators.dosageFormSelect);
  97  |       await this.page.locator(`.ant-select-item-option-content:has-text("${data.dosageForm}")`).first().click();
  98  |     }
  99  |     if (data.route) {
  100 |       await this.click(CreateMedicationLocators.administrativeRouteSelect);
  101 |       await this.page.locator(`.ant-select-item-option-content:has-text("${data.route}")`).first().click();
  102 |     }
  103 |     if (data.dispenseUnit) {
  104 |       await this.click(CreateMedicationLocators.dispenseUnitSelect);
  105 |       await this.page.locator(`.ant-select-item-option-content:has-text("${data.dispenseUnit}")`).first().click();
  106 |     }
  107 |   }
  108 | 
  109 |   // --- CLINICAL TAB METHODS ---
  110 |   async fillClinicalTab(data: {
  111 |     isHighAlert?: boolean;
  112 |     isChemotherapy?: boolean;
  113 |     isAddictive?: boolean;
  114 |     isWarfarin?: boolean;
  115 |   }) {
  116 |     const handleSwitch = async (selector: string, value: boolean) => {
  117 |       const el = this.page.locator(selector).first();
  118 |       try {
  119 |         const isChecked = await el.getAttribute('aria-checked') === 'true';
  120 |         if (isChecked !== value) {
  121 |           await el.click({ force: true });
  122 |         }
  123 |       } catch (e) {
  124 |         // Fallback: just click it
> 125 |         await el.click({ force: true });
      |                  ^ TimeoutError: locator.click: Timeout 10000ms exceeded.
  126 |       }
  127 |     };
  128 | 
  129 |     if (data.isHighAlert !== undefined) {
  130 |       await handleSwitch(CreateMedicationLocators.isHighAlertDrugSwitch, data.isHighAlert);
  131 |     }
  132 |     if (data.isChemotherapy !== undefined) {
  133 |       await handleSwitch(CreateMedicationLocators.isChemotherapySwitch, data.isChemotherapy);
  134 |     }
  135 |     if (data.isAddictive !== undefined) {
  136 |       await handleSwitch(CreateMedicationLocators.isAddictiveSwitch, data.isAddictive);
  137 |     }
  138 |     if (data.isWarfarin !== undefined) {
  139 |       await handleSwitch(CreateMedicationLocators.isWarfarinSwitch, data.isWarfarin);
  140 |     }
  141 |   }
  142 | 
  143 |   // --- PRESCRIPTION TAB METHODS ---
  144 |   async fillPrescriptionTab(data: {
  145 |     maxDispense: string;
  146 |   }) {
  147 |     await this.fill(CreateMedicationLocators.maxDispenseInput, data.maxDispense);
  148 |   }
  149 | 
  150 |   // --- USAGE TAB METHODS ---
  151 |   async fillUsageTab(data: {
  152 |     minDay?: string;
  153 |     maxDay?: string;
  154 |     maxUsageDuration?: string;
  155 |     syntax?: string;
  156 |     instruction?: string;
  157 |   }) {
  158 |     if (data.minDay) {
  159 |       await this.fill(CreateMedicationLocators.minDayInput, data.minDay);
  160 |     }
  161 |     if (data.maxDay) {
  162 |       await this.fill(CreateMedicationLocators.maxDayInput, data.maxDay);
  163 |     }
  164 |     if (data.maxUsageDuration) {
  165 |       await this.fill(CreateMedicationLocators.maxUsageDurationInput, data.maxUsageDuration);
  166 |     }
  167 |     if (data.syntax) {
  168 |       await this.fill(CreateMedicationLocators.syntaxInput, data.syntax);
  169 |     }
  170 |     if (data.instruction) {
  171 |       await this.fill(CreateMedicationLocators.instructionInput, data.instruction);
  172 |     }
  173 |   }
  174 | 
  175 |   // --- WAREHOUSE TAB METHODS ---
  176 |   async fillWarehouseTab(data: {
  177 |     allowOrderWithoutStock?: boolean;
  178 |   }) {
  179 |     if (data.allowOrderWithoutStock !== undefined) {
  180 |       const el = this.page.locator(CreateMedicationLocators.allowOrderWithoutStockSwitch).first();
  181 |       try {
  182 |         const isChecked = await el.getAttribute('aria-checked') === 'true';
  183 |         if (isChecked !== data.allowOrderWithoutStock) {
  184 |           await el.click({ force: true });
  185 |         }
  186 |       } catch (e) {
  187 |         await el.click({ force: true });
  188 |       }
  189 |     }
  190 |   }
  191 | 
  192 |   async clickSave() {
  193 |     await this.saveButton.click();
  194 |   }
  195 | 
  196 |   async clickCancel() {
  197 |     await this.cancelButton.click();
  198 |   }
  199 | 
  200 |   async getErrorMessagesCount() {
  201 |     try {
  202 |       await this.page.locator(CreateMedicationLocators.errorMessage).first().waitFor({ state: 'visible', timeout: 5000 });
  203 |     } catch (e) {
  204 |       console.log('No error messages became visible within 5s');
  205 |     }
  206 |     return await this.page.locator(CreateMedicationLocators.errorMessage).count();
  207 |   }
  208 | }
  209 | 
```