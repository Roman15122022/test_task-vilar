import { Alert, Space, Typography } from "antd";
import { useMemo, useState } from "react";
import { ChartControls } from "@/components/ChartControls.jsx";
import { PriceChart } from "@/components/PriceChart.jsx";
import { useCoinChartQuery } from "@/hooks/useCoinChartQuery.js";
import { mapMarketChartPrices } from "@/utils/chartData.js";

const { Paragraph, Title } = Typography;

function Chart() {
    const [coinId, setCoinId] = useState("bitcoin");
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
        <Space orientation="vertical" size="large" style={{ display: "flex" }}>
            <div>
                <Title level={2}>Графік курсу</Title>
                <Paragraph type="secondary">
                    Ціна за останні 7 днів з автооновленням кожні 15 секунд.
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

export default Chart;
