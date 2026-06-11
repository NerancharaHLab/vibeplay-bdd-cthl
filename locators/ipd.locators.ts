export const IpdLocators = {
  // Navigation & Ward Selection
  wardSelectDropdown: '.ant-select:has-text("เลือกหอผู้ป่วย")',
  wardOption: (wardName: string) => `.ant-select-item-option-content:has-text("${wardName}")`,
  patientRow: (hn: string) => `tr:has-text("${hn}")`,

  // IPD Workspace / Summary
  ipdSummaryTab: 'button[role="tab"]:has-text("IPD Summary"), .ant-tabs-tab-btn:has-text("IPD Summary")',
  createOrderButton: 'button:has-text("สร้าง Physician Order"), button:has-text("Create Order")',

  // Create/Edit Order Form
  orderTypeTab: (type: 'One-day' | 'Continue') => `button[role="tab"]:has-text("${type}"), .ant-radio-button-wrapper:has-text("${type}")`,
  medicationSearchInput: 'input[placeholder="ค้นหายา / คำสั่งแพทย์"], #medication-search',
  medicationOption: (drugName: string) => `.ant-select-item-option-content:has-text("${drugName}")`,
  directionInput: 'input#direction, textarea#direction, [placeholder="ระบุวิธีใช้"]',
  dosageInput: 'input#dosage, [placeholder="ระบุขนาดการใช้"]',
  saveOrderButton: 'button:has-text("บันทึก"), button[type="submit"]',
  cancelOrderButton: 'button:has-text("ยกเลิก"), button:has-text("Cancel")',
  validationMessage: '.ant-form-item-explain-error, .validation-error',

  // Order List & Selection (Sign, Acknowledge, Cancel, Edit)
  orderCheckbox: (orderId: string) => `tr:has-text("${orderId}") input[type="checkbox"]`,
  orderRow: (orderId: string) => `tr:has-text("${orderId}")`,
  orderStatusBadge: (orderId: string) => `tr:has-text("${orderId}") .status-badge, tr:has-text("${orderId}") td.status`,
  
  // Action Buttons
  signButton: 'button:has-text("Sign")',
  acknowledgeButton: 'button:has-text("Acknowledge"), button:has-text("รับทราบ")',
  cancelButton: 'button:has-text("Cancel Order"), button:has-text("ยกเลิกคำสั่ง")',
  editButton: (orderId: string) => `tr:has-text("${orderId}") button:has-text("Edit"), tr:has-text("${orderId}") .action-edit`,

  // Modals & Confirmations
  confirmModalOkButton: '.ant-modal-confirm-btns button.ant-btn-primary, button:has-text("Yes"), button:has-text("ตกลง"), button:has-text("Confirm")',
  toastSuccessMessage: '.ant-message-success, .toast-success',
  toastErrorMessage: '.ant-message-error, .toast-error, .ant-notification-notice-error',
};
