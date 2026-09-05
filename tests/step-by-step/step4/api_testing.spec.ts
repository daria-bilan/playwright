// import { expect, test } from '@playwright/test';
import { test, expect } from './fixtures/fixtures';
import { wrongAPICrepentials } from './data/apiCredentials';
import { mockPostsResponseData, mockStatusCodeResponseData } from './mocks/mockPostResponce';

test('GET request example', async ({ request }) => {
   const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');

   expect(response.status()).toBe(200); // only 200 is true
   // expect(response.ok()).toBeTruthy(); // all values from 200 till 299

   const body = await response.json();
   expect(body.title).toContain('sunt aut facere ');
});

test('POST request example', async ({ request }) => {
   const response = await request.post('https://jsonplaceholder.typicode.com/posts', { data: { title: 'foo', body: 'bar', userId: 1 } });

   expect(response.status()).toBe(201);
   const body = await response.json();
   expect(body.title).toBe('foo');
});

test('GET request for user data', async ({ request }) => {
   const response = await request.get('https://jsonplaceholder.typicode.com/users/5');

   expect(response.status()).toBe(200);
   const body = await response.json();
   expect(body.email).toContain('@');
});

test('POST request to make a post', async ({ request }) => {
   const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: { title: 'My Test Post', body: 'Some content', userId: 5 },
   });

   expect(response.status()).toBe(201);
   const body = await response.json();
   expect(body.userId).toBe(5);
});

test('GET request on non-existent endpoint', async ({ request }) => {
   const response = await request.get('https://jsonplaceholder.typicode.com/posts/9999');

   expect(response.status()).toBe(404);
});

test('POST Authorization', async ({ request }) => {
   const loginResponse = await request.post('https://dummyjson.com/auth/login', { data: { username: 'emilys', password: 'emilyspass' } });

   expect(loginResponse.status()).toBe(200);
   const { accessToken } = await loginResponse.json();
   expect(accessToken).toBeDefined();
});

test('GET Login and get authentificated user data', async ({ tokenFixture, request }) => {
   const meResponse = await request.get('https://dummyjson.com/auth/me', { headers: { Authorization: `Bearer ${tokenFixture}` } });

   expect(meResponse.status()).toBe(200);
   const user = await meResponse.json();
   expect(user.username).toBe('emilys');
});

test('POST Wrong password', async ({ request }) => {
   const wrongPasswordResponse = await request.post('https://dummyjson.com/auth/login', { data: wrongAPICrepentials });

   expect(wrongPasswordResponse.status()).toBe(400);
});

test('GET 5 product', async ({ request }) => {
   const response = await request.get('https://dummyjson.com/products?limit=5&skip=10');
   expect(response.status()).toBe(200);

   const { products, skip } = await response.json();
   expect(products.length).toBe(5);
   expect(skip).toBe(10);
});

test('GET Info of a related resourse', async ({ request }) => {
   const response = await request.get('https://dummyjson.com/users/5/carts');
   expect(response.status()).toBe(200);

   const { carts } = await response.json();

   expect(carts).toBeDefined();
});

test('GET Auth/me without token', async ({ request }) => {
   const response = await request.get('https://dummyjson.com/auth/me');
   expect(response.status()).toBe(401);
});

test('GET mocked post data', async ({ page, request }) => {
   const response = await mockPostsResponseData(page);
   // expect(response.status).toBe(200);

   await page.goto('about:blank');
   const data = await page.evaluate(async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      return response.json();
   });

   console.log(`id: ${data.id}\ntitle: ${data.title}\nbody: ${data.body}`);
   expect(data.id).toBe(1);
   expect(data.title).toBe('Mocked Title');
   expect(data.body).toBe('Mocked body');
});

test('GET mocked server response', async ({ request, page }) => {
   await page.goto('https://the-internet.herokuapp.com/status_codes');
   await mockStatusCodeResponseData(page);

   const responsePromise = page.waitForResponse('**/status_codes/*');
   await page.getByRole('link', { name: '301' }).click();
   const response = await responsePromise;

   expect(response.status()).toBe(500);
   await expect(page.locator('body')).toContainText('Mocked Server Response');
});

test('GET data from request and continue()', async ({ page }) => {
   await page.route('**/download', async (route) => {
      console.log(route.request().headers());
      await route.continue();
   });
   await page.goto('https://the-internet.herokuapp.com/download');

   await expect(page.locator('h3')).toHaveText('File Downloader');
});
