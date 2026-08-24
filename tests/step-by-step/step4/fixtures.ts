import { test as base } from '@playwright/test';
import { config } from '../step3/config/environments';
import { credentials } from '../step3/data/credentials';
import { InventoryPage } from '../step3/pom/InventoryPage';
import { LoginPage } from '../step3/pom/LoginPage';
import { itemsToCart } from '../step3/data/products';

type MyFixtures = { loggedInPage: InventoryPage; inventoryWithItemsInCart: InventoryPage };

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
});

export { expect } from '@playwright/test';
