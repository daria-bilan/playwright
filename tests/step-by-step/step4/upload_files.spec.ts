import { expect, test } from '@playwright/test';
import path from 'path';

const filePath = path.join(__dirname, 'e507364557703858ff50f33d8a08404c.gif');
const pagePath = path.join(__dirname, 'customButton.html');

test('Upload file', async ({ page }) => {
   await page.goto('https://the-internet.herokuapp.com/upload');
   await page.locator('#file-upload').setInputFiles(filePath);
   await page.locator('#file-submit').click();

   await expect(page.getByRole('heading', { name: 'File Uploaded!' })).toBeVisible();
});

test('Custom button for file uploading', async ({ page }) => {
   await page.goto(pagePath);

   const fileChooserPromise = page.waitForEvent('filechooser');
   const uploadButton = page.locator('#upload-label');
   await uploadButton.click();
   const fileChooser = await fileChooserPromise;
   await fileChooser.setFiles(filePath);

   await expect(uploadButton).toBeHidden();
   await expect(page.locator('#file-info-block')).toBeVisible();
});
