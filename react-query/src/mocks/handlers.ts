import { http, HttpResponse } from "msw";
import products from "./products.json";
import { API_ENDPOINTS } from "../constants/api";

export const handlers = [
  http.get(API_ENDPOINTS.PRODUCTS, () => {
    return HttpResponse.json(products);
  }),
];
