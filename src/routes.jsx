import DollarCircleOutlined from "@ant-design/icons/es/icons/DollarCircleOutlined";
import HomeOutlined from "@ant-design/icons/es/icons/HomeOutlined";
import TableOutlined from "@ant-design/icons/es/icons/TableOutlined";
import Coins from "@/pages/Coins.jsx";
import CoinsPaged from "@/pages/CoinsPaged.jsx";
import Home from "@/pages/Home.jsx";

export const routes = [
    { path: "/", label: "Home", icon: <HomeOutlined />, element: <Home /> },
    { path: "/coins", label: "Coins", icon: <DollarCircleOutlined />, element: <Coins /> },
    {
        path: "/coins-paged",
        label: "Coins Paged",
        icon: <TableOutlined />,
        element: <CoinsPaged />,
    },
];
