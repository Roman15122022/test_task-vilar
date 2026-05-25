import { Alert, Space, Typography } from "antd";
import type { TablePaginationConfig } from "antd";
import type { ReactElement } from "react";
import { useSearchParams } from "react-router-dom";
import { CoinsTable } from "@/features/coins/components/CoinsTable";
import { keepPreviousData, useCoinsQuery } from "@/features/coins/hooks/useCoinsQuery";
import {
  FIRST_PAGE,
  PAGINATED_COINS_PAGE_SIZE,
  PAGINATED_COINS_TOTAL_PAGES,
} from "@/shared/constants/api";
import { normalizePage } from "@/shared/utils/pagination";

const { Paragraph, Title } = Typography;
const TOTAL_ITEMS = PAGINATED_COINS_PAGE_SIZE * PAGINATED_COINS_TOTAL_PAGES;

function CoinsPagedPage(): ReactElement {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = normalizePage(searchParams.get("page"));
  const {
    data = [],
    error,
    isError,
    isFetching,
    isPending,
  } = useCoinsQuery(
    { page, perPage: PAGINATED_COINS_PAGE_SIZE },
    { placeholderData: keepPreviousData },
  );

  function handleTableChange(pagination: TablePaginationConfig) {
    setSearchParams({ page: String(pagination.current ?? FIRST_PAGE) });
  }

  return (
    <Space orientation="vertical" size="large">
      <div>
        <Title level={2}>Криптовалюти з пагінацією</Title>
        <Paragraph type="secondary">
          Server-side пагінація по {PAGINATED_COINS_PAGE_SIZE} монет із фіксованими{" "}
          {PAGINATED_COINS_TOTAL_PAGES} сторінками.
        </Paragraph>
      </div>
      {isError ? (
        <Alert
          description={error.message}
          showIcon
          title="Не вдалося завантажити сторінку криптовалют"
          type="error"
        />
      ) : (
        <CoinsTable
          coins={data}
          loading={isPending || isFetching}
          onChange={handleTableChange}
          pagination={{
            current: page,
            pageSize: PAGINATED_COINS_PAGE_SIZE,
            placement: ["bottomEnd"],
            responsive: true,
            showSizeChanger: false,
            total: TOTAL_ITEMS,
          }}
        />
      )}
    </Space>
  );
}

export default CoinsPagedPage;
