import { http, HttpResponse } from "msw";
import products from "./products.json";
import { PRODUCTS_ENDPOINT } from "../api/endpoints";

// 페이지네이션을 처리하도록 수정
// 요청한 페이지와 limit에 맞게 데이터를 필터링하여 반환하도록 변경

export const handlers = [
  http.get(PRODUCTS_ENDPOINT, ({ request }) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get("page" || "1"));
    const limit = page === 1 ? 20 : 4;
    const start = page === 1 ? 0 : (page - 2) * 4 + 20;
    const end = start + limit;

    const paginatedProducts = products.slice(start, end);

    return HttpResponse.json(paginatedProducts);
  }),
];
