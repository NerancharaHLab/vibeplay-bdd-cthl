import { Page, test, expect } from '@playwright/test';
import { AuthSteps } from '../shared/auth.steps';
import { NavigationSteps } from '../shared/navigation.steps';
import { IpdPage } from '../../pages/new-cortex/ipd.page';
import { IpdOrderTestCase } from '../../data/new-cortex/ipd.data';

/**
 * IPD Orders Steps — Smart step class with dynamic execute().
 */
export class IpdSteps {
  private auth: AuthSteps;
  private nav: NavigationSteps;
  private ipdPage: IpdPage;

  constructor(private page: Page) {
    this.auth = new AuthSteps(page);
    this.nav = new NavigationSteps(page);
    this.ipdPage = new IpdPage(page);
  }

  // ─── Dynamic Entry Point ───────────────────────────
  async execute(tc: IpdOrderTestCase) {
    // ── Given ──
    await this.auth.givenUserIsLoggedInAs(tc.role);
    await this.nav.openPatientWorkspace(tc.hn, tc.ward);
    await this.nav.navigateToIpdSummary();

    // ── When ── dispatch by action
    await this.dispatchAction(tc);

    // ── Then ── dispatch by expected outcome
    await this.dispatchExpect(tc);
  }

  // ─── Action Dispatcher ─────────────────────────────
  private async dispatchAction(tc: IpdOrderTestCase) {
    switch (tc.action) {
      case 'create':
        if (tc.medication) {
          await this.whenUserCreatesPhysicianOrder(tc.orderType!, tc.medication, tc.dosage, tc.direction);
        } else {
          await this.whenUserAttemptsToSaveOrderWithoutRequiredFields(tc.orderType!);
        }
        break;

      case 'sign':
        await this.whenUserSignsOrder(tc.orderIds![0]);
        break;

      case 'sign-multiple':
        await this.whenUserSignsMultipleOrders(tc.orderIds!);
        break;

      case 'acknowledge':
        await this.whenUserAcknowledgesOrder(tc.orderIds![0]);
        break;

      case 'acknowledge-multiple':
        await this.whenUserAcknowledgesMultipleOrders(tc.orderIds!);
        break;

      case 'cancel':
        if (tc.expect === 'warning') {
          await this.whenUserAttemptsToCancelNonCancelableOrder(tc.orderIds![0]);
        } else {
          await this.whenUserCancelsOrder(tc.orderIds![0]);
        }
        break;

      case 'cancel-multiple':
        await this.whenUserCancelsMultipleOrders(tc.orderIds!);
        break;

      case 'edit':
        if (tc.direction === 'invalid-dir-format' || tc.expect === 'warning') {
          await this.whenUserAttemptsToEditOrderWithInvalidData(tc.orderIds![0], tc.dosage, tc.direction);
        } else {
          await this.whenUserEditsOrder(tc.orderIds![0], tc.dosage, tc.direction);
        }
        break;

      case 'none':
        break;
    }
  }

  // ─── Expect Dispatcher ─────────────────────────────
  private async dispatchExpect(tc: IpdOrderTestCase) {
    switch (tc.expect) {
      case 'success':
        await this.thenSuccessMessageShouldBeVisible();
        break;

      case 'validation-error':
        await this.thenValidationErrorShouldBeVisible();
        break;

      case 'warning':
        await this.thenWarningMessageShouldBeVisible();
        break;

      case 'not-visible':
        await this.thenButtonShouldNotBeVisible(tc.targetButton!);
        break;

      case 'disabled':
        await this.thenButtonShouldBeDisabledForOrder(tc.targetButton!, tc.orderIds?.[0]);
        break;

      case 'status-change':
        for (const orderId of tc.orderIds!) {
          await this.thenOrderStatusShouldBe(orderId, tc.expectedStatus!);
        }
        break;
    }
  }

  // ─── When: Create ──────────────────────────────────
  async whenUserCreatesPhysicianOrder(type: 'One-day' | 'Continue', drugName: string, dosage?: string, direction?: string) {
    await test.step(`When creates "${type}" order: ${drugName}`, async () => {
      await this.ipdPage.clickCreateOrder();
      await this.ipdPage.fillOrderForm(type, drugName, dosage, direction);
      await this.ipdPage.clickSaveOrder();
    });
  }

  async whenUserAttemptsToSaveOrderWithoutRequiredFields(type: 'One-day' | 'Continue') {
    await test.step(`When attempts to save "${type}" order without required fields`, async () => {
      await this.ipdPage.clickCreateOrder();
      await this.ipdPage.clickSaveOrder();
    });
  }

  // ─── When: Sign ────────────────────────────────────
  async whenUserSignsOrder(orderId: string) {
    await test.step(`When signs order "${orderId}"`, async () => {
      await this.ipdPage.selectOrderForAction(orderId);
      await this.ipdPage.clickSignAndConfirm();
    });
  }

  async whenUserSignsMultipleOrders(orderIds: string[]) {
    await test.step(`When signs orders [${orderIds.join(', ')}]`, async () => {
      for (const id of orderIds) {
        await this.ipdPage.selectOrderForAction(id);
      }
      await this.ipdPage.clickSignAndConfirm();
    });
  }

