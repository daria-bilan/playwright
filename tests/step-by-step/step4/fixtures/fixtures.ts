import { test as base, Page } from '@playwright/test';
import { config } from '../../step3/config/environments';
import { credentials } from '../../step3/data/credentials';
import { InventoryPage } from '../../step3/pom/InventoryPage';
import { LoginPage } from '../../step3/pom/LoginPage';
import { itemsToCart } from '../../step3/data/products';
import { apiCredentials } from '../data/apiCredentials';

type MyFixtures = { loggedInPage: InventoryPage; inventoryWithItemsInCart: InventoryPage; tokenFixture: string };

export const test = base.extend<MyFixtures>({
   loggedInPage: async ({ page }, use) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto(config.baseURL);
      await loginPage.login(credentials);

      const inventoryPage = new InventoryPage(page);
      await use(inventoryPage);
   },
   inventoryWithItemsInCart: async ({ loggedInPage }, use) => {
      for (let item of itemsToCart) {
         await loggedInPage.addItemToCard(item.itemName);
      }
      await use(loggedInPage);
   },
   tokenFixture: async ({ request }, use) => {
      const loginResponse = await request.post('https://dummyjson.com/auth/login', { data: apiCredentials });
      const { accessToken } = await loginResponse.json();
      await use(accessToken);
   },
});

export { expect, request } from '@playwright/test';
