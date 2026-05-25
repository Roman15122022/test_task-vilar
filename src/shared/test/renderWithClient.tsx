import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { ConfigProvider } from "antd";
import type { ReactElement } from "react";
import { theme } from "@/app/theme";

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
}

type RenderWithClientOptions = {
  client?: QueryClient;
};

export function renderWithClient(
  ui: ReactElement,
  { client = createTestQueryClient() }: RenderWithClientOptions = {},
) {
  return {
    client,
    ...render(
      <QueryClientProvider client={client}>
        <ConfigProvider theme={theme}>{ui}</ConfigProvider>
      </QueryClientProvider>,
    ),
  };
}
