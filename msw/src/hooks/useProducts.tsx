import { useState, useEffect } from "react";
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
  fetchNextPage: () => void;
}

export default function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(1);
  const [isReachedLastPage, setIsReachedLastPage] = useState<boolean>(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts(nextPage, 4);
        if (data.length < 1) {
          setIsReachedLastPage(true);
          return;
        }
        setProducts((prevProducts) => [...prevProducts, ...data]);
        setPage(nextPage);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [nextPage]);

  const fetchNextPage = () => {
    if (!isReachedLastPage) {
      setNextPage((prevPage) => prevPage + 1);
      setLoading(true);
    }
  };

  return { products, loading, error, page, fetchNextPage };
}
