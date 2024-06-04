import { API_ENDPOINTS } from "../constants/api";
import { CartItem } from "../types";
import { apiClient } from "./client";

export const addToCart = async (item: CartItem): Promise<CartItem> => {
  const requestInit = { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(item) };
  return await apiClient.__fetch(API_ENDPOINTS.CART, requestInit);
};
