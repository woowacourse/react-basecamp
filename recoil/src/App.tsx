import "./App.css";

import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import CartItemCount from "./components/CartItemCount";
import AddToCartButton from "./components/AddFromCartButton";
import RemoveFromCartButton from "./components/RemoveFromCartButton";
import CartTotalPrice from "./components/CartTotalPrice";
import ProductList from "./components/ProductList";
import ErrorFallback from "./components/ErrorFallback";

function App() {
  return (
    <div>
      <h1>장바구니</h1>
      <CartItemCount />
      <AddToCartButton />
      <RemoveFromCartButton />
      <CartTotalPrice />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<div>Loading...</div>}>
          <ProductList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;