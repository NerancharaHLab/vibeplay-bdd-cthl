/**
 * IPD Orders — Dynamic Test Data
 *
 * QA เพิ่ม test case ใหม่ได้โดยแค่เพิ่ม object ใน array
 * ไม่ต้องแก้ spec หรือ step file
 */

export type IpdOrderAction = 'create' | 'sign' | 'sign-multiple' | 'acknowledge' | 'acknowledge-multiple' | 'cancel' | 'cancel-multiple' | 'edit' | 'none';

export type IpdOrderExpect =
  | 'success'
  | 'validation-error'
  | 'warning'
  | 'not-visible'
  | 'disabled'
  | 'status-change';

export type IpdOrderTestCase = {
  id: string;
  name: string;
  feature: string;
  role: string;
  hn: string;
  ward: string;
  action: IpdOrderAction;
  orderType?: 'One-day' | 'Continue';
  medication?: string;
  dosage?: string;
  direction?: string;
  orderIds?: string[];
  expect: IpdOrderExpect;
  expectedStatus?: string;
  /** Which button to check for visibility/disabled (used when expect = 'not-visible' | 'disabled') */
  targetButton?: 'create' | 'sign' | 'acknowledge' | 'cancel' | 'edit';
  tags: string[];
};

// ── Shared constants ──
const DEFAULT_HN = '6903588';
const DEFAULT_WARD = 'Ward A';
const BASE_TAGS = ['@functional', '@ipd', '@new-cortex', '@regression'];

// ══════════════════════════════════════════════
// Feature: Create IPD Physician Orders (TS-CTX-5044)
// ══════════════════════════════════════════════
const createCases: IpdOrderTestCase[] = [
  {
    id: 'TC-CTX-5044-001',
    name: 'Create One-day Physician Order successfully',
    feature: 'Create IPD Physician Orders',
    role: 'physician',
    hn: DEFAULT_HN, ward: DEFAULT_WARD,
    action: 'create',
    orderType: 'One-day',
    medication: 'Paracetamol 500 mg',
    dosage: '1 tab',
    direction: 'หลังอาหาร',
    expect: 'success',
    tags: [...BASE_TAGS, '@create'],
  },
  {
    id: 'TC-CTX-5044-002',
    name: 'Create Continue Physician Order successfully',
    feature: 'Create IPD Physician Orders',
    role: 'physician',
    hn: DEFAULT_HN, ward: DEFAULT_WARD,
    action: 'create',
    orderType: 'Continue',
    medication: 'IV Fluid',
    dosage: '1000 ml',
    direction: 'continuous',
    expect: 'success',
    tags: [...BASE_TAGS, '@create'],
  },
  {
    id: 'TC-CTX-5044-003',
    name: 'Create order fails when required fields are missing',
    feature: 'Create IPD Physician Orders',
    role: 'physician',
    hn: DEFAULT_HN, ward: DEFAULT_WARD,
    action: 'create',
    orderType: 'One-day',
    // medication intentionally omitted
    expect: 'validation-error',
    tags: [...BASE_TAGS, '@create', '@negative'],
  },
  {
    id: 'TC-CTX-5044-004',
    name: 'Unauthorized user cannot create Physician Order',
    feature: 'Create IPD Physician Orders',
    role: 'reception',
    hn: DEFAULT_HN, ward: DEFAULT_WARD,
    action: 'none',
    expect: 'not-visible',
    targetButton: 'create',
    tags: [...BASE_TAGS, '@create', '@permission'],
  },
];

