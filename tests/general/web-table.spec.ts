import { test, expect, Locator, chromium } from '@playwright/test';

test.describe('Tables', () => {
   test('Static tables', async ({ page }) => {
      await page.goto('https://testautomationpractice.blogspot.com/');
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

   test('Get data from the specific row', async ({ page }) => {
      await page.goto('https://testautomationpractice.blogspot.com/');
      const table: Locator = page.locator('table[name="BookTable"] tbody');
      await expect(table).toBeVisible();

      const rows: Locator = table.locator('tr');
      const data: string[] = await rows.nth(2).locator('td').allInnerTexts();
      await expect(data).toContain('Java');
   });

   test('Dynamic Table', async ({ page }) => {
      await page.goto('https://practice.expandtesting.com/dynamic-table');
      const tableHeader: Locator = page.locator('table.table-striped thead');
      const headers: string = await tableHeader.innerText();
      const headerTitles: string[] = headers.split('\t');
      let index: number = headerTitles.indexOf('CPU');

      const table: Locator = page.locator('table.table-striped tbody');
      await expect(table).toBeVisible();

      const chromLine: Locator = table.locator('text=Chrome >> xpath=..');
      const chromeCPU: string | null = await chromLine.locator('td').nth(index).innerText();

      const expectedCPU: string = await page.locator('#chrome-cpu').innerText();
      const expectedCPUArray: string[] = expectedCPU.split(' ').map((text) => text.trim());
      const value: string = expectedCPUArray[2];

      expect(chromeCPU).toBe(value);
   });

   test('Get data from table with pagination', async ({ page }) => {
      await page.goto('https://datatables.net/examples/basic_init/zero_configuration.html');

      let morePages = true;
      const table: Locator = await page.locator('#example');
      const nextPageButton = await page.getByRole('link', { name: 'Next' });
      await expect(table).toBeVisible();
      await expect(nextPageButton).toBeVisible();

      while (morePages) {
         const rowsData = await table.locator('tbody tr').all();
         for (let row of rowsData) {
            console.log(await row.innerText());
         }
         let isActive: boolean = await nextPageButton.isEnabled();
         if (isActive) {
            await nextPageButton.click();
         } else {
            morePages = false;
         }
      }
   });
});
