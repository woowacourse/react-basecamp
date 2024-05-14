import "./App.css";

import React, { Suspense } from "react";

import AddToCartButton from "./components/AddToCartButton";
import CartItemCount from "./components/CartItemCount";
import CartTotalPrice from "./components/CartTotalPrice";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback";
import ProductList from "./components/ProductList";
import RemoveFromCartButton from "./components/RemoveFromCartButton";

function App() {
  return (
    <div>
      <h1>장바구니</h1>
      <CartItemCount />
      <AddToCartButton />
      <RemoveFromCartButton />
      <CartTotalPrice />

      {/* 
        react-error-boundary
        하위 컴포넌트 트리에서 발생한 에러를 catch하고, fallback UI를 보여주는 역할을 하는 라이브러리
        함수형 컴포넌트에서 에러 경계를 사용할 수 있도록 ErrorBoundary 컴포넌트를 제공
        fallback, FallbackComponent, onError 등의 prop을 통해 에러 처리 로직을 간편하게 구현 가능
        에러 발생 시 재시도 기능을 제공하는 useErrorBoundary 훅도 함께 제공
      */}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<div>Loading...</div>}>
          <ProductList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
