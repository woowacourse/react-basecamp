import { useEffect, useState } from 'react';
import { API_URL } from '../mocks/handlers';

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
      const response = await fetch(API_URL);
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return { products };
}
