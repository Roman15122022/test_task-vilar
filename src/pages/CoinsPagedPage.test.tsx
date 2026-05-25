import { MemoryRouter, Route, Routes } from "react-router-dom";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CoinsPagedPage from "@/pages/CoinsPagedPage";
import { FIRST_PAGE, PAGINATED_COINS_PAGE_SIZE } from "@/shared/constants/api";
import { renderWithClient } from "@/shared/test/renderWithClient";
import { normalizePage } from "@/shared/utils/pagination";

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

function renderPage(initialEntry = "/coins-paged") {
  return renderWithClient(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/coins-paged" element={<CoinsPagedPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("CoinsPaged page", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("normalizes invalid pages", () => {
    expect(normalizePage("2")).toBe(2);
    expect(normalizePage("abc")).toBe(FIRST_PAGE);
    expect(normalizePage("-1")).toBe(FIRST_PAGE);
  });

  it("loads the page from URL search params", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => coins,
    });
    vi.stubGlobal("fetch", fetchMock);

    renderPage("/coins-paged?page=2");

    expect(await screen.findByText("Bitcoin")).toBeInTheDocument();
    expect(fetchMock.mock.calls[0][0].toString()).toContain(
      `per_page=${PAGINATED_COINS_PAGE_SIZE}`,
    );
    expect(fetchMock.mock.calls[0][0].toString()).toContain("page=2");
  });

  it("falls back to page 1 for invalid URL params", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => coins,
    });
    vi.stubGlobal("fetch", fetchMock);

    renderPage("/coins-paged?page=nope");

    expect(await screen.findByText("Bitcoin")).toBeInTheDocument();
    expect(fetchMock.mock.calls[0][0].toString()).toContain(`page=${FIRST_PAGE}`);
  });

  it("updates the query when pagination changes", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => coins,
    });
    vi.stubGlobal("fetch", fetchMock);

    renderPage("/coins-paged?page=1");

    expect(await screen.findByText("Bitcoin")).toBeInTheDocument();
    await user.click(screen.getByTitle("2"));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });
    expect(fetchMock.mock.calls[1][0].toString()).toContain("page=2");
  });
});
