// src/hooks/useProducts.ts

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "../constants/queryKeys";
import { fetchProducts } from "../apis/products";

export function useProducts() {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS],
    queryFn: fetchProducts,
  });
}
