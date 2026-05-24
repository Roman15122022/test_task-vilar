import { queryOptions, useQuery } from "@tanstack/react-query";
import { coinKeys, getCoinsMarkets } from "@/api/coingecko.js";

export function coinsMarketsOptions({ page = 1, perPage = 50 } = {}) {
    return queryOptions({
        queryKey: coinKeys.markets({ page, perPage }),
        queryFn: () => getCoinsMarkets({ page, perPage }),
    });
}

export function useCoinsQuery(params, options = {}) {
    return useQuery({
        ...coinsMarketsOptions(params),
        ...options,
    });
}
