import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import { render } from "@testing-library/react";
import { theme } from "@/theme.js";

export function createTestQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });
}

export function renderWithClient(ui, { client = createTestQueryClient() } = {}) {
    return {
        client,
        ...render(
            <QueryClientProvider client={client}>
                <ConfigProvider theme={theme}>{ui}</ConfigProvider>
            </QueryClientProvider>,
        ),
    };
}
