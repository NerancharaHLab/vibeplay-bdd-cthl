import { Page, expect } from '@playwright/test';
import { generateThaiID } from './test-helpers';

/**
 * Interface representing possible overrides for patient creation.
 */
export interface PatientOverrides {
  mode?: string;
  isCreateVVIP?: boolean;
  gender?: 'male' | 'female' | 'other';
  namePrefixCode?: { code: string; display?: string };
  birthDate?: string;
  age?: number;
  firstName?: string;
  middleName?: string;
  familyName?: string;
  idCardNo?: string;
  primaryLanguage?: string;
}

/**
 * Sets up a listener on the page to capture the Authorization Bearer token from outgoing requests.
 * Call this function BEFORE performing the login steps.
 */
export function setupTokenListener(page: Page) {
  let token = '';

  page.on('request', (request) => {
    const headers = request.headers();
    const authHeader = headers['authorization'];
    if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
      const extracted = authHeader.substring(7).trim();
      if (extracted) {
        token = extracted;
      }
    }
  });

  return {
    getBearerToken: () => token
  };
}

/**
 * Creates a single patient via the Cortex Demographic API.
 * Uses default rules unless overridden by the overrides object.
 */
export async function createPatientViaAPI(
  page: Page,
  token: string,
  runningNumber: number,
  overrides?: PatientOverrides
): Promise<{ hn: string; idCardNo: string; firstName: string; familyName: string }> {
  const finalIdCardNo = overrides?.idCardNo || generateThaiID();
  
  // Resolve birth date
  let birthDate = overrides?.birthDate;
  if (!birthDate) {
    const age = overrides?.age ?? (Math.floor(Math.random() * (60 - 20 + 1)) + 20);
    const birthYear = new Date().getFullYear() - age;
    birthDate = `${birthYear}-01-01`;
  }

  const finalFirstName = overrides?.firstName || `automate f${runningNumber}`;
  const finalMiddleName = overrides?.middleName || `automate m${runningNumber}`;
  const finalFamilyName = overrides?.familyName || `automate l${runningNumber}`;

  const payload = {
    mode: overrides?.mode || 'cid',
    identityVerificationModeExpire: '',
    isCreateVVIP: overrides?.isCreateVVIP ?? false,
    gender: overrides?.gender || 'male',
    namePrefixCode: overrides?.namePrefixCode || { code: '003' },
    birthDate: birthDate,
    officialAddress: { name: '', line: '', stateCode: '', districtCode: '', cityCode: '', postalCode: '' },
    currentAddress: { name: '', line: '', stateCode: '', districtCode: '', cityCode: '', postalCode: '' },
    workAddress: { name: '', line: '', stateCode: '', districtCode: '', cityCode: '', postalCode: '' },
    informationGiverContact: { categoryCode: '1' },
    firstName: finalFirstName,
    firstNameEN: '',
    middleName: finalMiddleName,
    middleNameEN: '',
    familyName: finalFamilyName,
    familyNameEN: '',
    deceased: false,
    lineId: '',
    email: '',
    mobilePhone: '',
    homePhone: '',
    primaryLanguage: overrides?.primaryLanguage || 'TH',
    birthPlace: { name: '', line: '', stateCode: '', districtCode: '', cityCode: '', postalCode: '' },
    idCardNo: finalIdCardNo
  };

  const response = await page.request.post('https://dev-x.cortexcloud.co/new-demographic-api/patients', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
    multipart: {
      data: JSON.stringify(payload)
    }
  });

  // Ensure response is successful (200 OK or 201 Created)
  if (!response.ok()) {
    console.error('API Error Status:', response.status());
    console.error('API Error Response:', await response.text());
  }
  expect(response.ok()).toBeTruthy();

  const responseData = await response.json();
  const hn = responseData.data?.hn || responseData.data?.patientId || responseData.hn || responseData.id || '';
  
  return {
    hn,
    idCardNo: finalIdCardNo,
    firstName: finalFirstName,
    familyName: finalFamilyName
  };
}

/**
 * Seeds multiple patients via API and returns their details.
 * Supports passing custom parameter overrides.
 */
export async function seedMultiplePatients(
  page: Page,
  token: string,
  count: number = 5,
  overrides?: PatientOverrides
): Promise<Array<{ hn: string; idCardNo: string; firstName: string; familyName: string }>> {
  const patients = [];
  const startNumber = Math.floor(Date.now() / 1000) % 100000;

  for (let i = 1; i <= count; i++) {
    const runningNumber = startNumber + i;
    const patient = await createPatientViaAPI(page, token, runningNumber, overrides);
    patients.push(patient);
  }

  return patients;
}

/**
 * Assigns coverage (สิทธิ์) to a patient via the Cortex GraphQL API.
 * Uses the specified insurancePlanId and value code.
 */
export async function assignPatientCoverageViaAPI(
  page: Page,
  token: string,
  hn: string,
  insurancePlanId: number = 368,
  value: string = '123'
): Promise<any> {
  const query = `
    mutation ManagePatientCoverageDocuments($input: ManagePatientCoverageDocumentsInput!) {
      managePatientCoverageDocuments(input: $input) {
        id
        hn
        active
        startEffectiveDate
        endEffectiveDate
        insurancePlan {
          id
          info {
            th {
              name
            }
          }
        }
        value
      }
    }
  `;

  const response = await page.request.post('https://dev-x.cortexcloud.co/cortex-api/graphql', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    data: {
      query,
      variables: {
        input: {
          hn,
          patientCoverageDocuments: [
            {
              id: null,
              insurancePlanId,
              value,
              startEffectiveDate: null,
              endEffectiveDate: null,
              active: true
            }
          ]
        }
      }
    }
  });

  if (!response.ok()) {
    console.error('GraphQL Error Status:', response.status());
    console.error('GraphQL Error Response:', await response.text());
  }
  expect(response.ok()).toBeTruthy();

  const responseData = await response.json();
  
  if (responseData.errors) {
    console.error('GraphQL Errors:', JSON.stringify(responseData.errors));
  }
  expect(responseData.errors).toBeUndefined();

  return responseData.data?.managePatientCoverageDocuments;
}
