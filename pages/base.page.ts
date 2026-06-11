import { Page, Locator } from '@playwright/test';
import { getRoute } from '../utils/test-helpers';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string) {
    await this.page.goto(getRoute(url));
  }

  async clickElement(locator: Locator) {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  async fillInput(locator: Locator, text: string) {
    await locator.waitFor({ state: 'visible' });
    await locator.fill(text);
  }

  async selectOption(locator: Locator, text: string) {
    await locator.waitFor({ state: 'visible' });
    // Assuming Ant Design or similar custom select, we click first, then pick the option
    await locator.click();
    await this.page.locator(`text=${text}`).click();
  }

  // Convenience helpers accepting CSS selector strings
  async click(selector: string) {
    const el = this.page.locator(selector).first();
    await el.waitFor({ state: 'visible', timeout: 15000 });
    await el.click();
  }

  async fill(selector: string, text: string) {
    const el = this.page.locator(selector).first();
    await el.waitFor({ state: 'visible', timeout: 15000 });
    await el.fill(text);
  }

  async selectSource(source: string) {
    const el = this.page.locator('#sourceType').first();
    await el.click();
    await this.page.locator(`.ant-select-item-option-content:has-text("${source}")`).first().click();
  }
}
