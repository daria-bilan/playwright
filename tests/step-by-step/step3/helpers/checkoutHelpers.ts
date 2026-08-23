import { expect, Page } from '@playwright/test';
import { Product, CheckoutInfo } from '../../step2/types';
import { CheckoutInfoPage } from '../pom/CheckoutInfoPage';
import { CartPage } from '../pom/CartPage';

export async function fillAndSubmitCheckoutInfo(page: CartPage, info: CheckoutInfo) {
   const checkoutInfoPage: CheckoutInfoPage = await page.proceedToCheckout();
   await checkoutInfoPage.fillInfo(info);
   return checkoutInfoPage.continueToOverview();
}
