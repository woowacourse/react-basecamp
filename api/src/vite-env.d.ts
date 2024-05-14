/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_USER_ID: string;
  readonly VITE_USER_PASSWORD: string;
  // 다른 환경 변수들도 여기에 추가할 수 있습니다.
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
