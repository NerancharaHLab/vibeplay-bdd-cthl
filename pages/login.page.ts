import { Page, Locator } from '@playwright/test';
import { LoginLocators } from '../locators/login.locators';

export class LoginPage {
  readonly page: Page;
  readonly welcomeLoginButton: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.welcomeLoginButton = page.locator(LoginLocators.welcomeLoginButton);
    this.usernameInput = page.locator(LoginLocators.usernameInput);
    this.passwordInput = page.locator(LoginLocators.passwordInput);
    this.loginButton = page.locator(LoginLocators.loginButton);
  }

  async goto() {
    await this.page.goto('/cortex/welcome');
  }

  async login(username: string, password: string) {
    // 1. Wait for page to be ready - use domcontentloaded instead of networkidle
    try {
      await this.page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    } catch (e) {
      console.log('Page load timed out, continuing anyway...');
    }

    // 2. Handle Welcome Page if present
    const welcomeBtn = this.page.locator('button:has-text("ลงชื่อเข้าใช้")');
    try {
      await welcomeBtn.waitFor({ state: 'visible', timeout: 5000 });
      await welcomeBtn.click();
      await this.page.waitForLoadState('domcontentloaded', { timeout: 10000 }).catch(() => {});
    } catch (e) {
      console.log('Welcome button not found or not clickable, skipping...');
    }

    // 3. Login on Keycloak page
    await this.usernameInput.waitFor({ state: 'visible', timeout: 20000 });
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    
    // 4. Click login button and wait for navigation
    await this.loginButton.click();
    
    // 5. Wait for either the app to load or URL with code parameter (Keycloak callback)
    try {
      await this.page.waitForURL(/.*cortex\/apps|.*code=/, { timeout: 45000 });
    } catch (e) {
      console.log('URL wait failed, checking for layout element...');
    }
    
    // 6. Final fallback: wait for app layout to appear
    try {
      await this.page.locator('.ant-layout, [class*="layout"], body.ng-scope').first().waitFor({ state: 'visible', timeout: 20000 }).catch(() => {});
    } catch (e) {
      console.log('Layout element wait failed');
    }
  }

  async isVisible() {
    return await this.usernameInput.isVisible();
  }
}