// ══════════════════════════════════════════════
// Feature: Sign IPD Orders (TS-CTX-5049)
// ══════════════════════════════════════════════
const signCases: IpdOrderTestCase[] = [
  {
    id: 'TC-CTX-5049-001',
    name: 'Sign a single IPD order successfully',
    feature: 'Sign IPD Orders',
    role: 'physician',
    hn: DEFAULT_HN, ward: DEFAULT_WARD,
    action: 'sign',
    orderIds: ['ORD-001'],
    expect: 'status-change',
    expectedStatus: 'Signed',
    tags: [...BASE_TAGS, '@sign'],
  },
  {
    id: 'TC-CTX-5049-002',
    name: 'Sign multiple selected IPD orders successfully',
    feature: 'Sign IPD Orders',
    role: 'physician',
    hn: DEFAULT_HN, ward: DEFAULT_WARD,
    action: 'sign-multiple',
    orderIds: ['ORD-002', 'ORD-003'],
    expect: 'status-change',
    expectedStatus: 'Signed',
    tags: [...BASE_TAGS, '@sign'],
  },
  {
    id: 'TC-CTX-5049-003',
    name: 'Unauthorized user cannot sign IPD orders',
    feature: 'Sign IPD Orders',
    role: 'nurse',
    hn: DEFAULT_HN, ward: DEFAULT_WARD,
    action: 'none',
    expect: 'not-visible',
    targetButton: 'sign',
    tags: [...BASE_TAGS, '@sign', '@permission'],
  },
  {
    id: 'TC-CTX-5049-004',
    name: 'Cannot sign an already signed order',
    feature: 'Sign IPD Orders',
    role: 'physician',
    hn: DEFAULT_HN, ward: DEFAULT_WARD,
    action: 'none',
    orderIds: ['ORD-SIGNED-001'],
    expect: 'disabled',
    targetButton: 'sign',
    tags: [...BASE_TAGS, '@sign', '@negative'],
  },
];

// ══════════════════════════════════════════════
// Feature: IPD Order Acknowledge by Nurse (TS-CTX-5052)
// ══════════════════════════════════════════════
const acknowledgeCases: IpdOrderTestCase[] = [
  {
    id: 'TC-CTX-5052-001',
    name: 'Nurse can acknowledge IPD order successfully',
    feature: 'IPD Order Acknowledge',
    role: 'nurse',
    hn: DEFAULT_HN, ward: DEFAULT_WARD,
    action: 'acknowledge',
    orderIds: ['ORD-SIGNED-002'],
    expect: 'status-change',
    expectedStatus: 'Acknowledged',
    tags: [...BASE_TAGS, '@acknowledge'],
  },
  {
    id: 'TC-CTX-5052-002',
    name: 'Status updated after acknowledgment',
    feature: 'IPD Order Acknowledge',
    role: 'nurse',
    hn: DEFAULT_HN, ward: DEFAULT_WARD,
    action: 'acknowledge-multiple',
    orderIds: ['ORD-SIGNED-003'],
    expect: 'status-change',
    expectedStatus: 'Acknowledged',
    tags: [...BASE_TAGS, '@acknowledge'],
  },
  {
    id: 'TC-CTX-5052-003',
    name: 'Cannot acknowledge an already acknowledged order',
    feature: 'IPD Order Acknowledge',
    role: 'nurse',
    hn: DEFAULT_HN, ward: DEFAULT_WARD,
    action: 'none',
    orderIds: ['ORD-ACK-001'],
    expect: 'disabled',
    targetButton: 'acknowledge',
    tags: [...BASE_TAGS, '@acknowledge', '@negative'],
  },
  {
    id: 'TC-CTX-5052-004',
    name: 'Unauthorized user cannot acknowledge IPD orders',
    feature: 'IPD Order Acknowledge',
    role: 'physician',
    hn: DEFAULT_HN, ward: DEFAULT_WARD,
    action: 'none',
    expect: 'not-visible',
    targetButton: 'acknowledge',
    tags: [...BASE_TAGS, '@acknowledge', '@permission'],
  },
];

