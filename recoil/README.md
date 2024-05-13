# Recoil

이 실습은 [Recoil](https://recoiljs.org/ko/) 라이브러리의 기본 사용법을 익히기 위한 실습 가이드입니다. Recoil은 React 애플리케이션에서 상태 관리를 효과적으로 할 수 있게 도와주는 라이브러리입니다. 이 실습에서는 Recoil의 주요 개념인 Atom, Selector, AtomFamily 등을 활용하여 장바구니 기능을 구현해볼 것입니다.
장바구니 기능 구현을 통해 다음과 같은 내용을 학습할 수 있습니다:

- 장바구니 상품 개수 관리
- 장바구니 총 가격 계산
- 개별 상품 수량 관리

또한 React Testing Library(RTL)를 활용하여 Recoil로 구현한 상태 관리 로직을 테스트하는 방법도 함께 다룰 예정입니다.
이 실습을 통해 Recoil의 기본 사용법을 익히고, 상태 관리를 효과적으로 하는 방법을 배울 수 있을 것입니다.

그럼 시작해보겠습니다!

<br>

# Step 0: 프로젝트 구조

## 프로젝트 구조

```
src/
├── components/
│   ├── CartItemCount.tsx
│   ├── AddToCartButton.tsx
│   ├── RemoveFromCartButton.tsx
│   ├── CartTotalPrice.tsx
│   ├── ProductList.tsx
│   └── CartItem.tsx
├── recoil/
│   ├── atoms.ts
│   ├── selectors.ts
│   ├── atoms.test.ts
│   └── selectors.test.ts
├── App.tsx
├── App.css
├── index.css
└── main.tsx
```

## 학습 목표

- 프로젝트 설정 및 의존성 설치
- Git 저장소에서 최신 코드 가져오기

## 가이드

### 1. 원본 저장소의 최신 변경 사항을 가져옵니다.

### 2. 의존성을 설치 후 개발 서버를 실행합니다.

```bash
npm install
npm run dev
```

<br>

# Step 1: 프로젝트 설정 및 Recoil 설치

## 학습 목표

- 프로젝트 설정 및 Recoil 라이브러리 설치
- Recoil의 기본 구조 이해 (RecoilRoot 컴포넌트)

## 가이드

### 1. Recoil 라이브러리를 설치합니다.

```bash
npm install recoil
```

### 2.`src/main.tsx` 파일에서 `RecoilRoot` 컴포넌트로 앱을 감싸줍니다.

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);
```

### RecoilRoot 컴포넌트

`RecoilRoot` 컴포넌트는 Recoil의 상태를 관리하고 하위 컴포넌트에게 상태를 제공하는 역할을 합니다. `RecoilRoot`로 감싸진 컴포넌트들은 Recoil의 상태에 접근할 수 있습니다. 그래서 Recoil을 사용하는 애플리케이션의 최상위에 위치해야 합니다.

<br>

# Step 2: 장바구니 상품 개수 관리를 위한 Atom 생성

## 학습 목표

- Atom의 개념 이해 및 생성 방법 학습
- 상태를 관리하기 위한 Atom 사용

## 가이드

### 1. Atom 생성하기

- `src/recoil/atoms.ts` 파일을 생성하고 다음 코드를 추가합니다.

```ts
import { atom } from "recoil";

