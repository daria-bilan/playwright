import { Page } from '@playwright/test';

export async function mockPostsResponseData(page: Page) {
   await page.route('**/posts/1', async (route) => {
      await route.fulfill({
         status: 200,
         contentType: 'application/json',
         body: JSON.stringify({ id: 1, title: 'Mocked Title', body: 'Mocked body' }),
      });
   });
}

export async function mockStatusCodeResponseData(page: Page) {
   await page.route('**/status_codes/*', async (route) => {
      await route.fulfill({ status: 500, body: 'Mocked Server Response' });
   });
}
