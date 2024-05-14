import React, { useEffect, useState } from 'react';
import { CartItem, Product } from './types';
import { addCartItem, fetchCartItems, fetchProducts } from './api';
import ProductList from './components/ProductList';
import './App.css';
import Cart from './components/Cart';

import { removeCartItem } from './api';

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

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>상품 목록</h1>
      <ProductList products={products} onAddToCart={handleAddToCart} />
      <Cart onRemoveItem={handleRemoveItem} items={cartItems} />
    </div>
  );
}

export default App;
