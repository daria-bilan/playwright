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
   });

   test('check a single checkbox', async ({ page }) => {
      const checkboxTuesdayLocator: Locator = page.getByLabel('Tuesday');

      await expect(checkboxTuesdayLocator).toBeVisible();

      expect(await checkboxTuesdayLocator.isChecked()).toBe(false);

      await checkboxTuesdayLocator.check();
      expect(await checkboxTuesdayLocator.isChecked()).toBe(true);
   });

   test('check all checkboxes', async ({ page }) => {
      // --- Select all checkboxes v1 ---
      // const checkboxTuesdayLocator: Locator[] = await page.locator('input[class=form-check-input][type=checkbox]').all();
      // for (const i of checkboxTuesdayLocator) {
      //    await i.check();
      // }
      // for (const i of checkboxTuesdayLocator) {
      //    await expect(await i.isChecked()).toBe(true);
      // }

      // --- Select all checkboxes v2 ---
      const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const checkboxes: Locator[] = days.map((index) => page.getByLabel(index));
      expect(checkboxes.length).toBe(7);
      for (const i of checkboxes) {
         await i.check();
         await expect(i).toBeChecked();
      }

      // --- Select last 3 checkboxes
      for (const i of checkboxes.slice(-3)) {
         await i.uncheck();
         await expect(i).not.toBeChecked();
      }

      for (const i of checkboxes) {
         if (await i.isChecked()) {
            await i.uncheck();
         } else {
            await i.check();
         }
      }
   });

   function getRandomInt(min: number, max: number): number {
      return Math.floor(Math.random() * (max - min + 1)) + min;
   }

   test('Select checkboxes randomly', async ({ page }) => {
      const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const checkboxes: Locator[] = days.map((index) => page.getByLabel(index));
      expect(checkboxes.length).toBe(7);

      const index: number[] = [];
      let randomLength = getRandomInt(1, 7);

      for (let i = 0; i < randomLength; i++) {
         index[i] = getRandomInt(0, 6);
      }

      for (const i of index) {
         await checkboxes[i].check();
         await expect(checkboxes[i]).toBeChecked();
      }
   });

   test('Select a checkbox base on the label', async ({ page }) => {
      const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const checkboxes: Locator[] = days.map((index) => page.getByLabel(index));
      expect(checkboxes.length).toBe(7);

      const weekname: string = 'Friday';

      for (const label of days) {
         if (label.toLowerCase() === weekname.toLowerCase()) {
            const checkbox = page.getByLabel(weekname);
            await checkbox.check();
            await expect(checkbox).toBeChecked();
         }
      }
   });

   test('Single selected dropdown option', async ({ page }) => {
      // const dropdown: Locator = page.getByRole('combobox', { name: 'Country:' });

      const dropdown: Locator = page.locator('#country');

      await dropdown.selectOption('Germany'); // visible text
      // await dropdown.selectOption({ value: 'uk' }); // using value attribute
      // await page.locator('#country').selectOption({ label: 'India' }); // using label
      // await page.locator('#country').selectOption({ index: 8 }); // using index
      // console.log(dropdown);

      await expect(dropdown).toHaveValue('germany');
      await page.waitForTimeout(3000);
   });

   test('Check number of options', async ({ page }) => {
      const dropdownOptions: Locator = page.locator('#country option');
      await expect(dropdownOptions).toHaveCount(10);
   });

   test.only('Multiple selected dropdowm options', async ({ page }) => {});
});
