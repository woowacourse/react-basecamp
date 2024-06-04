import { useEffect, useState } from 'react';

import { fetchProducts } from '../api/products';

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
  isLastPage: boolean;
  fetchNextPage: () => void;
}

export default function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        if (isLastPage) return;
        const data = await fetchProducts(page, 4);
        if (data.length < 4) setIsLastPage(true);

        if (data.length === 0) setPage(prevPage => prevPage - 1);

        setProducts(prevProducts => [...prevProducts, ...data]);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [page, isLastPage]);

  const fetchNextPage = () => {
    setPage(prevPage => (isLastPage ? prevPage : prevPage + 1));
  };

  return { products, loading, error, page, isLastPage, fetchNextPage };
}
