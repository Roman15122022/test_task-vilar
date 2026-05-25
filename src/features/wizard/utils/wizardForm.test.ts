import {
  canSubmitWizardForm,
  getCountryLabel,
  normalizeAge,
  validateAge,
} from "@/features/wizard/utils/wizardForm";

describe("wizard form utilities", () => {
  it("maps country values to labels", () => {
    expect(getCountryLabel("ua")).toBe("Україна");
    expect(getCountryLabel("unknown")).toBe("unknown");
  });

  it("normalizes age input values", () => {
    expect(normalizeAge("")).toBeUndefined();
    expect(normalizeAge("28")).toBe(28);
  });

  it("validates age range with separate messages", async () => {
    await expect(validateAge(18)).resolves.toBeUndefined();
    await expect(validateAge(100)).resolves.toBeUndefined();
    await expect(validateAge(17)).rejects.toThrow("Мінімум 18");
    await expect(validateAge(101)).rejects.toThrow("Максимум 100");
  });

  it("detects whether the wizard form can be submitted", () => {
    expect(
      canSubmitWizardForm(
        {
          age: 28,
          country: "ua",
          email: "alex@example.com",
          name: "Alex",
        },
        [],
      ),
    ).toBe(true);

    expect(
      canSubmitWizardForm(
        {
          age: 101,
          country: "ua",
          email: "alex@example.com",
          name: "Alex",
        },
        [],
      ),
    ).toBe(false);

    expect(
      canSubmitWizardForm(
        {
          age: 28,
          country: "ua",
          email: "alex@example.com",
          name: "Alex",
        },
        [{ errors: ["Invalid"], name: ["email"], warnings: [] }],
      ),
    ).toBe(false);
  });
});
