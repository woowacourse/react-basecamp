# React Query 실습 가이드

이 가이드는 TDD적인 접근 방식으로 react-query를 사용하여 서버 상태를 관리하고, '장바구니 기능 구현'이라는 요구사항을 작은 단위로 시작하여 점진적으로 구현해 나가는 과정을 다룹니다.

실습을 진행하면서 리팩터링할 부분이 보인다면 적극적으로 시도해보세요. 이번 실습의 목표는 react-query를 통해 서버 상태 관리를 경험하고, 복잡한 요구사항을 작게 나누어 테스트 주도로 개발하는 과정을 연습하는 것입니다.

## **React Query란?**

React Query는 서버에서 가져온 데이터를 캐싱하고, 자동으로 다시 불러오는 등의 기능을 제공하여 서버 상태 관리를 효율적으로 도와주는 라이브러리입니다. 데이터 fetching, caching, synchronization, 그리고 UI 업데이트를 쉽게 관리할 수 있게 해줍니다. 자세한 내용은 공식 문서의 [overview](https://tanstack.com/query/latest/docs/framework/react/overview)를 참고해주세요.

그럼 시작해 보겠습니다!

# Step 0. TDD 사고 방식으로 문제 분석하기

## 1단계: TDD 제 1원칙. 결국 우리가 뭐하려고 하는 거지?

### 학습 목표

- react-query를 사용하여 상품 목록 페이지의 서버 상태 관리 로직을 테스트 가능하게 구현한다.

## 2단계: 핵심 기능을 1줄로 정의해보기

상품 목록 페이지 기능의 핵심을 한 문장으로 정의해봅시다.

> 상품 목록을 장바구니에 추가/제거할 수 있다.
> 이 과정에서 react query를 사용하여 장바구니 상태를 서버와 동기화한다.

## 3단계: 동작 가능한 가장 작은 버전부터 시뮬레이션 해보기

장바구니 상품 추가 로직을 동작 가능한 작은 버전으로 만드는 과정을 상상해봅시다.

1. 상품 목록 불러오기
2. 장바구니에 상품 추가 API 호출
3. 장바구니 정보 업데이트
4. 장바구니 아이템 수 표시 업데이트
5. …

## 4단계: 핵심과 가까우면서 쉽게 할 수 있는 적절한 것 선택하기

상품 정보를 가져오는 것부터 시작해보겠습니다. 이를 위해 `/products` API를 react-query로 호출하여 상품 정보를 가져오는 훅을 만들어보겠습니다. 이 과정에서 react-query의 데이터 캐싱 기능을 활용하여 불필요한 API 호출을 줄여봅시다.

## 5단계: 결과를 만드는데 필요한 과정을 구체화하고 최대한 진짜처럼 시뮬레이션 해보기

1. 환경 설정하기
2. 모킹 데이터 작성하기
3. 상품 정보 타입 정의하기
4. 상품 목록 조회 API 연동하기
5. **상품 목록 react-query로 캐싱하기 (useQuery)**
6. …

## 6단계 : 동작 가능한 코드 작성 및 확인

# Step 1: 프로젝트 환경 설정하기

### 학습 목표

- 프로젝트 세팅 및 react-query 설치하기

### 가이드

실습을 위해 필요한 패키지들을 먼저 설치합니다.

```bash
npm install
npm install @tanstack/react-query
npm install -D vitest msw
```

프로젝트 컴파일 및 테스트 실행 명령어 package.json에 추가합니다.

```json
"scripts": {
  "test": "vitest"
}
```

# Step 2. 상품 목록 불러오기

## 학습 목표

- MSW를 활용해 상품 목록 API를 모킹하고 테스트를 작성합니다.
- react-query를 활용해 실제 상품 목록을 불러오는 로직을 구현합니다.

## 가이드

## 1. 모킹 데이터 작성

먼저, `src/mocks/products.json` 파일을 생성하고 아래와 같이 모킹할 상품 데이터를 작성합니다.

```json
[
  {
    "id": 1,
    "name": "Product 1",
    "price": 10000,
    "category": "fashion"
  },
  {
    "id": 2,
    "name": "Product 2",
    "price": 20000,
    "category": "fashion"
  }
]
```

## 2. 상품 목록 조회 API 모킹 및 테스트 작성

`src/mocks/handlers.ts` 파일을 생성하고 아래 모킹 코드를 작성합니다.

```tsx
// src/mocks/handlers.ts
import { http, HttpResponse } from "msw";
import products from "./products.json";

export const handlers = [
  http.get("http://woteco.com/products", () => {
    return HttpResponse.json(products);
  }),
];
```

이어서 `src/hooks/useProducts.test.tsx` 파일을 생성하고 아래 테스트 코드를 작성합니다.

```tsx
// src/hooks/useProducts.test.tsx
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useProducts, Product } from "./useProducts";

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useProducts", () => {
  it("상품 목록을 가져올 수 있다", async () => {
    const { result } = renderHook(() => useProducts(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual<Product[]>([
      {
        id: 1,
        name: "Product 1",
        price: 10000,
        category: "fashion",
      },
      {
        id: 2,
        name: "Product 2",
        price: 20000,
        category: "fashion",
      },
    ]);
  });
});
```

`useProducts` 훅을 아직 만들지 않았지만 테스트를 먼저 작성함으로써 `useProducts` 훅을 통해 어떤 동작을 기대하는지 정의했습니다.

## 3. react-query를 활용한 상품 목록 조회 구현

방금 작성한 `useProducts` 테스트를 통과시키기 위해 실제 `useProducts` 훅을 구현해 보겠습니다.

`src/hooks/useProducts.ts` 파일을 생성하고 아래와 같이 작성합니다.

```tsx
// src/hooks/useProducts.ts
import { useQuery } from "@tanstack/react-query";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

async function fetchProducts(): Promise<Product[]> {
  const response = await fetch("http://woteco.com/products");
  return await response.json();
}

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
}
```

`useQuery` 훅을 사용하여 `/products` 엔드포인트를 호출하고 그 결과를 반환하도록 했습니다.

이제 `npm test`를 실행하면 좀 전에 작성한 테스트가 통과하는 것을 볼 수 있습니다.

### `useQuery` 훅이란?

`useQuery` 훅은 React Query에서 데이터를 가져오고 관리하는 데 사용되는 핵심 API입니다. 이 훅은 다음과 같은 역할들을 합니다:

1. **데이터 캐싱 및 관리:** `useQuery`는 서버에서 가져온 데이터를 캐시에 저장합니다. 이렇게 저장된 데이터는 다음에 동일한 데이터를 요청할 때 서버에 다시 요청하지 않고 캐시에서 바로 가져와 사용할 수 있도록 합니다. 또한, 캐시된 데이터의 유효성을 관리하고 필요에 따라 자동으로 최신 데이터를 가져오는 기능도 제공합니다.
2. **서버에서 데이터 가져오기 (Fetching):** `useQuery`는 `queryFn`이라는 함수를 통해 서버에 데이터를 요청하고 응답을 받아옵니다. 이 과정에서 발생하는 로딩 상태와 에러 상태도 함께 관리할 수 있도록 합니다.
3. **로딩 및 에러 상태 관리:** `useQuery`는 데이터를 가져오는 동안에는 '로딩 중' 상태를, 데이터 가져오기에 실패했을 때는 '에러' 상태를 나타냅니다. 개발자는 `useQuery`가 반환하는 `isLoading`, `isError` 등의 값을 활용하여 로딩 화면이나 에러 메시지를 표시하는 등의 UI 처리를 쉽게 구현할 수 있습니다.

### **React Query를 사용하면 어떤 점이 좋을까요?**

React Query를 사용하면 상품 목록과 같은 데이터를 효과적으로 관리할 수 있습니다. 다음은 React Query의 캐싱 기능을 사용했을 때와 사용하지 않았을 때의 차이점입니다.

**캐싱 없이 상품 목록을 불러올 때:**

1. 사용자가 상품 목록 페이지에 들어올 때마다 API 호출
2. 서버에서 데이터를 받아옴
3. 받아온 데이터를 화면에 표시

이 경우 사용자가 페이지를 이동했다가 다시 돌아오면, 매번 서버에서 데이터를 새로 받아와야 합니다. 이는 불필요한 네트워크 요청을 발생시키고, 사용자 경험을 저하시킬 수 있습니다.

**React Query를 사용하여 상품 목록을 캐싱할 때:**

1. 사용자가 처음 상품 목록 페이지에 들어오면 API 호출
2. 서버에서 데이터를 받아옴
3. 받아온 데이터를 화면에 표시하고, React Query가 데이터를 캐시에 저장
4. 사용자가 페이지를 이동했다가 다시 돌아오면, React Query는 캐시된 데이터를 반환
5. 필요한 경우에만 서버에서 새로운 데이터를 받아옴

React Query를 사용하면 한 번 가져온 데이터를 캐시에 저장했다가 필요할 때 바로 사용할 수 있으므로, 불필요한 네트워크 요청을 줄일 수 있습니다. 이는 애플리케이션의 성능을 향상시키고, 사용자에게 더 나은 경험을 제공합니다. 캐싱에 대한 더 자세한 내용은 React Query 공식 문서의 [Caching 섹션](https://tanstack.com/query/latest/docs/react/guides/caching)을 참고해주세요.

## 4. 리팩터링

현재 `useProducts` 훅은 역할을 잘 수행하고 있지만, 개선할 부분이 있습니다.

### 타입 정의 분리

먼저, `Product` 타입 정의를 별도의 파일로 분리하여 코드의 가독성을 높이겠습니다.

`src/types/index.ts` 파일을 생성하고 다음과 같이 작성합니다.

```tsx
// src/types/index.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}
```

그리고 `src/hooks/useProducts.ts`에서 `Product` 타입을 import 합니다.

```tsx
// src/hooks/useProducts.ts
import { useQuery } from "@tanstack/react-query";
import { Product } from "../types";
// ...
```

### 서버 상태 관리 로직 분리

먼저, `fetchProducts` 함수를 별도의 파일로 분리하여 코드의 가독성과 재사용성을 높여보겠습니다.

`src/api/products.ts` 파일을 생성하고 아래와 같이 작성합니다.

```tsx
// src/api/products.ts
import { Product } from "../types";

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch("http://woteco.com/products");
  return await response.json();
}
```

그리고 `src/hooks/useProducts.ts` 파일을 아래와 같이 수정합니다.

```tsx
// src/hooks/useProducts.ts
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/products";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
}
```

이렇게 하면 `useProducts` 훅의 코드가 간결해지고, `fetchProducts` 함수를 다른 곳에서도 재사용할 수 있게 됩니다.

다음으로, API의 엔드포인트를 상수로 선언하고 별도의 파일로 분리하여 코드의 가독성과 유지보수성을 높여보겠습니다.

### API와 Query Key 상수 관리

먼저, 프로젝트의 한 곳에 API 엔드포인트와 쿼리 키 상수를 정의합니다.

**API 엔드포인트 상수 정의**

`src/constants/api.ts` 파일을 생성하고 아래와 같이 작성합니다.

```tsx
// src/constants/api.ts
export const API_BASE_URL = "http://woteco.com";

export const API_ENDPOINTS = {
  PRODUCTS: `${API_BASE_URL}/products`,
};
```

**Query Key 상수 정의**

`src/constants/queryKeys.ts` 파일을 생성하고 아래와 같이 작성합니다.

```tsx
// src/constants/queryKeys.ts
export const QUERY_KEYS = {
  PRODUCTS: "products",
};
```

이제 각 훅에서 이 상수를 사용하도록 코드를 수정합니다.

**상수 재사용**

`src/api/products.ts` 파일을 아래와 같이 작성합니다.

```tsx
// src/api/products.ts
import { API_ENDPOINTS } from "../constants/api";
import { Product } from "../types";

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(API_ENDPOINTS.PRODUCTS);
  return await response.json();
}
```

`src/hooks/useProducts.ts` 파일을 아래와 같이 수정합니다.

```tsx
// src/hooks/useProducts.ts
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/products";
import { QUERY_KEYS } from "../constants/queryKeys";

export function useProducts() {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS],
    queryFn: fetchProducts,
  });
}
```

`src/mocks/handlers.ts` 파일을 아래와 같이 수정합니다.

```tsx
// src/mocks/handlers.ts
import { http, HttpResponse } from "msw";
import products from "./products.json";
import { API_ENDPOINTS } from "../constants/api";

export const handlers = [
  http.get(API_ENDPOINTS.PRODUCTS, () => {
    return HttpResponse.json(products);
  }),
];
```

# Step 3. 장바구니 상품 추가 기능 구현하기

## 학습 목표

- react-query의 `useMutation`을 활용하여 장바구니에 상품을 추가하는 기능을 구현하고 테스트합니다.
- `useMutation` 훅의 역할과 장점을 이해하고, 서버 상태 변경 로직을 효율적으로 관리합니다.

### `useMutation`이란?

React Query는 `useQuery`와 더불어 `useMutation`이라는 훅을 제공합니다. `useMutation`은 데이터를 변경하는 작업(CREATE, UPDATE, DELETE 등)을 처리할 때 사용하는 훅입니다.

`useQuery`가 데이터를 조회하고 캐싱하는데 사용된다면, `useMutation`은 데이터를 변경하고 그 결과를 반환하는데 사용됩니다. `useMutation`을 사용하면 데이터 변경 작업을 간단하게 처리할 수 있고, 작업의 성공/실패 여부에 따라 다른 동작을 수행할 수 있습니다.

이번 단계에서는 `useMutation`을 사용하여 장바구니에 상품을 추가하는 기능을 구현해보겠습니다.

## 가이드

## 1. 장바구니 아이템 타입 정의

먼저 장바구니 아이템의 타입을 정의합니다.

`src/types/index.ts` 파일에 아래 내용을 추가합니다.

```tsx
export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
}
```

## 2. 장바구니 API 상수 선언

`src/constants/api.ts` 에 API 엔으포인트를 추가합니다.

```tsx
// src/constants/api.ts
export const API_BASE_URL = "http://woteco.com";

export const API_ENDPOINTS = {
  PRODUCTS: `${API_BASE_URL}/products`,
  CART: `${API_BASE_URL}/cart`,
};
```

## 3. 장바구니 추가 API 모킹

`src/mocks/handlers.ts` 파일을 수정하여 장바구니 추가 API를 모킹합니다.

```tsx
// src/mocks/handlers.ts
import { http, HttpResponse } from "msw";
import products from "./products.json";
import { API_ENDPOINTS } from "../constants/api";
import { CartItem } from "../types";

export const handlers = [
  http.get(API_ENDPOINTS.PRODUCTS, () => {
    return HttpResponse.json(products);
  }),
  http.post(
    `${API_ENDPOINTS.CART}`,
    async ({ request }: { request: { json: () => Promise<CartItem> } }) => {
      const newCartItem = await request.json();
      return HttpResponse.json(newCartItem, { status: 201 });
    }
  ),
];
```

## 4. 장바구니 상품 추가 훅 테스트 작성

`src/hooks/useAddToCart.test.tsx` 파일을 생성하고 아래 테스트 코드를 작성합니다.

```tsx
// src/hooks/useAddToCart.test.tsx
import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAddToCart } from "./useAddToCart.ts";
import { CartItem } from "../types/index.ts";

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useAddToCart", () => {
  it("장바구니에 상품을 추가할 수 있다", async () => {
    const { result } = renderHook(() => useAddToCart(), { wrapper });

    act(() => {
      result.current.mutate({ id: 3, productId: 1, quantity: 1 });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual<CartItem>({
      id: 3,
      productId: 1,
      quantity: 1,
    });
  });
});
```

`useAddToCart` 훅을 아직 만들지 않았지만, 테스트를 먼저 작성함으로써 기대하는 동작을 정의했습니다.

## 5. react-query를 활용한 장바구니 추가 기능 구현

방금 작성한 테스트를 통과시키기 위해 실제 `useAddToCart` 훅을 구현해 보겠습니다.

`src/hooks/useAddToCart.ts` 파일을 생성하고 아래와 같이 작성합니다.

```tsx
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CartItem } from "../types";
import { API_ENDPOINTS } from "../constants/api";

async function addToCart(item: CartItem): Promise<CartItem> {
  const response = await fetch(API_ENDPOINTS.CART, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  return await response.json();
}

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
```

`useMutation` 훅을 사용하여 장바구니에 상품을 추가하는 작업을 처리합니다. `useMutation`은 다음과 같은 옵션을 받습니다:

- `mutationFn`: 데이터 변경 작업을 수행하는 함수입니다. 여기서는 `addToCart` 함수를 사용하여 장바구니에 상품을 추가합니다.
- `onSuccess`: 작업이 성공적으로 완료되었을 때 실행되는 콜백 함수입니다. 여기서는 `invalidateQueries`를 호출하여 장바구니 데이터가 변경되었음을 React Query에 알리고, 관련된 쿼리를 무효화하여 최신 데이터를 다시 가져오도록 합니다. `invalidateQueries` 에 대한 자세한 설명은 [공식 문서](https://tanstack.com/query/latest/docs/reference/QueryClient#queryclientinvalidatequeries)를 참고해주세요.

`useMutation`은 `mutate` 함수를 반환하며, 이 함수를 호출하여 실제 데이터 변경 작업을 트리거할 수 있습니다.

이제 `npm test`를 실행하면 작성한 테스트가 통과하는 것을 볼 수 있습니다.

## 6. 리팩터링

**상수 객체 사용하기**

Query Key를 상수 객체로 관리하여 유지보수성을 높이겠습니다.

`src/constants/queryKeys.ts` 파일에도 아래 내용을 추가합니다.

```tsx
// src/constants/queryKeys.ts
export const QUERY_KEYS = {
  PRODUCTS: "products",
  CART: "cart",
};
```

위에서 만든 `useAddToCart` 훅과 관련 함수들에서 상수를 사용하도록 수정합니다.

**서버 상태 관리 로직 분리**

먼저, `fetchProducts` 함수를 별도의 파일로 분리하여 코드의 가독성과 재사용성을 높여보겠습니다.

`src/api/cart.ts` 파일을 생성하고 아래와 같이 작성합니다.

```tsx
import { API_ENDPOINTS } from "../constants/api";
import { CartItem } from "../types";

export async function addToCart(item: CartItem): Promise<CartItem> {
  const response = await fetch(API_ENDPOINTS.CART, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  return await response.json();
}
```

그리고 `src/hooks/useAddToCart.ts` 파일을 아래와 같이 수정합니다.

```tsx
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/queryKeys";
import { addToCart } from "../api/cart";

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART] });
    },
  });
}
```

# Step 4. 장바구니 상품 제거 기능 구현하기

이번 단계에서는 장바구니에서 상품을 제거하는 기능을 직접 구현해보겠습니다. 앞서 장바구니에 상품을 추가한 로직을 참고하여, 장바구니 상품 제거 기능 테스트 작성 및 구현을 진행해주세요.
