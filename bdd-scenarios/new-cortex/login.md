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

---

## Backlog / Draft Scenarios

### Scenario: LG-002 - Login with invalid credentials
* **Given** the user is on the Cortex login page
* **When** the user enters username "<invalid_username>" and password "<invalid_password>"
* **And** clicks Sign In
* **Then** the system should display error message "<error_message>"
* **And** the user should remain on the login page

#### Examples
| `<invalid_username>` | `<invalid_password>` | `<error_message>` |
| :--- | :--- | :--- |
| `wrong_user@cortex.com` | `123456` | Username or password incorrect. |
| `super_cortex@cortex.com` | `wrongpass` | Username or password incorrect. |
