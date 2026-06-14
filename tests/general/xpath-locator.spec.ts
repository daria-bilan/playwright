import { test, expect, Locator } from '@playwright/test';

test.describe('XPath Locator', () => {
   test.skip('Handle Dynamic elements using XPath', async ({ page }) => {
      await page.goto('https://testautomationpractice.blogspot.com/');

      for (let i = 1; i <= 5; i++) {
         let button: Locator = page.locator('//button[text()="START" or text()="STOP"]');
         // let button: Locator = page.locator('//button[@name="start" or @name="stop"]');

         await button.click();
         await page.waitForTimeout(2000);
      }
   });

   test('XPath Axes', async ({ page }) => {
      await page.goto('https://www.w3schools.com/html/html_tables.asp');

      // 1. self
      const selfElement: Locator = page.locator('//td[text()="Germany"]/self::td'); // /self::td - not necessary
      await expect(selfElement).toHaveText('Germany');

      // 2. parent
      const parentElement: Locator = page.locator('//td[text()="Germany"]/parent::tr');
      console.log(await parentElement.allTextContents());
      await expect(parentElement).toContainText('Alfreds');

      // 3. child
      const childElements: Locator = page.locator('//table[@id="customers"]//tr[2]/child::td');
      await expect(childElements).toHaveCount(3);

      // 4. ancestor
      const ancestorElement: Locator = page.locator('//td[text()="Germany"]/ancestor::table');
      await expect(ancestorElement).toHaveAttribute('id', 'customers');

      // 5. descendant
      const descendantElements: Locator = page.locator('//table[@id="customers"]/descendant::td');
      await expect(descendantElements).toHaveCount(18);

      // 6. following (with siblings children)
      const followingElements: Locator = page.locator('//td[text()="Germany"]/following::td[1]');
      await expect(followingElements).toHaveText('Centro comercial Moctezuma');

      // 7. following-siblings (without children)
      const followingSiblingsElements: Locator = page.locator('//td[text()="Germany"]/following-sibling::td');
      await expect(followingSiblingsElements).toHaveCount(0);

      const followingSiblingsElements2: Locator = page.locator('//td[normalize-space()="Maria Anders"]/following-sibling::td');
      await expect(followingSiblingsElements2).toHaveCount(1);

      // 8. preceding
      const precedingElements: Locator = page.locator('//td[text()="Austria"]/preceding::td[1]');
      await expect(precedingElements).toHaveText('Roland Mendel');

      // 9. preceding-sibling
      const precedinSiblinggElements: Locator = page.locator('//td[text()="Austria"]/preceding-sibling::td');
      await expect(precedinSiblinggElements).toHaveCount(2);
      await expect(precedinSiblinggElements.nth(0)).toHaveText('Ernst Handel');
      await expect(precedinSiblinggElements.nth(1)).toHaveText('Roland Mendel');
   });
});
