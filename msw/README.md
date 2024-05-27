# MSW 실습 가이드: 상품 목록 조회 및 무한 스크롤 페이지네이션 구현하기

이번 실습 가이드에서는 Vitest, MSW를 활용하여 상품 목록 조회 및 페이지네이션을 TDD 방식으로 구현하는 과정을 단계별로 살펴보겠습니다.

# Step 0: TDD 사고 방식으로 문제 분석하기

### 1단계: TDD 제 1원칙. 결국 우리가 뭐하려고 하는 거지?

### 학습 목표

- MSW를 사용하여 API 요청을 모킹하고, 비동기 작업의 상태를 관리한다.

### 2단계: 핵심 기능을 1줄로 정의해보기

상품 목록 조회 기능의 핵심을 한 문장으로 정의해봅시다.

> 상품 목록을 페이지네이션으로 불러온다.

### 3단계: 동작 가능한 가장 작은 버전부터 시뮬레이션 해보기

1. 상품 목록 데이터를 모킹하기
2. 추가 4개의 상품을 불러오기
3. 로딩 상태와 에러 상태 관리하기
4. 페이지네이션 구현하기

### 4단계: 핵심과 가까우면서 쉽게 할 수 있는 적절한 것 선택하기

초기 20개의 상품을 불러오는 것부터 시작해보겠습니다. 이를 위해 먼저 MSW를 사용하여 상품 목록 데이터를 모킹하고, 이를 가져오는 기능을 구현해야 합니다.

# Step 1: Vitest 설정하기

### 학습 목표

- Vitest의 개념과 특징 이해하기
- Vite 프로젝트에서 Vitest 설정하기

### 가이드

Vitest는 Vite를 기반으로 하는 테스트 프레임워크로, Jest와 유사한 API를 제공하면서도 Vite의 빠른 속도와 간편한 설정을 활용할 수 있습니다. Vitest와 MSW를 사용하면 프론트엔드 개발에서 실제 백엔드 API가 준비되기 전에도 모의 데이터를 사용하여 효율적으로 개발과 테스트를 진행할 수 있습니다. Vitest는 Jest와 매우 유사한 API를 제공하기 때문에, 이전에 Jest를 사용해 봤다면 쉽게 익숙해질 수 있습니다.

### **Vitest의 주요 특징**

- Vite의 빌드 시스템을 사용하여 테스트 파일을 빠르게 변환하고 실행
- Jest와 호환되는 API 제공으로 쉬운 마이그레이션
- TypeScript, JSX, CSS 등 다양한 파일 형식 지원
- 변경된 파일만 다시 실행하여 개발 속도 향상

### **설정 단계**

다음과 같이 Vite 프로젝트에 Vitest를 설정합니다:

### **1. Vitest 설치**

```bash
npm install -D vitest
```

Vitest는 개발 환경에서만 필요하므로 **`-D`** 플래그를 사용하여 개발 의존성으로 설치합니다.

### **2. MSW 설치**

```bash
npm install -D msw
```

MSW는 테스트 중 외부 API 요청을 모킹하기 위해 사용됩니다. MSW(Mock Service Worker)를 사용하면 네트워크 수준에서 API 요청을 가로채고 모의 응답을 반환할 수 있습니다. 이를 통해 실제 API가 준비되지 않은 상황에서도 프론트엔드 개발과 테스트를 진행할 수 있습니다.

### **3. 핸들러 설정**

**`src/mocks/handlers.ts`** 파일을 생성하고 API 요청을 처리할 핸들러를 작성합니다:

```tsx
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://example.com", () => {
    return HttpResponse.json();
  }),
];
```

여기서는 **`/products`** 엔드포인트에 대한 GET 요청을 처리하고, 모의 응답을 반환하는 핸들러를 정의했습니다.

### **4. 서버 객체 설정**

**`src/mocks/server.ts`** 파일을 생성하고 다음과 같이 설정합니다:

```tsx
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);
```

이 파일은 MSW 서버를 설정하고, 이후 테스트에서 사용할 핸들러를 정의합니다.

