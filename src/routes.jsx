import DollarCircleOutlined from "@ant-design/icons/es/icons/DollarCircleOutlined";
import FormOutlined from "@ant-design/icons/es/icons/FormOutlined";
import HomeOutlined from "@ant-design/icons/es/icons/HomeOutlined";
import LineChartOutlined from "@ant-design/icons/es/icons/LineChartOutlined";
import TableOutlined from "@ant-design/icons/es/icons/TableOutlined";
import Chart from "@/pages/Chart.jsx";
import Coins from "@/pages/Coins.jsx";
import CoinsPaged from "@/pages/CoinsPaged.jsx";
import Home from "@/pages/Home.jsx";
import Wizard from "@/pages/Wizard.jsx";

export const routes = [
    { path: "/", label: "Home", icon: <HomeOutlined />, element: <Home /> },
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
