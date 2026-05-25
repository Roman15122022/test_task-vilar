import { coinQueryKeys, getCoinMarketChart, getCoinsMarkets } from "@/shared/api/coingecko";
import { COINGECKO_MARKET_CHART_DAYS, DEFAULT_CURRENCY } from "@/shared/constants/api";

describe("CoinGecko API", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("builds readable and stable query keys", () => {
    expect(coinQueryKeys.markets({ page: 2, perPage: 20 })).toEqual([
      "coin-markets",
      { currency: DEFAULT_CURRENCY, page: 2, perPage: 20 },
    ]);
    expect(coinQueryKeys.marketChart("bitcoin")).toEqual([
      "coin-market-chart",
      { coinId: "bitcoin", currency: DEFAULT_CURRENCY, days: COINGECKO_MARKET_CHART_DAYS },
    ]);
  });

  it("passes market request params to CoinGecko", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [],
    });
    vi.stubGlobal("fetch", fetchMock);

    await getCoinsMarkets({ page: 2, perPage: 20 });

    const url = new URL(fetchMock.mock.calls[0][0]);
    expect(url.pathname).toBe("/api/v3/coins/markets");
    expect(url.searchParams.get("vs_currency")).toBe(DEFAULT_CURRENCY);
    expect(url.searchParams.get("page")).toBe("2");
    expect(url.searchParams.get("per_page")).toBe("20");
  });

  it("passes chart request params to CoinGecko", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ prices: [] }),
    });
    vi.stubGlobal("fetch", fetchMock);

    await getCoinMarketChart("bitcoin");

    const url = new URL(fetchMock.mock.calls[0][0]);
    expect(url.pathname).toBe("/api/v3/coins/bitcoin/market_chart");
    expect(url.searchParams.get("vs_currency")).toBe(DEFAULT_CURRENCY);
    expect(url.searchParams.get("days")).toBe(String(COINGECKO_MARKET_CHART_DAYS));
  });
});
