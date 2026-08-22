import { test, Locator, expect } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { Credentials, Product, CheckoutInfo } from '../../step2/types';
import { InventoryPage } from './InventoryPage';

const credentials: Credentials = { username: 'standard_user', password: 'secret_sauce' };
const item: Product = {
   itemName: 'Sauce Labs Backpack',
   itemPrice: '$29.99',
   details: {
      itemDesc:
         'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
   },
};

const item2: Product = {
   itemName: 'Sauce Labs Bike Light',
   itemPrice: '$9.99',
   details: {
      itemDesc:
         "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
   },
};

const checkoutInfo: CheckoutInfo = { firstName: 'FirstName', lastName: 'LastName', postalCode: '12345' };

test.describe('Same test with class', () => {
   test.beforeEach(async ({ page }) => {
      const loginPage: LoginPage = new LoginPage(page);
      await loginPage.goto('https://www.saucedemo.com/');
      await loginPage.login(credentials);
   });

   test('Add item to the cart and updates cart badge', async ({ page }) => {
      const invPage: InventoryPage = new InventoryPage(page);

      const productDetailes = await invPage.getProductDetails(item.itemName);
      expect(productDetailes.itemPrice).toContain(item.itemPrice);
      expect(productDetailes.details?.itemDesc).toContain(item.details?.itemDesc);
      expect(productDetailes.itemName).toContain(item.itemName);

      await invPage.addItemToCard(item.itemName);

      await invPage.addItemToCard(item2.itemName);

      const itemsOnPage: number = await page.locator('.inventory_item').count();
      expect(itemsOnPage).toBe(6);

      const cartPage = await invPage.goToCart();
      expect(await cartPage.getCartItemsName()).toEqual([item.itemName, item2.itemName]);

      const checkoutInfoPage = await cartPage.proceedToCheckout();
      await checkoutInfoPage.fillInfo(checkoutInfo);

      const checkoutOverviewPage = await checkoutInfoPage.continueToOverview();
      expect(await checkoutOverviewPage.getTotalPrice()).toBe('Total: $43.18');
      await checkoutOverviewPage.finish();
   });
});
