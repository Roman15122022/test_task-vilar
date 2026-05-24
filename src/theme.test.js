import { theme } from "@/theme.js";

describe("theme", () => {
    it("configures the requested global Ant Design tokens", () => {
        expect(theme.token.colorPrimary).toBe("#1677ff");
        expect(theme.components.Button.borderRadius).toBeGreaterThan(0);
        expect(theme.components.Table.headerBg).toBe("#1f2937");
        expect(theme.components.Table.headerColor).toBe("#ffffff");
        expect(theme.components.Table.rowHoverBg).toBe("#eff6ff");
        expect(theme.components.Table.cellPaddingBlock).toBeLessThan(16);
    });
});
