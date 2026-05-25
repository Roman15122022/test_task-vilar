import { queryOptions, useQuery } from "@tanstack/react-query";
import { coinQueryKeys, getCoinMarketChart } from "@/shared/api/coingecko";
import { CHART_REFETCH_INTERVAL_MS } from "@/shared/constants/api";
import type { ChartCoinId } from "@/shared/constants/chart";

export function coinChartOptions(coinId: ChartCoinId) {
  return queryOptions({
    queryKey: coinQueryKeys.marketChart(coinId),
    queryFn: () => getCoinMarketChart(coinId),
    refetchInterval: CHART_REFETCH_INTERVAL_MS,
  });
}

export function useCoinChartQuery(coinId: ChartCoinId) {
  return useQuery(coinChartOptions(coinId));
}
