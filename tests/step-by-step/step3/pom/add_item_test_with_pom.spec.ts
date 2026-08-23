import { test, expect } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { InventoryPage } from './InventoryPage';
import { credentials } from '../data/credentials';
import { itemsToCart } from '../data/products';
import { checkoutInfo } from '../data/checkoutInfo';
import { config } from '../config/environments';
import { fillAndSubmitCheckoutInfo } from '../helpers/checkoutHelpers';
import { checkProductDetailes } from '../helpers/checkProductDetailesHelper';

test.describe('Same test with class', () => {
   test.beforeEach(async ({ page }) => {
      const loginPage: LoginPage = new LoginPage(page);
      await loginPage.goto(config.baseURL);
      await loginPage.login(credentials);
   });

   test('Add item to the cart and updates cart badge', async ({ page }) => {
      const invPage: InventoryPage = new InventoryPage(page);
      expect(await invPage.cartBadge.isVisisbleBadge()).toBe(false);

      for (let item of itemsToCart) {
         await checkProductDetailes(invPage, item);
         await invPage.addItemToCard(item.itemName);
      }
      expect(await invPage.cartBadge.getCount()).toBe('2');

      const cartPage = await invPage.goToCart();
      expect(await cartPage.getCartItemsName()).toEqual(itemsToCart.map((i) => i.itemName));

      const checkoutOverviewPage = await fillAndSubmitCheckoutInfo(cartPage, checkoutInfo);

      expect(await checkoutOverviewPage.getTotalPrice()).toBe(43.18);
      await checkoutOverviewPage.finish();
   });
});
