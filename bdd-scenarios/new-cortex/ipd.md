# BDD Scenarios: IPD Physician Orders (New Cortex)

This document contains BDD scenarios for testing the IPD Physician Orders features on the New Cortex platform.

## Feature: Create IPD Physician Orders
As a Physician or authorized clinician
I want to create physician orders for inpatient cases
So that nurses and pharmacists can carry out inpatient care and treatments

### Scenario: TC-CTX-5044-001 - Create One-day Physician Order successfully from IPD Summary
* **Given** the user is logged in as an authorized clinician
* **When** the user opens the patient workspace with HN "6903588" and active AN
* **And** the user navigates to the IPD Summary page
* **And** the user creates a Physician Order with type "One-day", medication "Paracetamol 500 mg", and direction "หลังอาหาร"
* **Then** the system should display a success message
* **And** the new One-day order should appear in the correct section of the IPD Summary

### Scenario: TC-CTX-5044-002 - Create Continue Physician Order successfully from IPD Summary
* **Given** the user is logged in as an authorized clinician
* **When** the user opens the patient workspace with HN "6903588" and active AN
* **And** the user navigates to the IPD Summary page
* **And** the user creates a Physician Order with type "Continue", medication "IV Fluid", and direction "continuous"
* **Then** the system should display a success message
* **And** the new Continue order should appear in the ORDER FOR CONTINUE section

### Scenario: TC-CTX-5044-003 - Create Physician Order fails when required fields are missing
* **Given** the user is logged in as an authorized clinician
* **When** the user opens the patient workspace with HN "6903588" and active AN
* **And** the user navigates to the IPD Summary page
* **And** the user attempts to save a "One-day" Physician Order without direction or medication
* **Then** the system should not save the order and display a validation error message for required fields

### Scenario: TC-CTX-5044-004 - Unauthorized user cannot create Physician Order
* **Given** the user is logged in as a nurse without create permissions
* **When** the user opens the patient workspace with HN "6903588" and active AN
* **And** the user navigates to the IPD Summary page
* **Then** the action button to create Physician Orders should not be visible or should be disabled

---

## Feature: Sign IPD Orders
As an authorized clinician (Physician)
I want to sign IPD orders
So that the orders are validated and released for pharmacy or nursing actions

### Scenario: TC-CTX-5049-001 - Sign a single IPD order successfully
* **Given** the user is logged in as a physician with sign permissions
* **When** the user opens the patient workspace with HN "6903588" and active AN
* **And** the user navigates to the IPD Summary page
* **And** the user selects an unsigned order
* **And** the user clicks the Sign button and confirms the action
* **Then** the system should record the signature and change the order status to "Signed"

### Scenario: TC-CTX-5049-002 - Sign multiple selected IPD orders successfully
* **Given** the user is logged in as a physician with sign permissions
* **When** the user opens the patient workspace with HN "6903588" and active AN
* **And** the user navigates to the IPD Summary page
* **And** the user selects multiple unsigned orders
* **And** the user clicks the Sign button and confirms the action
* **Then** the system should sign all selected orders and change their statuses to "Signed"

### Scenario: TC-CTX-5049-003 - Unauthorized user cannot sign IPD orders
* **Given** the user is logged in as a nurse or user without sign permissions
* **When** the user opens the patient workspace with HN "6903588" and active AN
* **And** the user navigates to the IPD Summary page
* **Then** the Sign action should not be visible or should be disabled

### Scenario: TC-CTX-5049-004 - Cannot sign an already signed order
* **Given** the user is logged in as a physician with sign permissions
* **When** the user opens the patient workspace with HN "6903588" and active AN
* **And** the user navigates to the IPD Summary page
* **And** the user selects an already signed order
* **Then** the Sign option should not be selectable or should prevent re-signing

---

## Feature: IPD Order Acknowledge by Nurse
As a nurse
I want to acknowledge signed IPD orders
So that the clinical team knows the instructions are received and being executed

### Scenario: TC-CTX-5052-001 - Acknowledge IPD order successfully
* **Given** the user is logged in as a nurse with acknowledge permissions
* **When** the user opens the patient workspace with HN "6903588" and active AN
* **And** the user navigates to the IPD Summary or orders page
* **And** the user selects a pending acknowledge order
* **And** the user clicks Acknowledge
* **Then** the system should update the order status to "Acknowledged"

