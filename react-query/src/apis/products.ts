import { API_ENDPOINTS } from "../constants/api";
import { Product } from "../types";
import { apiClient } from "./client";

export const fetchProducts = async (): Promise<Product[]> => {
  return await apiClient.__fetch(API_ENDPOINTS.PRODUCTS);
};
