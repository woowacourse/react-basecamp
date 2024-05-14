import './App.css';
import AddToCartButton from './components/AddToCartButton';
import CartItemCount from './components/CartItemCount';
import CartTotalPrice from './components/CartTotalPrice';
import RemoveFromCartButton from './components/RemoveFromCartButton';

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
