# Basic 인증을 통한 장바구니 구현 실습

이 실습은 실제 API를 사용하여 간단한 장바구니와 상품 목록을 구현해보는 경험을 할 수 있도록 설계되었습니다.

그럼 실습을 시작해봅시다!

## **Step 0:** 프로젝트 구조

프로젝트의 주요 디렉토리와 파일 구조는 다음과 같습니다.

```tsx
src/
├── api/
│   └── index.ts
├── assets/
├── components/
│   ├── Cart.tsx
│   └── ProductList.tsx
├── utils/
│   └── auth.ts
├── App.css
├── App.tsx
├── index.css
├── main.tsx
├── types.ts
└── vite-env.d.ts
```

# Step 1: Basic 인증 정보 생성하기

## 학습 목표

- Basic 인증의 개념과 동작 원리 이해하기
- 사용자 아이디와 비밀번호를 Base64로 인코딩하기

## 가이드

### 1. Basic 인증 이해하기

Basic 인증은 HTTP 프로토콜에서 사용자 인증을 위해 사용되는 간단한 인증 방식입니다. 사용자의 아이디와 비밀번호를 Base64로 인코딩하여 요청 헤더에 포함시켜 서버로 전송하는 방식으로 동작합니다.

그러나 Basic 인증은 보안 측면에서 취약점이 있습니다. 인코딩된 정보를 디코딩하면 아이디와 비밀번호가 쉽게 노출될 수 있기 때문입니다. 따라서 실제 개발에서는 JWT(JSON Web Token)와 같은 토큰 기반 인증 방식이나 OAuth와 같은 표준 프로토콜을 사용하는 것이 좋습니다.

### 2. Basic 인증 정보 생성하기

**`src/utils/auth.ts`** 파일을 생성하고 다음 코드를 추가합니다.

```tsx
export function generateBasicToken(
  userId: string,
  userPassword: string
): string {
  const token = btoa(`${userId}:${userPassword}`);
  return `Basic ${token}`;
}
```

- **`generateBasicToken`** 함수는 사용자 아이디와 비밀번호를 입력받아 Basic 인증 토큰을 생성합니다.
- **`btoa`** 함수를 사용하여 **`userId:userPassword`** 형식의 문자열을 Base64로 인코딩합니다.
- 인코딩된 토큰 앞에 **`Basic`** 접두사를 붙여 반환합니다. 이는 서버에게 Basic 인증 방식을 사용한다는 것을 알려주기 위함입니다.

이렇게 생성된 Basic 인증 토큰은 이후 API 요청 시 헤더에 포함되어 서버로 전송됩니다.

# Step 2: 타입 정의하기

## 학습 목표

- 필요한 타입 인터페이스 정의하기

## 가이드

`src/types.ts` 파일을 생성하고 다음 코드를 추가합니다.

```tsx
export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}
```

# Step 3: 상품 목록 데이터 가져오기

## 학습 목표

- API 호출 함수를 작성하여 상품 목록 데이터 불러오기

## 가이드

먼저, **`src/api/index.ts`** 파일을 생성하고 다음 코드를 추가합니다.

```tsx
import { Product } from "../types";
import { generateBasicToken } from "../utils/auth";

const API_URL = "http://api-url.com";
const USER_ID = "username";
const USER_PASSWORD = "password";

export async function fetchProducts(): Promise<Product[]> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}/products`, {
    method: "GET",
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();
  return data.content;
}
```

- **`fetchProducts`** 함수는 상품 목록 데이터를 가져오는 비동기 함수입니다.
- **`generateBasicToken`** 함수를 사용하여 Basic 인증 토큰을 생성합니다.
- **`fetch`** 함수를 사용하여 상품 목록 API를 호출하고, 인증 토큰을 헤더에 포함시켜 전송합니다.
- 응답 데이터에서 **`content`** 프로퍼티로 상품 목록 배열을 반환합니다.

다음으로, **`src/App.tsx`** 파일을 수정하여 상품 목록 데이터를 관리하고 **`ProductList`** 컴포넌트로 전달합니다.

```tsx
import React, { useEffect, useState } from "react";
import { Product } from "./types";
import { fetchProducts } from "./api";
import ProductList from "./components/ProductList";
import "./App.css";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        setError(error as Error);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>상품 목록</h1>
      <ProductList products={products} />
    </div>
  );
}

