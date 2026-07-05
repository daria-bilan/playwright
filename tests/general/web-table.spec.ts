import { test, expect, Locator, chromium } from '@playwright/test';

test.describe('Tables', () => {
   test.beforeEach(async ({ page }) => {
      await page.goto('https://testautomationpractice.blogspot.com/');
   });

   test('Static tables', async ({ page }) => {
      const table: Locator = page.locator('table[name="BookTable"] tbody');
      await expect(table).toBeVisible();

      // rows count
      const rows: Locator = table.locator('tr');
      const rowCount: number = await rows.count();
      console.log('Actual rows count:', rowCount);
      await expect(rowCount).toBe(7);

      // colunms count
      const columns: Locator = rows.locator('th');
      const columnsCount: number = await columns.count();
      console.log('Actual columns count:', columnsCount);

      await expect(columnsCount).toBe(4);
   });

   test.only('Get data from the specific row', async ({ page }) => {
      const table: Locator = page.locator('table[name="BookTable"] tbody');
      await expect(table).toBeVisible();

      const rows: Locator = table.locator('tr');
      const data: string[] = await rows.nth(2).locator('td').allInnerTexts();
      await expect(data).toContain('Java');
   });
});
