# BDD Scenarios: Registration (SBH)

พื้นที่สำหรับทีม QA ในการดูตัวอย่าง ออกแบบ และบันทึกเคสทดสอบรูปแบบ Given-When-Then ของระบบเวชระเบียนและสร้างประวัติผู้ป่วยใหม่ (Registration) ไซต์ SBH

---

## 1. เคสทดสอบที่ผ่านการเขียนสคริปต์อัตโนมัติแล้ว (Automated Scenarios)

### Feature: Create Patient (สร้างผู้ป่วยใหม่)

#### Scenario: REG-001-001-TC01 - Create patient with valid citizen ID
* **Given** the user is logged in as "reception" and opens Medical Record app
* **When** user fills valid citizen ID and details and saves
* **Then** registration changes are saved successfully

#### Scenario: REG-001-001-TC02 - Create patient fails with invalid citizen ID
* **Given** the user is logged in as "reception" and opens Medical Record app
* **When** user inputs invalid citizen ID: "1111111111112"
* **Then** validation error message is shown

#### Scenario: REG-001-002-TC01 - Create patient with passport
* **Given** the user is logged in as "reception" and opens Medical Record app
* **When** user fills passport details and saves
* **Then** registration changes are saved successfully

#### Scenario: REG-001-006-TC01 - Create anonymous patient - Male
* **Given** the user is logged in as "reception" and opens Medical Record app
* **When** user creates anonymous patient with gender: "ชาย"
* **Then** anonymous prefilled name is visible

---

### Feature: Patient Search (ค้นหาผู้ป่วย)

#### Scenario: REG-002-002-TC01 - Search patient by Hospital Number (HN)
* **Given** the user is logged in as "reception" and opens Medical Record app
* **When** searching patient by HN: "6900001"
* **Then** patient search results list is visible

#### Scenario: REG-002-011-TC01 - Clear patient search criteria
* **Given** the user is logged in as "reception" and opens Medical Record app
* **When** clearing search results for HN: "6900001"
* **Then** search input fields are cleared

---

### Feature: Edit Patient Info (แก้ไขข้อมูลผู้ป่วย)

#### Scenario: REG-004-002-TC01 - Edit patient profile details manually
* **Given** the user is logged in as "reception" and opens Medical Record app
* **When** editing details of patient HN: "6900001"
* **Then** registration changes are saved successfully

---

> [!NOTE]
> **ระบบ Dynamic Objective:**
> โครงการนี้พัฒนาการทดสอบด้วยสถาปัตยกรรมไดนามิก ครอบคลุมเคสทดสอบทั้งหมด **74 รายการ** ของเอกสารสเปรดชีต โดยชุดทดสอบจะทำการโหลดเคสโดยตรงจากไฟล์คอนฟิกข้อมูล [registration.data.ts](file:///Users/neranchara/Jobs/Project/vibeplay-bdd-cthl/data/registration.data.ts) เพื่อรันและรายงานผลอย่างเป็นระบบโดยไม่ต้องมีสคริปต์แยกของแต่ละเคส
