import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './src/mocks/server';

// 모든 테스트 케이스가 실행되기 전에 한 번 실행되는 함수
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

// 각 테스트 케이스가 종료된 후에 실행되는 함수
afterEach(() => {
  server.resetHandlers();
});

// 모든 테스트 케이스가 종료된 후에 한 번 실행되는 함수
afterAll(() => {
  server.close();
});
