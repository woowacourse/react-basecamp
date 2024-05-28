import { useState, useEffect } from "react";
import { PRODUCTS_ENDPOINT } from "../api/endpoints";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

interface UseProductsResult {
  products: Product[];
}

export default function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(PRODUCTS_ENDPOINT);
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return { products };
}
