const currencyFormatter = new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 0,
    style: "currency",
});

const compactCurrencyFormatter = new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 2,
    notation: "compact",
    style: "currency",
});

export function formatCurrency(value) {
    return currencyFormatter.format(value ?? 0);
}

export function formatCompactCurrency(value) {
    return compactCurrencyFormatter.format(value ?? 0);
}

export function formatPercent(value) {
    return `${Number(value ?? 0).toFixed(2)}%`;
}
