import { http, HttpResponse } from "msw";
import products from "./products.json";
import { PRODUCTS_ENDPOINT } from "../api/endpoints";

export const handlers = [
  http.get(PRODUCTS_ENDPOINT, () => {
    return HttpResponse.json(products);
  }),
];
