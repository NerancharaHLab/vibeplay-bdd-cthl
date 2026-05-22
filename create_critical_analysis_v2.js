const ExcelJS = require('exceljs');
const workbook = new ExcelJS.Workbook();

const compareSheet = workbook.addWorksheet('NUH Module Impact');
compareSheet.addRow(['No', 'Module Name', 'Thai Name', 'URL', 'Status', 'Critical Level', 'Main Functions / Tabs', 'Clinical Impact', 'Business Impact', 'Notes']);

const modules = [
  [1, 'Medical Records', 'เวชระเบียน', '/cortex/reception/search-patient', 'Available', 'CRITICAL', 'Patient Search, Create New Patient, Edit Profile', 'Core patient master record for diagnosis, history, allergies, and treatment decisions', 'Reduces medical errors, supports billing accuracy and downstream workflows', 'Essential for all clinical and billing workflows'],
  [2, 'Outpatient', 'ผู้ป่วยนอก', '/cortex/opd/patient-list?tab=ready', 'Available', 'CRITICAL', 'Patient List, Check-in, Ready, Observe, Completed, Discharged, Cancelled', 'Primary outpatient clinical workflow and follow-up', 'Major revenue driver and volume management for clinic operations', 'Key front-door HIS module'],
  [3, 'Inpatient', 'ผู้ป่วยใน', '/cortex/ipd/select-ward', 'Available', 'CRITICAL', 'Ward Selection, Admission, Bed Assignment', 'Supports inpatient admission, care coordination and treatment planning', 'Critical for bed utilization and inpatient capacity', 'Must be stable for IPD operations'],
  [4, 'Pharmacy', 'ห้องยา', '/cortex/pharmacy/opd-pending-medication-order', 'Available', 'CRITICAL', 'Order รอยืนยัน, ใบยารอจัด, ใบยาจัดแล้ว, ใบรอจ่าย, จ่ายยาแล้ว, ยกเลิกใบยา, ยาไปรษณีย์, สถานะบริหารยา, Order เติมยา', 'Ensures medication safety, preparation, and dispensing', 'Reduces medication waste and supports pharmacy revenue and patient discharge readiness', 'High operational impact'],
  [5, 'Admission Center', 'ศูนย์จัดการเตียง', '/cortex/admission-center?tab=admit-request-list', 'Available', 'HIGH', 'Admission Management, Create AN, AN List, Discharge, Reject', 'Controls admission flow and bed assignment', 'Improves bed turnover and reduces waiting time for admissions', 'Important for patient flow'],
  [6, 'Claim/Coding', 'เบิกจ่าย', '/cortex/claim/opd-coding-list', 'Available', 'HIGH', 'OPD Coding, VN, Status Tracking', 'Links clinical documentation to insurance claims and coding', 'Supports claim approval and revenue capture', 'High financial impact'],
  [7, 'Reports', 'รายงาน', '/cortex/reports', 'Available', 'MEDIUM', 'Report Generation', 'Provides operational and clinical metrics and summaries', 'Supports management decision-making, compliance, and KPI tracking', 'Useful for oversight and monitoring'],
  [8, 'Laboratory', 'ห้องปฏิบัติการ', '/cortex/lab', 'Not Accessible', 'HIGH', '-', 'Needed for lab diagnostics and treatment decisions', 'Major revenue line and essential for diagnostic service delivery', 'Access should be prioritized'],
  [9, 'Radiology', 'ห้องรังสี', '/cortex/imaging', 'Not Accessible', 'HIGH', '-', 'Needed for imaging diagnostics and care planning', 'Major revenue line and necessary for many clinical pathways', 'Access should be prioritized'],
  [10, 'Finance', 'การเงิน', '/cortex/finance', 'Not Accessible', 'MEDIUM', '-', 'Supports billing reconciliation and financial control', 'Essential for cash collection and accounting accuracy', 'Permission likely restricted'],
  [11, 'Nutrition', 'โภชนาการ', '/cortex/nutrition', 'Not Accessible', 'LOW', '-', 'Supports dietary planning and nutrition care', 'Lower direct revenue impact, but supports inpatient care quality', 'Not a core immediate HIS operation'],
  [12, 'Settings', 'ตั้งค่า', '/cortex/setting/note-template', 'Not Available (DEV only)', 'LOW', 'Note Template Management', 'Configuration of clinical note templates', 'Administrative convenience only', 'Dev-only feature'],
  [13, 'Document Management', 'การจัดการเอกสาร', '/cortex/document-management/upload', 'Not Available (DEV only)', 'MEDIUM', 'Document Upload, Scan HN, IPD/OPD, Auto mode', 'Supports clinical documentation capture', 'Improves workflow but not core revenue', 'Dev-only feature']
];
modules.forEach(row => compareSheet.addRow(row));

