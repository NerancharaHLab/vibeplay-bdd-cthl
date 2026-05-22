const ExcelJS = require('exceljs');
const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('Module Comparison');

// Headers
const headers = ['No', 'Module Name', 'DEV URL', 'DEV Status', 'DEV Tabs/Menu', 'NUH URL', 'NUH Status', 'NUH Tabs/Menu', 'Remarks'];
worksheet.addRow(headers);

// Data
const data = [
  [1, 'เวชระเบียน', '/cortex/reception/search-patient', '✅ Available', '-', '/cortex/reception/search-patient', '✅ Available', '-', 'ทั้ง 2 site เหมือนกัน'],
  [2, 'ศูนย์จัดการเตียง', '/cortex/admission-center?tab=admit-request-list', '✅ Available', 'Admission Management, Create AN, คำขอ Admit, AN, จำหน่าย, ปฏิเสธ', '/cortex/admission-center?tab=admit-request-list', '✅ Available', 'Admission Management, Create AN, คำขอ Admit, AN, จำหน่าย, ปฏิเสธ', 'ทั้ง 2 site เหมือนกัน'],
  [3, 'ผู้ป่วยนอก', '/cortex/opd/patient-list?tab=ready-or-hold&from=2026-05-06&to=2026-05-06', '✅ Available', 'นัดหมาย/ลงทะเบียน, ทั้งหมด, เช็คอิน, พร้อมตรวจ, ตรวจเสร็จ, จำหน่าย, เสร็จสิ้น, ยกเลิก', '/cortex/opd/patient-list?tab=ready', '✅ Available', 'นัดหมาย/ลงทะเบียน, ทั้งหมด, เช็คอิน, พร้อมตรวจ, Observe, ตรวจเสร็จ, จำหน่าย, เสร็จสิ้น, ยกเลิก', 'NUH มี tab Observe เพิ่มเติม'],
  [4, 'ผู้ป่วยใน', '/cortex/ipd/select-ward', '✅ Available', 'ส่ง', '/cortex/ipd/select-ward', '✅ Available', 'ส่ง', 'ทั้ง 2 site เหมือนกัน'],
  [5, 'ห้องยา', '/cortex/pharmacy/select-location', '✅ Available', 'เลือกห้องยา, ส่ง', '/cortex/pharmacy/select-location', '✅ Available', 'ส่ง', 'ทั้ง 2 site เหมือนกัน'],
  [6, 'ห้องปฏิบัติการ', '/cortex/apps', '❌ Not Accessible', '-', '/cortex/apps', '❌ Not Accessible', '-', 'ทั้ง 2 site ไม่เปิดได้'],
  [7, 'ห้องรังสี', '/cortex/apps', '❌ Not Accessible', '-', '/cortex/apps', '❌ Not Accessible', '-', 'ทั้ง 2 site ไม่เปิดได้'],
  [8, 'การเงิน', '/cortex/apps', '❌ Not Accessible', '-', '/cortex/apps', '❌ Not Accessible', '-', 'ทั้ง 2 site ไม่เปิดได้'],
  [9, 'เบิกจ่าย', '/cortex/claim/opd-coding-list', '✅ Available', 'OPD Coding, VN, รอลงรหัส', '/cortex/claim/opd-coding-list', '✅ Available', 'OPD Coding, VN, รอลงรหัส', 'ทั้ง 2 site เหมือนกัน'],
  [10, 'โภชนาการ', '/cortex/apps', '❌ Not Accessible', '-', '/cortex/apps', '❌ Not Accessible', '-', 'ทั้ง 2 site ไม่เปิดได้'],
  [11, 'รายงาน', '/cortex/reports', '✅ Available', 'ออกรายงาน', '/cortex/reports', '✅ Available', 'ออกรายงาน', 'ทั้ง 2 site เหมือนกัน'],
  [12, 'ตั้งค่า', '/cortex/setting/note-template', '✅ Available', 'Note Template, เพิ่ม Note Template', 'N/A', '❌ Not Available', 'N/A', 'มี ใน DEV เท่านั้น'],
  [13, 'การจัดการเอกสาร', '/cortex/document-management/upload', '✅ Available', 'สแกนเอกสาร, แบบระบุ HN, แบบอัตโนมัติ', 'N/A', '❌ Not Available', 'N/A', 'มี ใน DEV เท่านั้น'],
];

data.forEach(row => worksheet.addRow(row));

// Format header
const headerRow = worksheet.getRow(1);
headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4472C4' } };
headerRow.alignment = { horizontal: 'center', vertical: 'center', wrapText: true };

// Format columns
worksheet.columns = [
  { width: 5 },
  { width: 20 },
  { width: 40 },
  { width: 20 },
  { width: 50 },
  { width: 40 },
  { width: 20 },
  { width: 50 },
  { width: 30 },
];

// Center align all cells
worksheet.eachRow((row, rowNumber) => {
  row.eachCell((cell) => {
    if (rowNumber > 1) {
      cell.alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
    }
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
  });
});

// Increase row height
worksheet.eachRow((row, rowNumber) => {
  if (rowNumber === 1) {
    row.height = 25;
  } else {
    row.height = 30;
  }
});

workbook.xlsx.writeFile('reports/module-comparison.xlsx');
console.log('Excel file created successfully: reports/module-comparison.xlsx');
