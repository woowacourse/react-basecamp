import { useEffect, useState } from "react";
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
  loading: boolean;
  error: boolean;
}
const useProducts = (): UseProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(PRODUCTS_ENDPOINT);
        const data = await response.json();
        setProducts(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return { products, loading, error };
};

export default useProducts;
