import { API_ENDPOINTS } from "../constants/api";
import { Product } from "../types";
import { apiClient } from "./client";

export const fetchProducts = async (): Promise<Product[]> => {
  return await apiClient.get(API_ENDPOINTS.PRODUCTS);
};
