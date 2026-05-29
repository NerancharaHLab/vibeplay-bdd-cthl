import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string) {
    await this.page.goto(url);
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
}
