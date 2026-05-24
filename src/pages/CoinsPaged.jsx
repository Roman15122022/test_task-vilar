import { Alert, Space, Typography } from "antd";
import { useSearchParams } from "react-router-dom";
import { CoinsTable } from "@/components/CoinsTable.jsx";
import { keepPreviousData, useCoinsQuery } from "@/hooks/useCoinsQuery.js";
import { normalizePage } from "@/utils/pagination.js";

const { Paragraph, Title } = Typography;
const PAGE_SIZE = 20;
const TOTAL_PAGES = 20;
const TOTAL_ITEMS = PAGE_SIZE * TOTAL_PAGES;

function CoinsPaged() {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = normalizePage(searchParams.get("page"));
    const {
        data = [],
        error,
        isError,
        isFetching,
        isPending,
    } = useCoinsQuery({ page, perPage: PAGE_SIZE }, { placeholderData: keepPreviousData });

    function handleTableChange(pagination) {
        setSearchParams({ page: String(pagination.current ?? 1) });
    }

    return (
        <Space orientation="vertical" size="large" style={{ display: "flex" }}>
            <div>
                <Title level={2}>Криптовалюти з пагінацією</Title>
                <Paragraph type="secondary">
                    Server-side пагінація по 20 монет із фіксованими 20 сторінками.
                </Paragraph>
            </div>
            {isError ? (
                <Alert
                    description={error.message}
                    message="Не вдалося завантажити сторінку криптовалют"
                    showIcon
                    type="error"
                />
            ) : (
                <CoinsTable
                    coins={data}
                    loading={isPending || isFetching}
                    onChange={handleTableChange}
                    pagination={{
                        current: page,
                        pageSize: PAGE_SIZE,
                        placement: ["bottomRight"],
                        responsive: true,
                        showSizeChanger: false,
                        total: TOTAL_ITEMS,
                    }}
                />
            )}
        </Space>
    );
}

export default CoinsPaged;
