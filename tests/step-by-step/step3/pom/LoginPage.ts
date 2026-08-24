import { Page, Locator, expect } from '@playwright/test';
import { Credentials } from '../../step2/types';
import { BasePage } from './BasePage';
import { config } from '../config/environments';

export class LoginPage extends BasePage {
   private usernameField: Locator = this.page.getByPlaceholder('Username');
   private passwordField: Locator = this.page.getByPlaceholder('Password');
   private loginButton: Locator = this.page.getByRole('button', { name: 'Login' });

   async login(credentials: Credentials) {
      await this.usernameField.fill(credentials.username);
      await this.passwordField.fill(credentials.password);
      await this.loginButton.click();
      await this.expectLoginSuccess();
   }

   async expectLoginSuccess() {
      await expect(this.page).toHaveURL(config.baseURL + 'inventory.html');
      await this.waitForState();
   }
}
