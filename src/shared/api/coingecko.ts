import {
  COINGECKO_API_URL,
  COINGECKO_MARKET_CHART_DAYS,
  DEFAULT_CURRENCY,
  FIRST_PAGE,
  TOP_COINS_PAGE_SIZE,
} from "@/shared/constants/api";
import type { ChartCoinId } from "@/shared/constants/chart";

export type CoinMarket = {
  current_price: number | null;
  id: string;
  image: string;
  market_cap: number | null;
  market_cap_rank: number | null;
  name: string;
  price_change_percentage_24h: number | null;
  symbol: string;
  total_volume: number | null;
};

export type CoinMarketChart = {
  prices: Array<[timestamp: number, price: number]>;
};

export type CoinMarketsParams = {
  page?: number;
  perPage?: number;
};

type RequestParams = Record<string, number | string | null | undefined>;

export const coinQueryKeys = {
  marketChart: (coinId: ChartCoinId) =>
    [
      "coin-market-chart",
      {
        coinId,
        currency: DEFAULT_CURRENCY,
        days: COINGECKO_MARKET_CHART_DAYS,
      },
    ] as const,
  markets: ({ page, perPage }: Required<CoinMarketsParams>) =>
    [
      "coin-markets",
      {
        currency: DEFAULT_CURRENCY,
        page,
        perPage,
      },
    ] as const,
};

export async function fetchJson<TResponse>(path: string, params: RequestParams = {}) {
  const url = new URL(`${COINGECKO_API_URL}${path}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value));
    }
  });

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`CoinGecko request failed with ${response.status}`);
  }

  return response.json() as Promise<TResponse>;
}

export function getCoinsMarkets({
  page = FIRST_PAGE,
  perPage = TOP_COINS_PAGE_SIZE,
}: CoinMarketsParams = {}) {
  return fetchJson<CoinMarket[]>("/coins/markets", {
    page,
    per_page: perPage,
    vs_currency: DEFAULT_CURRENCY,
  });
}

export function getCoinMarketChart(coinId: ChartCoinId) {
  return fetchJson<CoinMarketChart>(`/coins/${coinId}/market_chart`, {
    days: COINGECKO_MARKET_CHART_DAYS,
    vs_currency: DEFAULT_CURRENCY,
  });
}
