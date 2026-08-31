import test, { expect, Page } from '@playwright/test';

test('New tab', async ({ page, context }) => {
   await page.goto('https://the-internet.herokuapp.com/windows');
   await expect(page.locator('h3')).toHaveText('Opening a new window');

   const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.getByRole('link', { name: 'Click Here' }).click(),
   ]);
   await newPage.waitForLoadState();

   await expect(newPage).toHaveURL('https://the-internet.herokuapp.com/windows/new');
   await expect(newPage.locator('h3')).toHaveText('New Window');

   await newPage.close();

   const allPages: Page[] = context.pages();
   expect(allPages.length).toBe(1);
});
