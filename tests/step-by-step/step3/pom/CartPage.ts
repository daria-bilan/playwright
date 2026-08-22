import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { CheckoutInfoPage } from './CheckoutInfoPage';

export class CartPage extends BasePage {
   async getCartItemsName() {
      const cartItemsNames = await this.page.locator('.inventory_item_name').allTextContents();
      return cartItemsNames;
   }

   async proceedToCheckout() {
      await this.page.getByRole('button', { name: 'checkout' }).click();
      await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
      return new CheckoutInfoPage(this.page);
   }
}
