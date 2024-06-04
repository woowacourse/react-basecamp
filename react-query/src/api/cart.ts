import { API_ENDPOINTS } from '../constants/api';
import { CartItem } from '../types';

export async function addToCart(item: CartItem): Promise<CartItem> {
  const response = await fetch(API_ENDPOINTS.CART, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    throw new Error('에러 발생');
  }

  return await response.json();
}

export async function deleteToCart(id: number): Promise<CartItem> {
  const response = await fetch(`${API_ENDPOINTS.CART}/${id}`, {
    method: 'DELETE',
    // headers: {
    //   'Content-Type': 'application/json',
    // },
  });

  if (!response.ok) {
    throw new Error('에러 발생');
  }

  return await response.json();
}
