// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';
import products from './products.json';
import { API_ENDPOINTS } from '../constants/api';
import { CartItem } from '../types';

let cartItems: CartItem[] = []; // Mock cart items

export const handlers = [
  http.get(API_ENDPOINTS.PRODUCTS, () => {
    return HttpResponse.json(products);
  }),
  http.post(`${API_ENDPOINTS.CART}`, async ({ request }: { request: { json: () => Promise<CartItem> } }) => {
    const newCartItem = await request.json();
    cartItems.push(newCartItem); // Add item to mock cart
    return HttpResponse.json(newCartItem, { status: 201 });
  }),
  http.delete(`${API_ENDPOINTS.CART}/:itemId`, async (request: { params: { itemId: string } }) => {
    const { itemId } = request.params;
    cartItems = cartItems.filter((item) => item.id !== parseInt(itemId, 10)); // Remove item from mock cart
    return HttpResponse.json({}, { status: 204 });
  }),
];
