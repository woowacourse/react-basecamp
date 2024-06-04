import { API_ENDPOINTS } from "../constants/api";
import { Product } from "../types";

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(API_ENDPOINTS.PRODUCTS);
  return await response.json();
}
