import {
  PRIMARY_COLOR,
  TABLE_HEADER_BACKGROUND,
  TABLE_HEADER_ICON_COLOR,
  TABLE_HEADER_TEXT_COLOR,
  TABLE_ROW_HOVER_BACKGROUND,
  theme,
} from "@/app/theme";

describe("theme", () => {
  it("configures the requested global Ant Design tokens", () => {
    expect(PRIMARY_COLOR).toBe("#1890ff");
    expect(theme.token.colorPrimary).toBe(PRIMARY_COLOR);
    expect(theme.components.Button.borderRadius).toBeGreaterThan(0);
    expect(theme.components.Layout.headerBg).toBe(PRIMARY_COLOR);
    expect(theme.components.Layout.headerColor).toBe(TABLE_HEADER_TEXT_COLOR);
    expect(TABLE_HEADER_BACKGROUND).toBe(PRIMARY_COLOR);
    expect(theme.components.Table.headerBg).toBe(TABLE_HEADER_BACKGROUND);
    expect(theme.components.Table.headerColor).toBe(TABLE_HEADER_TEXT_COLOR);
    expect(theme.components.Table.headerIconColor).toBe(TABLE_HEADER_ICON_COLOR);
    expect(theme.components.Table.headerSortActiveBg).toBe(TABLE_HEADER_BACKGROUND);
    expect(theme.components.Table.headerSortHoverBg).toBe(TABLE_HEADER_BACKGROUND);
    expect(theme.components.Table.rowHoverBg).toBe(TABLE_ROW_HOVER_BACKGROUND);
    expect(theme.components.Table.cellPaddingBlock).toBe(10);
  });
});
