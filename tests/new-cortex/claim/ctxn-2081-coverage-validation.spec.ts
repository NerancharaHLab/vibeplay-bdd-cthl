import { test } from '@playwright/test';
import { ClaimCoverageSteps } from '../../../steps/new-cortex/claim/claim-coverage.steps';

/**
 * CTXN-2081: [Registration][Manage Coverage] Improve Coverage Handling OPD/IPD
 *
 * ⚠️  แทนที่ REPLACE_ME:
 *   PATIENT_ZERO_BUDGET  = ชื่อผู้ป่วยที่ coverage is_require_budget=TRUE และ budget=0
 *   PATIENT_WITH_BUDGET  = ชื่อผู้ป่วยที่ coverage is_require_budget=TRUE และ budget>0
 *   NHSO_OPD_VISIT_ID    = Visit ID ของผู้ป่วยสิทธิ NHSO OPD
 *   PATIENT_ZERO_IPD     = ชื่อผู้ป่วยที่ is_require_budget_ipd=TRUE และ budget_ipd=0
 *   PATIENT_NHSO_IPD     = ชื่อผู้ป่วยสิทธิ NHSO IPD
 */
const TEST_DATA = {
  PATIENT_ZERO_BUDGET: 'REPLACE_ME',
  PATIENT_WITH_BUDGET: 'REPLACE_ME',
  NHSO_OPD_VISIT_ID: 'REPLACE_ME',
  PATIENT_ZERO_IPD: 'REPLACE_ME',
  PATIENT_NHSO_IPD: 'REPLACE_ME',
};

test.describe('CTXN-2081: Coverage Validation & Admission History', () => {
  let steps: ClaimCoverageSteps;

  test.beforeEach(async ({ page }) => {
    steps = new ClaimCoverageSteps(page);
  });

  test('TC-2081-01: createVisit — budget หมด → validation error', async () => {
    await steps.whenCreateVisitWithPatient(TEST_DATA.PATIENT_ZERO_BUDGET);
    await steps.thenBudgetValidationErrorShown();
  });

  test('TC-2081-02: createVisit — budget เหลือ → สร้าง Visit ได้ปกติ', async () => {
    await steps.whenCreateVisitWithPatient(TEST_DATA.PATIENT_WITH_BUDGET);
    await steps.thenVisitCreatedSuccessfully();
  });

  test('TC-2081-04: NHSO OPD — มีปุ่มขอ auth code', async () => {
    await steps.whenOpenVisit(TEST_DATA.NHSO_OPD_VISIT_ID);
    await steps.thenRequestAuthCodeButtonVisible();
  });

  test('TC-2081-05: Admission — budget_ipd หมด → validation error', async () => {
    await steps.whenAdmitPatient(TEST_DATA.PATIENT_ZERO_IPD);
    await steps.thenIPDBudgetValidationErrorShown();
  });

  test('TC-2081-06: NHSO IPD — ไม่มีปุ่ม request auth, ใส่ free text ได้', async () => {
    await steps.whenOpenNewAdmissionForPatient(TEST_DATA.PATIENT_NHSO_IPD);
    await steps.thenNoRequestAuthCodeButton();
    await steps.thenAuthCodeFreeTextInputExists();
    await steps.whenFillAuthCode('AUTH-TEST-001');
    await steps.thenAuthCodeInputHasValue('AUTH-TEST-001');
  });

  test('TC-2081-07: Admission History — Auth Code, Endpoint Code, Approval Codes แยก column', async () => {
    await steps.whenOpenAdmissionHistory();
    await steps.thenAdmissionHistoryColumnsVisible();
    await steps.thenApprovalCodesJoinedByComma();
  });
});
