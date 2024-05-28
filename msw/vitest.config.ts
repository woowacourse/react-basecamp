import { mergeConfig } from "vite";
import viteConfig from "./vite.config.ts";
import { defineConfig } from "vitest/config";

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
