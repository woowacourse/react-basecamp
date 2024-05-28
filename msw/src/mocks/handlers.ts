import { http, HttpResponse } from "msw";
import { PRODUCTS_ENDPOINT } from "../api/endpoints";
import products from "./products.json";

export const handlers = [
  http.get(PRODUCTS_ENDPOINT, () => {
    return HttpResponse.json(products);
  }),
];
