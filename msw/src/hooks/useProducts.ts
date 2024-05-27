import { useEffect, useState } from 'react';
import { PRODUCTS_ENDPOINT } from '../api/endpoint';

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
  error: unknown;
  page: number;
  fetchNextPage: () => void;
}

export default function useProducts(): UseProductsResult {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const limit = page === 1 ? 20 : 4;
        const response = await fetch(`${PRODUCTS_ENDPOINT}?page=${page}&limit=${limit}`);
        const data = await response.json();

        setProducts((prevProducts) => [...prevProducts, ...data]);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  const fetchNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return { products, loading, error, page, fetchNextPage };
}
