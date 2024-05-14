import CartItemCount from "./components/CardItemCount";
import AddToCartButton from "./components/AddToCardButton";
import RemoveFromCartButton from "./components/RemoveFromCartButton";
import "./App.css";
import CartTotalPrice from "./components/CartTotalPrice";
import { Suspense } from "react";
import ProductList from "./components/ProductList";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErorrFallback";

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
        </Suspense>{" "}
      </ErrorBoundary>
    </div>
  );
}

export default App;
