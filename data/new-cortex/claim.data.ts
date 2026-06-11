export const CLAIM_CONFIG = {
  // --- Coverage Validation (CTXN-2081) ---
  PATIENT_ZERO_BUDGET: 'REPLACE_ME',
  PATIENT_WITH_BUDGET: 'REPLACE_ME',
  NHSO_OPD_VISIT_ID: 'REPLACE_ME',
  PATIENT_ZERO_IPD: 'REPLACE_ME',
  PATIENT_NHSO_IPD: 'REPLACE_ME',

  // --- IPD Pricing (CTXN-2083) ---
  IPD_DRG_VISIT_ID: 'REPLACE_ME',
  IPD_TARIFF_VISIT_ID: 'REPLACE_ME',
  IPD_FORCE_TARIFF_ID: 'REPLACE_ME',
  OPD_VISIT_ID: 'REPLACE_ME',
  IPD_KRUEKACHON_ID: 'REPLACE_ME',

  // --- CHT Invoice (CTXN-2311) ---
  VISIT_MULTI_APPROVAL: 'REPLACE_ME',
  VISIT_SINGLE_APPROVAL: 'REPLACE_ME',
  VISIT_NO_APPROVAL: 'REPLACE_ME',

  // --- E-Claim Export (CTXN-235) ---
  OPD_WITH_RX: 'REPLACE_ME',
  OPD_WITH_CODING: 'REPLACE_ME',
  OPD_REFER_OUT: 'REPLACE_ME',
  OPD_NO_REFER: 'REPLACE_ME',
  REFER_OUT_HOSPITAL_CODE: 'REPLACE_ME',
  ICD9_CODES_IN_VISIT: ['REPLACE_ME'],
};

export type ClaimTestCase = {
  id: string;
  name: string;
  feature: string;
  action: string;
  expect: string;
  tags: string[];
  patientName?: string;
  visitId?: string;
  code?: string;
  mockError?: {
    file: string;
    status: number;
    code: string;
  };
  mockSuccess?: {
    file: string;
  };
};

const BASE_TAGS = ['@functional', '@claim', '@new-cortex', '@regression'];

