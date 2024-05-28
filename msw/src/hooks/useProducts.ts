import { useState, useEffect } from "react";

import fetchProducts from "../api/products";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

interface UseProductResult {
  products: Product[];
  loading: boolean;
  error: unknown;
  page: number;
  fetchNextPage: () => void;
}

const useProducts = (): UseProductResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);
  const [page, setPage] = useState(1);
  const [isReachedLastPage, setIsReachedLastPage] = useState(false);
  const [nextPage, setNextPage] = useState(page);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts<Product[]>(nextPage, 4);

        if (data.length === 0) {
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
      setNextPage((prevNextPage) => prevNextPage + 1);
    }
  };

  return { products, loading, error, page, fetchNextPage };
};

export default useProducts;
