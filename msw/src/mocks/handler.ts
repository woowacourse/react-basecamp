import { http, HttpResponse } from 'msw';
import products from './products.json';
import { PRODUCTS_ENDPOINT } from '../api/endpoints';

export const handlers = [
  http.get(PRODUCTS_ENDPOINT, ({ request }) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get('page') || '1');
    const limit = page === 1 ? 20 : 4; // 첫 시도에는 20개, 그 이후부턴 4개씩
    const start = page === 1 ? 0 : (page - 2) * 4 + 20; // 2페이지부터는 4씩 커서 증가
    const end = start + limit; // 마지막 좌표

    const paginatedProducts = products.slice(start, end);

    const firstPageLimit = 20;
    const subsequentPageLimit = 4;
    const totalProducts = products.length;

    const remainingProducts = totalProducts - firstPageLimit;
    const subsequentPages = Math.ceil(remainingProducts / subsequentPageLimit);

    const totalPage = 1 + subsequentPages;

    return HttpResponse.json({
      paginatedProducts,
      hasNextPage: end < products.length,
      totalPage,
    });
  }),
];