### **5. Vitest 설정 파일 생성**

**`vitest.config.ts`** 파일을 생성하여 Vitest와 Vite 설정을 병합합니다:

```tsx
import { mergeConfig } from "vite";
import { defineConfig } from "vitest/config";
import viteConfig from "./vite.config.ts";

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
```

이 설정 파일은 Vite 설정과 Vitest 설정을 병합합니다.

- **`setupFiles: ['./vitest.setup.ts']`**: 테스트 실행 전에 자동으로 불러올 설정 파일을 지정합니다.

### **6. Vitest 설정 파일에서 MSW 서버 설정**

**`vitest.setup.ts`** 파일을 생성하고 설정을 추가합니다:

```tsx
import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./src/mocks/server";

// 모든 테스트 케이스가 실행되기 전에 한 번 실행되는 함수
beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});

// 각 테스트 케이스가 종료된 후에 실행되는 함수
afterEach(() => {
  server.resetHandlers();
});

// 모든 테스트 케이스가 종료된 후에 한 번 실행되는 함수
afterAll(() => {
  server.close();
});
```

- **`server`**: MSW 라이브러리에서 제공하는 모의 서버 객체입니다.
- **`beforeAll`**: 테스트가 시작되기 전에 한 번 실행되며, 여기서는 MSW 서버를 시작합니다.
- **`afterEach`**: 각 테스트 케이스가 끝난 후 실행되며, MSW 서버의 모든 요청 핸들러를 초기화합니다.
- **`afterAll`**: 모든 테스트가 종료된 후 한 번 실행되며, MSW 서버를 종료합니다.

### **전체 설정 흐름**

1. **Vitest 설치**: **`npm install -D vitest`** 명령어를 사용하여 Vitest를 설치합니다.
2. **MSW 설치**: **`npm install msw --save-dev`** 명령어를 사용하여 MSW를 설치합니다.
3. **핸들러 설정**: **`src/mocks/handlers.ts`** 파일을 생성하고 API 요청을 처리할 핸들러를 작성합니다.
4. **서버 객체 설정**: **`src/mocks/server.ts`** 파일을 생성하고 setupServer 함수로 MSW 서버 객체를 생성합니다.
5. **Vitest 설정 파일 생성**: **`vitest.config.ts`** 파일을 생성하고 Vite 설정과 병합합니다.
6. **Vitest 설정 파일에서 MSW 서버 설정**: **`vitest.setup.ts`** 파일을 생성하고 테스트 실행 전후에 MSW 서버를 관리하는 코드를 작성합니다.

# Step 2: 상품 목록 조회 훅 테스트 작성하기

## 학습 목표

- `useProducts` 훅의 상품 목록 조회 기능을 테스트하기

## 가이드

### 1. **테스트 파일 생성**

`useProducts` 훅의 상품 목록 조회 기능을 한 번에 하나씩 테스트해 보겠습니다.

먼저 `src/hooks/useProducts.test.ts` 파일을 생성하고 다음과 같이 테스트 코드를 작성합니다.

```tsx
import { renderHook, waitFor } from "@testing-library/react";
import useProducts from "./useProducts";

describe("useProducts", () => {
  describe("상품 목록 조회", () => {
    it("상품 목록을 조회한다.", async () => {
      const { result } = renderHook(() => useProducts());

      await waitFor(() => {
        expect(result.current.products).toHaveLength(20);
      });
    });
  });
});
```

이 테스트에서는 `useProducts` 훅을 렌더링하고, `waitFor` 함수를 사용하여 비동기 작업이 완료될 때까지 기다린 후, 상품 목록의 길이가 20인지 검증합니다.

```bash
npm run test
```

명령어로 테스트를 실행해 보면 아직 **`useProducts`** 훅을 구현하지 않았기 때문에 테스트는 실패할 것입니다. 모킹 작업 이후 단계에서 이를 구현하겠습니다.

# Step 3: 상품 목록 조회 API 모킹하기

## 학습 목표

- MSW를 사용하여 상품 목록 조회 API 모킹하기
- 모킹한 데이터를 별도의 파일로 분리하기

