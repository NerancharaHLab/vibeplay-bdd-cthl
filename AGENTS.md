# AGENTS.md — AI Context for vibeplay-bdd-cthl

> **This file is the single source of truth for AI agents working on this project.**
> Read this ENTIRE file before making any code changes.

## Project Overview

- **Name**: vibeplay-bdd-cthl (VibePlay BDD — Cortex HLab)
- **Purpose**: Automated E2E testing for the **Cortex** healthcare platform by **HLab**
- **Stack**: Playwright + TypeScript + BDD (Behavior-Driven Development)
- **Sites**: `new-cortex`, `tmh`, `sbh`, `nuh` (4 hospital sites sharing the same platform)
- **Design Pattern**: **Dynamic Objective (Data-Driven Dispatcher)**

---

## Architecture — 3-Tier BDD + Data-Driven

```
┌─────────────────────────────────────────────────────────────┐
│  Tier 1: Spec Files (tests/**/*.spec.ts)                    │
│  → Thin loop: imports data + steps, iterates test cases     │
├─────────────────────────────────────────────────────────────┤
│  Tier 2: Step Definitions (steps/**/*.steps.ts)             │
│  → BDD steps with execute(tc) dispatcher pattern            │
│  → dispatchAction(tc) + dispatchExpect(tc)                  │
├─────────────────────────────────────────────────────────────┤
│  Tier 3: Page Objects (pages/**/*.page.ts)                  │
│  → Locators, raw UI interactions, extends BasePage          │
├─────────────────────────────────────────────────────────────┤
│  Data Layer: (data/*.data.ts)                               │
│  → Test case definitions with action/expect/tags/role       │
├─────────────────────────────────────────────────────────────┤
│  Locator Layer: (locators/*.locators.ts)                    │
│  → CSS/XPath selectors as constants                         │
└─────────────────────────────────────────────────────────────┘
```

---

## Directory Structure

```
vibeplay-bdd-cthl/
├── tests/                          # Tier 1 — Spec files (thin loops)
│   ├── new-cortex/                 #   grouped by site
│   │   ├── login/
│   │   ├── medical-record/
│   │   ├── reception/
│   │   ├── claim/
│   │   ├── medication.spec.ts
│   │   ├── registration.spec.ts
│   │   └── ipd-orders.spec.ts
│   ├── tmh/
│   ├── sbh/
│   └── nuh/
│
├── steps/                          # Tier 2 — BDD Step Definitions
│   ├── new-cortex/                 #   each module has a .steps.ts
│   │   ├── login/
│   │   ├── medical-record/
│   │   ├── reception/
│   │   ├── claim/
│   │   ├── medication.steps.ts
│   │   ├── registration.steps.ts
│   │   └── ipd-orders.steps.ts
│   ├── sbh/
│   ├── tmh/
│   ├── nuh/
│   └── shared/                     #   reusable steps (auth, navigation)
│       ├── auth.steps.ts
│       └── navigation.steps.ts
│
├── pages/                          # Tier 3 — Page Object Models (POM)
│   ├── base.page.ts                #   base class with common methods
│   ├── new-cortex/
│   │   ├── login/
│   │   ├── medical-record/
│   │   └── reception/
│   ├── sbh/
│   ├── tmh/
│   └── nuh/
│
├── data/                           # Test case data (data-driven)
│   ├── advance-visits.data.ts
│   ├── medical-record.data.ts
│   ├── medication.data.ts
│   ├── ipd-orders.data.ts
│   └── registration-sbh.data.ts
│
├── locators/                       # UI selectors (CSS/XPath)
│   ├── new-cortex/
│   ├── sbh/
│   └── *.locators.ts
│
├── bdd-scenarios/                  # QA-written BDD specs (Markdown)
│   ├── new-cortex/
│   ├── sbh/
│   └── ...
│
├── utils/                          # Shared utilities
│   ├── fixtures.ts                 # Playwright test.extend<AllFixtures>
│   ├── test-helpers.ts             # groupBy, generateThaiID, etc.
│   ├── user-roles.ts               # getUserByRole(site, role)
│   └── api-helpers.ts              # API utility functions
│
├── skills/                         # Runner scripts
│   └── run.js                      # Unified test runner (site:module)
│
├── km/                             # Knowledge Management docs
│   └── git_workflow.md             # Git workflow rules
│
├── config/                         # Config files
├── playwright.config.ts            # Playwright configuration
├── package.json
└── tsconfig.json
```

---

## Critical Coding Patterns

### Pattern 1: Data File (`data/*.data.ts`)

Every module must define its test data as a typed array:

