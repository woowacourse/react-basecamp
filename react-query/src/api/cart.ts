import { API_ENDPOINTS } from "../constants/api";
import { CartItem } from "../types";

export async function addToCart(item: CartItem): Promise<CartItem> {
  const response = await fetch(API_ENDPOINTS.CART, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  return await response.json();
}

export async function deleteFromCart(id: number) {
  const response = await fetch(`${API_ENDPOINTS.CART}/${id}`, {
    method: "DELETE",
  });
  return await response.json();
}