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
  fetchNextPage: () => void;
}

export default function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);
  const [page, setPage] = useState(1);
  const [isLastPage, setLastPage] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { content: data, last } = await fetchProducts(
          page,
          page === 1 ? 20 : 4
        );
        setProducts((prevProducts) => [...prevProducts, ...data]);
        setLastPage(last);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [page]);

  const fetchNextPage = () => {
    if (!isLastPage) {
      setLoading(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  return { products, loading, error, page, fetchNextPage };
}
