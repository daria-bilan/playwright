import { Locator, Page } from '@playwright/test';
import { Product } from './types';

export class ItemsPage {
   async getProductDetails(item: Locator) {
      const [price, productName, desc] = await Promise.all([
         item.locator('.pricebar').innerText(),
         item.locator('.inventory_item_name').innerText(),
         item.locator('.inventory_item_desc').innerText(),
      ]);
      const newProduct: Product = {
         itemName: productName,
         itemPrice: price,
         details: {
            itemDesc:
               'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
         },
      };
      return newProduct;
   }
}
