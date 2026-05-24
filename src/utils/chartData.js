export const chartCoins = [
    { label: "Bitcoin", value: "bitcoin" },
    { label: "Ethereum", value: "ethereum" },
    { label: "Dogecoin", value: "dogecoin" },
];

const chartDateFormatter = new Intl.DateTimeFormat("uk-UA", {
    day: "2-digit",
    month: "short",
});

export function formatChartDate(timestamp) {
    return chartDateFormatter.format(new Date(timestamp));
}

export function mapMarketChartPrices(prices = []) {
    return prices.map(([timestamp, price]) => ({
        label: formatChartDate(timestamp),
        price,
        timestamp,
    }));
}
