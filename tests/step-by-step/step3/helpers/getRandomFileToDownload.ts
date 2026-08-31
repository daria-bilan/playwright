import { Locator, Page } from '@playwright/test';
import { getRandomInt } from '../utils/randomNumber';

export async function getRandomFile(page: Page) {
   const allFilesLocator: Locator[] = await page.getByRole('link').all();
   const filesAmount: number = allFilesLocator.length;
   if (filesAmount === 0) {
      throw new Error(`No links was found on the page`);
   }

   const fileIndex: number = getRandomInt(0, filesAmount - 1);
   const fileElement = allFilesLocator[fileIndex];
   if (!fileElement) {
      throw new Error(`No element with index${fileIndex}`);
   }

   const fileName: string | null = await fileElement.textContent();
   if (!fileName) {
      throw new Error(`Can't get a text of the link with index ${fileIndex}`);
   }
   const fileLocator = page.getByRole('link', { name: fileName });

   return { fileLocator, fileName };
}
