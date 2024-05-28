import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback";
import CartItemCount from "./components/CartItemCount";
import AddToCartButton from "./components/AddToCartButton";
import RemoveFromCartButton from "./components/RemoveFromCartButton";
import CartTotalPrice from "./components/CartTotalPrice";
import ProductList from "./components/ProductList";
import "./App.css";

function App() {
  return (
    <div>
      <h1>장바구니</h1>
      <CartItemCount />
      <AddToCartButton />
      <RemoveFromCartButton />
      <CartTotalPrice />
      <Suspense fallback={<div>Loading...</div>}>
        <ProductList />
      </Suspense>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<div>Loading...</div>}>
          <ProductList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
