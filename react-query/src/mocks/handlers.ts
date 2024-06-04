import { HttpResponse, http } from "msw";
import products from "./products.json";

export const handlers = [
  http.get("https://woteco.com/products", () => {
    return HttpResponse.json(products);
  }),
];
