import { fileURLToPath, URL } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "es-toolkit/compat/get": fileURLToPath(
        new URL("./src/shared/compat-shims/get.ts", import.meta.url),
      ),
      "es-toolkit/compat/omit": fileURLToPath(
        new URL("./src/shared/compat-shims/omit.ts", import.meta.url),
      ),
      "es-toolkit/compat/range": fileURLToPath(
        new URL("./src/shared/compat-shims/range.ts", import.meta.url),
      ),
      "es-toolkit/compat/last": fileURLToPath(
        new URL("./src/shared/compat-shims/last.ts", import.meta.url),
      ),
      "es-toolkit/compat/maxBy": fileURLToPath(
        new URL("./src/shared/compat-shims/maxBy.ts", import.meta.url),
      ),
      "es-toolkit/compat/minBy": fileURLToPath(
        new URL("./src/shared/compat-shims/minBy.ts", import.meta.url),
      ),
      "es-toolkit/compat/uniqBy": fileURLToPath(
        new URL("./src/shared/compat-shims/uniqBy.ts", import.meta.url),
      ),
      "es-toolkit/compat/sortBy": fileURLToPath(
        new URL("./src/shared/compat-shims/sortBy.ts", import.meta.url),
      ),
      "es-toolkit/compat/isPlainObject": fileURLToPath(
        new URL("./src/shared/compat-shims/isPlainObject.ts", import.meta.url),
      ),
      "es-toolkit/compat/sumBy": fileURLToPath(
        new URL("./src/shared/compat-shims/sumBy.ts", import.meta.url),
      ),
      "es-toolkit/compat/throttle": fileURLToPath(
        new URL("./src/shared/compat-shims/throttle.ts", import.meta.url),
      ),
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
