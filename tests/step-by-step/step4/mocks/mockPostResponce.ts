import { Page } from '@playwright/test';

export async function mockPostResponseData(page: Page) {
   await page.route('**/posts/1', async (route) => {
      await route.fulfill({
         status: 200,
         contentType: 'application/json',
         body: JSON.stringify({ id: 1, title: 'Mocked Title', body: 'Mocked body' }),
      });
   });
}
