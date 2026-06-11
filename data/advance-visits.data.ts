/**
 * Advance Visits — Dynamic Test Data
 */

export type AdvanceVisitsAction =
  | 'verify-ui'
  | 'verify-filters-ui'
  | 'filter-visits';

export type AdvanceVisitsExpect =
  | 'ui-elements-visible'
  | 'filter-fields-visible'
  | 'results-filtered';

export type AdvanceVisitsTestCase = {
  id: string;
  name: string;
  feature: string;
  role: string;
  action: AdvanceVisitsAction;
  targetDate?: string;
  clinicName?: string;
  doctorName?: string;
  expect: AdvanceVisitsExpect;
  tags: string[];
};

const BASE_TAGS = ['@functional', '@advance-visits', '@new-cortex', '@regression'];

export const AdvanceVisitsTestCases: AdvanceVisitsTestCase[] = [
  {
    id: 'AV-001',
    name: 'Verify UI elements on Advance Visits page',
    feature: 'Advance Visits UI',
    role: 'super',
    action: 'verify-ui',
    expect: 'ui-elements-visible',
    tags: [...BASE_TAGS, '@ui'],
  },
  {
    id: 'AV-002',
    name: 'Check Filter inputs visibility',
    feature: 'Advance Visits UI',
    role: 'super',
    action: 'verify-filters-ui',
    expect: 'filter-fields-visible',
    tags: [...BASE_TAGS, '@ui'],
  },
  {
    id: 'AV-003-001',
    name: 'Filter by Medicine Clinic',
    feature: 'Advance Visits Filter',
    role: 'super',
    action: 'filter-visits',
    targetDate: '25/05/2026',
    clinicName: 'คลินิกอายุรกรรม',
    doctorName: 'นพ.สมชาย ตั้งใจรักษา',
    expect: 'results-filtered',
    tags: [...BASE_TAGS, '@filter'],
  },
  {
    id: 'AV-003-002',
    name: 'Filter by Pediatric Clinic',
    feature: 'Advance Visits Filter',
    role: 'super',
    action: 'filter-visits',
    targetDate: '01/06/2026',
    clinicName: 'คลินิกกุมารเวช',
    doctorName: 'พญ.สมศรี รักดี',
    expect: 'results-filtered',
    tags: [...BASE_TAGS, '@filter'],
  },
];
