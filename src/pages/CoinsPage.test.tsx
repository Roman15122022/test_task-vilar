import { screen, waitFor } from "@testing-library/react";
import CoinsPage from "@/pages/CoinsPage";
import { FIRST_PAGE, TOP_COINS_PAGE_SIZE } from "@/shared/constants/api";
import { renderWithClient } from "@/shared/test/renderWithClient";

const coins = [
  {
    id: "bitcoin",
    current_price: 74713.42,
    image: "/bitcoin.png",
    market_cap: 1_490_000_000_000,
    market_cap_rank: 1,
    name: "Bitcoin",
    price_change_percentage_24h: -3.394,
    symbol: "btc",
    total_volume: 32_450_000_000,
  },
];

describe("Coins page", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("loads top 50 coins from CoinGecko", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => coins,
    });
    vi.stubGlobal("fetch", fetchMock);

    renderWithClient(<CoinsPage />);

    expect(await screen.findByText("Bitcoin")).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0].toString()).toContain(`per_page=${TOP_COINS_PAGE_SIZE}`);
    expect(fetchMock.mock.calls[0][0].toString()).toContain(`page=${FIRST_PAGE}`);
  });

  it("shows a loading state while the query is pending", () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => new Promise(() => {})),
    );

    renderWithClient(<CoinsPage />);

    expect(screen.getByTestId("coins-table")).toHaveAttribute("aria-busy", "true");
  });

  it("shows an error state when the request fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      }),
    );

    renderWithClient(<CoinsPage />);

    expect(await screen.findByText("Не вдалося завантажити криптовалюти")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/CoinGecko request failed with 500/)).toBeInTheDocument();
    });
  });
});
