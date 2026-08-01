import { Page, Locator, expect } from '@playwright/test';
import { Credentials } from '../step2/types';

export class LoginPage {
   constructor(private page: Page) {}

   async login(credentials: Credentials) {
      await this.page.getByPlaceholder('Username').fill(credentials.username);
      await this.page.getByPlaceholder('Password').fill(credentials.password);
      await this.page.getByRole('button', { name: 'Login' }).click();
   }

   async expectLoginSuccess() {
      await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
   }
}
