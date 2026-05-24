import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Chart from "@/pages/Chart.jsx";
import { renderWithClient } from "@/test/renderWithClient.jsx";

vi.mock("recharts", () => ({
    CartesianGrid: () => <div data-testid="cartesian-grid" />,
    Line: () => <div data-testid="line" />,
    LineChart: ({ children, data }) => (
        <div data-points={data.length} data-testid="line-chart">
            {children}
        </div>
    ),
    ResponsiveContainer: ({ children }) => <div data-testid="responsive-container">{children}</div>,
    Tooltip: () => <div data-testid="tooltip" />,
    XAxis: () => <div data-testid="x-axis" />,
    YAxis: () => <div data-testid="y-axis" />,
}));

const chartResponse = {
    prices: [
        [Date.UTC(2026, 0, 1), 100],
        [Date.UTC(2026, 0, 2), 110],
    ],
};

function okChartResponse() {
    return {
        ok: true,
        json: async () => chartResponse,
    };
}

describe("Chart page", () => {
    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it("loads bitcoin chart data by default", async () => {
        const fetchMock = vi.fn().mockResolvedValue(okChartResponse());
        vi.stubGlobal("fetch", fetchMock);

        renderWithClient(<Chart />);

        await waitFor(() => {
            expect(screen.getByTestId("line-chart")).toHaveAttribute("data-points", "2");
        });
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock.mock.calls[0][0].toString()).toContain("/coins/bitcoin/market_chart");
        expect(fetchMock.mock.calls[0][0].toString()).toContain("days=7");
    });

    it("changes the query when another coin is selected", async () => {
        const user = userEvent.setup();
        const fetchMock = vi.fn().mockResolvedValue(okChartResponse());
        vi.stubGlobal("fetch", fetchMock);

        renderWithClient(<Chart />);

        await waitFor(() => {
            expect(fetchMock).toHaveBeenCalledTimes(1);
        });
        await user.click(screen.getByText("Ethereum"));

        await waitFor(() => {
            expect(fetchMock).toHaveBeenCalledTimes(2);
        });
        expect(fetchMock.mock.calls[1][0].toString()).toContain("/coins/ethereum/market_chart");
    });

    it("keeps current chart data visible and marks manual refresh as loading", async () => {
        const user = userEvent.setup();
        const fetchMock = vi
            .fn()
            .mockResolvedValueOnce(okChartResponse())
            .mockImplementationOnce(() => new Promise(() => {}));
        vi.stubGlobal("fetch", fetchMock);

        renderWithClient(<Chart />);

        await waitFor(() => {
            expect(screen.getByTestId("line-chart")).toHaveAttribute("data-points", "2");
        });
        await user.click(screen.getByRole("button", { name: /оновити/i }));

        await waitFor(() => {
            expect(fetchMock).toHaveBeenCalledTimes(2);
        });
        expect(screen.getByTestId("price-chart")).toHaveAttribute("aria-busy", "true");
        expect(screen.getByTestId("line-chart")).toHaveAttribute("data-points", "2");
    });

    it("shows an error state when the chart request fails", async () => {
        vi.stubGlobal(
            "fetch",
            vi.fn().mockResolvedValue({
                ok: false,
                status: 500,
            }),
        );

        renderWithClient(<Chart />);

        expect(await screen.findByText("Не вдалося завантажити графік")).toBeInTheDocument();
        expect(screen.getByText(/CoinGecko request failed with 500/)).toBeInTheDocument();
    });
});
