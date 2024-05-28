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
  fetchNextPage: () => void;
}

export default function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);
  const [page, setPage] = useState(1);
  const [isLast, setIsLast] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      if (page >= 21) setIsLast(true);
      if (isLast) return;
      try {
        const data = await fetchProducts(page, 4);

        setProducts((prevProducts) => [...prevProducts, ...data]);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [page, isLast]);

  const fetchNextPage = () => {
    if (isLast) return;
    setPage((prevPage) => prevPage + 1);
  };

  return { products, loading, error, page, fetchNextPage };
}