// ══════════════════════════════════════════════
// Feature: Cancel IPD Order (TS-CTX-5058)
// ══════════════════════════════════════════════
const cancelCases: IpdOrderTestCase[] = [
  {
    id: 'TC-CTX-5058-001',
    name: 'Cancel a single IPD order successfully',
    feature: 'Cancel IPD Order',
    role: 'physician',
    hn: DEFAULT_HN, ward: DEFAULT_WARD,
    action: 'cancel',
    orderIds: ['ORD-CANCELABLE-001'],
    expect: 'status-change',
    expectedStatus: 'Canceled',
    tags: [...BASE_TAGS, '@cancel'],
  },
  {
    id: 'TC-CTX-5058-002',
    name: 'Cancel multiple IPD orders successfully',
    feature: 'Cancel IPD Order',
    role: 'physician',
    hn: DEFAULT_HN, ward: DEFAULT_WARD,
    action: 'cancel-multiple',
    orderIds: ['ORD-CANCELABLE-002', 'ORD-CANCELABLE-003'],
    expect: 'status-change',
    expectedStatus: 'Canceled',
    tags: [...BASE_TAGS, '@cancel'],
  },
  {
    id: 'TC-CTX-5058-003',
    name: 'Cannot cancel orders in non-cancelable status',
    feature: 'Cancel IPD Order',
    role: 'physician',
    hn: DEFAULT_HN, ward: DEFAULT_WARD,
    action: 'cancel',
    orderIds: ['ORD-NONCANCELABLE-001'],
    expect: 'warning',
    tags: [...BASE_TAGS, '@cancel', '@negative'],
  },
  {
    id: 'TC-CTX-5058-004',
    name: 'Unauthorized user cannot cancel IPD orders',
    feature: 'Cancel IPD Order',
    role: 'reception',
    hn: DEFAULT_HN, ward: DEFAULT_WARD,
    action: 'none',
    expect: 'not-visible',
    targetButton: 'cancel',
    tags: [...BASE_TAGS, '@cancel', '@permission'],
  },
];

// ══════════════════════════════════════════════
// Feature: Edit IPD Order (TS-CTX-5061)
// ══════════════════════════════════════════════
const editCases: IpdOrderTestCase[] = [
  {
    id: 'TC-CTX-5061-001',
    name: 'Edit IPD order item successfully',
    feature: 'Edit IPD Order',
    role: 'physician',
    hn: DEFAULT_HN, ward: DEFAULT_WARD,
    action: 'edit',
    orderIds: ['ORD-EDITABLE-001'],
    dosage: '2 tab',
    direction: 'หลังอาหารเช้า-เย็น',
    expect: 'status-change',
    expectedStatus: 'หลังอาหารเช้า-เย็น',
    tags: [...BASE_TAGS, '@edit'],
  },
  {
    id: 'TC-CTX-5061-002',
    name: 'Edit order fails when direction validation fails',
    feature: 'Edit IPD Order',
    role: 'physician',
    hn: DEFAULT_HN, ward: DEFAULT_WARD,
    action: 'edit',
    orderIds: ['ORD-EDITABLE-002'],
    direction: 'invalid-dir-format',
    expect: 'validation-error',
    tags: [...BASE_TAGS, '@edit', '@negative'],
  },
  {
    id: 'TC-CTX-5061-003',
    name: 'Edit order fails when pharmacy routing location missing',
    feature: 'Edit IPD Order',
    role: 'physician',
    hn: DEFAULT_HN, ward: DEFAULT_WARD,
    action: 'edit',
    orderIds: ['ORD-EDITABLE-NO-ROUTE'],
    expect: 'warning',
    tags: [...BASE_TAGS, '@edit', '@negative'],
  },
  {
    id: 'TC-CTX-5061-004',
    name: 'Unauthorized user cannot edit IPD orders',
    feature: 'Edit IPD Order',
    role: 'reception',
    hn: DEFAULT_HN, ward: DEFAULT_WARD,
    action: 'none',
    orderIds: ['ORD-EDITABLE-003'],
    expect: 'not-visible',
    targetButton: 'edit',
    tags: [...BASE_TAGS, '@edit', '@permission'],
  },
];

// ══════════════════════════════════════════════
// Export all test cases
// ══════════════════════════════════════════════
export const IpdOrderTestCases: IpdOrderTestCase[] = [
  ...createCases,
  ...signCases,
  ...acknowledgeCases,
  ...cancelCases,
  ...editCases,
];