## 가이드

이 단계에서는 실제 API를 사용하지 않고도 테스트를 진행할 수 있도록 상품 목록 조회 API를 모킹(Mocking)해 보겠습니다.

### 1. **모킹 데이터 파일 생성**

먼저 `src/mocks/products.json` 파일을 생성하고 20개의 상품 데이터를 추가해 주세요. 데이터는 `/data.json`에서 불러옵니다.

### 2. **모킹 핸들러 파일 생성**

`src/mocks/handlers.ts` 파일을 생성하고 다음과 같이 모킹 핸들러를 작성합니다.

```tsx
import { http, HttpResponse } from "msw";
import products from "./products.json";

const API_URL = "http://woteco.com/products";

export const handlers = [
  http.get(API_URL, () => {
    return HttpResponse.json(products);
  }),
];
```

여기서는 `http.get` 메서드를 사용하여 GET 요청을 처리하는 핸들러를 정의하고, 요청 URL이 `http://woteco.com/products`일 때 `products.json` 파일에서 불러온 모킹 데이터를 응답으로 반환하도록 했습니다.

이렇게 MSW를 사용하여 API를 모킹하면 실제 API를 사용하지 않고도 테스트를 진행할 수 있습니다. 이는 다음과 같은 이점이 있습니다.

- 실제 API가 준비되지 않은 상황에서도 개발과 테스트를 진행할 수 있습니다.
- 네트워크 상태나 API 서버의 상태에 영향을 받지 않고 안정적으로 테스트를 진행할 수 있습니다.
- 다양한 경우의 수를 테스트하기 위해 모의 데이터를 자유롭게 조작할 수 있습니다.

이제 모킹 환경이 갖춰졌으니, 다음 단계에서는 `useProducts` 훅을 구현해 보겠습니다.

# Step 4: 상품 목록 조회 성공 케이스 구현하기

## 학습 목표

- `useProducts` 훅에서 상품 목록 조회 API 호출하기
- 조회한 상품 데이터 상태 관리하기

## 가이드

이번 단계에서 작성한 테스트 코드를 통과시키기 위해 `useProducts` 훅을 구현해 보겠습니다.

### 1. **훅 파일 생성**

**`src/hooks/useProducts.ts`** 파일을 생성하고 다음과 같이 코드를 작성합니다:

```tsx
import { useState, useEffect } from "react";

const API_URL = "http://woteco.com/products";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

interface UseProductsResult {
  products: Product[];
}

export default function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(API_URL);
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return { products };
}
```

여기서 `useProducts` 훅은 다음과 같은 역할을 합니다.

1. `useState`를 사용하여 `products` 상태를 관리합니다.
2. `useEffect`를 사용하여 컴포넌트가 마운트될 때 `fetchProducts` 함수를 호출합니다.
3. `fetchProducts` 함수에서는 `API_URL`에 대해 `fetch` 함수를 사용하여 GET 요청을 보냅니다.
4. 응답으로 받은 데이터를 `setProducts` 함수를 사용하여 `products` 상태를 업데이트합니다.
5. 마지막으로 `products` 상태를 반환합니다.

이제 `npm run test` 명령어로 테스트를 실행해 보면, 상품 목록 조회 성공 케이스가 통과할 겁니다.

# **Step 5: 리팩터링 - API_URL 상수 추출하기**

## **학습 목표**

- **`API_URL`** 상수를 별도의 파일로 추출하여 재사용성 높이기

## **가이드**

이전 단계까지 구현한 코드를 살펴보면, `API_URL` 상수가 `useProducts.ts`와 `handlers.ts` 파일에 중복으로 선언되어 있습니다. 이를 해결하기 위해 리팩터링을 해보겠습니다.

### 1. **엔드포인트 파일 생성**

**`src/api/endpoints.ts`** 파일을 생성하고 다음과 같이 **`BASE_URL`**과 **`PRODUCTS_ENDPOINT`** 상수를 선언합니다.

```tsx
export const BASE_URL = "http://woteco.com";
export const PRODUCTS_ENDPOINT = `${BASE_URL}/products`;
```

