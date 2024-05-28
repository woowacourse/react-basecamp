import { http, HttpResponse } from 'msw';
import { PRODUCTS_ENDPOINT } from '../api/endpoints';

import products from './products.json';

export const handlers = [
  http.get(PRODUCTS_ENDPOINT, ({ request }) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get('page') || '1');
    const limit = page === 1 ? 20 : 4;
    const start = page === 1 ? 0 : (page - 2) * 4 + 20;
    const end = start + limit;

    const paginatedProducts = products.slice(start, end);
    const last = !products[end + 1];

    return HttpResponse.json({ last, content: [...paginatedProducts] });
  }),
];
