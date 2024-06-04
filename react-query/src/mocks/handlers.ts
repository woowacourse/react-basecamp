import { http, HttpResponse } from "msw";
import products from "./products.json";
import { API_ENDPOINTS } from "../constants/api";
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

  http.delete(`${API_ENDPOINTS.CART}/:id`, async ({ request }) => {
    const urlParts = request.url.split("/");
    const deletedItemId = Number(urlParts[urlParts.length - 1]);
    return HttpResponse.json({ deletedItemId }, { status: 200 });
  }),
];