const pharmacySheet = workbook.addWorksheet('Pharmacy Deep Dive');
pharmacySheet.addRow(['NUH Pharmacy Module Deep Dive']);
pharmacySheet.addRow([]);
pharmacySheet.addRow(['URL', '/cortex/pharmacy/opd-pending-medication-order']);
pharmacySheet.addRow(['Status', 'Available']);
pharmacySheet.addRow(['Selected Location', 'ห้องยาผู้ป่วยใน 1']);
pharmacySheet.addRow([]);
pharmacySheet.addRow(['Tabs / Menus']);
const pharmacyDetails = [
  'Order รอยืนยัน',
  'ใบยารอจัด',
  'ใบยาจัดแล้ว',
  'ใบรอจ่าย',
  'จ่ายยาแล้ว',
  'ยกเลิกใบยา',
  'ยาไปรษณีย์',
  'สถานะบริหารยา',
  'Order เติมยา'
];
pharmacyDetails.forEach((item, idx) => pharmacySheet.addRow([`${idx + 1}. ${item}`]));
pharmacySheet.addRow([]);
pharmacySheet.addRow(['Clinical Impact']);
pharmacySheet.addRow(['Ensures safe medication dispensing and prevents drug errors']);
pharmacySheet.addRow([]);
pharmacySheet.addRow(['Business Impact']);
pharmacySheet.addRow(['Supports pharmacy revenue, inventory control, and patient discharge readiness']);
pharmacySheet.addRow([]);
pharmacySheet.addRow(['Filters/Controls']);
const pharmacyFilters = ['ประเภทคิว', 'วิธีการรับยา', 'คลินิก', 'แพทย์', 'สถานะ'];
pharmacyFilters.forEach(item => pharmacySheet.addRow([item]));

const summarySheet = workbook.addWorksheet('Summary');
summarySheet.addRow(['NUH HIS Module Summary']);
summarySheet.addRow([]);
summarySheet.addRow(['Total NUH Modules Reviewed', 13]);
summarySheet.addRow(['Available Modules', 7]);
summarySheet.addRow(['Restricted/Not Accessible', 4]);
summarySheet.addRow(['Dev-only Modules', 2]);
summarySheet.addRow([]);
summarySheet.addRow(['Core Clinical Modules', 'Status', 'Impact']);
summarySheet.addRow(['เวชระเบียน', 'Available', 'CRITICAL']);
summarySheet.addRow(['ผู้ป่วยนอก', 'Available', 'CRITICAL']);
summarySheet.addRow(['ผู้ป่วยใน', 'Available', 'CRITICAL']);
summarySheet.addRow(['ห้องยา', 'Available', 'CRITICAL']);
summarySheet.addRow(['ศูนย์จัดการเตียง', 'Available', 'HIGH']);
summarySheet.addRow(['เบิกจ่าย', 'Available', 'HIGH']);
summarySheet.addRow(['ห้องปฏิบัติการ', 'Not Accessible', 'HIGH']);
summarySheet.addRow(['ห้องรังสี', 'Not Accessible', 'HIGH']);
summarySheet.addRow([]);
summarySheet.addRow(['Recommendation']);
summarySheet.addRow(['1. Maintain availability of core clinical modules (Medical Records, OPD, IPD, Pharmacy)']);
summarySheet.addRow(['2. Investigate and enable Lab and Radiology access to avoid diagnostic bottlenecks']);
summarySheet.addRow(['3. Keep Claim/Coding stable to protect revenue capture']);
summarySheet.addRow(['4. Do not prioritize DEV-only Settings/Document Management for immediate clinical go-live']);

[compareSheet, pharmacySheet, summarySheet].forEach(sheet => {
  sheet.columns.forEach(col => { if (!col.width) col.width = 24; });
  sheet.eachRow(row => {
    row.eachCell(cell => {
      cell.alignment = { wrapText: true, vertical: 'top', horizontal: 'left' };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    });
  });
});
const headerRow = compareSheet.getRow(1);
headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4472C4' } };
const headerSummary = summarySheet.getRow(3);
headerSummary.font = { bold: true, color: { argb: 'FFFFFFFF' } };
headerSummary.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4472C4' } };

workbook.xlsx.writeFile('reports/nuh-modules-critical-analysis-v2.xlsx').then(() => console.log('Created reports/nuh-modules-critical-analysis-v2.xlsx'));
