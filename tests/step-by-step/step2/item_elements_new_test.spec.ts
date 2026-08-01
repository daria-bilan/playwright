import { test, expect, Locator } from '@playwright/test';
import { Credentials, Product, SortOption } from '../step2/types';

test.describe('Hooks', () => {
   const credentials: Credentials = { username: 'standard_user', password: 'secret_sauce' };
   const item: Product = { itemName: 'Sauce Labs Backpack', itemPrice: '$29.99' };

   test.beforeEach(async ({ page }) => {
      await page.goto('https://www.saucedemo.com/');

      const usernameField: Locator = page.getByPlaceholder('Username');
      const passwordField: Locator = page.getByPlaceholder('Password');

      await usernameField.fill(credentials.username);
      await passwordField.fill(credentials.password);

      const loginButton: Locator = page.getByRole('button', { name: 'Login' });
      await loginButton.click();
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
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
      //await expect(page.locator('.inventory_item')).toHaveCount(6);
   });
});
