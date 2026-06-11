# BDD Scenarios: Check Apps (New Cortex)

## Feature: Check App Accessibility
As a QA tester
I want to verify that application modules load correctly
So that end users can access all features without errors

---

## Automated Scenarios

### Scenario Outline: Verify module accessibility
* **Given** the user is logged in as "<role>"
* **When** the user navigates to the apps page
* **And** opens the "<module_name>" module
* **Then** the module should load successfully
* **And** a full-page screenshot should be captured for validation

---

## Backlog / Draft Scenarios

### Scenario: APP-002 - Access module with nurse role
* **Given** the user is logged in as "<role_nurse>"
* **When** the user navigates to the apps page and opens "<target_module>"
* **Then** no Permission Denied error should appear
* **And** the nurse-specific menu should be displayed correctly
