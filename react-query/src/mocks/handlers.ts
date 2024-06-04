import { HttpResponse, http } from 'msw';
import products from './products.json';

export const handlers = [
  http.get('http://wooteco.com/products', () => {
    return HttpResponse.json(products);
  }),
];
