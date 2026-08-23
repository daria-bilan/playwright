import { Page } from '@playwright/test';

export class CartBadge {
   private badge;

   constructor(private page: Page) {
      this.badge = this.page.locator('.shopping_cart_badge');
   }

   async getCount(): Promise<string> {
      return this.badge.textContent() as Promise<string>;
   }

   async isVisisbleBadge(): Promise<boolean> {
      return await this.badge.isVisible();
   }
}
