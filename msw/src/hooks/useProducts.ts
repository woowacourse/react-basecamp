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
  const [isLastPage, setIsLastPage] = useState<boolean>(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts(page, 4);
        if (data.length === 0) {
          setIsLastPage(true);
          setPage((prev) => prev - 1);
          return;
        }
        setProducts((prevProducts) => [...prevProducts, ...data]);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (!isLastPage) {
      getProducts();
    }
  }, [page]);

  const fetchNextPage = () => {
    if (!isLastPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return { products, loading, error, page, fetchNextPage };
}
