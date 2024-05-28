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
  error: boolean;
  page: number;
  fetchNextPage: () => void;
}
const useProducts = (): UseProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const limit = page === 1 ? 20 : 4;
        const data = await fetchProducts(page, limit);
        setProducts((prevProducts) => [...prevProducts, ...data]);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, [page]);

  const fetchNextPage = () => {
    if (page === 21) return;
    setPage((prevPage) => prevPage + 1);
  };
  return { products, page, loading, error, fetchNextPage };
};

export default useProducts;
