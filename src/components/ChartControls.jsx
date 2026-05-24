import ReloadOutlined from "@ant-design/icons/es/icons/ReloadOutlined";
import { Button, Segmented, Space } from "antd";
import { chartCoins } from "@/utils/chartData.js";

export function ChartControls({ coinId, onCoinChange, onRefresh, refreshing }) {
    return (
        <Space
            size="middle"
            style={{ flexWrap: "wrap", justifyContent: "space-between", width: "100%" }}
        >
            <Segmented options={chartCoins} value={coinId} onChange={onCoinChange} />
            <Button
                icon={<ReloadOutlined />}
                loading={refreshing}
                onClick={onRefresh}
                type="primary"
            >
                Оновити
            </Button>
        </Space>
    );
}
