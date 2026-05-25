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
import { formatChartDate } from "@/features/chart/utils/chartData";
import type { ChartPoint } from "@/features/chart/utils/chartData";
import { FIRST_TOOLTIP_PAYLOAD_INDEX } from "@/shared/constants/chart";
import { formatCurrency } from "@/shared/utils/formatters";

const CHART_HEIGHT = 360;
const CHART_MARGIN = { bottom: 8, left: 8, right: 16, top: 16 };
const CHART_TICK_GAP = 28;
const ACTIVE_DOT_RADIUS = 5;

type PriceChartProps = {
  data: ChartPoint[];
  loading?: boolean;
};

export function PriceChart({ data, loading = false }: PriceChartProps): ReactElement {
  return (
    <div aria-busy={loading} data-testid="price-chart">
      <Spin spinning={loading}>
        <div>
          <ResponsiveContainer
            height={CHART_HEIGHT}
            minHeight={CHART_HEIGHT}
            minWidth={0}
            width="100%"
          >
            <LineChart data={data} margin={CHART_MARGIN}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timestamp"
                domain={["dataMin", "dataMax"]}
                minTickGap={CHART_TICK_GAP}
                scale="time"
                tickFormatter={formatChartDate}
                type="number"
              />
              <YAxis domain={["auto", "auto"]} tickFormatter={formatCurrency} width={88} />
              <Tooltip
                formatter={(value) => [formatCurrency(Number(value)), "Ціна"]}
                labelFormatter={(label, payload) => {
                  const timestamp =
                    payload?.[FIRST_TOOLTIP_PAYLOAD_INDEX]?.payload?.timestamp ?? Number(label);

                  return Number.isFinite(timestamp)
                    ? new Date(timestamp).toLocaleString("uk-UA")
                    : "";
                }}
              />
              <Line
                activeDot={{ r: ACTIVE_DOT_RADIUS }}
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
