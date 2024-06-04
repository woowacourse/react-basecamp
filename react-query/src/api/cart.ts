import { CartItem, DeleteItem } from '../types';

import { API_ENDPOINTS } from '../constants/api';

export async function addToCart(item: CartItem): Promise<CartItem> {
  const response = await fetch(API_ENDPOINTS.CART, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });
  return await response.json();
}

export async function deleteToCart(item: DeleteItem): Promise<DeleteItem> {
  const response = await fetch(API_ENDPOINTS.CART, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });
  return await response.json();
}
