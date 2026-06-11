import { Page, Locator } from '@playwright/test';
import { ClaimLocators } from '../../locators/claim.locators';

const CASHIER_BASE = 'https://dev-x.cortexcloud.co/cashier';

export class ClaimAccountPage {
  readonly tabTamSitti: Locator;
  readonly tabRaikan: Locator;
  readonly btnAddItem: Locator;
  readonly btnExportDRU: Locator;
  readonly btnExportADP: Locator;
  readonly btnExportOOP: Locator;
  readonly btnExportORF: Locator;

  constructor(private page: Page) {
    this.tabTamSitti = page.locator(ClaimLocators.tabTamSitti);
    this.tabRaikan = page.locator(ClaimLocators.tabRaikan);
    this.btnAddItem = page.locator(ClaimLocators.btnAddItem);
    this.btnExportDRU = page.locator(ClaimLocators.btnExportDRU);
    this.btnExportADP = page.locator(ClaimLocators.btnExportADP);
    this.btnExportOOP = page.locator(ClaimLocators.btnExportOOP);
    this.btnExportORF = page.locator(ClaimLocators.btnExportORF);
  }

  async gotoIPDAccount(visitId: string) {
    await this.page.goto(`${CASHIER_BASE}/ipd/visits/${visitId}/account`);
  }

  async gotoOPDAccount(visitId: string) {
    await this.page.goto(`${CASHIER_BASE}/opd/visits/${visitId}/account`);
  }

  async gotoClaimExport(visitId: string, visitType: 'opd' | 'ipd' = 'opd') {
    await this.page.goto(`${CASHIER_BASE}/${visitType}/visits/${visitId}/claim`);
  }

  async getClaimCategoryForRow(rowIndex = 0): Promise<string | null> {
    const cells = this.page.locator(ClaimLocators.tdClaimCategory);
    return cells.nth(rowIndex).textContent();
  }

  async hasClaimCategoryColumn(): Promise<boolean> {
    return this.page.locator(ClaimLocators.thWitKanBik).isVisible();
  }

  async getCreditForRow(rowIndex = 0): Promise<string | null> {
    const cells = this.page.locator(ClaimLocators.tdCredit);
    return cells.nth(rowIndex).textContent();
  }

  async getNonBenefitForRow(rowIndex = 0): Promise<string | null> {
    const cells = this.page.locator(ClaimLocators.tdNonBenefit);
    return cells.nth(rowIndex).textContent();
  }
}

export class RepUploadPage {
  readonly inputFile: Locator;
  readonly btnUpload: Locator;
  readonly snackbarError: Locator;
  readonly snackbarSuccess: Locator;

  constructor(private page: Page) {
    this.inputFile = page.locator(ClaimLocators.inputFileUpload);
    this.btnUpload = page.locator(ClaimLocators.btnUpload);
    this.snackbarError = page.locator(ClaimLocators.snackbarError);
    this.snackbarSuccess = page.locator(ClaimLocators.snackbarSuccess);
  }

  async goto() {
    await this.page.goto(`${CASHIER_BASE}/claim/rep-upload`);
  }

  async uploadFile(filePath: string) {
    await this.inputFile.setInputFiles(filePath);
    await this.btnUpload.click();
  }

  async mockApiResponse(status: number, errorCode: string) {
    await this.page.route('**/api/rep/upload', route =>
      route.fulfill({
        status,
        contentType: 'application/json',
        body: JSON.stringify({ error: errorCode }),
      })
    );
  }

  async mockApiSuccess() {
    await this.page.route('**/api/rep/upload', route =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      })
    );
  }
}

export class ClaimVisitPage {
  readonly btnCreateVisit: Locator;
  readonly btnAdmit: Locator;
  readonly btnSave: Locator;
  readonly inputPatientSearch: Locator;
  readonly btnRequestAuthCode: Locator;
  readonly inputAuthCode: Locator;
  readonly formErrorMsg: Locator;
  readonly messageError: Locator;

  constructor(private page: Page) {
    this.btnCreateVisit = page.locator(ClaimLocators.btnCreateVisit);
    this.btnAdmit = page.locator(ClaimLocators.btnAdmit);
    this.btnSave = page.locator(ClaimLocators.btnSave);
    this.inputPatientSearch = page.locator(ClaimLocators.inputPatientSearch);
    this.btnRequestAuthCode = page.locator(ClaimLocators.btnRequestAuthCode);
    this.inputAuthCode = page.locator(ClaimLocators.inputAuthCode);
    this.formErrorMsg = page.locator(ClaimLocators.formErrorMsg);
    this.messageError = page.locator(ClaimLocators.messageError);
  }

  async gotoNewOPDVisit() {
    await this.page.goto(`${CASHIER_BASE}/opd/visits/new`);
  }

  async gotoEditOPDVisit(visitId: string) {
    await this.page.goto(`${CASHIER_BASE}/opd/visits/${visitId}/edit`);
  }

  async gotoNewAdmission() {
    await this.page.goto(`${CASHIER_BASE}/ipd/admissions/new`);
  }

  async gotoAdmissionHistory() {
    await this.page.goto(`${CASHIER_BASE}/ipd/admissions/history`);
  }

  async selectPatient(patientName: string) {
    await this.inputPatientSearch.fill(patientName);
    await this.page.locator('.ant-select-item-option').first().click();
  }

  async hasRequestAuthCodeButton(): Promise<boolean> {
    return this.btnRequestAuthCode.isVisible();
  }
}
