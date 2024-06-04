import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/product";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
}
