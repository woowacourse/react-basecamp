import { HttpResponse, http } from 'msw';
import products from './products.json';

const API_URL = 'http://woteco.com/products';

export const handlers = [
  http.get(API_URL, () => {
    return HttpResponse.json(products);
  }),
];
