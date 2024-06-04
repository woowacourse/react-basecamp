import { HttpResponse, http } from "msw";
import { API_ENDPOINTS } from "../constants/api";
import products from "./products.json";

export const handlers = [
  http.get(API_ENDPOINTS.PRODUCTS, async () => {
    return HttpResponse.json(products);
  }),
  http.delete(`${API_ENDPOINTS.CART}/:id`, async ({ params }) => {
    //params.id로 삭제
    console.log("delete ");
    return new HttpResponse(null, { status: 204 });
  }),
  http.post(API_ENDPOINTS.CART, async ({ request }) => {
    const newCartItem = await request.json();
    return HttpResponse.json(newCartItem, { status: 201 });
  }),
];
