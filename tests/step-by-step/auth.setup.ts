import { test as setup } from '@playwright/test';
import { LoginPage } from './step3/pom/LoginPage';
import { config } from './step3/config/environments';
import { credentials } from './step3/data/credentials';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
   const loginPage = new LoginPage(page);
   await loginPage.goto(config.baseURL);
   await loginPage.login(credentials);

   await page.context().storageState({ path: authFile });
});
