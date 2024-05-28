// Vite 설정과 Vitest 설정을 병합
import { mergeConfig } from "vite";
import { defineConfig } from "vitest/config";
import viteConfig from "./vite.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./vitest.setup.ts"], //테스트 실행 전에 자동으로 불러올 설정 파일을 지정
    },
  })
);
