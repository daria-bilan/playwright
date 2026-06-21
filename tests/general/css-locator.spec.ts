import { test, expect, Locator } from '@playwright/test';

test.describe('CSS Locator', () => {
   test('CSS Locator', async ({ page }) => {
      // tag and id
      await page.goto('https://demowebshop.tricentis.com/');
      const searchBar: Locator = page.locator('input#small-searchterms');
      await expect(searchBar).toBeVisible();
      await searchBar.fill('t-Shirts');

      // tag and class
      await page.locator('input.search-box-text').fill('T-Shirts');

      // tag and attribute
      await page.locator('input[name=q]').fill('T-Shirts');
      await page.locator('[name=q]').fill('T-Shirts');

      // tag + class + attrubute
      await page.locator('input.search-box-text[value="Search store"]').fill('T-Shirts');
   });
});
