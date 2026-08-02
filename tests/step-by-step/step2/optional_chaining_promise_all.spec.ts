import { test, Locator, expect } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { Credentials, Product } from './types';
import { ItemsPage } from './Item';

const credentials: Credentials = { username: 'standard_user', password: 'secret_sauce' };
// const item: Product = { itemName: 'Sauce Labs Backpack', itemPrice: '$29.99', detailes: { itemDesc: '' } };
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
      await page.goto('https://www.saucedemo.com/');
      const loginPage: LoginPage = new LoginPage(page);
      await loginPage.login(credentials);
      await loginPage.expectLoginSuccess();
   });

   test('Add item to the cart and updates cart badge', async ({ page }) => {
      const itemPage = new ItemsPage();
      const itemCard: Locator = page.locator('.inventory_item').filter({ hasText: item.itemName });
      const productDetailes = await itemPage.getProductDetails(itemCard);

      await expect(itemCard).toBeVisible();
      expect(productDetailes.itemPrice).toContain(item.itemPrice);
      expect(productDetailes.details?.itemDesc).toContain(item.details?.itemDesc);
      expect(productDetailes.itemName).toContain(item.itemName);

      const itemCardButton: Locator = itemCard.getByRole('button');
      await expect(itemCardButton).toHaveText('Add to cart');

      await itemCardButton.click();
      await expect(itemCardButton).toHaveText('Remove');

      const itemsOnPage: number = await page.locator('.inventory_item').count();
      expect(itemsOnPage).toBe(6);
   });
});
