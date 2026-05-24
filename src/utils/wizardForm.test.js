import { getCountryLabel } from "@/utils/wizardForm.js";

describe("wizard form utilities", () => {
    it("maps country values to labels", () => {
        expect(getCountryLabel("ua")).toBe("Україна");
        expect(getCountryLabel("unknown")).toBe("unknown");
    });
});
