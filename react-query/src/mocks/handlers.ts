import { http, HttpResponse } from 'msw';
import products from './products.json';
import { API_ENDPOINTS } from '../constants/api';
import cartItems from './cartItems.json';
import { NotFoundError, Success } from './response';
import { CartItem } from '../types';

export const handlers = [
  http.get(API_ENDPOINTS.PRODUCTS, () => {
    return HttpResponse.json(products);
  }),

  http.post(`${API_ENDPOINTS.CART}`, async ({ request }) => {
    const newCartItem = await request.json();
    return Success(newCartItem);
  }),

  http.delete(`${API_ENDPOINTS.CART}`, async ({ request }) => {
    const deletedCartItem = (await request.json()) as CartItem;

    const cartItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === Number(deletedCartItem.id)
    );

    if (cartItemIndex !== -1) {
      cartItems.splice(cartItemIndex, cartItemIndex + 1);
      return Success();
    } else {
      return NotFoundError;
    }
  }),
];
