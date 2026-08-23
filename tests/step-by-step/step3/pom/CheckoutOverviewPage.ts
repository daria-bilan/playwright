import { config } from '../config/environments';
import { parseTotalPrice } from '../utils/priceUtils';
import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class CheckoutOverviewPage extends BasePage {
   async getTotalPrice() {
      let total: string | null = await this.page.getByTestId('total-label').textContent();
      if (total !== null) {
         return parseTotalPrice(total);
      } else {
         return 0;
      }
   }

   async finish() {
      await this.page.getByRole('button', { name: 'finish' }).click();
      await this.waitForState();
      await expect(this.page).toHaveURL(config.baseURL + 'checkout-complete.html');
   }
}
