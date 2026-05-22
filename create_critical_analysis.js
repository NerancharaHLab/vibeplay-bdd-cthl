const ExcelJS = require('exceljs');

// สร้าง workbook
const workbook = new ExcelJS.Workbook();

// === Sheet 1: Pharmacy Details ===
const phSheet = workbook.addWorksheet('Pharmacy Details');
phSheet.addRow(['Pharmacy Module Details (NUH)']);
phSheet.addRow(['']);
phSheet.addRow(['Module', 'ห้องยา (Pharmacy)']);
phSheet.addRow(['URL', '/cortex/pharmacy/opd-pending-medication-order']);
phSheet.addRow(['Status', '✅ ใช้งานได้']);
phSheet.addRow(['']);
phSheet.addRow(['Main Tabs/Menus:']);

const pharmacyTabs = [
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

let row = 8;
pharmacyTabs.forEach((tab, idx) => {
  phSheet.addRow([`${idx + 1}. ${tab}`]);
  row++;
});

phSheet.addRow(['']);
phSheet.addRow(['Filters Available:']);
const filters = ['ประเภทคิว', 'วิธีการรับยา', 'คลินิก', 'แพทย์', 'สถานะ'];
filters.forEach((f, idx) => {
  phSheet.addRow([`${idx + 1}. ${f}`]);
});

// === Sheet 2: Full Module Comparison ===
const compareSheet = workbook.addWorksheet('NUH Module Comparison');
const headers = ['No', 'Module Name', 'Thai Name', 'URL', 'Status', 'Main Tabs/Features', 'Accessibility', 'Critical Level'];
compareSheet.addRow(headers);

const modules = [
  [1, 'Medical Records', 'เวชระเบียน', '/cortex/reception/search-patient', '✅ Available', 'Patient Search, Create New, Edit Profile', 'User1 (user1)', 'CRITICAL'],
  [2, 'Admission Center', 'ศูนย์จัดการเตียง', '/cortex/admission-center?tab=admit-request-list', '✅ Available', 'Admission Management, Create AN, AN List, Discharge', 'User1 (user1)', 'HIGH'],
  [3, 'Outpatient', 'ผู้ป่วยนอก', '/cortex/opd/patient-list?tab=ready', '✅ Available', 'Patient List, Check-in, Ready, Observe, Completed, Discharged, Cancelled', 'User1 (user1)', 'CRITICAL'],
  [4, 'Inpatient', 'ผู้ป่วยใน', '/cortex/ipd/select-ward', '✅ Available', 'Ward Selection, Location Based', 'User1 (user1)', 'CRITICAL'],
  [5, 'Pharmacy', 'ห้องยา', '/cortex/pharmacy/opd-pending-medication-order', '✅ Available', 'Order Management, Medication Preparation, Dispensing, Status Tracking (9 tabs)', 'User1 (user1)', 'CRITICAL'],
  [6, 'Laboratory', 'ห้องปฏิบัติการ', '/cortex/lab', '❌ Not Accessible', '-', 'Limited/Restricted', 'HIGH'],
  [7, 'Radiology', 'ห้องรังสี', '/cortex/imaging', '❌ Not Accessible', '-', 'Limited/Restricted', 'HIGH'],
  [8, 'Finance', 'การเงิน', '/cortex/finance', '❌ Not Accessible', '-', 'Limited/Restricted', 'MEDIUM'],
  [9, 'Claim/Coding', 'เบิกจ่าย', '/cortex/claim/opd-coding-list', '✅ Available', 'OPD Coding, VN, Status Tracking', 'User1 (user1)', 'HIGH'],
  [10, 'Nutrition', 'โภชนาการ', '/cortex/nutrition', '❌ Not Accessible', '-', 'Limited/Restricted', 'LOW'],
  [11, 'Reports', 'รายงาน', '/cortex/reports', '✅ Available', 'Report Generation', 'User1 (user1)', 'MEDIUM'],
  [12, 'Settings', 'ตั้งค่า', '/cortex/setting/note-template', '❌ Not Available (DEV only)', '-', 'N/A', 'LOW'],
  [13, 'Document Management', 'การจัดการเอกสาร', '/cortex/document-management/upload', '❌ Not Available (DEV only)', '-', 'N/A', 'MEDIUM']
];

modules.forEach(m => compareSheet.addRow(m));

// === Sheet 3: Critical Analysis ===
const analysisSheet = workbook.addWorksheet('Critical Analysis');
analysisSheet.addRow(['HIS (Hospital Information System) Critical Module Analysis']);
analysisSheet.addRow(['']);
analysisSheet.addRow(['Status Report Date:', new Date().toLocaleDateString('th-TH')]);
analysisSheet.addRow(['Environment:', 'NUH Production']);
analysisSheet.addRow(['Tested User:', 'user1']);
analysisSheet.addRow(['']);

analysisSheet.addRow(['CRITICAL MODULES (ต้องใช้งานได้)']);
analysisSheet.addRow(['#', 'Module', 'Reason', 'Status', 'Impact if Down']);
const critical = [
  [1, 'เวชระเบียน (Medical Records)', 'ข้อมูลผู้ป่วยหลัก ใช้เป็น master data', '✅ ใช้งานได้', 'HIGH - ระบบทั้งหมดหยุด'],
  [2, 'ผู้ป่วยนอก (Outpatient)', 'งานหลักของโรงพยาบาล day-to-day operations', '✅ ใช้งานได้', 'CRITICAL - ไม่สามารถรับผู้ป่วยได้'],
  [3, 'ผู้ป่วยใน (Inpatient)', 'จัดการผู้ป่วยในหอผู้ป่วย', '✅ ใช้งานได้', 'CRITICAL - ไม่สามารถบริหารหอผู้ป่วยได้'],
  [4, 'ห้องยา (Pharmacy)', 'จัดเตรียมและจ่ายยา ถ้าไม่ได้คือผู้ป่วยไม่ได้ยา', '✅ ใช้งานได้', 'CRITICAL - ผู้ป่วยไม่ได้ยา'],
  [5, 'ศูนย์จัดการเตียง (Admission)', 'จัดการการ admit ผู้ป่วยเข้า', '✅ ใช้งานได้', 'HIGH - ไม่สามารถ admit ผู้ป่วยได้']
];
critical.forEach(c => analysisSheet.addRow(c));

analysisSheet.addRow(['']);
analysisSheet.addRow(['HIGH PRIORITY MODULES']);
analysisSheet.addRow(['#', 'Module', 'Reason', 'Status', 'Impact if Down']);
const high = [
  [1, 'ห้องปฏิบัติการ (Lab)', 'ผลการวิเคราะห์เลือด/ตรวจ', '❌ ไม่เปิดได้', 'HIGH - ไม่ได้ผล Lab'],
  [2, 'ห้องรังสี (Radiology)', 'ผลภาพถ่าย X-ray/CT', '❌ ไม่เปิดได้', 'HIGH - ไม่ได้ผล Imaging'],
  [3, 'เบิกจ่าย (Claim/Coding)', 'บิลประกันและเบิกจ่าย', '✅ ใช้งานได้', 'HIGH - ไม่ได้เรียกเก็บเงิน']
];
high.forEach(h => analysisSheet.addRow(h));

analysisSheet.addRow(['']);
analysisSheet.addRow(['SUMMARY FINDINGS']);
analysisSheet.addRow(['Total Modules in NUH:', modules.length]);
analysisSheet.addRow(['Available Modules:', 7]);
analysisSheet.addRow(['Restricted Modules:', 4]);
analysisSheet.addRow(['Not Available (DEV only):', 2]);
analysisSheet.addRow(['']);
analysisSheet.addRow(['Recommendation:']);
analysisSheet.addRow(['- ✅ Pharmacy module ใช้งานได้ปกติและมี 9 tabs ที่ครอบคลุม medication management']);
analysisSheet.addRow(['- ⚠️ Lab & Radiology modules ยังไม่เปิดให้ใช้งาน - ต้องติดตามกับ Admin']);
analysisSheet.addRow(['- ✅ ระบบ Core HIS (Medical Records, OPD, IPD, Pharmacy) ใช้งานได้ครบถ้วน']);
analysisSheet.addRow(['- ⚠️ Settings & Document Management ยังเป็น Dev-only features']);

// === Format all sheets ===
[phSheet, compareSheet, analysisSheet].forEach(sheet => {
  sheet.columns.forEach(col => {
    col.width = 25;
    col.wrapText = true;
  });
  
  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) {
      row.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 14 };
      row.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F4E78' } };
    }
    row.eachCell(cell => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
      if (rowNumber > 1 && rowNumber <= modules.length + 2) {
        cell.alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
      }
    });
    row.height = rowNumber === 1 ? 25 : 30;
  });
});

// เพิ่ม format header
const headerRow1 = compareSheet.getRow(1);
headerRow1.font = { bold: true, color: { argb: 'FFFFFFFF' } };
headerRow1.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4472C4' } };

workbook.xlsx.writeFile('reports/nuh-modules-critical-analysis.xlsx');
console.log('✅ Excel file created successfully: reports/nuh-modules-critical-analysis.xlsx');
