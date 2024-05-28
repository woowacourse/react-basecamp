import { fetchProducts } from "../api/products";
import { Product } from "./../../../api/src/types";
import { useEffect, useState } from "react";

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: unknown;
  page: number;
  fetchNextPage: () => void;
}

const PAGE_SIZE = 4;

export default function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data, isLastPage } = await fetchProducts(page, PAGE_SIZE);
        setProducts((prevProducts) => [...prevProducts, ...data]);
        setIsLastPage(isLastPage);
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
