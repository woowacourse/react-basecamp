import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../apis/products";
import { QUERY_KEYS } from "../constants/api";

export const useProducts = () => useQuery({ queryKey: [QUERY_KEYS.PRODUCTS], queryFn: fetchProducts });
