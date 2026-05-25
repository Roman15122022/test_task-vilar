import { fileURLToPath, URL } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  ssr: {
    noExternal: ["antd", /^@ant-design/, /^@rc-component/, /^rc-/],
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/shared/test/setup.ts",
    deps: {
      optimizer: {
        client: {
          enabled: true,
          include: [
            "antd",
            "@ant-design/icons",
            "@ant-design/colors",
            "@ant-design/cssinjs",
            "@ant-design/cssinjs-utils",
            "@rc-component/notification",
            "@rc-component/util",
          ],
        },
      },
    },
    server: {
      deps: {
        inline: [
          "antd",
          "@ant-design/icons",
          "@ant-design/colors",
          "@ant-design/cssinjs",
          "@ant-design/cssinjs-utils",
          /\/node_modules\/@rc-component\//,
          /\/node_modules\/rc-/,
        ],
      },
    },
  },
});
