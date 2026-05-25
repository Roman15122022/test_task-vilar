import { Alert, Space, Typography } from "antd";
import type { ReactElement } from "react";
import { useMemo, useState } from "react";
import { ChartControls } from "@/features/chart/components/ChartControls";
import { PriceChart } from "@/features/chart/components/PriceChart";
import { useCoinChartQuery } from "@/features/chart/hooks/useCoinChartQuery";
import { mapMarketChartPrices } from "@/features/chart/utils/chartData";
import {
  CHART_REFETCH_INTERVAL_MS,
  COINGECKO_MARKET_CHART_DAYS,
  MILLISECONDS_PER_SECOND,
} from "@/shared/constants/api";
import { DEFAULT_CHART_COIN_ID } from "@/shared/constants/chart";

const { Paragraph, Title } = Typography;

function ChartPage(): ReactElement {
  const [coinId, setCoinId] = useState(DEFAULT_CHART_COIN_ID);
  const [manualRefreshing, setManualRefreshing] = useState(false);
  const { data, error, isError, isPending, refetch } = useCoinChartQuery(coinId);
  const chartData = useMemo(() => mapMarketChartPrices(data?.prices), [data]);

  async function handleRefresh() {
    setManualRefreshing(true);

    try {
      await refetch();
    } finally {
      setManualRefreshing(false);
    }
  }

  return (
    <Space orientation="vertical" size="large">
      <div>
        <Title level={2}>Графік курсу</Title>
        <Paragraph type="secondary">
          Ціна за останні {COINGECKO_MARKET_CHART_DAYS} днів з автооновленням кожні{" "}
          {CHART_REFETCH_INTERVAL_MS / MILLISECONDS_PER_SECOND} секунд.
        </Paragraph>
      </div>
      <ChartControls
        coinId={coinId}
        onCoinChange={setCoinId}
        onRefresh={handleRefresh}
        refreshing={manualRefreshing}
      />
      {isError ? (
        <Alert
          description={error.message}
          message="Не вдалося завантажити графік"
          showIcon
          type="error"
        />
      ) : (
        <PriceChart data={chartData} loading={isPending || manualRefreshing} />
      )}
    </Space>
  );
}

export default ChartPage;
