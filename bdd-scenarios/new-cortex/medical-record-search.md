# BDD Scenarios: Medical Record Search (New Cortex)

## Feature: Medical Record Search
As a Medical Record staff
I want to search for patient records
So that I can quickly find and access patient information

---

## Automated Scenarios

### Scenario: MR-013 - Verify search fields are displayed
* **Given** the user is logged in and navigates to the Medical Record app
* **Then** all core search input fields and query buttons should be visible

### Scenario: MR-006/MR-014 - Search by HN and verify results
* **Given** the user is on the Medical Record search page
* **When** the user searches for HN "<search_hn>"
* **Then** the results table should display only records matching that HN

### Scenario: MR-015 - Clear search fields
* **Given** the user has entered "<temp_hn>" in the HN search field
* **When** the user clicks the Clear button
* **Then** the HN input field should be empty

---

## Backlog / Manual Scenarios

### Scenario: MR-007 - Search by partial name
* **Given** the user is on the Medical Record search page
* **When** the user types "<search_name>" in the name search field and clicks Search
* **Then** the results should show patients whose name contains "<search_name>"

### Scenario: MR-008 - Search by Citizen ID / Passport
* **Given** the user is on the Medical Record search page
* **When** the user enters "<search_citizen_id>" in the ID card field and clicks Search
* **Then** the results should show the matching patient record

### Scenario: MR-009 - Verify pagination and sorting
* **Given** search results contain "<total_records>" records
* **When** the user navigates to page "<target_page>"
* **Then** the table should display the correct subset of records
