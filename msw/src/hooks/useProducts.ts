import { useEffect, useState } from "react";
import { fetchProducts } from "../api/products";

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
  hasMore: boolean;
  fetchNextPage: () => void;
}

export default function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const limit = page === 1 ? 20 : 4;
        const data = await fetchProducts(page, limit);
        setProducts((prevProducts) => [...prevProducts, ...data]);
        if (data.length < limit) {
          setHasMore(false);
          setPage((prevPage) => prevPage - 1);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (hasMore) {
      getProducts();
    }
  }, [page, hasMore]);

  const fetchNextPage = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return { products, loading, error, page, hasMore, fetchNextPage };
}
