export const MedicalRecordLocators = {
  // iframe selector
  iframe: 'iframe',

  // Search Fields (using data-testid - much more stable!)
  searchHN: '[data-testid="hn"]',
  searchName: '[data-testid="name"]',
  searchIDCard: '[data-testid="cid"]',
  searchPhone: '[data-testid="phoneNumber"]',
  searchVN: '[data-testid="vn"]',
  searchAN: '[data-testid="an"]',
  searchWard: '.ant-select:has-text("วอร์ด")', // Keep as is for now
  searchDoctor: '.ant-select:has-text("แพทย์")', // Keep as is for now
  searchZipCode: '[data-testid="postalCode"]',

  // Buttons (using data-testid)
  searchButton: '[data-testid="search-button"]',
  clearButton: '[data-testid="clear-button"]',
  readCardButton: 'button:has-text("อ่านบัตร")',
  createNewPatientButton: '[data-testid="create-patient-button"]',

  // Registration Form (Existing - may need data-testid when implemented)
  firstNameInput: 'input[placeholder="ชื่อ"]',
  lastNameInput: 'input[placeholder="นามสกุล"]',
  idCardInput: 'input[placeholder="รหัสบัตรประชาชน/Passport"]',
  submitButton: 'button:has-text("บันทึก")',

  // Tabs
  activeTab: '[data-testid="tab-trigger-activated"]',
  deactivatedTab: '[data-testid="tab-trigger-deactivated"]',

  // States
  idleState: '[data-testid="idle-state"]',
  patientSearchActive: '[data-testid="patient-search-activate"]'
};