  // ─── When: Acknowledge ─────────────────────────────
  async whenUserAcknowledgesOrder(orderId: string) {
    await test.step(`When acknowledges order "${orderId}"`, async () => {
      await this.ipdPage.selectOrderForAction(orderId);
      await this.ipdPage.clickAcknowledge();
    });
  }

  async whenUserAcknowledgesMultipleOrders(orderIds: string[]) {
    await test.step(`When acknowledges orders [${orderIds.join(', ')}]`, async () => {
      for (const id of orderIds) {
        await this.ipdPage.selectOrderForAction(id);
      }
      await this.ipdPage.clickAcknowledge();
    });
  }

  // ─── When: Cancel ──────────────────────────────────
  async whenUserCancelsOrder(orderId: string) {
    await test.step(`When cancels order "${orderId}"`, async () => {
      await this.ipdPage.selectOrderForAction(orderId);
      await this.ipdPage.clickCancelOrderAction();
    });
  }

  async whenUserCancelsMultipleOrders(orderIds: string[]) {
    await test.step(`When cancels orders [${orderIds.join(', ')}]`, async () => {
      for (const id of orderIds) {
        await this.ipdPage.selectOrderForAction(id);
      }
      await this.ipdPage.clickCancelOrderAction();
    });
  }

  async whenUserAttemptsToCancelNonCancelableOrder(orderId: string) {
    await test.step(`When attempts to cancel non-cancelable order "${orderId}"`, async () => {
      await this.ipdPage.selectOrderForAction(orderId);
      await this.ipdPage.clickCancelOrderAction();
    });
  }

  // ─── When: Edit ────────────────────────────────────
  async whenUserEditsOrder(orderId: string, dosage?: string, direction?: string) {
    await test.step(`When edits order "${orderId}" → dosage: ${dosage}, direction: ${direction}`, async () => {
      await this.ipdPage.clickEditOrder(orderId);
      await this.ipdPage.updateOrderDetails(dosage, direction);
      await this.ipdPage.clickSaveOrder();
    });
  }

  async whenUserAttemptsToEditOrderWithInvalidData(orderId: string, dosage?: string, direction?: string) {
    await test.step(`When attempts to edit order "${orderId}" with invalid data`, async () => {
      await this.ipdPage.clickEditOrder(orderId);
      await this.ipdPage.updateOrderDetails(dosage, direction);
      await this.ipdPage.clickSaveOrder();
    });
  }

  // ─── Then: Assertions ──────────────────────────────
  async thenSuccessMessageShouldBeVisible() {
    await test.step('Then success message should be visible', async () => {
      const toast = this.page.locator('.ant-message-success, .toast-success').first();
      await expect(toast).toBeVisible({ timeout: 5000 });
    });
  }

  async thenValidationErrorShouldBeVisible() {
    await test.step('Then validation error should be visible', async () => {
      const count = await this.ipdPage.getValidationErrorsCount();
      expect(count).toBeGreaterThan(0);
    });
  }

  async thenWarningMessageShouldBeVisible() {
    await test.step('Then warning/error message should be visible', async () => {
      const toast = this.page.locator('.ant-message-error, .toast-error, .ant-notification-notice-error').first();
      await expect(toast).toBeVisible({ timeout: 5000 });
    });
  }

  async thenOrderStatusShouldBe(orderId: string, expectedStatus: string) {
    await test.step(`Then order "${orderId}" status should be "${expectedStatus}"`, async () => {
      const statusText = await this.ipdPage.getOrderStatus(orderId);
      expect(statusText).toContain(expectedStatus);
    });
  }

  async thenButtonShouldNotBeVisible(button: string) {
    await test.step(`Then "${button}" button should not be visible`, async () => {
      const isVisible = await this.resolveButtonVisibility(button);
      expect(isVisible).toBe(false);
    });
  }

  async thenButtonShouldBeDisabledForOrder(button: string, orderId?: string) {
    await test.step(`Then "${button}" should be disabled for order "${orderId}"`, async () => {
      if (orderId) {
        const checkbox = this.page.locator(`tr:has-text("${orderId}") input[type="checkbox"]`).first();
        if (await checkbox.isVisible()) {
          await expect(checkbox).toBeDisabled();
          return;
        }
      }
      const isVisible = await this.resolveButtonVisibility(button);
      expect(isVisible).toBe(false);
    });
  }

  // ─── Helpers ───────────────────────────────────────
  private async resolveButtonVisibility(button: string): Promise<boolean> {
    switch (button) {
      case 'create':
        return await this.ipdPage.isCreateOrderButtonVisible();
      case 'sign':
        return await this.ipdPage.isSignButtonVisibleAndEnabled();
      case 'acknowledge':
        return await this.ipdPage.isAcknowledgeButtonVisibleAndEnabled();
      case 'cancel':
        return await this.ipdPage.isCancelButtonVisibleAndEnabled();
      case 'edit':
        return await this.ipdPage.isEditButtonVisibleAndEnabled('');
      default:
        return false;
    }
  }
}
