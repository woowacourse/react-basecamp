import { server } from "./src/mocks/server";

// server: MSW 라이브러리에서 제공하는 모의 서버 객체
// beforeAll: 테스트가 시작되기 전에 한 번 실행되며, MSW 서버 시작
// afterEach: 각 테스트 케이스가 끝난 후 실행되며, MSW 서버의 모든 요청 핸들러 초기화
// afterAll: 모든 테스트가 종료된 후 한 번 실행되며, MSW 서버 종료

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
