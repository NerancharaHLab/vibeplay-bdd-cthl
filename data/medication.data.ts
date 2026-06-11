/**
 * Medication — Dynamic Test Data
 */

export type MedicationAction =
  | 'create-validation'
  | 'create-minimum'
  | 'create-comprehensive'
  | 'create-cancel'
  | 'search-keyword'
  | 'filter-status-alert'
  | 'reset-filters'
  | 'navigate-create';

export type MedicationExpect =
  | 'validation-error'
  | 'success-and-redirected'
  | 'cancel-and-redirected'
  | 'matching-records'
  | 'filtered-records'
  | 'fields-cleared'
  | 'create-form-visible';

export type MedicationTestCase = {
  id: string;
  name: string;
  feature: string;
  role: string;
  action: MedicationAction;
  keyword?: string;
  status?: string;
  highAlert?: string;
  medicationData?: {
    source: 'Local' | 'Central';
    code: string;
    rank: string;
    tmt: string;
    thaiName: string;
    genericName: string;
    // Price Tab
    unitPrice?: string;
    packageQty?: string;
    // Drug Tab
    strength?: string;
    content?: string;
    // Clinical Tab
    isHighAlert?: boolean;
    isAddictive?: boolean;
    // Prescription Tab
    maxDispense?: string;
    // Usage Tab
    minDay?: string;
    maxDay?: string;
    syntax?: string;
    instruction?: string;
    // Warehouse Tab
    allowOrderWithoutStock?: boolean;
  };
  expect: MedicationExpect;
  tags: string[];
};

const BASE_TAGS = ['@functional', '@medication-master', '@new-cortex', '@regression'];

export const MedicationTestCases: MedicationTestCase[] = [
  {
    id: 'TC-MED-VALIDATE',
    name: 'Validate required fields when creating medication',
    feature: 'Create Medication',
    role: 'super',
    action: 'create-validation',
    expect: 'validation-error',
    tags: [...BASE_TAGS, '@create-medication', '@validation'],
  },
  {
    id: 'TC-MED-MINIMUM',
    name: 'Create a medication by filling minimum required fields',
    feature: 'Create Medication',
    role: 'super',
    action: 'create-minimum',
    medicationData: {
      source: 'Local',
      code: 'M-PARA-500',
      rank: '1',
      tmt: '1234567890',
      thaiName: 'พาราเซตามอล 500 มก.',
      genericName: 'พาราเซตามอล',
      allowOrderWithoutStock: true,
    },
    expect: 'success-and-redirected',
    tags: [...BASE_TAGS, '@create-medication', '@smoke'],
  },
  {
    id: 'TC-MED-COMPREHENSIVE',
    name: 'Create a medication with comprehensive details across all tabs',
    feature: 'Create Medication',
    role: 'super',
    action: 'create-comprehensive',
    medicationData: {
      source: 'Local',
      code: 'M-PARA-1000',
      rank: '1',
      tmt: '1234567890',
      thaiName: 'พาราเซตามอล 1000 มก.',
      genericName: 'พาราเซตามอล',
      unitPrice: '10.5',
      packageQty: '10',
      strength: '1000 mg',
      content: 'Paracetamol 1000mg',
      isHighAlert: true,
      isAddictive: false,
      maxDispense: '100',
      minDay: '1',
      maxDay: '30',
      syntax: '1 tab oral daily',
      instruction: 'รับประทานครั้งละ 1 เม็ด วันละครั้ง',
      allowOrderWithoutStock: true,
    },
    expect: 'success-and-redirected',
    tags: [...BASE_TAGS, '@create-medication'],
  },
  {
    id: 'TC-MED-CANCEL',
    name: 'Cancel medication creation',
    feature: 'Create Medication',
    role: 'super',
    action: 'create-cancel',
    medicationData: {
      source: 'Local',
      code: 'TEST-123',
      rank: '1',
      tmt: '111',
      thaiName: 'ยาเทส',
      genericName: 'Test',
    },
    expect: 'cancel-and-redirected',
    tags: [...BASE_TAGS, '@create-medication', '@ui'],
  },
  {
    id: 'TC-MED-SEARCH-KEYWORD',
    name: 'Search medication by Keyword',
    feature: 'Medication Search & Filter',
    role: 'super',
    action: 'search-keyword',
    keyword: 'Para',
    expect: 'matching-records',
    tags: [...BASE_TAGS, '@search'],
  },
  {
    id: 'TC-MED-FILTER-STATUS',
    name: 'Filter medications by Status and Attributes',
    feature: 'Medication Search & Filter',
    role: 'super',
    action: 'filter-status-alert',
    status: 'Active',
    highAlert: 'Yes',
    expect: 'filtered-records',
    tags: [...BASE_TAGS, '@filter'],
  },
  {
    id: 'TC-MED-RESET',
    name: 'Reset search filters',
    feature: 'Medication Search & Filter',
    role: 'super',
    action: 'reset-filters',
    keyword: 'Para',
    expect: 'fields-cleared',
    tags: [...BASE_TAGS, '@reset'],
  },
  {
    id: 'TC-MED-NAVIGATE',
    name: 'Navigate to Create Medication page',
    feature: 'Medication Navigation',
    role: 'super',
    action: 'navigate-create',
    expect: 'create-form-visible',
    tags: [...BASE_TAGS, '@navigation', '@ui'],
  },
];
