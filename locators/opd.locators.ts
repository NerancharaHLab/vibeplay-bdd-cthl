export const OpdLocators = {
  // Filters (Main page)
  appointmentDate: 'input[placeholder="DD/MM/YYYY"], input[placeholder="เลือกวันที่"]',
  clinicSelect: '.ant-select:has-text("เลือกคลินิก"), ._combobox-trigger_1rat2_1:has-text("เลือกคลินิก")',
  doctorSelect: '.ant-select:has-text("เลือกแพทย์"), ._combobox-trigger_1rat2_1:has-text("เลือกแพทย์")',
  
  // Buttons (Main page)
  searchButton: 'button:has-text("ค้นหา")',
  clearButton: 'button:has-text("Clear")',
  addAppointmentButton: 'button:has-text("เพิ่มนัดหมาย"), [data-testid="add-appointment-button"]',
  
  // Modal dialog (เพิ่มนัดหมาย)
  modalClinicTrigger: '[data-testid="searchbox-trigger-clinic"]',
  modalDoctorTrigger: '[data-testid="searchbox-trigger-physician"]',
  modalDoctorSearch: 'input[placeholder="ค้นหาแพทย์"]',
  modalServiceTypeTrigger: '[data-testid="searchbox-trigger-typeOfService"]',
  modalEstimatedTime: 'input[data-testid="estimated-examination-time"]',
  modalDateInput: 'input[name="appointment-date"]',
  modalSearchTimeButton: '[data-testid="search-appointment-button"]',
  modalCancelButton: '[data-testid="add-appointment-dialog-cancel"]',
  modalSaveButton: '[data-testid="add-appointment-dialog-submit"]',

  // Time slots & Patient Link
  timeSlotButton: (time: string) => `button:has-text("${time}")`,
  modalPatientSearchInput: 'input[placeholder="ค้นหาผู้ป่วย"], [data-testid="searchbox-search-patient"]',
  modalPatientRow: (hn: string) => `tr:has-text("${hn}"), div:has-text("${hn}")`,

  // Page Title (for verification)
  pageTitle: 'h1:has-text("เปิด Visit ผู้ป่วยนัด")',

  // Dynamic Locators
  patientRow: (patientName: string) => `tr:has-text("${patientName}")`,
  tableCell: (text: string) => `td:has-text("${text}")`,
};
