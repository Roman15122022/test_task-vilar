import { Avatar, Space, Table, Typography } from "antd";
import type { TablePaginationConfig, TableProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { ReactElement } from "react";
import type { CoinMarket } from "@/shared/api/coingecko";
import { formatCompactCurrency, formatCurrency, formatPercent } from "@/shared/utils/formatters";

const { Text } = Typography;

const COLUMN_WIDTHS = {
  name: 220,
  percent: 120,
  price: 140,
  rank: 72,
  value: 160,
} as const;

function getChangeState(value: number | null): "positive" | "negative" {
  return (value ?? 0) >= 0 ? "positive" : "negative";
}

type CoinsTableProps = {
  coins: CoinMarket[];
  loading?: boolean;
  onChange?: TableProps<CoinMarket>["onChange"];
  pagination?: false | TablePaginationConfig;
};

export function CoinsTable({
  coins,
  loading = false,
  pagination = false,
  onChange,
}: CoinsTableProps): ReactElement {
  const columns: ColumnsType<CoinMarket> = [
    {
      dataIndex: "market_cap_rank",
      fixed: "left",
      sorter: (a, b) => (a.market_cap_rank ?? 0) - (b.market_cap_rank ?? 0),
      title: "#",
      width: COLUMN_WIDTHS.rank,
    },
    {
      dataIndex: "name",
      fixed: "left",
      render: (_, coin) => (
        <Space size="middle">
          <Avatar alt={coin.name} size={28} src={coin.image} />
          <Space orientation="vertical" size={0}>
            <Text strong>{coin.name}</Text>
            <Text type="secondary">{coin.symbol.toUpperCase()}</Text>
          </Space>
        </Space>
      ),
      title: "Назва",
      width: COLUMN_WIDTHS.name,
    },
    {
      align: "right",
      dataIndex: "current_price",
      render: formatCurrency,
      sorter: (a, b) => (a.current_price ?? 0) - (b.current_price ?? 0),
      title: "Ціна",
      width: COLUMN_WIDTHS.price,
    },
    {
      align: "right",
      dataIndex: "price_change_percentage_24h",
      render: (value, coin) => (
        <span data-change={getChangeState(value)} data-testid={`coin-change-${coin.id}`}>
          {formatPercent(value)}
        </span>
      ),
      sorter: (a, b) => (a.price_change_percentage_24h ?? 0) - (b.price_change_percentage_24h ?? 0),
      title: "24h %",
      width: COLUMN_WIDTHS.percent,
    },
    {
      align: "right",
      dataIndex: "market_cap",
      render: formatCompactCurrency,
      sorter: (a, b) => (a.market_cap ?? 0) - (b.market_cap ?? 0),
      title: "Market cap",
      width: COLUMN_WIDTHS.value,
    },
    {
      align: "right",
      dataIndex: "total_volume",
      render: formatCompactCurrency,
      sorter: (a, b) => (a.total_volume ?? 0) - (b.total_volume ?? 0),
      title: "Обʼєм 24h",
      width: COLUMN_WIDTHS.value,
    },
  ];

  return (
    <div aria-busy={loading} data-testid="coins-table">
      <Table
        columns={columns}
        dataSource={coins}
        loading={loading}
        onChange={onChange}
        pagination={pagination}
        rowKey="id"
        scroll={{ x: 920, y: 560 }}
        size="middle"
        sticky
      />
    </div>
  );
}
