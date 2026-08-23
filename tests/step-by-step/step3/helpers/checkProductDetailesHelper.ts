import { expect } from '@playwright/test';
import { Product } from '../../step2/types';
import { InventoryPage } from '../pom/InventoryPage';
import { parsePrice } from '../utils/priceUtils';

export async function checkProductDetailes(page: InventoryPage, item: Product) {
   const productDetailes = await page.getProductDetails(item.itemName);
   expect(parsePrice(productDetailes.itemPrice)).toBe(parsePrice(item.itemPrice));
   expect(productDetailes.details?.itemDesc).toContain(item.details?.itemDesc);
   expect(productDetailes.itemName).toContain(item.itemName);
}