### 2. **`useProducts.ts`와 `handlers.ts` 파일 수정**

그리고 **`useProducts.ts`** 와 **`handlers.ts`** 파일에서 **`API_URL`** 상수를 import하여 사용하도록 변경합니다.

```tsx
// useProducts.ts
import { PRODUCTS_ENDPOINT } from "../api/endpoints";

// ...

useEffect(() => {
  const fetchProducts = async () => {
    const response = await fetch(PRODUCTS_ENDPOINT);
    // ...
  };

  fetchProducts();
}, []);
```

```tsx
// handlers.ts
import { PRODUCTS_ENDPOINT } from "../api/endpoints";

// ...

export const handlers = [
  http.get(PRODUCTS_ENDPOINT, () => {
    return HttpResponse.json(products);
  }),
];
```

# Step 6: 상품 목록 조회 중 로딩 상태 구현하기

## 학습 목표

- 상품 목록 조회 중 로딩 상태에 대한 테스트 케이스 작성하기

## 가이드

현재는 상품 목록을 조회하는 동안 사용자에게 아무런 피드백을 주지 않고 있습니다. 사용자는 데이터가 로딩되는 중인지, 아니면 에러가 발생한 건지 알 수 없는 상황입니다. 이런 문제를 해결하기 위해 로딩 상태를 구현해 보겠습니다.

### 1. **테스트 파일 수정**

**`src/hooks/useProducts.test.ts`** 파일에 다음 테스트 케이스를 추가합니다:

```tsx
describe("useProducts", () => {
  // ... 생략 ...

  describe("상품 목록 조회", () => {
    it("상품 목록 조회 중 로딩 상태", () => {
      const { result } = renderHook(() => useProducts());

      expect(result.current.loading).toBe(true);
    });
  });
});
```

이 테스트 코드는 `useProducts` 훅을 렌더링한 직후에 `loading` 값이 `true`인지 검증합니다.

이제 이 테스트 코드를 통과시키기 위해 `useProducts` 훅을 수정해 보겠습니다.

### 2. **훅 파일 수정**

**`src/hooks/useProducts.ts`** 파일을 다음과 같이 수정합니다:

```tsx
interface UseProductsResult {
  products: Product[];
  loading: boolean;
}

export default function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(PRODUCTS_ENDPOINT);
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return { products, loading };
}
```

`loading` 상태를 추가하고, 초기값을 `true`로 설정했습니다. 그리고 `fetchProducts` 함수에서 데이터를 가져온 후에 `setLoading(false)`를 호출하여 로딩 상태를 `false`로 변경합니다.

이제 `npm run test` 명령어로 테스트를 실행하면 모든 테스트 케이스가 통과할 겁니다.

# Step 7: 상품 목록 조회 중 에러 상태 테스트 작성하기

## 학습 목표

- 상품 목록 조회 중 발생한 에러를 처리하기

## 가이드

이번에는 상품 목록을 조회하는 중에 에러가 발생한 경우를 처리해 보겠습니다. 예를 들어, 네트워크 연결이 불안정하거나 API 서버에 문제가 생겼을 때 사용자에게 적절한 피드백을 줄 수 있어야 합니다.

### **1. 테스트 파일 수정**

먼저 **`src/hooks/useProducts.test.ts`** 파일에 다음 테스트 케이스를 추가합니다:

```tsx
import { server } from "../mocks/server";
import { http, HttpResponse } from "msw";
import { PRODUCTS_ENDPOINT } from "../api/endpoints";

describe("useProducts", () => {
  // ... 생략 ...
  describe("상품 목록 조회", () => {
    it("상품 목록 조회 중 에러 상태", async () => {
      server.use(
        http.get(PRODUCTS_ENDPOINT, () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      const { result } = renderHook(() => useProducts());

      await waitFor(() => {
        expect(result.current.products).toEqual([]);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeTruthy();
      });
    });
  });
});
```

