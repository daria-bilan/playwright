import { test, expect } from '@playwright/test';
const newBodyText: string = 'Hello from Playwright';

test('Interaction with iframe', async ({ page }) => {
   await page.goto('https://practice.expandtesting.com/iframe');
   const frame = page.frameLocator('#mce_0_ifr');
   const bodyText = frame.getByLabel('Rich Text Area. Press ALT-0 for help.');

   await expect(bodyText).toHaveText('Your content goes here.');
   await bodyText.fill(newBodyText);

   await expect(bodyText).toHaveText(newBodyText);
});
