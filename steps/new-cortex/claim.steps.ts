import { Page, test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { ClaimAccountPage, RepUploadPage, ClaimVisitPage } from '../../pages/new-cortex/claim.page';
import { ClaimLocators } from '../../locators/claim.locators';
import { ClaimTestCase, CLAIM_CONFIG } from '../../data/new-cortex/claim.data';

const CASHIER_BASE = 'https://dev-x.cortexcloud.co/cashier';

export class ClaimSteps {
  private accountPage: ClaimAccountPage;
  private repUploadPage: RepUploadPage;
  private visitPage: ClaimVisitPage;

  // State shared between when and then steps
  private downloadedLines: string[] = [];
  private downloadedContent = '';

  constructor(private page: Page) {
    this.accountPage = new ClaimAccountPage(page);
    this.repUploadPage = new RepUploadPage(page);
    this.visitPage = new ClaimVisitPage(page);
  }

  // ─── Dynamic Entry Point ───────────────────────────
  async execute(tc: ClaimTestCase) {
    // Some pre-actions if needed (like navigating to specific starting point)
    await this.dispatchPreAction(tc);

    // ── When ── dispatch by action
    await this.dispatchAction(tc);

    // ── Then ── dispatch by expected outcome
    await this.dispatchExpect(tc);
  }

  private async dispatchPreAction(tc: ClaimTestCase) {
    if (tc.action === 'upload-rep-with-mock-error' || tc.action === 'upload-rep-with-mock-success') {
      await test.step('When navigate to REP Upload page', async () => {
        await this.repUploadPage.goto();
      });
    }
  }

  // ─── Action Dispatcher ─────────────────────────────
  private async dispatchAction(tc: ClaimTestCase) {
    switch (tc.action) {
      // ── Coverage Validation ──
      case 'opd-create-visit-zero-budget':
      case 'opd-create-visit-with-budget':
        await test.step(`When create OPD visit for "${tc.patientName}"`, async () => {
          await this.visitPage.gotoNewOPDVisit();
          await this.visitPage.selectPatient(tc.patientName!);
          await this.visitPage.btnCreateVisit.click();
        });
        break;

      case 'nhso-opd-check-auth-button':
        await test.step(`When open visit ${tc.visitId}`, async () => {
          await this.page.goto(`${CASHIER_BASE}/opd/visits/${tc.visitId}`);
        });
        break;

      case 'ipd-admit-zero-budget':
        await test.step(`When admit patient "${tc.patientName}"`, async () => {
          await this.visitPage.gotoNewAdmission();
          await this.visitPage.selectPatient(tc.patientName!);
          await this.visitPage.btnAdmit.click();
        });
        break;

      case 'nhso-ipd-freetext-auth-code':
        await test.step(`When open new admission for "${tc.patientName}" and fill auth code "${tc.code}"`, async () => {
          await this.visitPage.gotoNewAdmission();
          await this.visitPage.selectPatient(tc.patientName!);
          await expect(this.page.locator(ClaimLocators.btnRequestAuthCode)).not.toBeVisible();
          await this.page.locator(ClaimLocators.inputAuthCode).fill(tc.code!);
        });
        break;

      case 'check-admission-history-columns':
        await test.step('When open Admission History', async () => {
          await this.visitPage.gotoAdmissionHistory();
        });
        break;

      // ── IPD Pricing ──
      case 'ipd-pricing-check-category':
      case 'ipd-pricing-check-force-tariff':
      case 'ipd-pricing-check-kruekachon-budget':
      case 'ipd-pricing-reload-snapshot-persists':
        await test.step(`When open IPD account ตามสิทธิ tab for visit ${tc.visitId}`, async () => {
          await this.accountPage.gotoIPDAccount(tc.visitId!);
          await this.accountPage.tabTamSitti.click();
          await this.page.waitForLoadState('networkidle');
        });
        break;

      case 'pricing-check-category-column-visibility':
        await test.step(`When open IPD then OPD account to check column visibility for visit ${tc.visitId}`, async () => {
          await this.accountPage.gotoIPDAccount(tc.visitId!);
          await expect(this.page.locator(ClaimLocators.thWitKanBik)).toBeVisible();
          await this.accountPage.gotoOPDAccount(tc.visitId!); // Reuse same ID for visibility test
          await this.accountPage.tabTamSitti.click();
        });
        break;

      // ── ICD9 Coding ──
      case 'opd-coding-icd9-search':
        await test.step(`When open OPD coding, click Add Procedure and search for "${tc.code}"`, async () => {
          await this.page.goto(`${CASHIER_BASE}/opd/visits/${tc.visitId}/coding`);
          await this.page.locator(ClaimLocators.btnAddProcedure).click();
          await this.page.waitForLoadState('domcontentloaded');
          await this.page.locator(ClaimLocators.inputIcd9Search).fill(tc.code!);
          await this.page.waitForTimeout(600);
        });
        break;

      // ── CHT Invoice ──
      case 'cht-invoice-check':
        await test.step(`When open claim preview for visit ${tc.visitId}`, async () => {
          await this.page.goto(`${CASHIER_BASE}/ipd/visits/${tc.visitId}/claim/preview`);
          await this.page.waitForLoadState('networkidle');
        });
        break;

      // ── E-Claim Export ──
      case 'download-eclaim-dru':
        await test.step(`When open E-Claim export for OPD visit ${tc.visitId} and download DRU`, async () => {
          await this.accountPage.gotoClaimExport(tc.visitId!, 'opd');
          const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.accountPage.btnExportDRU.click(),
          ]);
          const content = fs.readFileSync((await download.path())!, 'utf-8');
          this.downloadedLines = content.split('\n').filter(l => l.trim());
        });
        break;

      case 'download-eclaim-oop':
        await test.step(`When open E-Claim export for OPD visit ${tc.visitId} and download OOP`, async () => {
          await this.accountPage.gotoClaimExport(tc.visitId!, 'opd');
          const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.accountPage.btnExportOOP.click(),
          ]);
          this.downloadedContent = fs.readFileSync((await download.path())!, 'utf-8');
        });
        break;

      case 'download-eclaim-orf':
        await test.step(`When open E-Claim export for OPD visit ${tc.visitId} and download ORF`, async () => {
          await this.accountPage.gotoClaimExport(tc.visitId!, 'opd');
          const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.accountPage.btnExportORF.click(),
          ]);
          const content = fs.readFileSync((await download.path())!, 'utf-8');
          this.downloadedLines = content.split('\n').filter(l => l.trim());
        });
        break;

      // ── REP Upload ──
      case 'upload-rep-with-mock-error':
        await test.step(`When upload "${tc.mockError!.file}" mocked as "${tc.mockError!.code}"`, async () => {
          await this.repUploadPage.mockApiResponse(tc.mockError!.status, tc.mockError!.code);
          await this.repUploadPage.uploadFile(
            path.join(__dirname, '../../fixtures', tc.mockError!.file)
          );
        });
        break;

      case 'upload-rep-with-mock-success':
        await test.step(`When upload "${tc.mockSuccess!.file}" mocked as success`, async () => {
          await this.repUploadPage.mockApiSuccess();
          await this.repUploadPage.uploadFile(
            path.join(__dirname, '../../fixtures', tc.mockSuccess!.file)
          );
        });
        break;
    }
  }

  // ─── Expect Dispatcher ─────────────────────────────
  private async dispatchExpect(tc: ClaimTestCase) {
    switch (tc.expect) {
      // ── Coverage Validation ──
      case 'budget-validation-error':
        await test.step('Then budget validation error shown', async () => {
          const err = this.page.locator(`${ClaimLocators.formErrorMsg}, ${ClaimLocators.messageError}`);
          await expect(err.first()).toBeVisible({ timeout: 5000 });
          await expect(err.first()).toContainText(/งบประมาณ|budget/i);
        });
        break;

      case 'visit-created-successfully':
        await test.step('Then visit created successfully', async () => {
          await expect(this.page).toHaveURL(/\/opd\/visits\/\w+/, { timeout: 15000 });
        });
        break;

      case 'request-auth-button-visible':
        await test.step('Then Request Auth Code button visible', async () => {
          await expect(this.page.locator(ClaimLocators.btnRequestAuthCode)).toBeVisible();
        });
        break;

      case 'ipd-budget-validation-error':
        await test.step('Then IPD budget validation error shown', async () => {
          const err = this.page.locator(`${ClaimLocators.formErrorMsg}, ${ClaimLocators.messageError}`);
          await expect(err.first()).toBeVisible({ timeout: 5000 });
        });
        break;

      case 'no-request-auth-and-freetext-matches':
        await test.step(`Then no Request Auth Code button, and auth code input matches "${tc.code}"`, async () => {
          await expect(this.page.locator(ClaimLocators.inputAuthCode)).toBeVisible();
          await expect(this.page.locator(ClaimLocators.inputAuthCode)).toHaveValue(tc.code!);
        });
        break;

      case 'columns-and-approval-codes-split':
        await test.step('Then Auth/Endpoint/Approval columns visible, and approval codes are comma-joined', async () => {
          await expect(this.page.locator(ClaimLocators.thAuthCode)).toBeVisible();
          await expect(this.page.locator(ClaimLocators.thEndpointCode)).toBeVisible();
          await expect(this.page.locator(ClaimLocators.thApprovalCodes)).toBeVisible();

          const cell = this.page.locator(ClaimLocators.tdApprovalCodes).first();
          const text = await cell.textContent();
          if (text && text.includes(',')) {
            expect(text).toMatch(/\w+,\s*\w+/);
          }
        });
        break;

      // ── IPD Pricing ──
      case 'claim-category-is-d':
        await test.step('Then claim_category = "D"', async () => {
          const cell = this.page.locator(ClaimLocators.tdClaimCategory).first();
          await expect(cell).toBeVisible({ timeout: 10000 });
          await expect(cell).toContainText('D');
        });
        break;

      case 'claim-category-is-t':
        await test.step('Then claim_category = "T"', async () => {
          const cell = this.page.locator(ClaimLocators.tdClaimCategory).first();
          await expect(cell).toBeVisible({ timeout: 10000 });
          await expect(cell).toContainText('T');
        });
        break;

      case 'visible-in-ipd-hidden-in-opd':
        await test.step('Then claim_category column not visible on OPD', async () => {
          await expect(this.page.locator(ClaimLocators.thWitKanBik)).not.toBeVisible();
        });
        break;

      case 'force-tariff-icon-and-tooltip-visible':
        await test.step('Then force_tariff info icon + tooltip visible', async () => {
          const cell = this.page.locator(ClaimLocators.tdClaimCategory).first();
          await expect(cell).toContainText('T');
          const icon = this.page.locator(ClaimLocators.infoIconForceTargiff).first();
          await expect(icon).toBeVisible();
          await icon.hover();
          await expect(this.page.locator(ClaimLocators.tooltipContent))
            .toContainText('นอกการประกาศ Tariff');
        });
        break;

      case 'kruekachon-budget-allocated-correctly':
        await test.step('Then Kruekachon budget allocated correctly', async () => {
          const credits = this.page.locator(ClaimLocators.tdCredit);
          const nonBenefits = this.page.locator(ClaimLocators.tdNonBenefit);
          await expect(credits.nth(0)).toContainText('10');
          await expect(nonBenefits.nth(0)).toContainText('90');
          await expect(credits.nth(1)).toContainText('0');
        });
        break;

      case 'claim-category-persists':
        await test.step('Then claim_category persists after reload', async () => {
          const before = await this.page.locator(ClaimLocators.tdClaimCategory).first().textContent();
          await this.page.reload();
          await this.accountPage.tabTamSitti.click();
          await this.page.waitForLoadState('networkidle');
          const after = await this.page.locator(ClaimLocators.tdClaimCategory).first().textContent();
          expect(before).toBe(after);
        });
        break;

      // ── ICD9 Coding ──
      case 'all-results-start-with-99':
        await test.step('Then all results start with "99"', async () => {
          const options = this.page.locator(ClaimLocators.icd9Option);
          await expect(options.first()).toBeVisible({ timeout: 5000 });
          const count = await options.count();
          expect(count).toBeGreaterThan(0);
          for (let i = 0; i < Math.min(count, 10); i++) {
            const text = await options.nth(i).textContent();
            expect(text?.trim()).toMatch(/^99/);
          }
        });
        break;

      case 'results-are-code-matches-only-for-45':
        await test.step('Then results are code matches only (no keyword mix) for "45"', async () => {
          const options = this.page.locator(ClaimLocators.icd9Option);
          await expect(options.first()).toBeVisible({ timeout: 5000 });
          const count = await options.count();
          for (let i = 0; i < Math.min(count, 10); i++) {
            const text = await options.nth(i).textContent();
            expect(text?.trim()).toMatch(/^45/);
          }
        });
        break;

      case 'results-contain-keyword-fracture':
        await test.step('Then results contain keyword "fracture"', async () => {
          const options = this.page.locator(ClaimLocators.icd9Option);
          await expect(options.first()).toBeVisible({ timeout: 5000 });
          const text = await options.first().textContent();
          expect(text?.toLowerCase()).toContain('fracture');
        });
        break;

      case 'exact-code-99.04-in-results':
        await test.step('Then exact code "99.04" appears in results', async () => {
          const options = this.page.locator(ClaimLocators.icd9Option);
          await expect(options.first()).toBeVisible({ timeout: 5000 });
          await expect(options.first()).toContainText('99.04');
        });
        break;

      // ── CHT Invoice ──
      case 'invoice-no-equals-approval-code':
        await test.step('Then CHT.INVOICE_NO = approval code', async () => {
          const invoiceNo = this.page.locator(ClaimLocators.chtInvoiceNo);
          const approvalCodes = this.page.locator(ClaimLocators.approvalCodesDisplay);
          await expect(invoiceNo).toBeVisible();
          const approvalText = await approvalCodes.textContent();
          await expect(invoiceNo).toHaveText(approvalText!.trim());
        });
        break;

      case 'invoice-no-equals-vn':
        await test.step('Then CHT.INVOICE_NO = VN', async () => {
          const invoiceNo = this.page.locator(ClaimLocators.chtInvoiceNo);
          const vn = this.page.locator(ClaimLocators.visitVN);
          await expect(invoiceNo).toBeVisible();
          const vnText = await vn.textContent();
          await expect(invoiceNo).toHaveText(vnText!.trim());
        });
        break;

      // ── E-Claim Export ──
      case 'dru-has-valid-fields':
        await test.step('Then DRU fields AMOUNT/DRUGPRICE/DRUGCOST/DIDSTD/UNIT not empty', async () => {
          expect(this.downloadedLines.length).toBeGreaterThan(1);
          const d = this.downloadedLines[1];
          expect(d.substring(0, 12).trim()).toBeTruthy();   // AMOUNT 12B
          expect(d.substring(12, 26).trim()).toBeTruthy();  // DRUGPRICE 14B
          expect(d.substring(26, 40).trim()).toBeTruthy();  // DRUGCOST 14B
          expect(d.substring(40, 64).trim()).toBeTruthy();  // DIDSTD 24B
          expect(d.substring(64, 84).trim()).toBeTruthy();  // UNIT 20B
        });
        break;

      case 'oop-contains-icd9-codes':
        await test.step('Then OOP contains all expected ICD9-CM codes', async () => {
          for (const code of CLAIM_CONFIG.ICD9_CODES_IN_VISIT) {
            expect(this.downloadedContent).toContain(code);
          }
        });
        break;

      case 'orf-has-refer-hospital-code':
        await test.step(`Then ORF has refer record with hospital code "${CLAIM_CONFIG.REFER_OUT_HOSPITAL_CODE}"`, async () => {
          expect(this.downloadedLines.length).toBeGreaterThan(1);
          expect(this.downloadedLines[1]).toContain(CLAIM_CONFIG.REFER_OUT_HOSPITAL_CODE);
        });
        break;

      case 'orf-is-empty':
        await test.step('Then ORF is empty (no data rows)', async () => {
          expect(this.downloadedLines.length).toBeLessThanOrEqual(1);
        });
        break;

      // ── REP Upload ──
      case 'snackbar-shows-no-claims-message':
        await test.step('Then snackbar: ไม่พบรายการเบิกใน REP ที่ตรงกับในระบบ', async () => {
          await expect(this.page.locator(ClaimLocators.snackbarError))
            .toContainText('ไม่พบรายการเบิกใน REP ที่ตรงกับในระบบ', { timeout: 8000 });
        });
        break;

      case 'snackbar-shows-invalid-format-message':
        await test.step('Then snackbar: REP excel format ไม่ถูกต้อง', async () => {
          await expect(this.page.locator(ClaimLocators.snackbarError))
            .toContainText('REP excel format ไม่ถูกต้อง', { timeout: 8000 });
        });
        break;

      case 'snackbar-shows-contact-admin-message':
        await test.step('Then snackbar: ไม่สามารถนำเข้า REP ได้ กรุณาติดต่อ Administrator', async () => {
          await expect(this.page.locator(ClaimLocators.snackbarError))
            .toContainText('ไม่สามารถนำเข้า REP ได้ กรุณาติดต่อ Administrator', { timeout: 8000 });
        });
        break;

      case 'snackbar-shows-success':
        await test.step('Then success snackbar shown', async () => {
          await expect(this.page.locator(ClaimLocators.snackbarSuccess)).toBeVisible({ timeout: 8000 });
        });
        break;
    }
  }
}
