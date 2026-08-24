import { itemsToCart } from '../step3/data/products';
import { fillAndSubmitCheckoutInfo } from '../step3/helpers/checkoutHelpers';
import { checkoutInfo } from '../step3/data/checkoutInfo';
import { test, expect } from './fixtures';

test.describe('Same test with class', () => {
   test('Login and add items using fixtures', async ({ inventoryWithItemsInCart }) => {
      expect(await inventoryWithItemsInCart.cartBadge.getCount()).toBe('2');

      const cartPage = await inventoryWithItemsInCart.goToCart();
      expect(await cartPage.getCartItemsName()).toEqual(itemsToCart.map((i) => i.itemName));

      const checkoutOverviewPage = await fillAndSubmitCheckoutInfo(cartPage, checkoutInfo);

      expect(await checkoutOverviewPage.getTotalPrice()).toBe(43.18);
      await checkoutOverviewPage.finish();
   });
   test('Cart badge appears after adding items', async ({ loggedInPage }) => {
      expect(await loggedInPage.cartBadge.isVisisbleBadge()).toBe(false);

      for (const item of itemsToCart) {
         await loggedInPage.addItemToCard(item.itemName);
      }

      expect(await loggedInPage.cartBadge.getCount()).toBe('2');
   });
});
