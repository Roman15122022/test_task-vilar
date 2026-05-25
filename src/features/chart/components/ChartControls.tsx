import ReloadOutlined from "@ant-design/icons/es/icons/ReloadOutlined";
import { Button, Segmented, Space } from "antd";
import { chartCoins } from "@/shared/constants/chart";
import type { ChartCoinId } from "@/shared/constants/chart";

type ChartControlsProps = {
  coinId: ChartCoinId;
  onCoinChange: (coinId: ChartCoinId) => void;
  onRefresh: () => void;
  refreshing: boolean;
};

export function ChartControls({ coinId, onCoinChange, onRefresh, refreshing }: ChartControlsProps) {
  return (
    <Space
      size="middle"
      style={{ flexWrap: "wrap", justifyContent: "space-between", width: "100%" }}
    >
      <Segmented
        options={[...chartCoins]}
        value={coinId}
        onChange={(value) => onCoinChange(value as ChartCoinId)}
      />
      <Button icon={<ReloadOutlined />} loading={refreshing} onClick={onRefresh} type="primary">
        Оновити
      </Button>
    </Space>
  );
}
