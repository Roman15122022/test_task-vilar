import { Alert, Space, Typography } from "antd";
import type { ReactElement } from "react";
import { CoinsTable } from "@/features/coins/components/CoinsTable";
import { useCoinsQuery } from "@/features/coins/hooks/useCoinsQuery";
import { FIRST_PAGE, TOP_COINS_PAGE_SIZE } from "@/shared/constants/api";

const { Paragraph, Title } = Typography;

function CoinsPage(): ReactElement {
  const {
    data = [],
    error,
    isError,
    isPending,
  } = useCoinsQuery({
    page: FIRST_PAGE,
    perPage: TOP_COINS_PAGE_SIZE,
  });

  return (
    <Space orientation="vertical" size="large">
      <div>
        <Title level={2}>Топ криптовалют</Title>
        <Paragraph type="secondary">
          Перші {TOP_COINS_PAGE_SIZE} монет за капіталізацією з публічного CoinGecko API.
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

export default CoinsPage;
