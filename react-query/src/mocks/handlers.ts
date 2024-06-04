import { http, HttpResponse } from "msw";
import { API_ENDPOINTS } from "../constants/api";
import products from "./products.json";
import { CartItem } from "../types";

export const handlers = [
  http.get(API_ENDPOINTS.PRODUCTS, () => {
    return HttpResponse.json(products);
  }),
  http.post(
    `${API_ENDPOINTS.CART}`,
    async ({ request }: { request: { json: () => Promise<CartItem> } }) => {
      const newCartItem = await request.json();
      return HttpResponse.json(newCartItem, { status: 201 });
    }
  ),
  http.delete(
    `${API_ENDPOINTS.CART}/:id`,
    async ({ params }: { params: { id: string } }) => {
      return HttpResponse.json({ status: 204 });
    }
  ),
];
