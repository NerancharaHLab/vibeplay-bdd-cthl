import { defineConfig, devices } from '@playwright/test';

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
    baseURL: 'https://dev-x.cortexcloud.co/cortex/welcome',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    navigationTimeout: 30000,
    actionTimeout: 10000,
    // ใส่ storageState หลัง login ครั้งแรก:
    // storageState: './auth/session.json',
  },
  projects: [
    // login setup — uncomment เมื่อจะใช้ storageState
    // { name: 'setup', testMatch: /.*auth\.setup\.ts/ },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      // dependencies: ['setup'],
    },
  ],
});
