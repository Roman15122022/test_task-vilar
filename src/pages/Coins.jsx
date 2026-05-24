import { Alert, Space, Typography } from "antd";
import { CoinsTable } from "@/components/CoinsTable.jsx";
import { useCoinsQuery } from "@/hooks/useCoinsQuery.js";

const { Paragraph, Title } = Typography;

function Coins() {
    const { data = [], error, isError, isPending } = useCoinsQuery({ page: 1, perPage: 50 });

    return (
        <Space orientation="vertical" size="large" style={{ display: "flex" }}>
            <div>
                <Title level={2}>Топ криптовалют</Title>
                <Paragraph type="secondary">
                    Перші 50 монет за капіталізацією з публічного CoinGecko API.
                </Paragraph>
            </div>
            {isError ? (
                <Alert
                    description={error.message}
                    message="Не вдалося завантажити криптовалюти"
                    showIcon
                    type="error"
                />
            ) : (
                <CoinsTable coins={data} loading={isPending} />
            )}
        </Space>
    );
}

export default Coins;
