const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

async function generateCases() {
  const workbook = new ExcelJS.Workbook();
  const filePath = path.join(__dirname, '..', 'req', 'Registration SBH.xlsx');
  
  await workbook.xlsx.readFile(filePath);
  const sheet = workbook.worksheets[0];
  
  const testCases = [];
  let lastCaseId = '';
  let lastFeature = '';
  let tcCounters = {};

  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return; // skip header

    const cells = [];
    for (let c = 1; c <= 11; c++) {
      let val = row.getCell(c).value;
      if (val && typeof val === 'object') {
        if (val.richText) {
          val = val.richText.map(t => t.text).join('');
        } else {
          val = JSON.stringify(val);
        }
      }
      cells.push(val ? String(val).trim() : '');
    }

    let [caseId, feature, tcCode, title, expected, f1, f2, module, precondition, steps, verification] = cells;

    // Propagate empty caseId and feature
    if (caseId) lastCaseId = caseId;
    else caseId = lastCaseId;

    if (feature) lastFeature = feature;
    else feature = lastFeature;

    if (!title) return; // skip empty rows

    // Determine TC Code
    if (!tcCode) {
      if (!tcCounters[caseId]) tcCounters[caseId] = 1;
      tcCounters[caseId]++;
      const numStr = String(tcCounters[caseId]).padStart(2, '0');
      tcCode = `TC${numStr}-${caseId}`;
    } else {
      // parse counter if exists (e.g. TC01-REG-001-001)
      const match = tcCode.match(/^TC(\d+)-/);
      if (match) {
        tcCounters[caseId] = parseInt(match[1]);
      }
    }

    // Determine action code
    let action = 'unknown';
    let expect = 'success';

    if (caseId.includes('REG-001-001')) {
      if (title.includes('ไม่ถูกต้อง')) action = 'create-citizen-id-invalid';
      else if (title.includes('ข้อมูลซ้ำ')) action = 'create-citizen-id-duplicate';
      else if (title.includes('ไม่ครบ 13 หลัก')) action = 'create-citizen-id-short';
      else action = 'create-citizen-id';
    } 
    else if (caseId.includes('REG-001-002')) {
      if (title.includes('หมดอายุ')) {
        if (title.includes('กลับไปแก้ไข')) action = 'create-passport-expired-edit';
        else if (title.includes('ยืนยันและดำเนินการต่อ')) action = 'create-passport-expired-continue';
        else action = 'create-passport-expired';
      }
      else if (title.includes('ไม่ระบุวันที่หมดอายุ')) action = 'create-passport-no-expiry';
      else if (title.includes('รูปแบบ (Format) ที่ไม่ถูกต้อง')) action = 'create-passport-invalid-expiry';
      else action = 'create-passport';
    }
    else if (caseId.includes('REG-001-003')) action = 'create-newborn';
    else if (caseId.includes('REG-001-004')) action = 'create-alien-doc';
    else if (caseId.includes('REG-001-005')) action = 'create-sso-alien';
    else if (caseId.includes('REG-001-006')) {
      if (title.includes('ระบุเพศเป็น "ชาย"')) action = 'create-anonymous-male';
      else if (title.includes('ระบุเพศเป็น "หญิง"')) action = 'create-anonymous-female';
      else action = 'create-anonymous';
    }
    else if (caseId.includes('REG-001-007')) action = 'read-smartcard';
    else if (caseId.includes('REG-001-008')) {
      if (title.includes('เกิดวันนี้')) action = 'calculate-age-today';
      else if (title.includes('เพิ่งผ่านพ้นวันครบรอบ')) action = 'calculate-age-recent-birthday';
      else if (title.includes('29 กุมภาพันธ์')) action = 'calculate-age-leap-year';
      else action = 'calculate-age';
    }
    else if (caseId.includes('REG-001-009')) {
      if (title.includes('Default Value')) action = 'verify-language-default';
      else if (title.includes('ลบข้อมูล')) action = 'clear-language';
      else action = 'select-language';
    }
    else if (caseId.includes('REG-001-010')) {
      if (title.includes('เสียชีวิต')) action = 'select-life-status-deceased';
      else if (title.includes('Default Value')) action = 'verify-life-status-default';
      else action = 'select-life-status-alive';
    }
    else if (caseId.includes('REG-001-011')) action = 'read-smartcard-photo';
    else if (caseId.includes('REG-001-012')) {
      if (title.includes('.png')) action = 'upload-profile-image-png';
      else if (title.includes('นามสกุลอื่นที่ไม่รองรับ')) action = 'upload-profile-image-invalid';
      else if (title.includes('ไม่เกิน 300 MB')) action = 'upload-profile-image-large';
      else if (title.includes('เกิน 300 MB')) action = 'upload-profile-image-too-large';
      else action = 'upload-profile-image-jpeg';
    }
    else if (caseId.includes('REG-001-013')) action = 'camera-profile-image';
    else if (caseId.includes('REG-001-014')) {
      if (title.includes('รหัส')) action = 'dropdown-search-code';
      else if (title.includes('ชื่อ')) action = 'dropdown-search-name';
      else if (title.includes('พิมพ์คำค้นหาบางส่วน')) action = 'dropdown-search-partial';
      else action = 'dropdown-search-not-found';
    }
    else if (caseId.includes('REG-001-015')) action = 'copy-same-address';
    else if (caseId.includes('REG-001-016')) {
      if (title.includes('ลบข้อมูลผู้ติดต่อ')) action = 'delete-emergency-contact';
      else action = 'add-emergency-contact';
    }
    else if (caseId.includes('REG-001-017')) {
      if (title.includes('ญาติ/ผู้อื่นให้ข้อมูล')) action = 'select-informer-relative';
      else if (title.includes('Default Value')) action = 'verify-informer-default';
      else action = 'select-informer-patient';
    }
    // Search
    else if (caseId.includes('REG-002-001')) action = 'search-smartcard';
    else if (caseId.includes('REG-002-002')) action = 'search-hn';
    else if (caseId.includes('REG-002-003')) action = 'search-name';
    else if (caseId.includes('REG-002-004')) action = 'search-id-card';
    else if (caseId.includes('REG-002-005')) action = 'search-phone';
    else if (caseId.includes('REG-002-006')) action = 'search-vn';
    else if (caseId.includes('REG-002-007')) action = 'search-an';
    else if (caseId.includes('REG-002-008')) action = 'search-ward';
    else if (caseId.includes('REG-002-009')) action = 'search-doctor';
    else if (caseId.includes('REG-002-010')) action = 'search-zipcode';
    else if (caseId.includes('REG-002-011')) action = 'clear-search';
    else if (caseId.includes('REG-002-012')) action = 'search-multiple-fields';
    // Display
    else if (caseId.includes('REG-003-001')) action = 'display-id-type';
    else if (caseId.includes('REG-003-002')) action = 'display-patient-info';
    else if (caseId.includes('REG-003-003')) action = 'display-life-status';
    else if (caseId.includes('REG-003-004')) action = 'display-audit-users';
    else if (caseId.includes('REG-003-005')) action = 'display-passport-expired-alert';
    // Edit
    else if (caseId.includes('REG-004-001')) action = 'edit-smartcard';
    else if (caseId.includes('REG-004-002')) action = 'edit-manual';
    else if (caseId.includes('REG-004-003')) {
      if (title.includes('แก้ไขรหัสสิทธิ')) action = 'edit-right-code';
      else if (title.includes('ลบรหัสสิทธิ')) action = 'delete-right-code';
      else action = 'add-right-code';
    }
    else if (caseId.includes('REG-004-004')) {
      if (title.includes('แก้ไขหมายเหตุ')) action = 'edit-note';
      else action = 'add-note';
    }
    else if (caseId.includes('REG-004-005')) action = 'edit-life-status';
    else if (caseId.includes('REG-004-006')) action = 'edit-change-name';
    else if (caseId.includes('REG-004-007')) action = 'edit-change-passport';
    else if (caseId.includes('REG-004-008')) action = 'edit-prefix-auto';
    else if (caseId.includes('REG-004-009')) action = 'resync-hn';

    // Determine expectations
    if (expected.includes('สำเร็จ') || expected.includes('ถูกต้อง') || expected.includes('ปกติ') || expected.includes('แสดงข้อมูล')) {
      expect = 'success';
    } else if (expected.includes('แจ้งเตือน') || expected.includes('ปฏิเสธ') || expected.includes('ไม่อนุญาต') || expected.includes('Error') || expected.includes('ระบุข้อมูลให้ครบถ้วน')) {
      expect = 'validation-error';
    }

    // Clean up strings for code file
    const cleanName = title.replace(/"/g, '\\"');
    const cleanFeature = feature.replace(/"/g, '\\"');

    testCases.push({
      id: tcCode,
      name: cleanName,
      feature: cleanFeature,
      role: 'reception',
      action,
      expect,
      precondition: precondition.replace(/"/g, '\\"'),
      steps: steps.replace(/"/g, '\\"'),
      verification: verification.replace(/"/g, '\\"')
    });
  });

  // Write TS file
  let code = `/**
 * Registration SBH — Dynamic Test Data
 * 
 * Auto-generated from req/Registration SBH.xlsx
 * Total Cases: ${testCases.length}
 */

export type RegistrationSbhTestCase = {
  id: string;
  name: string;
  feature: string;
  role: string;
  action: string;
  expect: string;
  tags: string[];
  
  // Dynamic parameters
  citizenId?: string;
  passportNo?: string;
  passportExpiry?: string;
  firstName?: string;
  lastName?: string;
  gender?: 'ชาย' | 'หญิง';
  birthDate?: string;
  language?: string;
  lifeStatus?: 'มีชีวิตอยู่' | 'เสียชีวิต';
  address?: string;
  emergencyContactsCount?: number;
  informerType?: string;
  hn?: string;
  keyword?: string;
  rightCode?: string;
  noteMessage?: string;
  newName?: string;

  precondition?: string;
  steps?: string;
  verification?: string;
};

const BASE_TAGS = ['@functional', '@registration', '@sbh', '@regression'];

export const RegistrationSbhTestCases: RegistrationSbhTestCase[] = [
`;

  testCases.forEach((tc) => {
    // Determine pre-populated values based on action
    let params = '';
    if (tc.action.includes('citizen-id-invalid')) {
      params += `\n    citizenId: '1111111111112',`;
    } else if (tc.action.includes('citizen-id-duplicate')) {
      params += `\n    citizenId: '3101234567890',`;
    } else if (tc.action.includes('citizen-id-short')) {
      params += `\n    citizenId: '1234567890',`;
    } else if (tc.action.includes('citizen-id') || tc.action.includes('create-happy')) {
      params += `\n    firstName: 'สมชาย', lastName: 'ใจดี',`;
    } else if (tc.action.includes('create-passport-expired')) {
      params += `\n    passportNo: 'A99999999', passportExpiry: '2020-01-01',`;
    } else if (tc.action.includes('create-passport')) {
      params += `\n    passportNo: 'A12345678', passportExpiry: '2030-10-10', firstName: 'John', lastName: 'Doe',`;
    } else if (tc.action.includes('create-newborn')) {
      params += `\n    firstName: 'ทารกแรกเกิด', lastName: 'ใจมั่น',`;
    } else if (tc.action.includes('create-anonymous-male')) {
      params += `\n    gender: 'ชาย',`;
    } else if (tc.action.includes('create-anonymous-female')) {
      params += `\n    gender: 'หญิง',`;
    } else if (tc.action.includes('calculate-age-today')) {
      params += `\n    birthDate: '2026-06-09',`;
    } else if (tc.action.includes('calculate-age-recent-birthday')) {
      params += `\n    birthDate: '1995-06-08',`;
    } else if (tc.action.includes('calculate-age-leap-year')) {
      params += `\n    birthDate: '2024-02-29',`;
    } else if (tc.action.includes('calculate-age')) {
      params += `\n    birthDate: '1995-05-15',`;
    } else if (tc.action.includes('select-language')) {
      params += `\n    language: 'ภาษาอังกฤษ',`;
    } else if (tc.action.includes('select-life-status-deceased')) {
      params += `\n    lifeStatus: 'เสียชีวิต',`;
    } else if (tc.action.includes('copy-same-address')) {
      params += `\n    address: '99/9 ถ.พหลโยธิน แขวงลาดยาว เขตจตุจักร กรุงเทพฯ',`;
    } else if (tc.action.includes('add-emergency-contact')) {
      params += `\n    emergencyContactsCount: 2,`;
    } else if (tc.action.includes('select-informer-relative')) {
      params += `\n    informerType: 'ญาติ/ผู้อื่นให้ข้อมูล',`;
    } else if (tc.action.includes('search-hn') || tc.action.includes('clear-search') || tc.action.includes('view-patient-info') || tc.action.includes('edit-') || tc.action.includes('manage-') || tc.action.includes('change-') || tc.action.includes('resync-')) {
      params += `\n    hn: '6900001',`;
    } else if (tc.action.includes('search-name')) {
      params += `\n    keyword: 'สมชาย',`;
    }

    if (tc.action === 'edit-manual') {
      params += `\n    address: '555/5 ถ.วิภาวดีรังสิต แขวงจตุจักร เขตจตุจักร กรุงเทพฯ',`;
    } else if (tc.action === 'add-right-code' || tc.action === 'edit-right-code') {
      params += `\n    rightCode: 'WEL001',`;
    } else if (tc.action === 'add-note' || tc.action === 'edit-note') {
      params += `\n    noteMessage: 'คนไข้แพ้ยาประเภท Penicillin',`;
    } else if (tc.action === 'edit-change-name') {
      params += `\n    newName: 'สมเจตน์',`;
    }

    // Determine extra tags
    let extraTags = [`'@${tc.id.toLowerCase()}'`];
    if (tc.id.includes('REG-001')) {
      extraTags.push(`'@create-patient'`);
    } else if (tc.id.includes('REG-002')) {
      extraTags.push(`'@search'`);
    } else if (tc.id.includes('REG-003')) {
      extraTags.push(`'@display'`);
    } else if (tc.id.includes('REG-004')) {
      extraTags.push(`'@edit-patient'`);
    }

    if (tc.name.includes('ไม่ถูกต้อง') || tc.name.includes('ข้อมูลซ้ำ') || tc.name.includes('ไม่ครบ') || tc.name.includes('หมดอายุ') || tc.expect === 'validation-error') {
      extraTags.push(`'@negative'`);
      if (tc.name.includes('ไม่ถูกต้อง') || tc.name.includes('ไม่ครบ') || tc.name.includes('รูปแบบ')) {
        extraTags.push(`'@validation'`);
      }
    }

    if (tc.name.includes('Verify UI') || tc.name.includes('แสดงผล') || tc.name.includes('Default Value') || tc.name.includes('ปุ่ม') || tc.name.includes('หน้าจอ') || tc.action.includes('verify-') || tc.action.includes('display-')) {
      extraTags.push(`'@ui'`);
    }

    if (tc.id.includes('TC01') && !tc.action.includes('invalid') && !tc.action.includes('duplicate') && !tc.action.includes('expired')) {
      extraTags.push(`'@smoke'`);
    }

    code += `  {
    id: '${tc.id}',
    name: "${tc.name}",
    feature: "${tc.feature}",
    role: '${tc.role}',
    action: '${tc.action}',
    expect: '${tc.expect}',${params}
    precondition: "${tc.precondition}",
    steps: "${tc.steps}",
    verification: "${tc.verification}",
    tags: [...BASE_TAGS, ${extraTags.join(', ')}],
  },
`;
  });

  code += `];\n`;

  fs.writeFileSync(path.join(__dirname, '..', 'data', 'registration.data.ts'), code);
  console.log(`✅ Generated ${testCases.length} cases with full tags into data/registration.data.ts`);
}

generateCases().catch(console.error);