이 테스트 코드는 MSW를 사용하여 `PRODUCTS_ENDPOINT`에 대한 GET 요청이 500 에러를 반환하도록 설정합니다. 그리고 `useProducts` 훅을 렌더링한 후, `products`가 빈 배열이고, `loading`이 `false`이며, `error`가 truthy 값인지 검증합니다.

이제 이 테스트 코드를 통과시키기 위해 `useProducts` 훅을 수정해 보겠습니다.

### **2. 훅 파일 수정**

**`src/hooks/useProducts.ts`** 파일을 다음과 같이 수정합니다:

이제 이 테스트 코드를 통과시키기 위해 `useProducts` 훅을 수정해 보겠습니다.

```tsx
// ... 생략 ...

interface UseProductsResult {
  // ... 생략 ...
  error: unknown;
}

export default function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(PRODUCTS_ENDPOINT);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
}
```

`error` 상태를 추가하고, `fetchProducts` 함수에서 `try-catch` 문을 사용하여 에러를 처리했습니다. `fetch` 함수로 API를 호출한 후, 응답 객체의 `ok` 속성을 확인하여 에러 여부를 판단합니다. 에러가 발생한 경우 `setError`를 호출하여 `error` 상태를 업데이트하고, `finally` 블록에서는 `setLoading(false)`를 호출하여 로딩 상태를 `false`로 변경합니다.

이제 `npm run test` 명령어로 테스트를 실행하면 모든 테스트 케이스가 통과할 겁니다.

# Step 8: 페이지네이션 기능

## 학습 목표

- 페이지네이션을 통해 추가 상품 데이터를 불러오는 기능 구현

## 가이드

페이지네이션은 대량의 데이터를 처리할 때 매우 유용한 기능입니다. 사용자가 한 번에 모든 데이터를 받아오는 것이 아니라, 필요한 만큼씩 데이터를 요청하고 받아올 수 있죠. 이를 통해 서버의 부하를 줄이고, 사용자 경험을 향상시킬 수 있습니다.

### 1. **모킹 데이터 수정**

**`src/mocks/products.json`** 파일에 총 100개의 상품 데이터를 추가합니다.

### 2. **테스트 파일 수정**

초기 상품 목록 조회에 대한 테스트를 작성해 보겠습니다. 이를 통해 페이지네이션의 시작점을 명확히 할 수 있습니다.

```tsx
describe("useProducts", () => {
  // ... 생략 ...

  describe("페이지네이션", () => {
    it("초기에 첫 페이지의 상품 20개를 불러온다", async () => {
      const { result } = renderHook(() => useProducts());

      await waitFor(() => {
        expect(result.current.products).toHaveLength(20);
        expect(result.current.page).toBe(1);
      });
    });
  });
});
```

이 테스트에서는 `useProducts` 훅을 렌더링하고, 초기에 첫 페이지의 상품 20개를 불러오는지 검증합니다.

### 3. `handlers.ts` 파일 수정

`handlers.ts` 파일에서 페이지네이션을 처리하도록 수정해야 합니다. 현재는 요청이 들어오면 전체 상품 데이터를 응답으로 보내고 있습니다. 이를 요청한 페이지와 limit에 맞게 데이터를 필터링하여 반환하도록 변경합니다.

```tsx
import { http, HttpResponse } from "msw";
import products from "./products.json";
import { PRODUCTS_ENDPOINT } from "../api/endpoints";

export const handlers = [
  http.get(PRODUCTS_ENDPOINT, ({ request }) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get("page") || "1");
    const limit = page === 1 ? 20 : 4;
    const start = page === 1 ? 0 : (page - 1) * 4 + 20;
    const end = start + limit;

    const paginatedProducts = products.slice(start, end);

    return HttpResponse.json(paginatedProducts);
  }),
];
```

`http.get` 핸들러에서 `url.searchParams`를 사용하여 `page`와 `limit` 쿼리 파라미터를 가져옵니다. 값이 없는 경우 기본값으로 각각 '1'과 '20'을 사용합니다.

그리고 `page`와 `limit` 값을 사용하여 `start`와 `end` 인덱스를 계산하고, `Array.slice` 메서드로 전체 상품 데이터에서 해당 범위의 데이터만 추출합니다.

