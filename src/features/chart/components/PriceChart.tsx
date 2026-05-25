import { Spin } from "antd";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ReactElement } from "react";
import type { ChartPoint } from "@/features/chart/utils/chartData";
import { FIRST_TOOLTIP_PAYLOAD_INDEX } from "@/shared/constants/chart";
import { formatCurrency } from "@/shared/utils/formatters";

const CHART_HEIGHT = 360;
const CHART_MARGIN = { bottom: 8, left: 8, right: 16, top: 16 };

type PriceChartProps = {
  data: ChartPoint[];
  loading?: boolean;
};

export function PriceChart({ data, loading = false }: PriceChartProps): ReactElement {
  return (
    <div aria-busy={loading} data-testid="price-chart">
      <Spin spinning={loading}>
        <div style={{ minHeight: CHART_HEIGHT, minWidth: 0, width: "100%" }}>
          <ResponsiveContainer
            height={CHART_HEIGHT}
            minHeight={CHART_HEIGHT}
            minWidth={0}
            width="100%"
          >
            <LineChart data={data} margin={CHART_MARGIN}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" minTickGap={24} />
              <YAxis domain={["auto", "auto"]} tickFormatter={formatCurrency} width={88} />
              <Tooltip
                formatter={(value) => [formatCurrency(Number(value)), "Ціна"]}
                labelFormatter={(_, payload) =>
                  payload?.[FIRST_TOOLTIP_PAYLOAD_INDEX]?.payload?.timestamp
                    ? new Date(
                        payload[FIRST_TOOLTIP_PAYLOAD_INDEX].payload.timestamp,
                      ).toLocaleString("uk-UA")
                    : ""
                }
              />
              <Line
                dataKey="price"
                dot={false}
                isAnimationActive={false}
                stroke="#1677ff"
                strokeWidth={2}
                type="monotone"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Spin>
    </div>
  );
}
