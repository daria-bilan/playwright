import { Product } from '../../step2/types';

export const item: Product = {
   itemName: 'Sauce Labs Backpack',
   itemPrice: '$29.99',
   details: {
      itemDesc:
         'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
   },
};

export const item2: Product = {
   itemName: 'Sauce Labs Bike Light',
   itemPrice: '$9.99',
   details: {
      itemDesc:
         "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
   },
};

export const itemsToCart: Product[] = [item, item2];
