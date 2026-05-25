export const PRIMARY_COLOR = "#1890ff";
export const TABLE_HEADER_BACKGROUND = PRIMARY_COLOR;
export const TABLE_HEADER_TEXT_COLOR = "#ffffff";
export const TABLE_HEADER_ICON_COLOR = "rgba(255, 255, 255, 0.68)";
export const TABLE_ROW_HOVER_BACKGROUND = "#f0f7ff";

export const theme = {
  token: {
    colorPrimary: PRIMARY_COLOR,
    borderRadius: 8,
  },
  components: {
    Button: {
      borderRadius: 8,
      borderRadiusLG: 10,
      borderRadiusSM: 6,
    },
    Layout: {
      headerBg: PRIMARY_COLOR,
      headerColor: TABLE_HEADER_TEXT_COLOR,
    },
    Table: {
      headerBg: TABLE_HEADER_BACKGROUND,
      headerColor: TABLE_HEADER_TEXT_COLOR,
      headerIconColor: TABLE_HEADER_ICON_COLOR,
      headerIconHoverColor: TABLE_HEADER_TEXT_COLOR,
      headerSortActiveBg: TABLE_HEADER_BACKGROUND,
      headerSortHoverBg: TABLE_HEADER_BACKGROUND,
      rowHoverBg: TABLE_ROW_HOVER_BACKGROUND,
      cellPaddingBlock: 10,
      cellPaddingBlockSM: 8,
      cellPaddingInline: 12,
      cellPaddingInlineSM: 10,
    },
  },
};
