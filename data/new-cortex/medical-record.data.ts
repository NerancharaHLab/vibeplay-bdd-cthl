/**
 * Medical Record — Dynamic Test Data
 */

export type MedicalRecordAction =
  | 'search-hn'
  | 'search-fields-ui'
  | 'clear-search'
  | 'edit-address-phone'
  | 'edit-emergency-contact'
  | 'verify-audit-trail';

export type MedicalRecordExpect =
  | 'results-visible'
  | 'search-fields-visible'
  | 'fields-cleared'
  | 'updated-data-persists'
  | 'emergency-contact-updated'
  | 'audit-log-correct';

export type MedicalRecordTestCase = {
  id: string;
  name: string;
  feature: string;
  role: string;
  action: MedicalRecordAction;
  hn?: string;
  firstName?: string;
  lastName?: string;
  idCard?: string;
  phone?: string;
  address?: string;
  existingId?: string;
  duplicateWarningMsg?: string;
  cardReaderModel?: string;
  emergencyContactName?: string;
  emergencyRelationship?: string;
  emergencyPhone?: string;
  roleAdmin?: string;
  tabAuditTrail?: string;
  editedField?: string;
  expect: MedicalRecordExpect;
  tags: string[];
};

const BASE_TAGS = ['@functional', '@medical-record', '@new-cortex', '@regression'];

export const MedicalRecordTestCases: MedicalRecordTestCase[] = [
  {
    id: 'MR-006',
    name: 'Perform search by HN',
    feature: 'Patient Search',
    role: 'super',
    action: 'search-hn',
    hn: '1234567',
    expect: 'results-visible',
    tags: [...BASE_TAGS, '@search'],
  },
  {
    id: 'MR-013',
    name: 'Verify search fields presence from UI',
    feature: 'Patient Search',
    role: 'super',
    action: 'search-fields-ui',
    expect: 'search-fields-visible',
    tags: [...BASE_TAGS, '@ui', '@search'],
  },
  {
    id: 'MR-015',
    name: 'Clear search results',
    feature: 'Patient Search',
    role: 'super',
    action: 'clear-search',
    hn: '9999999',
    expect: 'fields-cleared',
    tags: [...BASE_TAGS, '@search'],
  },
  {
    id: 'MR-010',
    name: 'Edit patient address and phone number',
    feature: 'Edit Profile',
    role: 'super',
    action: 'edit-address-phone',
    hn: '1234567',
    phone: '099-999-9999',
    address: '123/45 ถนนราชดำเนิน แขวงพระบรมมหาราชวัง เขตพระนคร กรุงเทพฯ',
    expect: 'updated-data-persists',
    tags: [...BASE_TAGS, '@edit'],
  },
  {
    id: 'MR-011',
    name: 'Edit emergency contact',
    feature: 'Edit Profile',
    role: 'super',
    action: 'edit-emergency-contact',
    hn: '1234567',
    emergencyContactName: 'คุณสมชาย ใจดี',
    emergencyRelationship: 'บิดา/มารดา',
    emergencyPhone: '085-555-5555',
    expect: 'emergency-contact-updated',
    tags: [...BASE_TAGS, '@edit'],
  },
  {
    id: 'MR-012',
    name: 'Verify audit trail for edits',
    feature: 'Edit Profile',
    role: 'super',
    action: 'verify-audit-trail',
    hn: '1234567',
    roleAdmin: 'super',
    tabAuditTrail: 'Audit Trail',
    editedField: 'phoneNumber',
    expect: 'audit-log-correct',
    tags: [...BASE_TAGS, '@ui'],
  },
];
