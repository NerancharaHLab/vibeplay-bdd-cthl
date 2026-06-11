/**
 * OPD (Advance Visits) — Dynamic Test Data
 */

export type OpdAction =
  | 'verify-ui'
  | 'verify-filters-ui'
  | 'filter-visits';

export type OpdExpect =
  | 'ui-elements-visible'
  | 'filter-fields-visible'
  | 'results-filtered';

export type OpdTestCase = {
  id: string;
  name: string;
  feature: string;
  role: string;
  action: OpdAction;
  targetDate?: string;
  clinicName?: string;
  doctorName?: string;
  expect: OpdExpect;
  tags: string[];
};

import departmentsCases from './opd/departments.json';

export const OpdTestCases = departmentsCases as OpdTestCase[];
