import { HttpResponse, http } from "msw";
import { API_ENDPOINTS } from "../constants/api";
import products from "./products.json";

export const handlers = [
  http.get(API_ENDPOINTS.PRODUCTS, async () => {
    return HttpResponse.json(products);
  }),
  http.post(API_ENDPOINTS.CART, async ({ request }) => {
    const newCartItem = await request.json();
    return HttpResponse.json(newCartItem);
  }),
];
