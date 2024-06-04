import { QUERY_KEYS } from '../constants/queryKeys';
import { fetchProducts } from '../api/products';
// src/hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query';

export function useProducts() {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS],
    queryFn: fetchProducts,
  });
}