export const ClaimTestCases: ClaimTestCase[] = [
  // ─── CTXN-2081: Coverage Validation ───
  {
    id: 'TC-2081-01',
    name: 'createVisit — budget หมด → validation error',
    feature: 'Coverage Validation',
    action: 'opd-create-visit-zero-budget',
    expect: 'budget-validation-error',
    patientName: CLAIM_CONFIG.PATIENT_ZERO_BUDGET,
    tags: [...BASE_TAGS, '@ctxn-2081', '@coverage'],
  },
  {
    id: 'TC-2081-02',
    name: 'createVisit — budget เหลือ → สร้าง Visit ได้ปกติ',
    feature: 'Coverage Validation',
    action: 'opd-create-visit-with-budget',
    expect: 'visit-created-successfully',
    patientName: CLAIM_CONFIG.PATIENT_WITH_BUDGET,
    tags: [...BASE_TAGS, '@ctxn-2081', '@coverage', '@smoke'],
  },
  {
    id: 'TC-2081-04',
    name: 'NHSO OPD — มีปุ่มขอ auth code',
    feature: 'Coverage Validation',
    action: 'nhso-opd-check-auth-button',
    expect: 'request-auth-button-visible',
    visitId: CLAIM_CONFIG.NHSO_OPD_VISIT_ID,
    tags: [...BASE_TAGS, '@ctxn-2081', '@coverage'],
  },
  {
    id: 'TC-2081-05',
    name: 'Admission — budget_ipd หมด → validation error',
    feature: 'Coverage Validation',
    action: 'ipd-admit-zero-budget',
    expect: 'ipd-budget-validation-error',
    patientName: CLAIM_CONFIG.PATIENT_ZERO_IPD,
    tags: [...BASE_TAGS, '@ctxn-2081', '@coverage'],
  },
  {
    id: 'TC-2081-06',
    name: 'NHSO IPD — ไม่มีปุ่ม request auth, ใส่ free text ได้',
    feature: 'Coverage Validation',
    action: 'nhso-ipd-freetext-auth-code',
    expect: 'no-request-auth-and-freetext-matches',
    patientName: CLAIM_CONFIG.PATIENT_NHSO_IPD,
    code: 'AUTH-TEST-001',
    tags: [...BASE_TAGS, '@ctxn-2081', '@coverage'],
  },
  {
    id: 'TC-2081-07',
    name: 'Admission History — Auth/Endpoint/Approval Codes แยก column',
    feature: 'Coverage Validation',
    action: 'check-admission-history-columns',
    expect: 'columns-and-approval-codes-split',
    tags: [...BASE_TAGS, '@ctxn-2081', '@coverage'],
  },

  // ─── CTXN-2083: IPD Pricing ───
  {
    id: 'TC-2083-03',
    name: 'claim_category = D เมื่อใช้ DRG fallback',
    feature: 'IPD Pricing',
    action: 'ipd-pricing-check-category',
    expect: 'claim-category-is-d',
    visitId: CLAIM_CONFIG.IPD_DRG_VISIT_ID,
    tags: [...BASE_TAGS, '@ctxn-2083', '@pricing'],
  },
  {
    id: 'TC-2083-04',
    name: 'claim_category = T เมื่อมี per-unit benefit config',
    feature: 'IPD Pricing',
    action: 'ipd-pricing-check-category',
    expect: 'claim-category-is-t',
    visitId: CLAIM_CONFIG.IPD_TARIFF_VISIT_ID,
    tags: [...BASE_TAGS, '@ctxn-2083', '@pricing'],
  },
  {
    id: 'TC-2083-05',
    name: 'claim_category column แสดงใน IPD เท่านั้น ไม่แสดงใน OPD',
    feature: 'IPD Pricing',
    action: 'pricing-check-category-column-visibility',
    expect: 'visible-in-ipd-hidden-in-opd',
    visitId: CLAIM_CONFIG.IPD_DRG_VISIT_ID,
    tags: [...BASE_TAGS, '@ctxn-2083', '@pricing'],
  },
  {
    id: 'TC-2083-06',
    name: 'force_tariff = true → info icon + tooltip นอกการประกาศ Tariff',
    feature: 'IPD Pricing',
    action: 'ipd-pricing-check-force-tariff',
    expect: 'force-tariff-icon-and-tooltip-visible',
    visitId: CLAIM_CONFIG.IPD_FORCE_TARIFF_ID,
    tags: [...BASE_TAGS, '@ctxn-2083', '@pricing'],
  },
  {
    id: 'TC-2083-09',
    name: 'ครูเอกชน shared budget — Item A credit=10, Item B credit=0',
    feature: 'IPD Pricing',
    action: 'ipd-pricing-check-kruekachon-budget',
    expect: 'kruekachon-budget-allocated-correctly',
    visitId: CLAIM_CONFIG.IPD_KRUEKACHON_ID,
    tags: [...BASE_TAGS, '@ctxn-2083', '@pricing'],
  },
  {
    id: 'TC-2083-12',
    name: 'claim_category snapshot คงอยู่หลัง page reload',
    feature: 'IPD Pricing',
    action: 'ipd-pricing-reload-snapshot-persists',
    expect: 'claim-category-persists',
    visitId: CLAIM_CONFIG.IPD_DRG_VISIT_ID,
    tags: [...BASE_TAGS, '@ctxn-2083', '@pricing'],
  },

  // ─── CTXN-2111: ICD9-CM Prefix Search ───
  {
    id: 'TC-2111-01',
    name: 'prefix 99 → ผลลัพธ์ทุกรายการขึ้นต้นด้วย 99',
    feature: 'ICD9 Prefix Search',
    action: 'opd-coding-icd9-search',
    expect: 'all-results-start-with-99',
    visitId: CLAIM_CONFIG.OPD_VISIT_ID,
    code: '99',
    tags: [...BASE_TAGS, '@ctxn-2111', '@search'],
  },
  {
    id: 'TC-2111-02',
    name: 'code match มีอยู่ → ไม่ mix กับ keyword results',
    feature: 'ICD9 Prefix Search',
    action: 'opd-coding-icd9-search',
    expect: 'results-are-code-matches-only-for-45',
    visitId: CLAIM_CONFIG.OPD_VISIT_ID,
    code: '45',
    tags: [...BASE_TAGS, '@ctxn-2111', '@search'],
  },
  {
    id: 'TC-2111-03',
    name: 'keyword fracture → keyword search results',
    feature: 'ICD9 Prefix Search',
    action: 'opd-coding-icd9-search',
    expect: 'results-contain-keyword-fracture',
    visitId: CLAIM_CONFIG.OPD_VISIT_ID,
    code: 'fracture',
    tags: [...BASE_TAGS, '@ctxn-2111', '@search'],
  },
  {
    id: 'TC-2111-04',
    name: 'exact code 99.04 → แสดงในผลลัพธ์',
    feature: 'ICD9 Prefix Search',
    action: 'opd-coding-icd9-search',
    expect: 'exact-code-99.04-in-results',
    visitId: CLAIM_CONFIG.OPD_VISIT_ID,
    code: '99.04',
    tags: [...BASE_TAGS, '@ctxn-2111', '@search'],
  },

  // ─── CTXN-2311: CHT.INVOICE_NO ───
  {
    id: 'TC-2311-01',
    name: 'หลาย approval codes → CHT.INVOICE_NO = approval code',
    feature: 'CHT Invoice',
    action: 'cht-invoice-check',
    expect: 'invoice-no-equals-approval-code',
    visitId: CLAIM_CONFIG.VISIT_MULTI_APPROVAL,
    tags: [...BASE_TAGS, '@ctxn-2311', '@invoice'],
  },
  {
    id: 'TC-2311-02',
    name: 'approval code เดียว → CHT.INVOICE_NO = VN',
    feature: 'CHT Invoice',
    action: 'cht-invoice-check',
    expect: 'invoice-no-equals-vn',
    visitId: CLAIM_CONFIG.VISIT_SINGLE_APPROVAL,
    tags: [...BASE_TAGS, '@ctxn-2311', '@invoice'],
  },
  {
    id: 'TC-2311-03',
    name: 'Regression — ไม่มี approval code → CHT.INVOICE_NO = VN',
    feature: 'CHT Invoice',
    action: 'cht-invoice-check',
    expect: 'invoice-no-equals-vn',
    visitId: CLAIM_CONFIG.VISIT_NO_APPROVAL,
    tags: [...BASE_TAGS, '@ctxn-2311', '@invoice'],
  },

  // ─── CTXN-235: E-Claim Export ───
  {
    id: 'TC-235-01',
    name: 'DRU Export — fields AMOUNT/DRUGPRICE/DRUGCOST/DIDSTD/UNIT ครบถ้วน',
    feature: 'E-Claim Export',
    action: 'download-eclaim-dru',
    expect: 'dru-has-valid-fields',
    visitId: CLAIM_CONFIG.OPD_WITH_RX,
    tags: [...BASE_TAGS, '@ctxn-235', '@export'],
  },
  {
    id: 'TC-235-06',
    name: 'OOP Export — ICD9-CM codes ตรงกับที่บันทึกใน OPD Coding',
    feature: 'E-Claim Export',
    action: 'download-eclaim-oop',
    expect: 'oop-contains-icd9-codes',
    visitId: CLAIM_CONFIG.OPD_WITH_CODING,
    tags: [...BASE_TAGS, '@ctxn-235', '@export'],
  },
  {
    id: 'TC-235-07',
    name: 'ORF Export — Refer Out record มีรหัสโรงพยาบาลปลายทาง',
    feature: 'E-Claim Export',
    action: 'download-eclaim-orf',
    expect: 'orf-has-refer-hospital-code',
    visitId: CLAIM_CONFIG.OPD_REFER_OUT,
    tags: [...BASE_TAGS, '@ctxn-235', '@export'],
  },
  {
    id: 'TC-235-09',
    name: 'ORF ว่างเปล่าเมื่อ Visit ไม่มี refer',
    feature: 'E-Claim Export',
    action: 'download-eclaim-orf',
    expect: 'orf-is-empty',
    visitId: CLAIM_CONFIG.OPD_NO_REFER,
    tags: [...BASE_TAGS, '@ctxn-235', '@export'],
  },

  // ─── CTXN-249: REP Upload Wording Wording ───
  {
    id: 'TC-249-01',
    name: 'ErrNoClaimsToUpdate → ไม่พบรายการเบิกใน REP ที่ตรงกับในระบบ',
    feature: 'REP Upload Snackbar',
    action: 'upload-rep-with-mock-error',
    expect: 'snackbar-shows-no-claims-message',
    mockError: {
      file: 'rep-no-match.xlsx',
      status: 422,
      code: 'ErrNoClaimsToUpdate',
    },
    tags: [...BASE_TAGS, '@ctxn-249', '@upload'],
  },
  {
    id: 'TC-249-02',
    name: 'ErrInvalidExcelFormat → REP excel format ไม่ถูกต้อง',
    feature: 'REP Upload Snackbar',
    action: 'upload-rep-with-mock-error',
    expect: 'snackbar-shows-invalid-format-message',
    mockError: {
      file: 'rep-invalid.xlsx',
      status: 400,
      code: 'ErrInvalidExcelFormat',
    },
    tags: [...BASE_TAGS, '@ctxn-249', '@upload'],
  },
  {
    id: 'TC-249-03',
    name: 'ErrUnsupportedFormat → REP excel format ไม่ถูกต้อง',
    feature: 'REP Upload Snackbar',
    action: 'upload-rep-with-mock-error',
    expect: 'snackbar-shows-invalid-format-message',
    mockError: {
      file: 'rep-unsupported.csv',
      status: 400,
      code: 'ErrUnsupportedFormat',
    },
    tags: [...BASE_TAGS, '@ctxn-249', '@upload'],
  },
  {
    id: 'TC-249-04',
    name: 'InternalServerError → ไม่สามารถนำเข้า REP ได้ กรุณาติดต่อ Administrator',
    feature: 'REP Upload Snackbar',
    action: 'upload-rep-with-mock-error',
    expect: 'snackbar-shows-contact-admin-message',
    mockError: {
      file: 'rep-valid.xlsx',
      status: 500,
      code: 'InternalServerError',
    },
    tags: [...BASE_TAGS, '@ctxn-249', '@upload'],
  },
  {
    id: 'TC-249-05',
    name: 'Upload สำเร็จ → success snackbar',
    feature: 'REP Upload Snackbar',
    action: 'upload-rep-with-mock-success',
    expect: 'snackbar-shows-success',
    mockSuccess: {
      file: 'rep-valid.xlsx',
    },
    tags: [...BASE_TAGS, '@ctxn-249', '@upload', '@smoke'],
  },
];
