import { Suspense } from 'react';
import './App.css';
import AddToCartButton from './components/AddToCardButton';
import CartItemCount from './components/CardItemCount';
import CartTotalPrice from './components/CartTotalPrice';
import RemoveFromCartButton from './components/RemoveFromCartButton';
import ProductList from './components/ProductList';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback';

function App() {
  return (
    <div>
      <h1>장바구니</h1>
      <CartItemCount />
      <AddToCartButton />
      <RemoveFromCartButton />
      <CartTotalPrice />

      {/* error-boundary 라이브러리 제공 컴포넌트 */}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<div>Loading...</div>}>
          <ProductList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;

