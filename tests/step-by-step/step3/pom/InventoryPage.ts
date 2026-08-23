import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { Product } from '../../step2/types';
import { CartPage } from './CartPage';
import { CartBadge } from '../components/CartBadge';
import { config } from '../config/environments';

export class InventoryPage extends BasePage {
   readonly cartBadge: CartBadge;

   constructor(page: Page) {
      super(page);
      this.cartBadge = new CartBadge(page);
   }

   public getItemCard(itemName: string): Locator {
      return this.page.locator('.inventory_item').filter({ hasText: itemName });
   }

   private getItemCardButton(itemName: string) {
      const item: Locator = this.getItemCard(itemName);
      return item.getByRole('button');
   }

   async getProductDetails(itemName: string) {
      const item: Locator = this.getItemCard(itemName);
      const [price, productName, desc] = await Promise.all([
         item.locator('.pricebar').innerText(),
         item.locator('.inventory_item_name').innerText(),
         item.locator('.inventory_item_desc').innerText(),
      ]);
      const newProduct: Product = { itemName: productName, itemPrice: price, details: { itemDesc: desc } };
      return newProduct;
   }

   async addItemToCard(itemName: string) {
      const itemButton: Locator = this.getItemCardButton(itemName);
      await expect(itemButton).toHaveText('Add to cart');
      await itemButton.click();
      await expect(itemButton).toHaveText('Remove');
   }

   async goToCart() {
      await this.page.locator('#shopping_cart_container').click();
      await expect(this.page).toHaveURL(config.baseURL + 'cart.html');
      return new CartPage(this.page);
   }
}
