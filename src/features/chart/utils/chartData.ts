import { chartDateFormatOptions } from "@/shared/constants/chart";

const chartDateFormatter = new Intl.DateTimeFormat("uk-UA", chartDateFormatOptions);

export type ChartPoint = {
  label: string;
  price: number;
  timestamp: number;
};

export function formatChartDate(timestamp: number) {
  return chartDateFormatter.format(new Date(timestamp));
}

export function mapMarketChartPrices(prices: Array<[timestamp: number, price: number]> = []) {
  return prices.map(([timestamp, price]) => ({
    label: formatChartDate(timestamp),
    price,
    timestamp,
  }));
}
