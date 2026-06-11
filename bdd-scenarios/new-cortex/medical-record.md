# BDD Scenarios: Medical Record (New Cortex)

## Feature: Create & Edit Patient Record
As a Medical Record staff
I want to create and edit patient records
So that the hospital database stays accurate and up-to-date

---

## Automated Scenarios

### Scenario: MR-003 - Create new patient record successfully (Happy Path)
* **Given** the user is logged in as "<role>"
* **When** the user navigates to the Medical Record app
* **And** starts creating a new patient record
* **And** fills first name "<first_name>", last name "<last_name>", and auto-generated ID card "<id_card_no>"
* **Then** the input fields should display the entered information correctly

---

## Backlog / Manual Scenarios

### Scenario: MR-001 - Verify UI elements on Create Patient page
* **Given** the user is on the Create New Patient page as "<role>"
* **Then** required input fields (first name, last name, ID card) should be visible
* **And** Save and Cancel buttons should be enabled

### Scenario: MR-002 - Validation error when mandatory fields are empty
* **Given** the user is on the Create New Patient page
* **When** the user leaves all required fields empty and clicks Save
* **Then** the system should display validation error messages
* **And** the data should not be saved

### Scenario: MR-004 - Duplicate ID card number warning
* **Given** a patient with ID card "<existing_id>" already exists
* **When** the user creates a new patient with the same ID card "<existing_id>"
* **Then** the system should display a duplicate warning "<duplicate_warning_msg>"
* **And** the record should not be created

### Scenario: MR-005 - Read patient data from Smart Card
* **Given** a Smart Card reader "<card_reader_model>" is connected
* **When** the user inserts the ID card and clicks the Smart Card button
* **Then** the fields should auto-fill with name, last name, and ID from the card

### Scenario: MR-010 - Edit patient address and phone number
* **Given** the user is on the profile page of patient HN "<patient_hn>"
* **When** the user edits the phone to "<new_telephone>" and address to "<new_address>" and saves
* **Then** a success message should appear
* **And** the updated data should persist on reload

### Scenario: MR-011 - Edit emergency contact
* **Given** the user is editing the record of patient HN "<patient_hn>"
* **When** the user adds emergency contact "<emergency_contact_name>", relationship "<emergency_relationship>", phone "<emergency_phone>"
* **And** clicks Save
* **Then** the emergency contact table should display the new entry

### Scenario: MR-012 - Verify audit trail for edits
* **Given** the user is logged in as "<role_admin>"
* **When** the user views the audit trail tab for patient HN "<patient_hn>"
* **Then** the log should show who edited which field, old/new values, and timestamp