```typescript
// Type definitions
export type MyModuleAction = 'verify-ui' | 'create-happy' | 'search';
export type MyModuleExpect = 'ui-visible' | 'success' | 'results-visible';

export type MyModuleTestCase = {
  id: string;          // e.g. "MR-001"
  name: string;        // Human-readable test name
  feature: string;     // Feature group for describe block
  role: string;        // User role: 'super', 'nurse', 'physician'
  action: MyModuleAction;
  expect: MyModuleExpect;
  tags: string[];      // e.g. ['@functional', '@module-name', '@new-cortex']
  // ...module-specific optional fields
};

export const MyModuleTestCases: MyModuleTestCase[] = [
  { id: 'XX-001', name: '...', feature: '...', role: 'super', action: '...', expect: '...', tags: [...] },
];
```

### Pattern 2: Steps File (`steps/**/*.steps.ts`)

Every steps class MUST implement the **Dispatcher Pattern**:

```typescript
export class MyModuleSteps {
  constructor(private page: Page) { /* init page objects */ }

  // Dynamic entry point — called from spec
  async execute(tc: MyModuleTestCase) {
    await test.step('Given ...', async () => { /* login + navigate */ });
    await this.dispatchAction(tc);
    await this.dispatchExpect(tc);
  }

  private async dispatchAction(tc: MyModuleTestCase) {
    switch (tc.action) {
      case 'verify-ui': /* ... */ break;
      case 'create-happy': /* ... */ break;
    }
  }

  private async dispatchExpect(tc: MyModuleTestCase) {
    switch (tc.expect) {
      case 'ui-visible': /* ... */ break;
      case 'success': /* ... */ break;
    }
  }
}
```

### Pattern 3: Spec File (`tests/**/*.spec.ts`)

Spec files must be **thin** — just a loop:

```typescript
import { test } from '@playwright/test';
import { MyModuleSteps } from '../../steps/site/module.steps';
import { MyModuleTestCases } from '../../data/module.data';
import { groupBy } from '../../utils/test-helpers';

const featureGroups = groupBy(MyModuleTestCases, 'feature');

test.describe('Module Name (Site)', () => {
  for (const [feature, cases] of Object.entries(featureGroups)) {
    test.describe(feature, () => {
      for (const tc of cases) {
        test(`${tc.id}: ${tc.name}`, { tag: tc.tags }, async ({ page }) => {
          const steps = new MyModuleSteps(page);
          await steps.execute(tc);
        });
      }
    });
  }
});
```

### Pattern 4: Locators (`locators/*.locators.ts`)

```typescript
export const MyModuleLocators = {
  submitButton: 'button[type="submit"]',
  nameInput: 'input[data-testid="name"]',
  // ...
};
```

---

## Strict Rules

### ❌ NEVER DO
- **NEVER** hardcode test steps or data directly in `.spec.ts` files
- **NEVER** commit/push directly to `main` or `master`
- **NEVER** commit temporary screenshots, test-results, or allure-results
- **NEVER** use `unknown` type for catch blocks — cast to `(e as any).message`

### ✅ ALWAYS DO
- **ALWAYS** use the `execute(tc) → dispatchAction → dispatchExpect` pattern
- **ALWAYS** work on branch `feat/qa-neranchara-dev`
- **ALWAYS** run pre-commit checks before committing:
  ```bash
  npx tsc --noEmit          # TypeScript check
  npx playwright test --list # Playwright scan check
  ```
- **ALWAYS** use Conventional Commits: `feat(module):`, `fix(module):`, `refactor(module):`, `docs(module):`
- **ALWAYS** group test cases by `feature` using `groupBy()` in spec files
- **ALWAYS** extend `BasePage` for page objects

### File Naming Conventions
| Layer     | Pattern                          | Example                          |
|-----------|----------------------------------|----------------------------------|
| Spec      | `tests/{site}/{module}.spec.ts`  | `tests/new-cortex/medication.spec.ts` |
| Steps     | `steps/{site}/{module}.steps.ts` | `steps/new-cortex/medication.steps.ts` |
| Page      | `pages/{site}/.../name.page.ts`  | `pages/new-cortex/login/login.page.ts` |
| Data      | `data/{module}.data.ts`          | `data/medication.data.ts`        |
| Locators  | `locators/{module}.locators.ts`  | `locators/medication.locators.ts` |
| BDD Spec  | `bdd-scenarios/{site}/{module}.md` | `bdd-scenarios/new-cortex/medication.md` |

---

## Running Tests

```bash
# Run specific module on a site
npm run site:module <site> <module>
# Example:
npm run site:module new-cortex login

# Run specific test case
npm run site:testcase <site> "test case name"

# Run with options
node skills/run.js site:module new-cortex login --headless --role super
```

---

## Git Workflow

1. Always work on `feat/qa-neranchara-dev`
2. Pull latest before starting work
3. Run `npx tsc --noEmit` + `npx playwright test --list` before commit
4. Use conventional commit messages
5. Push to `origin/feat/qa-neranchara-dev`

> **For full details, see [km/git_workflow.md](km/git_workflow.md)**
