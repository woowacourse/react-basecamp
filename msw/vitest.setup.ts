import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./src/mocks/server";

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});

// 각 TC 종료시마다 MSW 서버의 모든 요청 핸들러를 초기화
afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