export default App;
```

- **`App`** 컴포넌트에서는 **`useState`** 훅을 사용하여 상품 목록(**`products`**), 로딩 상태(**`loading`**), 에러 상태(**`error`**)를 관리합니다.
- **`useEffect`** 훅을 사용하여 컴포넌트가 마운트될 때 **`fetchProducts`** 함수를 호출하여 상품 목록 데이터를 가져옵니다.
- 로딩 중일 때는 "Loading..." 메시지를 표시하고, 에러가 발생했을 때는 에러 메시지를 표시합니다.
- 상품 목록 데이터가 성공적으로 로드되면 **`ProductList`** 컴포넌트를 렌더링하고, **`products`** prop으로 상품 목록 데이터를 전달합니다.

마지막으로, **`src/components/ProductList.tsx`** 파일을 생성하고 다음 코드를 추가합니다.

```tsx
import React from "react";
import { Product } from "../types";

interface ProductListProps {
  products: Product[];
}

function ProductList({ products }: ProductListProps) {
  return (
    <div>
      <h2>상품 목록</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.imageUrl} alt={product.name} width={100} />
            {product.name} - {product.price}원
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
```

- **`ProductList`** 컴포넌트는 **`products`** prop을 통해 상품 목록 데이터를 전달받습니다.
- **`products`** 배열을 **`map`** 함수를 사용하여 각 상품 정보를 렌더링합니다.

이렇게 하면 상품 목록 데이터를 서버에서 가져와 최상위 컴포넌트에서 관리하고, 하위 컴포넌트로 전달하여 사용할 수 있습니다.

# Step 4: 장바구니 데이터 가져오기

## 학습 목표

- API 호출 함수를 작성하여 장바구니 데이터 불러오기

## 가이드

먼저, **`src/api/index.ts`** 파일에 다음 코드를 추가합니다.

```tsx
export async function fetchCartItems(): Promise<CartItem[]> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}/cart-items`, {
    method: "GET",
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch cart items");
  }

  const data = await response.json();
  return data.content;
}
```

- **`fetchCartItems`** 함수는 장바구니 데이터를 가져오는 비동기 함수입니다.
- 인증 토큰을 생성하여 헤더에 포함시켜 장바구니 API를 호출합니다.
- 응답이 성공적이지 않을 경우 에러를 throw합니다.
- 응답 데이터에서 **`content`** 프로퍼티를 추출하여 장바구니 아이템 배열을 반환합니다.

다음으로, **`src/App.tsx`** 파일을 수정하여 장바구니 데이터를 관리하고 **`Cart`** 컴포넌트로 전달합니다.

```tsx
import React, { useEffect, useState } from "react";
import { CartItem, Product } from "./types";
import { fetchProducts, fetchCartItems } from "./api";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import "./App.css";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const productsData = await fetchProducts();
        const cartItemsData = await fetchCartItems();
        setProducts(productsData);
        setCartItems(cartItemsData);
      } catch (error) {
        setError(error as Error);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>상품 목록 및 장바구니</h1>
      <ProductList products={products} />
      <Cart items={cartItems} />
    </div>
  );
}

export default App;
```

