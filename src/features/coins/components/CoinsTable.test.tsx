import { render, screen } from "@testing-library/react";
import { CoinsTable } from "@/features/coins/components/CoinsTable";

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
  {
    id: "ethereum",
    current_price: 3510,
    image: "/ethereum.png",
    market_cap: 421_000_000_000,
    market_cap_rank: 2,
    name: "Ethereum",
    price_change_percentage_24h: 2.4,
    symbol: "eth",
    total_volume: 18_000_000_000,
  },
];

describe("CoinsTable", () => {
  it("renders the required columns and formatted values", () => {
    render(<CoinsTable coins={coins} />);

    ["#", "Назва", "Ціна", "24h %", "Market cap", "Обʼєм 24h"].forEach((label) => {
      expect(screen.getByRole("columnheader", { name: label })).toBeInTheDocument();
    });

    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    expect(screen.getByText("BTC")).toBeInTheDocument();
    expect(screen.getByText("$74,713")).toBeInTheDocument();
    expect(screen.getByText("-3.39%")).toBeInTheDocument();
    expect(screen.getByText("$1.49T")).toBeInTheDocument();
    expect(screen.getByText("$32.45B")).toBeInTheDocument();
  });

  it("marks loading state and colors percentage changes", () => {
    render(<CoinsTable coins={coins} loading />);

    expect(screen.getByTestId("coins-table")).toHaveAttribute("aria-busy", "true");
    expect(screen.getByTestId("coin-change-bitcoin")).toHaveAttribute("data-change", "negative");
    expect(screen.getByTestId("coin-change-ethereum")).toHaveAttribute("data-change", "positive");
  });
});