마지막으로 `HttpResponse.json` 메서드를 사용하여 페이지네이션된 상품 데이터를 JSON 형태로 응답합니다.

### 4. 훅 파일 수정

```tsx
interface UseProductsResult {
  // ... 생략 ...
  page: number;
}

export default function useProducts(): UseProductsResult {
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const limit = page === 1 ? 20 : 4;
        const response = await fetch(
          `${PRODUCTS_ENDPOINT}?page=${page}&limit=${limit}`
        );
        // ... 생략 ...
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  return { products, loading, error, page };
}
```

### 5. 다음 페이지 상품 불러오기 테스트 작성하기

이번에는 다음 페이지의 상품을 불러오는 기능을 테스트해 보겠습니다.

`src/hooks/useProducts.test.ts` 파일에 다음 테스트 케이스를 추가합니다.

```tsx
import { act, renderHook, waitFor } from "@testing-library/react";

describe("useProducts", () => {
  // ... 생략 ...

  describe("페이지네이션", () => {
    // ... 생략 ...

    it("다음 페이지의 상품 4개를 추가로 불러온다", async () => {
      const { result } = renderHook(() => useProducts());

      await waitFor(() => {
        expect(result.current.products).toHaveLength(20);
        expect(result.current.page).toBe(1);
      });

      act(() => {
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(24);
        expect(result.current.page).toBe(2);
      });
    });
  });
});
```

이 테스트에서는 초기에 첫 페이지의 상품 20개를 불러온 후, `fetchNextPage` 함수를 호출하여 다음 페이지의 상품 4개를 추가로 불러오는지 검증합니다.

테스트를 실행하면 아직 `fetchNextPage` 함수를 구현하지 않았기 때문에 실패할 겁니다. 다음 단계에서 이를 구현해 보겠습니다.

### 5. **훅 파일 수정**

`src/hooks/useProducts.ts` 파일을 다음과 같이 수정해 주세요.

```tsx
import { useState, useEffect } from "react";
import { PRODUCTS_ENDPOINT } from "../api/endpoints";

// ... 생략 ...

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: unknown;
  page: number;
  fetchNextPage: () => void;
}

export default function useProducts(): UseProductsResult {
  // 생략

  const fetchProducts = async () => {
    try {
      // 생략
      setProducts((prevProducts) => [...prevProducts, ...data]);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return { products, loading, error, fetchNextPage };
}
```

`fetchNextPage` 함수를 추가하고, 이 함수에서는 `setPage`를 호출하여 `page` 상태를 1 증가시킵니다.

그리고 `useEffect`의 의존성 배열에 `page`를 추가하여, `page` 값이 변경될 때마다 `fetchProducts` 함수가 호출되도록 합니다. `fetchProducts` 함수에서는 `page`와 `limit` 쿼리 파라미터를 사용하여 해당 페이지의 상품을 불러옵니다.

이제 다시 테스트를 실행해 보면 모든 테스트 케이스가 통과할 겁니다.

### 6. 리팩터링 - fetchProducts 함수 추출하기

현재 `fetchProducts` 함수가 `useProducts` 훅 내부에 선언되어 있어 다른 곳에서 재사용할 수 없습니다. 이를 훅 외부로 추출하여 재사용성을 높여보겠습니다.

`src/api/products.ts` 파일을 생성하고 다음과 같이 `fetchProducts` 함수를 선언합니다.

```tsx
import { PRODUCTS_ENDPOINT } from "./endpoints";

export async function fetchProducts(page: number, limit: number) {
  const response = await fetch(
    `${PRODUCTS_ENDPOINT}?page=${page}&limit=${limit}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();
  return data;
}
```

그리고 `useProducts.ts` 파일에서 `fetchProducts` 함수를 import하여 사용하도록 변경합니다.

```tsx
import { useState, useEffect } from "react";
import { fetchProducts } from "../api/products";

// ... 생략 ...

export default function useProducts(): UseProductsResult {
// ... 생략 ...

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts(page, 4);
        setProducts((prevProducts) => [...prevProducts, ...data]);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [page]);

