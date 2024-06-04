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

export const deleteCartItem = async (id: number) => {
  try {
    const response = await fetch(API_ENDPOINTS.DELETE_CART_ITEMS(id), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.json();
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
};
