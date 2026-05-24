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
import { formatCurrency } from "@/utils/formatters.js";

export function PriceChart({ data, loading = false }) {
    return (
        <div aria-busy={loading} data-testid="price-chart">
            <Spin spinning={loading}>
                <div style={{ height: 360, minWidth: 0, width: "100%" }}>
                    <ResponsiveContainer height="100%" width="100%">
                        <LineChart data={data} margin={{ bottom: 8, left: 8, right: 16, top: 16 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="label" minTickGap={24} />
                            <YAxis
                                domain={["auto", "auto"]}
                                tickFormatter={formatCurrency}
                                width={88}
                            />
                            <Tooltip
                                formatter={(value) => [formatCurrency(value), "Ціна"]}
                                labelFormatter={(_, payload) =>
                                    payload?.[0]?.payload?.timestamp
                                        ? new Date(payload[0].payload.timestamp).toLocaleString(
                                              "uk-UA",
                                          )
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
