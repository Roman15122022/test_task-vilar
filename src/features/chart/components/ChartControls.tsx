import ReloadOutlined from "@ant-design/icons/es/icons/ReloadOutlined";
import { Button, Segmented, Space } from "antd";
import type { ReactElement } from "react";
import { chartCoins } from "@/shared/constants/chart";
import type { ChartCoinId } from "@/shared/constants/chart";

type ChartControlsProps = {
  coinId: ChartCoinId;
  onCoinChange: (coinId: ChartCoinId) => void;
  onRefresh: () => void;
  refreshing: boolean;
};

export function ChartControls({
  coinId,
  onCoinChange,
  onRefresh,
  refreshing,
}: ChartControlsProps): ReactElement {
  return (
    <Space size="middle">
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
