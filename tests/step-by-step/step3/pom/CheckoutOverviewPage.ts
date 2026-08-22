import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class CheckoutOverviewPage extends BasePage {
   async getTotalPrice() {
      return this.page.getByTestId('total-label').textContent();
   }

   async finish() {
      await this.page.getByRole('button', { name: 'finish' }).click();
      await this.waitForState();
      await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
   }
}
