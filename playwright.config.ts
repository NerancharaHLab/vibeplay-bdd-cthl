import { defineConfig, devices } from '@playwright/test';

const SITE_URLS: Record<string, string> = {
  'new-cortex': 'https://dev-x.cortexcloud.co/cortex',
  'tmh': 'https://cortex-tmh-new.cortexcloud.co/cortex',
  'sbh': 'https://cortex-sbh-new.cortexcloud.co/cortex',
  'nuh': 'https://cortex-nuh-new.cortexcloud.co/cortex',
};

const siteName = (process.env.SITE || 'new-cortex').trim().toLowerCase();
const defaultBaseURL = SITE_URLS[siteName] || SITE_URLS['new-cortex'];

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  expect: { timeout: 10000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html'], ['allure-playwright']],
  use: {
    baseURL: process.env.BASE_URL ?? defaultBaseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    navigationTimeout: 30000,
    actionTimeout: 10000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
