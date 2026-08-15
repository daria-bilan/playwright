import { test, Locator, expect } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { Credentials, Product } from '../../step2/types';
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

test.describe('Same test with class', () => {
   test.beforeEach(async ({ page }) => {
      const loginPage: LoginPage = new LoginPage(page);
      await loginPage.goto('https://www.saucedemo.com/');
      await loginPage.login(credentials);
      await loginPage.expectLoginSuccess();
   });

   test('Add item to the cart and updates cart badge', async ({ page }) => {
      const invPage: InventoryPage = new InventoryPage(page);

      const productDetailes = await invPage.getProductDetails(item.itemName);
      expect(productDetailes.itemPrice).toContain(item.itemPrice);
      expect(productDetailes.details?.itemDesc).toContain(item.details?.itemDesc);
      expect(productDetailes.itemName).toContain(item.itemName);

      await invPage.addItemToCard(item.itemName);

      const itemsOnPage: number = await page.locator('.inventory_item').count();
      expect(itemsOnPage).toBe(6);
   });
});