export const cartItemCountState = atom<number>({
  key: "cartItemCountState",
  default: 0,
});
```

- `atom` 함수를 사용하여 Atom을 생성합니다.
- `key`는 Atom의 고유 식별자로 사용됩니다.
- `default`는 Atom의 초기값을 설정합니다.
- `atom<number>`와 같이 Atom의 값 타입을 명시합니다.

### 2. Atom 이해하기

[Atom](https://recoiljs.org/ko/docs/basic-tutorial/atoms/)은 애플리케이션의 상태 단위를 나타내며, 여러 컴포넌트에서 공유할 수 있습니다.
Atom은 Recoil의 상태를 정의하고 관리하는 데 사용됩니다. Atom은 고유한 `key`를 가지며, 이를 통해 Atom을 식별합니다. 이 `key`를 통해 컴포넌트에서 Atom을 참조하고 상태를 읽거나 쓸 수 있습니다. `key`는 애플리케이션 전체에서 고유해야 하며, 일반적으로 문자열 형태로 지정합니다.

<br>

# Step 3: 장바구니 상품 개수 표시 컴포넌트 작성

## 학습 목표

- Atom의 값을 컴포넌트에서 읽어오는 방법 학습 (useRecoilValue 훅)
- Atom을 사용하여 상태를 표시하는 컴포넌트 작성

## 가이드

### 1. CartItemCount 컴포넌트 작성하기

- `src/components/CartItemCount.tsx` 파일을 생성하고 다음 코드를 추가합니다.

```tsx
import React from "react";
import { useRecoilValue } from "recoil";
import { cartItemCountState } from "../recoil/atoms";

function CartItemCount() {
  const count = useRecoilValue(cartItemCountState);
  return <div>장바구니 상품 개수: {count}</div>;
}

export default CartItemCount;
```

- `useRecoilValue` 훅을 사용하여 Atom의 값을 읽어옵니다.
- `cartItemCountState` Atom을 사용하여 장바구니 상품 개수를 표시합니다.

### 2. CartItemCount 컴포넌트 사용하기

- `src/App.tsx`에서 `CartItemCount` 컴포넌트를 렌더링합니다.

```tsx
import React from "react";
import CartItemCount from "./components/CartItemCount";
import "./App.css";

function App() {
  return (
    <div>
      <h1>장바구니</h1>
      <CartItemCount />
    </div>
  );
}

export default App;
```

### useRecoilValue

`useRecoilValue` 훅은 Recoil의 상태 값을 읽어오는 역할을 합니다. 이 훅을 사용하여 컴포넌트에서 Atom이나 Selector의 현재 값을 가져올 수 있습니다. `useRecoilValue`는 읽기 전용이므로 상태 값을 변경하려면 다른 훅을 사용해야 합니다.

<br>

# Step 4: 장바구니 상품 개수 변경 기능 구현

## 학습 목표

- Atom 값을 변경하는 방법 학습 (useSetRecoilState 훅)
- 이벤트 핸들러를 통해 Atom 값 업데이트

## 가이드

### 1. AddToCartButton 컴포넌트 작성하기

- `src/components/AddToCartButton.tsx` 파일을 생성하고 다음 코드를 추가합니다.

```tsx
import React from "react";
import { useSetRecoilState } from "recoil";
import { cartItemCountState } from "../recoil/atoms";

function AddToCartButton() {
  const setCount = useSetRecoilState(cartItemCountState);

  const handleClick = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return <button onClick={handleClick}>상품 추가</button>;
}

export default AddToCartButton;
```

- `useSetRecoilState` 훅을 사용하여 Atom의 값을 변경하는 함수를 가져옵니다.
- 버튼 클릭 이벤트 핸들러에서 `setCount` 함수를 호출하여 상품 개수를 증가시킵니다.

### 2. RemoveFromCartButton 컴포넌트 작성하기

- `src/components/RemoveFromCartButton.tsx` 파일을 생성하고 다음 코드를 추가합니다.

```tsx
import React from "react";
import { useSetRecoilState } from "recoil";
import { cartItemCountState } from "../recoil/atoms";

function RemoveFromCartButton() {
  const setCount = useSetRecoilState(cartItemCountState);

  const handleClick = () => {
    setCount((prevCount) => Math.max(prevCount - 1, 0));
  };

  return <button onClick={handleClick}>상품 제거</button>;
}

export default RemoveFromCartButton;
```

- `setCount` 함수를 호출하여 상품 개수를 감소시킵니다.
- `Math.max`를 사용하여 상품 개수가 음수가 되지 않도록 합니다.

### 3. AddToCartButton과 RemoveFromCartButton 컴포넌트 사용하기

- `src/App.tsx`에서 `AddToCartButton`과 `RemoveFromCartButton` 컴포넌트를 렌더링합니다.

```tsx
import React from "react";
import CartItemCount from "./components/CartItemCount";
import AddToCartButton from "./components/AddToCartButton";
import RemoveFromCartButton from "./components/RemoveFromCartButton";
import "./App.css";

