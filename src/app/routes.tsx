import DollarCircleOutlined from "@ant-design/icons/es/icons/DollarCircleOutlined";
import FormOutlined from "@ant-design/icons/es/icons/FormOutlined";
import HomeOutlined from "@ant-design/icons/es/icons/HomeOutlined";
import LineChartOutlined from "@ant-design/icons/es/icons/LineChartOutlined";
import TableOutlined from "@ant-design/icons/es/icons/TableOutlined";
import type { ReactElement } from "react";
import ChartPage from "@/pages/chart/ChartPage";
import CoinsPage from "@/pages/coins/CoinsPage";
import CoinsPagedPage from "@/pages/coins-paged/CoinsPagedPage";
import HomePage from "@/pages/home/HomePage";
import WizardPage from "@/pages/wizard/WizardPage";

export type AppRoute = {
  path: string;
  label: string;
  icon: ReactElement;
  element: ReactElement;
};

export const routes: AppRoute[] = [
  { path: "/", label: "Home", icon: <HomeOutlined />, element: <HomePage /> },
  { path: "/coins", label: "Coins", icon: <DollarCircleOutlined />, element: <CoinsPage /> },
  {
    path: "/coins-paged",
    label: "Coins Paged",
    icon: <TableOutlined />,
    element: <CoinsPagedPage />,
  },
  { path: "/chart", label: "Chart", icon: <LineChartOutlined />, element: <ChartPage /> },
  { path: "/wizard", label: "Wizard", icon: <FormOutlined />, element: <WizardPage /> },
];
