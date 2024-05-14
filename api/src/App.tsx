import "./App.css";

import { CartItem, Product } from "./types";
import React, { useEffect, useState } from "react";
import { fetchCartItems, fetchProducts } from "./api";

import Cart from "./components/Cart";
import ProductList from "./components/ProductList";

function App() {
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

  return (
    <div>
      <h1>상품 목록 및 장바구니</h1>
      <ProductList products={products} />
      <Cart items={cartItems} />
    </div>
  );
}

export default App;
