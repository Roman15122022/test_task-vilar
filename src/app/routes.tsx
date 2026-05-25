import DollarCircleOutlined from "@ant-design/icons/es/icons/DollarCircleOutlined";
import FormOutlined from "@ant-design/icons/es/icons/FormOutlined";
import HomeOutlined from "@ant-design/icons/es/icons/HomeOutlined";
import LineChartOutlined from "@ant-design/icons/es/icons/LineChartOutlined";
import TableOutlined from "@ant-design/icons/es/icons/TableOutlined";
import type { ReactElement } from "react";
import HomePage from "@/app/pages/HomePage";
import Chart from "@/features/chart/pages/Chart";
import Coins from "@/features/coins/pages/Coins";
import CoinsPaged from "@/features/coins/pages/CoinsPaged";
import Wizard from "@/features/wizard/pages/Wizard";

export type AppRoute = {
  path: string;
  label: string;
  icon: ReactElement;
  element: ReactElement;
};

export const routes: AppRoute[] = [
  { path: "/", label: "Home", icon: <HomeOutlined />, element: <HomePage /> },
  { path: "/coins", label: "Coins", icon: <DollarCircleOutlined />, element: <Coins /> },
  {
    path: "/coins-paged",
    label: "Coins Paged",
    icon: <TableOutlined />,
    element: <CoinsPaged />,
  },
  { path: "/chart", label: "Chart", icon: <LineChartOutlined />, element: <Chart /> },
  { path: "/wizard", label: "Wizard", icon: <FormOutlined />, element: <Wizard /> },
];
