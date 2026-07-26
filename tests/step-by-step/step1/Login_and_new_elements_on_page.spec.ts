import { test, expect, Locator } from '@playwright/test';

test('Login and add item to the order', async ({ page }) => {
   const username: string = 'standard_user';
   const password: string = 'secret_sauce';

   await page.goto('https://www.saucedemo.com/');
   const usernameField: Locator = page.getByPlaceholder('Username');
   const passwordField: Locator = page.getByPlaceholder('Password');

   await usernameField.fill(username);
   await passwordField.fill(password);

   const loginButton: Locator = page.getByRole('button', { name: 'Login' });
   await loginButton.click();

   // await page.waitForTimeout(3000);
   await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

   const itemName: string = 'Sauce Labs Backpack';

   const itemCard: Locator = page.locator('.inventory_item').filter({ hasText: itemName });
   await expect(itemCard).toBeVisible();
   const itemCardButton: Locator = itemCard.getByRole('button', { name: 'Add to cart' });

   await itemCardButton.click();

   await expect(page.locator('.shopping_cart_link')).toHaveText('1');
});
