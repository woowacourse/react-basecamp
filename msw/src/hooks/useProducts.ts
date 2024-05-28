import { useState, useEffect } from 'react';
import { PRODUCTS_ENDPOINT } from '../api/endpoints';
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
  const [page, setPage] = useState(1); // 1페이지부터 시작
  const [totalPage, setTotalPage] = useState<number | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const { paginatedProducts, totalPage: curTotalPage } = await fetchProducts(page, 4);
        if (curTotalPage !== totalPage) setTotalPage(curTotalPage);

        setProducts((prevProducts) => [...prevProducts, ...paginatedProducts]);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [page]);

  const fetchNextPage = () => {
    if (totalPage === page) return;
    setPage((prevPage) => prevPage + 1);
  };

  return { products, loading, error, page, fetchNextPage };
}

/**
 * fetchNextPage -> getProducts -> hasNextPage 가 false면 ->
 *
 */