function App() {
  return (
    <div>
      <h1>장바구니</h1>
      <CartItemCount />
      <AddToCartButton />
      <RemoveFromCartButton />
    </div>
  );
}

export default App;
```

### 4. useSetRecoilState

`useSetRecoilState` 훅은 Recoil의 상태 값을 변경하는 함수를 반환합니다. 이 훅을 사용하여 컴포넌트에서 Atom의 값을 업데이트할 수 있습니다. `useSetRecoilState`는 상태 값을 직접 변경하는 것이 아니라, 상태 값을 업데이트하는 함수를 제공합니다.

<br>

# Step 5: Selector를 활용한 파생 상태 계산

## 학습 목표

- Selector의 개념 이해 및 생성 방법 학습
- Atom을 기반으로 파생 상태를 계산하는 방법 학습

## 가이드

### 1. Selector 생성하기

- `src/recoil/selectors.ts` 파일을 생성하고 다음 코드를 추가합니다.

```ts
import { selector } from "recoil";
import { cartItemCountState } from "./atoms";

export const cartTotalPriceState = selector<number>({
  key: "cartTotalPriceState",
  get: ({ get }) => {
    const count = get(cartItemCountState);
    const itemPrice = 10;
    return count * itemPrice;
  },
});
```

- `selector` 함수를 사용하여 Selector를 생성합니다.
- `key`는 Selector의 고유 식별자로 사용됩니다.
- `get` 함수에서 `cartItemCountState` Atom의 값을 가져와 총 가격을 계산합니다.

#### 2. Selector 이해하기

Selector는 Atom의 값을 기반으로 파생된 상태를 계산하는 역할을 합니다. Selector는 하나 이상의 Atom이나 다른 Selector를 입력으로 받아 새로운 상태 값을 계산하고 반환합니다. 이를 통해 상태 간의 의존성을 관리하고 파생된 값을 쉽게 계산할 수 있습니다.

#### Selector의 `get` 함수

Selector의 `get` 함수는 파생된 상태 값을 계산하는 역할을 합니다. `get` 함수는 `({ get }) => { ... }` 형태로 정의되며, `get` 인자를 통해 다른 Atom이나 Selector의 값을 가져올 수 있습니다. `get` 함수 내부에서는 필요한 상태 값을 읽어와 계산을 수행하고, 최종적으로 파생된 상태 값을 반환합니다.

<br>

# Step 6: 장바구니 상품 총 가격 표시 컴포넌트 작성

## 학습 목표

- Selector를 사용하여 파생 상태를 표시하는 컴포넌트 작성
- `useRecoilValue` 훅을 사용하여 Selector의 값을 읽어오는 방법 학습

## 가이드

### 1. CartTotalPrice 컴포넌트 작성하기

- `src/components/CartTotalPrice.tsx` 파일을 생성하고 다음 코드를 추가합니다.

```tsx
import React from "react";
import { useRecoilValue } from "recoil";
import { cartTotalPriceState } from "../recoil/selectors";

function CartTotalPrice() {
  const totalPrice = useRecoilValue(cartTotalPriceState);

  return <div>총 가격: {totalPrice}원</div>;
}

export default CartTotalPrice;
```

- `useRecoilValue` 훅을 사용하여 Selector의 값을 읽어옵니다.
- `cartTotalPriceState` Selector를 사용하여 총 가격을 표시합니다.

### 2. CartTotalPrice 컴포넌트 사용하기

- `src/App.tsx`에서 `CartTotalPrice` 컴포넌트를 렌더링합니다.

```tsx
import React from "react";
import CartItemCount from "./components/CartItemCount";
import AddToCartButton from "./components/AddToCartButton";
import RemoveFromCartButton from "./components/RemoveFromCartButton";
import CartTotalPrice from "./components/CartTotalPrice";
import "./App.css";

