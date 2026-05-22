# BDD Scenarios: Medical Record Search (New Cortex)

พื้นที่สำหรับทีม QA ในการเขียน ออกแบบ และบันทึกเคสทดสอบรูปแบบ Given-When-Then ของระบบการค้นหาเวชระเบียนผู้ป่วย (Medical Record Search)

---

## 1. เคสทดสอบที่ผ่านการเขียนสคริปต์อัตโนมัติแล้ว (Automated Scenarios)

### Scenario: Verify search fields presence from UI
* **Given** Given the user is logged in and navigates to the Medical Record app
* **Then** Then they should see all core search input fields and query buttons (HN, Name, Search, Clear)

### Scenario: Perform search by HN
* **Given** Given the user is logged in and navigates to the Medical Record app
* **When** When they search for a patient using HN "1234567"
* **Then** [ระบบแสดงรายชื่อผู้ป่วยที่ตรงตามเลข HN ค้นหา]

### Scenario: Clear search results
* **Given** Given the user is logged in and navigates to the Medical Record app
* **When** When they input a query into the HN search field
* **And** And click the Clear search button
* **Then** Then the HN input field should be completely empty

---

## 2. พื้นที่สำหรับ QA ออกแบบเคสทดสอบใหม่ (QA Backlog / Draft Scenarios)

### Scenario: [ระบุชื่อเคสทดสอบใหม่ที่นี่]
* **Given** ...
* **When** ...
* **Then** ...
