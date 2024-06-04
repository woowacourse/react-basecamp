import { API_ENDPOINTS } from "../constants/api";
import { CartItem } from "../types";
import { apiClient } from "./client";

export const addToCart = async (item: CartItem): Promise<CartItem> => {
  return await apiClient.post(API_ENDPOINTS.CART, item);
};
