import { getCountryLabel } from "@/features/wizard/utils/wizardForm";

describe("wizard form utilities", () => {
  it("maps country values to labels", () => {
    expect(getCountryLabel("ua")).toBe("Україна");
    expect(getCountryLabel("unknown")).toBe("unknown");
  });
});