function App() {
  return (
    <div>
      <h1>장바구니</h1>
      <CartItemCount />
      <AddToCartButton />
      <RemoveFromCartButton />
      <CartTotalPrice />
    </div>
  );
}

export default App;
```

<br>

# Step 7: Asynchronous Selector를 사용하여 장바구니 데이터 가져오기

## 학습 목표

- [Asynchronous Selector](https://recoiljs.org/ko/docs/guides/asynchronous-data-queries)의 개념 이해 및 사용 방법 학습
- 비동기 데이터를 Selector를 통해 처리하는 방법 학습
- ErrorBoundary와 Suspense 컴포넌트의 역할과 사용 방법 이해

## 가이드

### 1. Asynchronous Selector 생성하기

- `src/recoil/selectors.ts` 파일에 다음 코드를 추가합니다.

```tsx
import { selector } from "recoil";
import { cartItemCountState } from "./atoms";

const fetchProducts = async () => {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();

    return data.products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return error;
  }
};

export const productsState = selector({
  key: "productsState",
  get: async () => {
    const products = await fetchProducts();
    return products;
  },
});
```

- `fetchProducts` 함수는 `fetch`를 사용하여 `https://dummyjson.com/products` API에서 상품 데이터를 가져옵니다.
- `productsState` Selector는 `get` 함수 내부에서 `fetchProducts` 함수를 호출하여 비동기적으로 상품 데이터를 가져옵니다.

### 2. 비동기 데이터를 사용하는 컴포넌트 작성하기

- `src/components/ProductList.tsx` 파일을 생성하고 다음 코드를 추가합니다.

```tsx
import React from "react";
import { useRecoilValue } from "recoil";
import { productsState } from "../recoil/selectors";
import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  text-align: left;
`;

const TableHeader = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 10px;
`;

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
};

function ProductList() {
  const products = useRecoilValue(productsState);

  if (products.length === 0) {
    return <div>상품이 없습니다.</div>;
  }

  return (
    <div>
      <h2>상품 목록</h2>
      <Table>
        <thead>
          <tr>
            <TableHeader>상품명</TableHeader>
            <TableHeader>설명</TableHeader>
            <TableHeader>가격</TableHeader>
          </tr>
        </thead>

        <tbody>
          {products.map((product: Product) => (
            <TableRow key={product.id}>
              <TableCell>{product.title}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.price}원</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ProductList;
```

- `useRecoilValue` 훅을 사용하여 `productsState` Selector의 값을 읽어옵니다.
- 상품 목록을 렌더링합니다.

### 3. Suspense로 로딩 상태 처리하기

- `src/App.tsx`에서 `ProductList` 컴포넌트를 `Suspense`로 감싸줍니다.

```tsx
import React, { Suspense } from "react";
// ... (이전 코드와 동일)

function App() {
  return (
    <div>
      {/* ... */}
      <Suspense fallback={<div>Loading...</div>}>
        <ProductList />
      </Suspense>
    </div>
  );
}

export default App;
```

- `Suspense` 컴포넌트를 사용하여 `ProductList` 컴포넌트를 감싸고, `fallback` 프로퍼티에 로딩 중 메시지를 설정합니다.
- `Suspense` 컴포넌트는 내부의 컴포넌트가 렌더링될 준비가 될 때까지 `fallback`에 지정된 UI를 보여줍니다.

### 4. ErrorBoundary로 에러 처리하기

#### 4-1. `src/components/ErrorFallback.tsx` 파일을 생성하고 다음 코드를 추가합니다.

```tsx
import React from "react";

interface ErrorFallbackProps {
  error: Error;
}

function ErrorFallback({ error }: ErrorFallbackProps) {
  return (
    <div>
      <p>Something went wrong: {error.message}</p>
    </div>
  );
}

export default ErrorFallback;
```

#### 4-2. `ErrorFallback` 함수 컴포넌트를 생성하여 에러 발생 시 보여줄 UI를 정의합니다.

```tsx
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback";
// ... (이전 코드와 동일)

function App() {
  return (
    <div>
      {/* ... */}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<div>Loading...</div>}>
          <ProductList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
```

