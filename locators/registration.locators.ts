export const RegistrationLocators = {
  // --- Create Patient (สร้างผู้ป่วยใหม่) ---
  iframe: 'iframe[title="iframe"]',
  createNewPatientButton: '[data-testid="create-patient-button"]',
  firstNameInput: 'input[placeholder="ชื่อ"]',
  lastNameInput: 'input[placeholder="นามสกุล"]',
  idCardInput: 'input[placeholder="รหัสบัตรประชาชน/Passport"], input[placeholder="เลขบัตรประจำตัวประชาชน"]',
  readCardButton: 'button:has-text("อ่านบัตร"), button:has-text("อ่านบัตรประชาชน")',
  submitButton: 'button:has-text("บันทึก")',
  cancelButton: 'button:has-text("ยกเลิก")',

  // --- Create Visit / Appointment (สร้าง visit / นัดหมาย) ---
  addAppointmentButton: 'button:has-text("เพิ่มนัดหมาย"), [data-testid="add-appointment-button"]',
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
};
