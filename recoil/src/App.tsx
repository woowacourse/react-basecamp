import { Suspense } from 'react';
<<<<<<< HEAD
import './App.css';
import AddToCartButton from './components/AddToCartButton';
import CartItemCount from './components/CartItemCount';
import CartTotalPrice from './components/CartTotalPrice';
import RemoveFromCartButton from './components/RemoveFromCartButton';
=======
import CartItemCount from './components/CartItemCount';
import AddToCartButton from './components/AddToCartButton';
import RemoveFromCartButton from './components/RemoveFromCartButton';
import CartTotalPrice from './components/CartTotalPrice';
import './App.css';
>>>>>>> bb7b51d9b22bbb08fa7c3785cfe93ab21e05c80f
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
<<<<<<< HEAD

=======
>>>>>>> bb7b51d9b22bbb08fa7c3785cfe93ab21e05c80f
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<div>Loading...</div>}>
          <ProductList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
