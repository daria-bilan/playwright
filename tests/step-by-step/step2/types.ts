import { Locator } from '@playwright/test';

export interface Credentials {
   username: string;
   password: string;
}

export interface Product {
   itemName: string;
   itemPrice: string;
}

export type SortOption = 'Name (A to Z)' | 'Name (Z to A)' | 'Price (low to high)' | 'Price (high to low)';
