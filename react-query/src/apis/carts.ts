import { API_ENDPOINTS } from "../constants/api";
import { CartItem } from "../types";
import { apiClient } from "./client";

export const addToCart = async (item: CartItem): Promise<CartItem> => {
  return await apiClient.post(API_ENDPOINTS.CART, item);
};

export const deleteFromCart = async (itemId: number): Promise<void> => {
  return await apiClient.delete(`${API_ENDPOINTS.CART}/${itemId}`);
};
