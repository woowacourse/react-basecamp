import { mergeConfig } from "vite";
import { defineConfig } from "vitest/config";
import viteConfig from "../coupons/vite.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./vitest.setup.ts"],
    },
  })
);