### Scenario: TC-CTX-5052-002 - Status of order and request are updated after acknowledgment
* **Given** the user is logged in as a nurse with acknowledge permissions
* **When** the user opens the patient workspace with HN "6903588" and active AN
* **And** the user selects a pending acknowledge order with related request
* **And** the user clicks Acknowledge and refreshes the data
* **Then** both order and order request statuses should be updated to their correct business rule states

### Scenario: TC-CTX-5052-003 - Cannot acknowledge an already acknowledged order
* **Given** the user is logged in as a nurse with acknowledge permissions
* **When** the user opens the patient workspace with HN "6903588" and active AN
* **And** the user selects an already acknowledged order
* **Then** the system should prevent re-acknowledgment and maintain the current state

### Scenario: TC-CTX-5052-004 - Unauthorized user cannot acknowledge IPD orders
* **Given** the user is logged in as a physician without nurse acknowledge permissions
* **When** the user opens the patient workspace with HN "6903588" and active AN
* **Then** the Acknowledge action should not be visible or should be disabled

---

## Feature: Cancel IPD Order
As an authorized clinician or doctor
I want to cancel active IPD orders
So that discontinued treatments are immediately halted

### Scenario: TC-CTX-5058-001 - Cancel a single IPD order successfully
* **Given** the user is logged in as a clinician with cancel permissions
* **When** the user opens the patient workspace with HN "6903588" and active AN
* **And** the user selects a cancelable order
* **And** the user clicks Cancel and confirms
* **Then** the system should cancel the order and change its status to "Canceled"

### Scenario: TC-CTX-5058-002 - Cancel multiple IPD orders successfully by sending IDs
* **Given** the user is logged in as a clinician with cancel permissions
* **When** the user opens the patient workspace with HN "6903588" and active AN
* **And** the user selects multiple cancelable orders
* **And** the user clicks Cancel and confirms
* **Then** the system should cancel all selected orders successfully

### Scenario: TC-CTX-5058-003 - Cannot cancel orders that are in non-cancelable status
* **Given** the user is logged in as a clinician with cancel permissions
* **When** the user opens the patient workspace with HN "6903588" and active AN
* **And** the user selects a signed or already canceled order that is non-cancelable
* **And** the user attempts to click Cancel
* **Then** the system should show a warning message and prevent the cancel action

### Scenario: TC-CTX-5058-004 - Unauthorized user cannot cancel IPD orders
* **Given** the user is logged in as a user without cancel permissions
* **When** the user opens the patient workspace with HN "6903588" and active AN
* **Then** the Cancel action should not be visible or should be disabled

---

## Feature: Edit IPD Order
As an authorized clinician or doctor
I want to edit existing IPD orders
So that treatment doses or instructions can be adjusted

### Scenario: TC-CTX-5061-001 - Edit IPD order item successfully
* **Given** the user is logged in as a clinician with edit permissions
* **When** the user opens the patient workspace with HN "6903588" and active AN
* **And** the user selects an editable order item and clicks Edit
* **And** the user updates the direction to "หลังอาหารเช้า-เย็น" and saves
* **Then** the system should save the modifications and display updated values on screen

### Scenario: TC-CTX-5061-002 - Edit IPD order fails when direction validation fails
* **Given** the user is logged in as a clinician with edit permissions
* **When** the user opens the patient workspace with HN "6903588" and active AN
* **And** the user selects an order item and clicks Edit
* **And** the user fills ParsableDirection with invalid or empty format and clicks save
* **Then** the system should not save and display a validation error for direction

### Scenario: TC-CTX-5061-003 - Edit IPD order fails when pharmacy routing location cannot be resolved
* **Given** the user is logged in as a clinician with edit permissions
* **When** the user opens the patient workspace with HN "6903588" and active AN
* **And** the user edits a medication order that has no default pharmacy routing location configured
* **And** the user clicks save
* **Then** the system should display an error explaining that pharmacy routing location is missing

### Scenario: TC-CTX-5061-004 - Unauthorized user cannot edit IPD orders
* **Given** the user is logged in as a user without edit permissions
* **When** the user opens the patient workspace with HN "6903588" and active AN
* **Then** the Edit action should not be visible or should be disabled
