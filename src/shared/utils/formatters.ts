import {
  COMPACT_CURRENCY_FRACTION_DIGITS,
  CURRENCY_FRACTION_DIGITS,
  DEFAULT_NUMBER_VALUE,
  PERCENT_FRACTION_DIGITS,
} from "@/shared/constants/format";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  currency: "USD",
  maximumFractionDigits: CURRENCY_FRACTION_DIGITS,
  style: "currency",
});

const compactCurrencyFormatter = new Intl.NumberFormat("en-US", {
  currency: "USD",
  maximumFractionDigits: COMPACT_CURRENCY_FRACTION_DIGITS,
  notation: "compact",
  style: "currency",
});

type NumericValue = number | null | undefined;

export function formatCurrency(value: NumericValue) {
  return currencyFormatter.format(value ?? DEFAULT_NUMBER_VALUE);
}

export function formatCompactCurrency(value: NumericValue) {
  return compactCurrencyFormatter.format(value ?? DEFAULT_NUMBER_VALUE);
}

export function formatPercent(value: NumericValue) {
  return `${Number(value ?? DEFAULT_NUMBER_VALUE).toFixed(PERCENT_FRACTION_DIGITS)}%`;
}
