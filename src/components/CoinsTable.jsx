import { Avatar, Space, Table, Typography } from "antd";
import { formatCompactCurrency, formatCurrency, formatPercent } from "@/utils/formatters.js";

const { Text } = Typography;

function getChangeColor(value) {
    return value >= 0 ? "#16a34a" : "#dc2626";
}

export function CoinsTable({ coins, loading = false, pagination = false, onChange }) {
    const columns = [
        {
            dataIndex: "market_cap_rank",
            fixed: "left",
            sorter: (a, b) => a.market_cap_rank - b.market_cap_rank,
            title: "#",
            width: 72,
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
            width: 220,
        },
        {
            align: "right",
            dataIndex: "current_price",
            render: formatCurrency,
            sorter: (a, b) => a.current_price - b.current_price,
            title: "Ціна",
            width: 140,
        },
        {
            align: "right",
            dataIndex: "price_change_percentage_24h",
            render: (value, coin) => (
                <span
                    data-testid={`coin-change-${coin.id}`}
                    style={{ color: getChangeColor(value), fontWeight: 600 }}
                >
                    {formatPercent(value)}
                </span>
            ),
            sorter: (a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h,
            title: "24h %",
            width: 120,
        },
        {
            align: "right",
            dataIndex: "market_cap",
            render: formatCompactCurrency,
            sorter: (a, b) => a.market_cap - b.market_cap,
            title: "Market cap",
            width: 160,
        },
        {
            align: "right",
            dataIndex: "total_volume",
            render: formatCompactCurrency,
            sorter: (a, b) => a.total_volume - b.total_volume,
            title: "Обʼєм 24h",
            width: 160,
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
