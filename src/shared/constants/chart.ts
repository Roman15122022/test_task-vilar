export const chartCoins = [
  { label: "Bitcoin", value: "bitcoin" },
  { label: "Ethereum", value: "ethereum" },
  { label: "Dogecoin", value: "dogecoin" },
] as const;

export type ChartCoinId = (typeof chartCoins)[number]["value"];

export const DEFAULT_CHART_COIN_ID: ChartCoinId = "bitcoin";

export const chartDateFormatOptions: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "short",
};

export const FIRST_TOOLTIP_PAYLOAD_INDEX = 0;
