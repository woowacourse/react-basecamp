import { HttpResponse, http } from 'msw';
import products from './products.json';
import { PRODUCTS_ENDPOINT } from '../api/endpoint';

export const handlers = [
  http.get(PRODUCTS_ENDPOINT, () => {
    return HttpResponse.json(products);
  }),
];
