export type RegistrationAction =
  | 'verify-ui-elements'
  | 'create-validation'
  | 'create-happy'
  | 'create-duplicate'
  | 'smartcard-check'
  | 'create-appointment';

export type RegistrationExpect =
  | 'ui-visible'
  | 'validation-error'
  | 'success'
  | 'duplicate-warning'
  | 'smartcard-autofill'
  | 'appointment-created';

export type RegistrationTestCase = {
  id: string;
  name: string;
  feature: string;
  role: string;
  action: RegistrationAction;
  hn?: string;
  firstName?: string;
  lastName?: string;
  idCard?: string;
  phone?: string;
  address?: string;
  existingId?: string;
  duplicateWarningMsg?: string;
  cardReaderModel?: string;
  // Appointment properties
  targetDate?: string;
  clinicName?: string;
  doctorName?: string;
  timeSlot?: string;
  patientHn?: string;
  expect: RegistrationExpect;
  tags: string[];
};

import registrationCases from './registration/cases.json';

export const RegistrationTestCases = registrationCases as RegistrationTestCase[];
