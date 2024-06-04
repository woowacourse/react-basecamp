import { http, HttpResponse } from 'msw';
import products from './products.json';
import { API_ENDPOINTS } from '../constants/api';
import { CartItem, Product } from '../types';

export const handlers = [
  http.get(API_ENDPOINTS.PRODUCTS, () => {
    return HttpResponse.json(products);
  }),

  http.post(`${API_ENDPOINTS.CART}`, async ({ request }: { request: { json: () => Promise<CartItem> } }) => {
    const newCartItem = await request.json();
    return HttpResponse.json(newCartItem, { status: 201 });
  }),

  http.delete(`${API_ENDPOINTS.CART}/:id`, async ({ request }: { request: { json: () => Promise<number> } }) => {
    const targetId = await request.json();

    const temp: Product[] = [];
    products.forEach((product) => {
      if (product.id !== targetId) {
        temp.push(product);
      }
    });
    return HttpResponse.json(temp, { status: 201 });
  }),
];
