import get from "@/shared/compat-shims/get";

describe("get compat shim", () => {
  it("reads dotted paths, indexed paths, direct indexes and defaults", () => {
    const value = {
      items: [{ name: "Bitcoin" }],
      nested: {
        displayName: "LineChart",
      },
    };

    expect(get(value, "nested.displayName")).toBe("LineChart");
    expect(get(value, "items[0].name")).toBe("Bitcoin");
    expect(get(["btc", "eth"], 1)).toBe("eth");
    expect(get(value, "missing.value", "fallback")).toBe("fallback");
  });

  it("does not traverse unsafe object keys", () => {
    expect(get({ safe: true }, "__proto__.polluted", "fallback")).toBe("fallback");
  });
});
