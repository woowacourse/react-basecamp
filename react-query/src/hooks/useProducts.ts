import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/products";
import { QUERY_KEYS } from "../constants/queryKeys";

export function useProducts() {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS],
    queryFn: fetchProducts,
  });
}
