import { QueryClient } from "@tanstack/react-query";
import { QUERY_RETRY_COUNT, QUERY_STALE_TIME_MS } from "@/shared/constants/api";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: QUERY_RETRY_COUNT,
      staleTime: QUERY_STALE_TIME_MS,
    },
  },
});