// ... 생략 ...
```

이제 `fetchProducts` 함수가 `useProducts` 훅 외부에 선언되었으므로 다른 곳에서도 재사용할 수 있게 되었습니다. 테스트를 다시 실행하여, 리팩터링이 잘 되었는지 확인합니다.

# Step 10: 페이지 경계 조건 테스트 작성하기

### 학습 목표

- 모든 페이지의 상품을 불러왔을 때 더 이상 요청하지 않는 것에 대한 테스트 케이스 작성하기

### 미션

페이지네이션의 경계 조건, 즉 마지막 페이지에서의 동작을 테스트해 보겠습니다. 마지막 페이지에 도달했을 때 더 이상 다음 페이지를 요청하지 않도록 코드를 수정해보세요.

### 1. 테스트 케이스 작성

`src/hooks/useProducts.test.ts` 파일에 다음 테스트 케이스를 추가합니다.

```tsx
it("모든 페이지의 상품을 불러오면 더 이상 요청하지 않는다.", async () => {
  const { result } = renderHook(() => useProducts());

  await waitFor(() => {
    expect(result.current.products).toHaveLength(20);
  });

  for (let i = 2; i < 22; i++) {
    await waitFor(() => {
      act(() => {
        result.current.fetchNextPage();
      });
    });

    const expectedLength = 20 + (i - 1) * 4;

    await waitFor(() => {
      expect(result.current.products).toHaveLength(expectedLength);
      expect(result.current.page).toBe(i);
    });
  }

  await act(async () => {
    result.current.fetchNextPage();
  });

  await waitFor(() => {
    expect(result.current.products).toHaveLength(100);
    expect(result.current.page).toBe(21);
  });
});
```

이 테스트 케이스는 다음과 같은 동작을 검증합니다.

1. 초기에 첫 페이지의 상품 20개를 불러옵니다.
2. `for` 루프를 사용하여 20번 반복하면서 `fetchNextPage` 함수를 호출하여 다음 페이지의 상품을 불러옵니다.
3. 각 페이지마다 상품 개수와 페이지 번호를 검증합니다.
4. 마지막으로 `fetchNextPage` 함수를 한 번 더 호출하고, 상품 개수가 100개이고 페이지 번호가 21인지 검증합니다.

이 테스트 케이스를 실행하면 현재 구현에서는 마지막 페이지 이후에도 계속해서 데이터를 요청하기 때문에 실패할 것입니다. `useProducts` 훅을 수정하여 문제를 구현 및 리팩터링을 진행해보세요.

# Step 11: 상품 목록 조회 중 로딩 상태 구현 개선하기

## 학습 목표

- 사용자 경험을 고려한 로딩 상태 관리하기

## 미션

현재 구현된 로딩 상태 관리는 초기 로딩 시에만 동작합니다. 하지만 사용자 경험을 개선하기 위해서는 페이지네이션으로 추가 데이터를 불러올 때도 로딩 상태를 표시해야 합니다.

### 1. 테스트 케이스 작성

`src/hooks/useProducts.test.ts` 파일에 다음 테스트 케이스를 추가합니다.

```tsx
it("페이지네이션으로 추가 데이터를 불러올 때 로딩 상태를 표시한다.", async () => {
  const { result } = renderHook(() => useProducts());

  await waitFor(() => {
    expect(result.current.loading).toBe(false);
  });

  act(() => {
    result.current.fetchNextPage();
  });

  expect(result.current.loading).toBe(true);

  await waitFor(() => {
    expect(result.current.loading).toBe(false);
  });
});
```

이 테스트 케이스는 다음과 같은 동작을 검증합니다.

1. 초기 로딩이 완료되면 `loading` 상태가 `false`가 됩니다.
2. `fetchNextPage` 함수를 호출하면 `loading` 상태가 `true`로 변경됩니다.
3. 추가 데이터 로딩이 완료되면 `loading` 상태가 다시 `false`가 됩니다.

이 테스트 케이스가 통과 되도록 `useProducts` 훅을 수정해보세요.
