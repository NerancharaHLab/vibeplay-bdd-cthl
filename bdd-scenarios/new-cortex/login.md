# BDD Scenarios: Login (New Cortex)

พื้นที่สำหรับทีม QA ในการเขียน ออกแบบ และบันทึกเคสทดสอบรูปแบบ Given-When-Then ของระบบเข้าสู่ระบบหลัก (Login)

---

## 1. เคสทดสอบที่ผ่านการเขียนสคริปต์อัตโนมัติแล้ว (Automated Scenarios)

### Scenario: Login test for user
* **Given** Given the user is on the Cortex login page
* **When** When the user enters credentials and logs in as "[username]"
* **Then** Then they should be redirected to the applications page and the dashboard should be visible

*(ข้อมูลผู้ใช้และรหัสผ่านจะถูกดึงอัตโนมัติจากไฟล์ข้อมูลสิทธิ์การใช้งานแยกไซต์)*

---

## 2. พื้นที่สำหรับ QA ออกแบบเคสทดสอบใหม่ (QA Backlog / Draft Scenarios)

> [!TIP]
> ทีม QA สามารถก๊อปปี้รูปแบบด้านล่างนี้เพื่อวางแผนและออกแบบเคสทดสอบใหม่ๆ เมื่อเขียนเสร็จแล้ว แจ้งทีมพัฒนาจะนำไปเขียนโค้ดทดสอบให้ทันทีครับ

### Scenario: [ระบุชื่อเคสทดสอบใหม่ที่นี่]
* **Given** ...
* **When** ...
* **Then** ...
