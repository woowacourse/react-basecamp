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
  
    useEffect(() => {
      const getProducts = async () => {
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

    }, [page]);

    const fetchNextPage = () => {
        const LAST_PAGE = 20
        if(page <= LAST_PAGE ) {
            setPage((prevPage) => prevPage + 1);
        }
        setLoading(true)
      };
  
    return { products, loading, error,page,fetchNextPage };
  }