- **`App`** 컴포넌트에서는 **`useState`** 훅을 사용하여 상품 목록(**`products`**), 장바구니 아이템(**`cartItems`**), 로딩 상태(**`loading`**), 에러 상태(**`error`**)를 관리합니다.
- **`useEffect`** 훅을 사용하여 컴포넌트가 마운트될 때 **`fetchProducts`** 함수와 **`fetchCartItems`** 함수를 호출하여 상품 목록과 장바구니 데이터를 가져옵니다.
- 로딩 중일 때는 "Loading..." 메시지를 표시하고, 에러가 발생했을 때는 에러 메시지를 표시합니다.
- 데이터가 성공적으로 로드되면 **`ProductList`** 컴포넌트와 **`Cart`** 컴포넌트를 렌더링하고, 각각 `**products**`와 **`cartItems`** prop으로 데이터를 전달합니다.

마지막으로, **`src/components/Cart.tsx`** 파일을 생성하고 다음 코드를 추가합니다.

```tsx
import React from "react";
import { CartItem } from "../types";

interface CartProps {
  items: CartItem[];
}

function Cart({ items }: CartProps) {
  return (
    <div>
      <h2>장바구니</h2>
      {items.length === 0 ? (
        <p>장바구니가 비어있습니다.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.product.name} - {item.product.price}원 ({item.quantity}개)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;
```

- **`Cart`** 컴포넌트는 **`items`** prop을 통해 장바구니 데이터를 전달받습니다.
- 장바구니가 비어있는 경우 "장바구니가 비어있습니다." 메시지를 표시합니다.

# Step 5: 장바구니에 상품 추가하기

## 학습 목표

- API 호출 함수를 작성하여 장바구니에 상품 추가하기

## 가이드

이 단계에서는 장바구니에 상품을 추가하는 API 호출 함수를 작성하고, 상품 추가 후 장바구니 데이터를 업데이트하는 방법을 알아봅니다. 그리고 장바구니에 상품을 추가하는 기능을 ProductList 컴포넌트에 구현합니다.

먼저, **`src/api/index.ts`** 파일에 다음 코드를 추가합니다.

```tsx
export async function addCartItem(productId: number): Promise<void> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}/cart-items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ productId }),
  });

  if (!response.ok) {
    throw new Error("Failed to add cart item");
  }
}
```

- **`addCartItem`** 함수는 장바구니에 상품을 추가하는 비동기 함수입니다.
- 인증 토큰을 생성하여 헤더에 포함시키고, 요청 바디에 추가할 상품의 ID를 JSON 형태로 전송합니다.
- 응답이 성공적이지 않을 경우 에러를 throw합니다.

다음으로, **`src/App.tsx`** 파일을 수정하여 장바구니에 상품을 추가하는 함수를 정의하고 **`ProductList`** 컴포넌트로 전달합니다.

```tsx
import { addCartItem } from "./api";

// ...

function App() {
  // ...

  const handleAddToCart = async (productId: number) => {
    try {
      await addCartItem(productId);
      const updatedCartItems = await fetchCartItems();
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      alert("장바구니에 상품을 추가하는데 실패했습니다.");
    }
  };

  // ...

  return (
    <div>
      <h1>상품 목록 및 장바구니</h1>
      <ProductList products={products} onAddToCart={handleAddToCart} />
      <Cart items={cartItems} />
    </div>
  );
}
```

- **`handleAddToCart`** 함수는 장바구니에 상품을 추가하는 함수입니다. 상품 ID를 인자로 받아 **`addCartItem`** 함수를 호출하여 서버에 상품 추가 요청을 보냅니다.
- 상품 추가 후에는 **`fetchCartItems`** 함수를 호출하여 업데이트된 장바구니 데이터를 가져와 상태를 업데이트합니다.
- **`ProductList`** 컴포넌트를 렌더링할 때 **`onAddToCart`** prop으로 **`handleAddToCart`** 함수를 전달합니다.

마지막으로, **`src/components/ProductList.tsx`** 파일을 수정하여 장바구니에 상품을 담 버튼을 추가합니다.

