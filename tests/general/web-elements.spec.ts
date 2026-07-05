import { test, expect, Locator, chromium } from '@playwright/test';

test.describe('Actions with web elements', () => {
   test.beforeEach(async ({ page }) => {
      await page.goto('https://demowebshop.tricentis.com/');
   });

   test('Text from single element', async ({ page }) => {
      const products: Locator = page.locator('.product-title');

      // innerText vs textContent
      // console.log(await products.nth(1).innerText()); // extract only plain text
      // console.log(await products.nth(1).textContent()); // extract the text with special symbols

      const count: number = await products.count();

      // for (let i: number = 0; i < count; i++) {
      //    console.log(await products.nth(i).textContent());
      // }

      for (let i: number = 0; i < count; i++) {
         const productName: string | null = await products.nth(i).textContent();
         console.log(productName?.trim());
      }
   });

   test('Text from all elements', async ({ page }) => {
      const products: Locator = page.locator('.product-title');
      // const productNames: string[] = await products.allInnerTexts();
      // console.log('Product names:', productNames);

      const productNames: string[] = await products.allTextContents();
      console.log('Product names:', productNames);

      const trimmedNames: string[] = productNames.map((text) => text.trim());
      console.log('Product names:', trimmedNames);
   });

   test.only('all method', async ({ page }) => {
      const products: Locator = page.locator('.product-title');
      const allProductsLocators: Locator[] = await products.all(); // return locators of all elements into the array
      console.log(allProductsLocators);

      console.log(await allProductsLocators[0].innerText());
   });
});
