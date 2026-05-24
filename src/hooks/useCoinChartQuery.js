import { queryOptions, useQuery } from "@tanstack/react-query";
import { coinKeys, getCoinMarketChart } from "@/api/coingecko.js";

export function coinChartOptions(coinId) {
    return queryOptions({
        queryKey: coinKeys.chart(coinId),
        queryFn: () => getCoinMarketChart(coinId),
        refetchInterval: 15_000,
    });
}

export function useCoinChartQuery(coinId, options = {}) {
    return useQuery({
        ...coinChartOptions(coinId),
        ...options,
    });
}
