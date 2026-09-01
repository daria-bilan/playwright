import { test, expect } from '@playwright/test';
import { LoginPage } from './pom/LoginPage';
import { config } from './config/environments';
import { credentials } from './data/credentials';
import { InventoryPage } from './pom/InventoryPage';
import { itemsToCart } from './data/products';
import { checkProductDetailes } from './helpers/checkProductDetailesHelper';
import { fillAndSubmitCheckoutInfo } from './helpers/checkoutHelpers';
import { checkoutInfo } from './data/checkoutInfo';

test.describe('Same test with class', () => {
   test.beforeEach(async ({ page }) => {
      const loginPage: LoginPage = new LoginPage(page);
      await loginPage.goto(config.baseURL);
      await loginPage.login(credentials);
   });

   test('Add item to the cart and updates cart badge', async ({ page }) => {
      const invPage: InventoryPage = new InventoryPage(page);
      expect(await invPage.cartBadge.isVisibleBadge()).toBe(false);

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
