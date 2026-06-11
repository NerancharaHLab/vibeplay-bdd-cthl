# BDD Scenarios: Login (New Cortex)

## Feature: Login
As a system user
I want to log in with valid credentials
So that I can access the Cortex Cloud platform

---

## Automated Scenarios

### Scenario Outline: Login with different roles
* **Given** the user is on the Cortex login page
* **When** the user enters credentials and logs in as "<username>"
* **Then** they should be redirected to the applications page
* **And** the dashboard should be visible

> [!NOTE]
> Run specific roles via CLI:
> - `npm run site:module new-cortex login -- --role super`
> - `npm run site:module new-cortex login -- --role admin`

### Scenario: TC-LOGIN-INVALID-USER - Login fails with incorrect username
* **Given** the user is on the Cortex login page
* **When** they attempt to login with username "invalid-user-name" and password "MyPassw0rd"
* **Then** they should see an invalid credentials error message on the login screen

### Scenario: TC-LOGIN-INVALID-PASS - Login fails with incorrect password
* **Given** the user is on the Cortex login page
* **When** they attempt to login with username "user1" and password "WrongPassword123"
* **Then** they should see an invalid credentials error message on the login screen

---

## Backlog / Draft Scenarios

(No pending backlog items)
