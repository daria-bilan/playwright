import test, { expect } from '@playwright/test';

test('Click on first button', async ({ page }) => {
   await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');

   for (let i = 0; i < 3; i++) {
      await page.getByRole('button').filter({ hasText: 'Add Element' }).click();
   }
   const deleteButton = page.getByRole('button').filter({ hasText: 'Delete' });
   await expect(deleteButton).toHaveCount(3);
   await deleteButton.first().click();

   await expect(deleteButton).toHaveCount(2);
});
