const COINGECKO_API_URL = "https://api.coingecko.com/api/v3";

export const coinKeys = {
    all: ["coins"],
    markets: ({ page, perPage }) => [...coinKeys.all, "markets", { page, perPage }],
};

export async function fetchJson(path, params = {}) {
    const url = new URL(`${COINGECKO_API_URL}${path}`);

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            url.searchParams.set(key, String(value));
        }
    });

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`CoinGecko request failed with ${response.status}`);
    }

    return response.json();
}

export function getCoinsMarkets({ page = 1, perPage = 50 } = {}) {
    return fetchJson("/coins/markets", {
        page,
        per_page: perPage,
        vs_currency: "usd",
    });
}
