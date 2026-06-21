import { test, expect, Locator } from '@playwright/test';

test.describe('HTML elements', () => {
   test.beforeEach(async ({ page }) => {
      await page.goto('https://testautomationpractice.blogspot.com/');
   });
   test('Text input actions', async ({ page }) => {
      const nameInputFieldLocator: Locator = page.locator('#name');

      await expect(nameInputFieldLocator).toBeVisible();
      await expect(nameInputFieldLocator).toBeEnabled();

      const maxLength: string | null = await nameInputFieldLocator.getAttribute('maxlength');
      await expect(maxLength).toBe('15');

      await nameInputFieldLocator.fill('Jane');
      const inputValue: string = await nameInputFieldLocator.inputValue();
      console.log('text content of name:', await nameInputFieldLocator.inputValue());
      expect(inputValue).toBe('Jane');
   });

   test('Radio buttons', async ({ page }) => {
      const radioButtonLocator: Locator = page.locator('#female');

      await expect(radioButtonLocator).toBeVisible();
      await expect(radioButtonLocator).toBeEnabled();

      expect(await radioButtonLocator.isChecked()).toBe(false);

      await radioButtonLocator.check();
      expect(await radioButtonLocator.isChecked()).toBe(true);
      await page.waitForTimeout(3000);
   });

   test('check a single checkbox', async ({ page }) => {
      const checkboxTuesdayLocator: Locator = page.getByLabel('Tuesday');

      await expect(checkboxTuesdayLocator).toBeVisible();

      expect(await checkboxTuesdayLocator.isChecked()).toBe(false);

      await checkboxTuesdayLocator.check();
      expect(await checkboxTuesdayLocator.isChecked()).toBe(true);

      await page.waitForTimeout(3000);
   });

   test.only('check all checkboxes', async ({ page }) => {
      // const checkboxTuesdayLocator: Locator[] = await page.locator('input[class=form-check-input][type=checkbox]').all();
      // for (const i of checkboxTuesdayLocator) {
      //    await i.check();
      // }

      // for (const i of checkboxTuesdayLocator) {
      //    await expect(await i.isChecked()).toBe(true);
      // }

      const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      const checkboxes: Locator[] = days.map((index) => page.getByLabel(index));
      expect(checkboxes.length).toBe(7);

      for (const i of checkboxes) {
         await i.check();
      }
   });
});
