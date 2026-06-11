# BDD Scenarios: Advance Visits (New Cortex)

## Feature: Advance Visits
As a front desk staff
I want to manage advance patient visits
So that appointment queues are prepared before patients arrive

---

## Automated Scenarios

### Scenario: AV-001 - Verify Advance Visits page elements
* **Given** the user is logged in to Cortex Cloud
* **When** they navigate to the Advance Visits page
* **Then** the URL should contain `/advance-visits`
* **And** action buttons should be visible

### Scenario: AV-002 - Verify filter fields
* **Given** the user is on the Advance Visits page
* **Then** filter options for Date, Clinic, and Doctor should be visible

### Scenario: AV-004-001 - Create patient appointment successfully
* **Given** the user is on the Advance Visits page
* **When** they click "+ เพิ่มนัดหมาย"
* **And** fill the appointment form with Clinic="ห้องตรวจโรคอายุรกรรมทั่วไป MED", Doctor="วิชัย เอื้อเฟื้อ", Date="12/06/2569"
* **And** click "ค้นหาเวลานัดหมาย" to search for free slots
* **And** select the time slot: "09:00 - 09:10"
* **And** search and link patient HN: "1000001"
* **And** click "บันทึก" to save the appointment
* **Then** the appointment should be created successfully and modal closed

---

## Backlog / Manual Scenarios

### Scenario: AV-003 - Filter appointments by date, clinic, and doctor
* **Given** the user is on the Advance Visits page
* **When** the user selects date "<target_date>", clinic "<clinic_name>", doctor "<doctor_name>"
* **And** clicks the Search button
* **Then** the results should show only appointments matching the selected filters
