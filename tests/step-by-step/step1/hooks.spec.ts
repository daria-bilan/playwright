import { test, expect, Locator } from '@playwright/test';

// Example
// test.describe('Cart flow', () => {
//   test.beforeAll(async () => { /* один раз перед усіма тестами в блоці */ });
//   test.beforeEach(async ({ page }) => { /* перед КОЖНИМ тестом */ });
//   test.afterEach(async ({ page }) => { /* після КОЖНОГО тесту */ });
//   test.afterAll(async () => { /* один раз після всіх тестів */ });

//   test('test 1', async ({ page }) => { ... });
//   test('test 2', async ({ page }) => { ... });
// });

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

   test('Header is visible', async ({ page }) => {
      await expect(page.getByText('Products')).toBeVisible();
   });

   test('Add item to the cart and updates cart badge', async ({ page }) => {
      const itemCard: Locator = page.locator('.inventory_item').filter({ hasText: itemName });
      await expect(itemCard).toBeVisible();
      const itemCardButton: Locator = itemCard.getByRole('button', { name: 'Add to cart' });

      await itemCardButton.click();

      await expect(page.locator('.shopping_cart_link')).toHaveText('1');
   });
});
