// src/mocks/handlers.ts
import { HttpResponse, http } from 'msw';

import { API_ENDPOINTS } from '../constants/api';
import { CartItem } from '../types';
import products from './products.json';

export const handlers = [
  http.get(API_ENDPOINTS.PRODUCTS, () => {
    return HttpResponse.json(products);
  }),

  http.post(
    `${API_ENDPOINTS.CART}`,
    async ({ request }: { request: { json: () => Promise<CartItem> } }) => {
      const newCartItem = await request.json();
      return HttpResponse.json(newCartItem, { status: 201 });
    }
  ),

  http.delete(
    `${API_ENDPOINTS.CART}/:id`,
    async ({ params }: { params: { id: string } }) => {
      return HttpResponse.json(params.id, { status: 201 });
    }
  ),
];
