import { keepPreviousData, queryOptions, useQuery } from "@tanstack/react-query";
import { coinQueryKeys, getCoinsMarkets } from "@/shared/api/coingecko";
import type { CoinMarket, CoinMarketsParams } from "@/shared/api/coingecko";
import { FIRST_PAGE, TOP_COINS_PAGE_SIZE } from "@/shared/constants/api";

type UseCoinsQueryOptions = {
  placeholderData?: typeof keepPreviousData;
};

export function coinsMarketsOptions({
  page = FIRST_PAGE,
  perPage = TOP_COINS_PAGE_SIZE,
}: CoinMarketsParams = {}) {
  return queryOptions({
    queryKey: coinQueryKeys.markets({ page, perPage }),
    queryFn: () => getCoinsMarkets({ page, perPage }),
  });
}

export function useCoinsQuery(params: CoinMarketsParams, options: UseCoinsQueryOptions = {}) {
  return useQuery({
    ...coinsMarketsOptions(params),
    ...options,
  });
}

export { keepPreviousData };
export type { CoinMarket };
