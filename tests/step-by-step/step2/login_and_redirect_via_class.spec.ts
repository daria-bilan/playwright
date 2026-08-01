import { test, Locator, expect } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { Credentials, Product } from './types';

const credentials: Credentials = { username: 'standard_user', password: 'secret_sauce' };
const item: Product = { itemName: 'Sauce Labs Backpack', itemPrice: '$29.99' };

test.describe('Same test with class', () => {
   test.beforeEach(async ({ page }) => {
      await page.goto('https://www.saucedemo.com/');
      const loginPage: LoginPage = new LoginPage(page);
      await loginPage.login(credentials);
      await loginPage.expectLoginSuccess();
   });

   test('Add item to the cart and updates cart badge', async ({ page }) => {
      const itemCard: Locator = page.locator('.inventory_item').filter({ hasText: item.itemName });
      await expect(itemCard).toBeVisible();
      await expect(itemCard.locator('.pricebar')).toContainText(item.itemPrice);

      const itemCardButton: Locator = itemCard.getByRole('button');
      await expect(itemCardButton).toHaveText('Add to cart');

      await itemCardButton.click();
      await expect(itemCardButton).toHaveText('Remove');

      const itemsOnPage: number = await page.locator('.inventory_item').count();
      expect(itemsOnPage).toBe(6);
   });
});
