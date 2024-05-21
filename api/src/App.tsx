import { useEffect, useState } from 'react';
import './App.css';
import {
  addCartItem,
  fetchCartItems,
  fetchProducts,
  removeCartItem,
} from './api';
import ProductList from './components/ProductList.tsx';
import { CartItem, Product } from './types';
import Cart from './components/Card.tsx';

function App() {
  // loading, error를 상태로 관리
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

  const handleAddToCart = async (productId: number) => {
    try {
      await addCartItem(productId);
      const updatedCartItems = await fetchCartItems();
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      alert('장바구니에 상품을 추가하는데 실패했습니다.');
    }
  };

  const handleRemoveItem = async (cartItemId: number) => {
    try {
      await removeCartItem(cartItemId);
      const updatedCartItems = await fetchCartItems();
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error('Failed to remove cart item:', error);
    }
  };

  return (
    <div>
      <h1>상품 목록</h1>
      <h1>상품 목록 및 장바구니</h1>
      <ProductList products={products} onAddToCart={handleAddToCart} />
      <Cart items={cartItems} onRemoveItem={handleRemoveItem} />
    </div>
  );
}

export default App;

