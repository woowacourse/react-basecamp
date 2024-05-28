import { http, HttpResponse } from "msw";
import products from "./products.json";
import { PRODUCTS_ENDPOINT } from "../api/endpoints";

// 요청 URL이 http://woteco.com/products일 때 products.json 파일에서 불러온 모킹 데이터를 응답으로 반환
export const handlers = [
  http.get(PRODUCTS_ENDPOINT, ({ request }) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get("page") || "1"); // 파라미터 가져오기
    const limit = page === 1 ? 20 : 4;
    const start = page === 1 ? 0 : (page - 2) * 4 + 20;
    const end = start + limit;

    const paginatedProducts = products.slice(start, end);

    return HttpResponse.json(paginatedProducts); // JSON 형태로 응답
  }),
];

// 실제 API가 준비되지 않은 상황에서도 개발과 테스트를 진행할 수 있습니다.
// 네트워크 상태나 API 서버의 상태에 영향을 받지 않고 안정적으로 테스트를 진행할 수 있습니다.
// 다양한 경우의 수를 테스트하기 위해 모의 데이터를 자유롭게 조작할 수 있습니다.
