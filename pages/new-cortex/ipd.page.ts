import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base.page';
import { IpdLocators } from '../../locators/ipd.locators';

export class IpdPage extends BasePage {
  readonly ipdSummaryTab: Locator;
  readonly createOrderButton: Locator;
  readonly directionInput: Locator;
  readonly dosageInput: Locator;
  readonly saveOrderButton: Locator;
  readonly cancelOrderButton: Locator;
  readonly signButton: Locator;
  readonly acknowledgeButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    super(page);
    this.ipdSummaryTab = page.locator(IpdLocators.ipdSummaryTab);
    this.createOrderButton = page.locator(IpdLocators.createOrderButton);
    this.directionInput = page.locator(IpdLocators.directionInput);
    this.dosageInput = page.locator(IpdLocators.dosageInput);
    this.saveOrderButton = page.locator(IpdLocators.saveOrderButton);
    this.cancelOrderButton = page.locator(IpdLocators.cancelOrderButton);
    this.signButton = page.locator(IpdLocators.signButton);
    this.acknowledgeButton = page.locator(IpdLocators.acknowledgeButton);
    this.cancelButton = page.locator(IpdLocators.cancelButton);
  }

  async navigateToIpdSelectWard() {
    await this.goto('/cortex/ipd/select-ward');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async selectWardAndPatient(wardName: string, hn: string) {
    const wardDropdown = this.page.locator(IpdLocators.wardSelectDropdown).first();
    if (await wardDropdown.isVisible()) {
      await wardDropdown.click();
      await this.page.locator(IpdLocators.wardOption(wardName)).first().click();
      await this.page.waitForLoadState('networkidle');
    }

    const row = this.page.locator(IpdLocators.patientRow(hn)).first();
    await row.waitFor({ state: 'visible', timeout: 15000 });
    await row.click();
    await this.page.waitForURL(/.*(cortex\/ipd\/patient-workspace|ipd\/patient-workspace).*/);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async openIpdSummary() {
    await this.ipdSummaryTab.waitFor({ state: 'visible', timeout: 10000 });
    await this.ipdSummaryTab.click();
  }

  async clickCreateOrder() {
    await this.createOrderButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.createOrderButton.click();
  }

  async fillOrderForm(type: 'One-day' | 'Continue', drugName: string, dosage?: string, direction?: string) {
    const typeTab = this.page.locator(IpdLocators.orderTypeTab(type)).first();
    await typeTab.click();

    if (drugName) {
      const search = this.page.locator(IpdLocators.medicationSearchInput).first();
      await search.fill(drugName);
      await this.page.waitForTimeout(500);
      const opt = this.page.locator(IpdLocators.medicationOption(drugName)).first();
      await opt.waitFor({ state: 'visible', timeout: 5000 });
      await opt.click();
    }

    if (dosage) {
      const dose = this.dosageInput.first();
      await dose.fill(dosage);
    }

    if (direction) {
      const dir = this.directionInput.first();
      await dir.fill(direction);
    }
  }

  async clickSaveOrder() {
    await this.saveOrderButton.click();
  }

  async clickCancelOrder() {
    await this.cancelOrderButton.click();
    const confirmBtn = this.page.locator(IpdLocators.confirmModalOkButton).first();
    if (await confirmBtn.isVisible({ timeout: 2000 })) {
      await confirmBtn.click();
    }
  }

  async getValidationErrorsCount(): Promise<number> {
    try {
      await this.page.locator(IpdLocators.validationMessage).first().waitFor({ state: 'visible', timeout: 3000 });
    } catch (e) {
      // Ignore
    }
    return await this.page.locator(IpdLocators.validationMessage).count();
  }

  async getValidationMessageText(): Promise<string> {
    const errorEl = this.page.locator(IpdLocators.validationMessage).first();
    if (await errorEl.isVisible()) {
      return (await errorEl.textContent()) || '';
    }
    return '';
  }

  async selectOrderForAction(orderId: string) {
    const checkbox = this.page.locator(IpdLocators.orderCheckbox(orderId)).first();
    await checkbox.scrollIntoViewIfNeeded();
    const isChecked = await checkbox.isChecked();
    if (!isChecked) {
      await checkbox.click();
    }
  }

  async clickSignAndConfirm() {
    await this.signButton.waitFor({ state: 'visible' });
    await this.signButton.click();
    const confirmBtn = this.page.locator(IpdLocators.confirmModalOkButton).first();
    await confirmBtn.waitFor({ state: 'visible' });
    await confirmBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickAcknowledge() {
    await this.acknowledgeButton.waitFor({ state: 'visible' });
    await this.acknowledgeButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickCancelOrderAction() {
    await this.cancelButton.waitFor({ state: 'visible' });
    await this.cancelButton.click();
    const confirmBtn = this.page.locator(IpdLocators.confirmModalOkButton).first();
    await confirmBtn.waitFor({ state: 'visible' });
    await confirmBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickEditOrder(orderId: string) {
    const editBtn = this.page.locator(IpdLocators.editButton(orderId)).first();
    await editBtn.waitFor({ state: 'visible' });
    await editBtn.click();
  }

  async updateOrderDetails(dosage?: string, direction?: string) {
    if (dosage) {
      const dose = this.dosageInput.first();
      await dose.clear();
      await dose.fill(dosage);
    }
    if (direction) {
      const dir = this.directionInput.first();
      await dir.clear();
      await dir.fill(direction);
    }
  }

  async getOrderStatus(orderId: string): Promise<string> {
    const badge = this.page.locator(IpdLocators.orderStatusBadge(orderId)).first();
    await badge.waitFor({ state: 'visible', timeout: 5000 });
    return (await badge.textContent()) || '';
  }

  async isCreateOrderButtonVisible(): Promise<boolean> {
    return await this.createOrderButton.isVisible();
  }

  async isSignButtonVisibleAndEnabled(): Promise<boolean> {
    return await this.signButton.isVisible() && await this.signButton.isEnabled();
  }

  async isAcknowledgeButtonVisibleAndEnabled(): Promise<boolean> {
    return await this.acknowledgeButton.isVisible() && await this.acknowledgeButton.isEnabled();
  }

  async isCancelButtonVisibleAndEnabled(): Promise<boolean> {
    return await this.cancelButton.isVisible() && await this.cancelButton.isEnabled();
  }

  async isEditButtonVisibleAndEnabled(orderId: string): Promise<boolean> {
    const editBtn = this.page.locator(IpdLocators.editButton(orderId)).first();
    return await editBtn.isVisible() && await editBtn.isEnabled();
  }
}