- `react-error-boundary` 라이브러리에서 제공하는 `ErrorBoundary` 컴포넌트를 사용하여 `Suspense`와 `ProductList` 컴포넌트를 감싸줍니다.
- `FallbackComponent` prop에 `ErrorFallback` 컴포넌트를 전달하여 에러 발생 시 보여줄 UI를 설정합니다.

### react-error-boundary

`react-error-boundary`는 React 애플리케이션에서 [에러 경계(Error Boundary)](https://react-ko.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)를 쉽게 구현할 수 있도록 도와주는 라이브러리입니다. 하위 컴포넌트 트리에서 발생한 에러를 catch하고, fallback UI를 보여주는 역할을 합니다.

`react-error-boundary` 라이브러리는 함수형 컴포넌트에서 에러 경계를 사용할 수 있도록 `ErrorBoundary` 컴포넌트를 제공합니다. 이 컴포넌트는 `fallback`, `FallbackComponent`, `onError` 등의 prop을 통해 에러 처리 로직을 간편하게 구현할 수 있습니다.

이 라이브러리를 사용하면 클래스 컴포넌트 기반의 에러 경계 구현 방식에 비해 더 간결하고 직관적인 코드를 작성할 수 있습니다. 또한 에러 발생 시 재시도 기능을 제공하는 `useErrorBoundary` 훅도 함께 제공합니다.

<br>

# Step 8: AtomFamily를 사용하여 개별 상품 수량 관리하기

## 학습 목표

- AtomFamily의 개념 이해 및 사용 방법 학습
- 동적으로 생성된 Atom을 관리하는 방법 학습

### AtomFamily 소개

AtomFamily는 Recoil에서 제공하는 유틸리티 함수 중 하나로, 동일한 형태의 Atom을 동적으로 생성할 수 있게 해줍니다. 예를 들어, 장바구니에 담긴 각 상품의 수량을 관리할 때, 상품마다 별도의 Atom을 생성하는 것이 효과적일 수 있습니다. 이때 AtomFamily를 사용하면 상품 ID와 같은 고유한 식별자를 기반으로 Atom을 생성할 수 있습니다.

## 가이드

### 1. AtomFamily 생성하기

- `src/recoil/atoms.ts` 파일에 다음 코드를 추가합니다.

```tsx
import { atom, atomFamily } from "recoil";

export const itemQuantityState = atomFamily<number, number>({
  key: "itemQuantityState",
  default: 0,
});
```

- `atomFamily` 함수를 사용하여 AtomFamily를 생성합니다.
- 첫 번째 제네릭 매개변수는 Atom의 값 타입을, 두 번째 매개변수는 Atom을 식별하는 매개변수의 타입을 나타냅니다.
- `itemQuantityState`는 상품 ID를 매개변수로 받아 해당 상품의 수량을 관리하는 Atom을 반환합니다.

### 2. CartItem 컴포넌트 작성하기

- `src/components/CartItem.tsx` 파일을 생성하고 다음 코드를 추가합니다.

```tsx
import React from "react";
import { useRecoilState } from "recoil";
import { itemQuantityState } from "../recoil/atoms";

interface CartItemProps {
  item: {
    id: number;
    title: string;
    description: string;
    price: number;
  };
}

function CartItem({ item }: CartItemProps) {
  const [quantity, setQuantity] = useRecoilState(itemQuantityState(item.id));

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 0));
  };

  return (
    <div>
      <span>{item.title}</span>
      <span>수량: {quantity}</span>
      <button onClick={handleIncrement}>+</button>
      <button onClick={handleDecrement}>-</button>
    </div>
  );
}

export default CartItem;
```

- `useRecoilState` 훅을 사용하여 개별 상품의 수량을 관리하는 Atom의 값과 업데이트 함수를 가져옵니다.
- `itemQuantityState`에 상품 ID를 전달하여 해당 상품의 수량을 관리하는 Atom을 가져옵니다.
- 증가 버튼과 감소 버튼을 클릭하면 해당 상품의 수량을 업데이트합니다.

### 3. ProductList 컴포넌트에서 CartItem 컴포넌트 사용하기

- `src/components/ProductList.tsx`에서 `CartItem` 컴포넌트를 사용하도록 수정합니다.

```tsx
// ... (이전 코드와 동일)
import CartItem from "./CartItem";

// ... (이전 코드와 동일)

function ProductList() {
  const products = useRecoilValue(productsState);

  if (products.length === 0) {
    return <div>상품이 없습니다.</div>;
  }

  return (
    <div>
      <h2>상품 목록</h2>
      <Table>
        <thead>
          <tr>
            <TableHeader>상품명</TableHeader>
            <TableHeader>설명</TableHeader>
            <TableHeader>가격</TableHeader>
            <TableHeader>수량</TableHeader>
          </tr>
        </thead>
        <tbody>
          {products.map((product: Product) => (
            <TableRow key={product.id}>
              <TableCell>{product.title}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.price}원</TableCell>
              <TableCell>
                <CartItem item={product} />
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ProductList;
```

- `CartItem` 컴포넌트를 사용하여 각 상품의 수량을 관리할 수 있도록 수정합니다.
- 상품 객체를 `item` prop으로 전달하여 `CartItem` 컴포넌트에서 사용할 수 있도록 합니다.

### 정리

AtomFamily를 사용하면 동적으로 생성되는 Atom을 효과적으로 관리할 수 있습니다. 위의 예시에서는 상품 ID를 기반으로 개별 상품의 수량을 관리하는 Atom을 생성하였습니다. 이를 통해 각 상품마다 고유한 상태를 가질 수 있으며, 상태 업데이트 로직을 간결하게 유지할 수 있습니다.
AtomFamily는 상태 관리를 복잡하게 만들 수 있지만, 적절히 사용하면 오히려 상태 관리를 단순화할 수 있습니다. 특히 동적으로 생성되는 데이터를 다룰 때 유용합니다.

<br>

# Step 9: RTL을 활용한 장바구니 상태 관리 테스트

## 학습 목표

- RTL(React Testing Library)을 사용하여 Recoil 상태 관리 로직 테스트하는 방법 학습
- 테스트 케이스 작성을 통해 상태 관리 로직의 책임과 경계 이해

### 테스트 케이스

**1.장바구니 상품 개수 Atom 테스트**

- 초기값 검증
- 값 변경 검증

**2.장바구니 총 가격 Selector 테스트**

- 초기 총 가격 검증
- 상품 개수에 따른 총 가격 계산 검증

**3.개별 상품 수량 관리 AtomFamily 테스트**

- 초기 수량 검증
- 수량 변경 검증

## 가이드

### 테스트 케이스 1: 장바구니 상품 개수 Atom 테스트

- `src/recoil/atoms.test.ts` 파일을 생성하고 다음 코드를 추가합니다.

```tsx
import { renderHook, act } from "@testing-library/react";
import { RecoilRoot, useRecoilState } from "recoil";
import { cartItemCountState } from "./atoms";

describe("cartItemCountState", () => {
  it("초기값은 0", () => {
    const { result } = renderHook(() => useRecoilState(cartItemCountState), {
      wrapper: RecoilRoot,
    });
    expect(result.current[0]).toBe(0);
  });

  it("값 변경 가능", () => {
    const { result } = renderHook(() => useRecoilState(cartItemCountState), {
      wrapper: RecoilRoot,
    });

    act(() => {
      result.current[1](2);
    });
    expect(result.current[0]).toBe(2);

    act(() => {
      result.current[1]((prevCount) => prevCount + 1);
    });
    expect(result.current[0]).toBe(3);
  });
});
```

- `renderHook` 함수를 사용하여 테스트 환경에서 `useRecoilState` 훅을 렌더링합니다.
  - `useRecoilState` 훅은 Atom의 현재 값과 값을 업데이트하는 함수를 반환합니다.
  - `renderHook` 함수의 `wrapper` 옵션에 `RecoilRoot` 컴포넌트를 전달하여 Recoil 상태 관리 환경을 설정합니다.
- `result.current`는 `useRecoilState` 훅이 반환하는 배열입니다.
  - `result.current[0]`은 Atom의 현재 값을 나타냅니다.
  - `result.current[1]`은 Atom의 값을 업데이트하는 함수입니다.
- `expect` 함수를 사용하여 Atom의 초기값과 값 변경 후의 상태를 검증합니다.
- `act` 함수를 사용하여 Atom의 값을 업데이트하는 작업을 실행합니다.
  - `act` 함수 내부에서 `result.current[1]` 함수를 호출하여 Atom의 값을 변경합니다.

### 테스트 케이스 2: 장바구니 총 가격 Selector 테스트

- `src/recoil/selectors.test.ts` 파일을 생성하고 다음 코드를 추가합니다.

```tsx
import { renderHook, act } from "@testing-library/react";
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import { cartItemCountState } from "./atoms";
import { cartTotalPriceState } from "./selectors";

describe("cartTotalPriceState", () => {
  it("초기 총 가격은 0", () => {
    const { result } = renderHook(() => useRecoilValue(cartTotalPriceState), {
      wrapper: RecoilRoot,
    });
    expect(result.current).toBe(0);
  });

  it("상품 개수에 따른 총 가격 계산", () => {
    const { result } = renderHook(
      () => {
        const totalPrice = useRecoilValue(cartTotalPriceState);
        const setCartItemCount = useSetRecoilState(cartItemCountState);
        return { totalPrice, setCartItemCount };
      },
      {
        wrapper: RecoilRoot,
      }
    );

    act(() => {
      result.current.setCartItemCount(2);
    });
    expect(result.current.totalPrice).toBe(20);

    act(() => {
      result.current.setCartItemCount(5);
    });
    expect(result.current.totalPrice).toBe(50);
  });
});
```

- `useRecoilValue` 훅을 사용하여 Selector의 현재 값을 가져옵니다.
- `useSetRecoilState` 훅을 사용하여 Atom의 값을 업데이트하는 함수를 가져옵니다.
- `renderHook` 함수의 첫 번째 인자로 전달한 콜백 함수에서 `useRecoilValue`와 `useSetRecoilState` 훅을 사용하여 Selector의 값과 Atom의 값을 업데이트하는 함수를 반환합니다.
- `act` 함수 내부에서 `result.current.setCartItemCount` 함수를 호출하여 Atom의 값을 변경하고, 그에 따른 Selector의 값 변화를 검증합니다.
- `result.current.totalPrice`를 사용하여 Selector의 현재 값을 확인합니다.

### 테스트 케이스 3: 개별 상품 수량 관리 AtomFamily 테스트

- `src/recoil/atoms.test.ts` 파일에 다음 코드를 추가합니다.

```tsx
import { cartItemCountState, itemQuantityState } from "./atoms";

describe("itemQuantityState", () => {
  it("초기 수량은 0", () => {
    const productId = 1;
    const { result } = renderHook(
      () => useRecoilState(itemQuantityState(productId)),
      {
        wrapper: RecoilRoot,
      }
    );
    expect(result.current[0]).toBe(0);
  });

  it("수량 변경 가능", () => {
    const productId = 1;
    const { result } = renderHook(
      () => useRecoilState(itemQuantityState(productId)),
      {
        wrapper: RecoilRoot,
      }
    );

    act(() => {
      result.current[1](2);
    });
    expect(result.current[0]).toBe(2);

    act(() => {
      result.current[1]((prevQuantity) => prevQuantity + 1);
    });
    expect(result.current[0]).toBe(3);
  });
});
```

- `itemQuantityState` AtomFamily를 사용하여 개별 상품의 수량을 관리합니다.
- `itemQuantityState` 함수에 `productId`를 전달하여 특정 상품에 대한 Atom을 생성합니다.
- 나머지 테스트 과정은 테스트 케이스 1과 유사합니다.
  - `result.current[0]`을 사용하여 AtomFamily로 생성한 Atom의 현재 값에 접근합니다.
  - `result.current[1]` 함수를 사용하여 AtomFamily로 생성한 Atom의 값을 업데이트합니다.
