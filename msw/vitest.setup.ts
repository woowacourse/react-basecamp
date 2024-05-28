import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./src/mocks/server"; // MSW 라이브러리에서 제공하는 모의 서버 객체

// 모든 테스트 케이스가 실행되기 전에 한 번 실행되는 함수
// MSW 서버를 시작
beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});

// 각 테스트 케이스가 종료된 후에 실행되는 함수
// MSW 서버의 모든 요청 핸들러를 초기화
afterEach(() => {
  server.resetHandlers();
});

// 모든 테스트 케이스가 종료된 후에 한 번 실행되는 함수
// MSW 서버를 종료
afterAll(() => {
  server.close();
});
