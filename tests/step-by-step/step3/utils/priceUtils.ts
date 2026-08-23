export function parsePrice(priceString: string): number {
   return parseFloat(priceString.replace('$', ''));
}

export function parseTotalPrice(totalPriceString: string): number {
   return parseFloat(totalPriceString.replace('Total: $', ''));
}
