/**
 * Pharmacy (Medication Master) — Dynamic Test Data
 */

export type PharmacyAction =
  | 'create-validation'
  | 'create-minimum'
  | 'create-comprehensive'
  | 'create-cancel'
  | 'search-keyword'
  | 'filter-status-alert'
  | 'reset-filters'
  | 'navigate-create';

export type PharmacyExpect =
  | 'validation-error'
  | 'success-and-redirected'
  | 'cancel-and-redirected'
  | 'matching-records'
  | 'filtered-records'
  | 'fields-cleared'
  | 'create-form-visible';

export type PharmacyTestCase = {
  id: string;
  name: string;
  feature: string;
  role: string;
  action: PharmacyAction;
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
  expect: PharmacyExpect;
  tags: string[];
};

import medicationMasterCases from './pharmacy/medication-master.json';

export const PharmacyTestCases = medicationMasterCases as PharmacyTestCase[];
