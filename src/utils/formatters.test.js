import { formatCompactCurrency, formatCurrency, formatPercent } from "@/utils/formatters.js";

describe("formatters", () => {
    it("formats CoinGecko values for table cells", () => {
        expect(formatCurrency(74713.42)).toBe("$74,713");
        expect(formatPercent(-3.394)).toBe("-3.39%");
        expect(formatCompactCurrency(1_490_000_000_000)).toBe("$1.49T");
        expect(formatCompactCurrency(32_450_000_000)).toBe("$32.45B");
    });
});
