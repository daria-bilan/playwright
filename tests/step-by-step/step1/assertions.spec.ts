import { test, expect, Locator } from '@playwright/test';

test.describe('Hooks', () => {
   const username: string = 'standard_user';
   const password: string = 'secret_sauce';
   const itemName: string = 'Sauce Labs Backpack';

   test.beforeEach(async ({ page }) => {
      await page.goto('https://www.saucedemo.com/');
      const usernameField: Locator = page.getByPlaceholder('Username');
      const passwordField: Locator = page.getByPlaceholder('Password');

      await usernameField.fill(username);
      await passwordField.fill(password);

      const loginButton: Locator = page.getByRole('button', { name: 'Login' });
      await loginButton.click();
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
   });

   test('Add item to the cart and updates cart badge', async ({ page }) => {
      const itemCard: Locator = page.locator('.inventory_item').filter({ hasText: itemName });
      await expect(itemCard).toBeVisible();

      const itemCardButton: Locator = itemCard.getByRole('button');
      await expect(itemCardButton).toHaveText('Add to cart');

      await itemCardButton.click();
      await expect(itemCardButton).toHaveText('Remove');

      const itemsOnPage: number = await page.locator('.inventory_item').count();
      expect(itemsOnPage).toBe(6);
      //await expect(page.locator('.inventory_item')).toHaveCount(6);
   });
});
