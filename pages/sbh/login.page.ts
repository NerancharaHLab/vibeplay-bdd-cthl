import { Page, Locator } from '@playwright/test';
import { LoginLocators } from '../../locators/sbh-login.locators';
import { getRoute } from '../../utils/test-helpers';

export class LoginPage {
  readonly page: Page;
  readonly welcomeLoginButton: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly profileDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.welcomeLoginButton = page.locator(LoginLocators.welcomeLoginButton);
    this.usernameInput = page.locator(LoginLocators.usernameInput);
    this.passwordInput = page.locator(LoginLocators.passwordInput);
    this.loginButton = page.locator(LoginLocators.loginButton);
    this.profileDropdown = page.locator(LoginLocators.profileDropdown);
  }

  async goto() {
    await this.page.goto(getRoute('/cortex/welcome'), { timeout: 60000 });
  }

  async login(username: string, password: string) {
    try {
      await this.page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    } catch (e) {
      console.log('Page load timed out, continuing anyway...');
    }

    console.log('Waiting for welcome button or username input...');
    const welcomeBtn = this.page.locator('button:has-text("ลงชื่อเข้าใช้")');
    try {
      const result = await Promise.race([
        welcomeBtn.waitFor({ state: 'visible', timeout: 30000 }).then(() => 'welcome'),
        this.usernameInput.waitFor({ state: 'visible', timeout: 30000 }).then(() => 'login')
      ]);

      if (result === 'welcome') {
        console.log('Welcome page detected, clicking login button...');
        await welcomeBtn.click();
        await this.usernameInput.waitFor({ state: 'visible', timeout: 20000 });
      } else {
        console.log('Direct login page detected.');
      }
    } catch (e) {
      console.log('Neither welcome button nor username input appeared, trying to proceed...', e);
    }

    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    
    await this.loginButton.click();
    
    try {
      await this.page.waitForURL(/.*(cortex\/apps|apps)|.*code=/, { timeout: 45000 });
    } catch (e) {
      console.log('URL wait failed, checking for layout element...');
    }
    
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
