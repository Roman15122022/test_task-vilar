import { mapMarketChartPrices } from "@/features/chart/utils/chartData";

describe("chart data utilities", () => {
  it("maps CoinGecko price tuples into Recharts points", () => {
    const points = mapMarketChartPrices([
      [Date.UTC(2026, 0, 1), 100],
      [Date.UTC(2026, 0, 2), 110],
    ]);

    expect(points).toEqual([
      expect.objectContaining({ price: 100, timestamp: Date.UTC(2026, 0, 1) }),
      expect.objectContaining({ price: 110, timestamp: Date.UTC(2026, 0, 2) }),
    ]);
    expect(points[0].label).toEqual(expect.any(String));
  });
});