```tsx
import React from "react";
import { Product } from "../types";

interface ProductListProps {
  products: Product[];
  onAddToCart: (productId: number) => void;
}

function ProductList({ products, onAddToCart }: ProductListProps) {
  return (
    <div>
      <h2>상품 목록</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.imageUrl} alt={product.name} width={100} />
            {product.name} - {product.price}원<button onClick={() => onAddToCart(product.id)}>장바구니에 추가</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
```

- **`ProductList`** 컴포넌트에서는 각 상품 아이템에 "장바구니에 추가" 버튼을 렌더링합니다.
- 버튼 클릭 시 **`onAddToCart`** 함수를 호출하여 해당 상품의 ID를 전달합니다.

# Step 6: 장바구니에서 상품 삭제하기

## 학습 목표

- API 호출 함수를 작성하여 장바구니에서 상품 삭제하기

## 가이드

이 단계에서는 장바구니에서 상품을 삭제하는 API 호출 함수를 작성하고, 상품 삭제 후 장바구니 데이터를 업데이트하는 방법을 알아봅니다. 그리고 장바구니에서 상품을 삭제하는 기능을 Cart 컴포넌트에 구현합니다.

먼저, **`src/api/index.ts`** 파일에 다음 코드를 추가합니다.

```tsx
export async function removeCartItem(cartItemId: number): Promise<void> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}/cart-items/${cartItemId}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to remove cart item");
  }
}
```

- **`removeCartItem`** 함수는 장바구니에서 상품을 삭제하는 비동기 함수입니다.
- 인증 토큰을 헤더에 포함시켜 해당 상품의 ID를 URL 경로에 포함하여 DELETE 요청을 보냅니다.
- 응답이 성공적이지 않을 경우 에러를 throw합니다.

다음으로, **`src/App.tsx`** 파일을 수정하여 장바구니에서 상품을 삭제하는 함수를 정의하고 **`Cart`** 컴포넌트로 전달합니다.

```tsx
import { removeCartItem } from "./api";

// ...

function App() {
  // ...

  const handleRemoveItem = async (cartItemId: number) => {
    try {
      await removeCartItem(cartItemId);
      const updatedCartItems = await fetchCartItems();
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error("Failed to remove cart item:", error);
    }
  };

  // ...

  return (
    <div>
      <h1>상품 목록 및 장바구니</h1>
      <ProductList products={products} onAddToCart={handleAddToCart} />
      <Cart items={cartItems} onRemoveItem={handleRemoveItem} />
    </div>
  );
}
```

- **`handleRemoveItem`** 함수는 장바구니에서 상품을 삭제하는 함수입니다. 장바구니 아이템의 ID를 인자로 받아 **`removeCartItem`** 함수를 호출하여 서버에 상품 삭제 요청을 보냅니다.
- 상품 삭제 후에는 **`fetchCartItems`** 함수를 호출하여 업데이트된 장바구니 데이터를 가져와 상태를 업데이트합니다.
- **`Cart`** 컴포넌트를 렌더링할 때 **`onRemoveItem`** prop으로 **`handleRemoveItem`** 함수를 전달합니다.

마지막으로, **`src/components/Cart.tsx`** 파일을 수정하여 장바구니에서 상품을 삭제하는 버튼을 추가합니다.

```tsx
import React from "react";
import { CartItem } from "../types";

interface CartProps {
  items: CartItem[];
  onRemoveItem: (cartItemId: number) => void;
}

function Cart({ items, onRemoveItem }: CartProps) {
  return (
    <div>
      <h2>장바구니</h2>
      {items.length === 0 ? (
        <p>장바구니가 비어있습니다.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.product.name} - {item.product.price}원 ({item.quantity}개)
              <button onClick={() => onRemoveItem(item.id)}>삭제</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;
```

- **`Cart`** 컴포넌트에서는 각 장바구니 아이템에 "삭제" 버튼을 렌더링합니다.
- 버튼 클릭 시 **`onRemoveItem`** 함수를 호출하여 해당 장바구니 아이템의 ID를 전달합니다.
