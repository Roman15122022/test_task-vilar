import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import App from "@/App.jsx";
import "@/index.css";
import { queryClient } from "@/queryClient.js";
import { theme } from "@/theme.js";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ConfigProvider theme={theme}>
                <App />
            </ConfigProvider>
        </QueryClientProvider>
    </StrictMode>,
);
