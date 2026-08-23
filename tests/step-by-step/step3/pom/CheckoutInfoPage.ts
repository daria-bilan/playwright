import { expect } from '@playwright/test';
import { CheckoutInfo } from '../../step2/types';
import { BasePage } from './BasePage';
import { CheckoutOverviewPage } from './CheckoutOverviewPage';
import { config } from '../config/environments';

export class CheckoutInfoPage extends BasePage {
   async fillInfo(info: CheckoutInfo) {
      await this.page.locator('#first-name').fill(info.firstName);
      await this.page.locator('#last-name').fill(info.lastName);
      await this.page.locator('#postal-code').fill(info.postalCode);
   }

   async continueToOverview() {
      await this.page.getByTestId('continue').click();
      await this.waitForState();
      await expect(this.page).toHaveURL(config.baseURL + 'checkout-step-two.html');
      return new CheckoutOverviewPage(this.page);
   }
}
