/**
 * Currency utility for Bangladesh Taka (BDT)
 */

export const CURRENCY_SYMBOL = "৳";
export const CURRENCY_CODE = "BDT";

export function formatPrice(amount: number | undefined | null): string {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return `${CURRENCY_SYMBOL}0`;
  }
  return `${CURRENCY_SYMBOL}${Math.round(amount).toLocaleString("en-BD")}`;
}

export function formatPriceDetailed(amount: number | undefined | null): string {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return `${CURRENCY_SYMBOL}0.00`;
  }
  return `${CURRENCY_SYMBOL}${amount.toLocaleString("en-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
