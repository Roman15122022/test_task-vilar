import { MemoryRouter, Route, Routes } from "react-router-dom";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CoinsPaged from "@/pages/CoinsPaged.jsx";
import { renderWithClient } from "@/test/renderWithClient.jsx";
import { normalizePage } from "@/utils/pagination.js";

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
                <Route path="/coins-paged" element={<CoinsPaged />} />
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
        expect(normalizePage("abc")).toBe(1);
        expect(normalizePage("-1")).toBe(1);
    });

    it("loads the page from URL search params", async () => {
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => coins,
        });
        vi.stubGlobal("fetch", fetchMock);

        renderPage("/coins-paged?page=2");

        expect(await screen.findByText("Bitcoin")).toBeInTheDocument();
        expect(fetchMock.mock.calls[0][0].toString()).toContain("per_page=20");
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
        expect(fetchMock.mock.calls[0][0].toString()).toContain("page=1");
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
