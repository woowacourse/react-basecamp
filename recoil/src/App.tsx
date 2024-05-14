import React, { Suspense } from "react";
import CartItemCount from "./components/CartItemCount";
import AddToCartButton from "./components/AddToCartButton";
import RemoveFromCartButton from "./components/RemoveFromCartButton";
import "./App.css";
import CartTotalPrice from "./components/CartTotalPrice";
import ProductList from "./components/ProductList";
import { ErrorBoundary } from "react-error-boundary";
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
