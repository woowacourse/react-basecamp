import { selector } from "recoil";
import { cartItemCountState } from "./atoms";
import { fetchProducts } from "../api";

export const cartTotalPriceState = selector({
  key: "cartTotalPriceState",
  get: ({ get }) => {
    const count = get(cartItemCountState);
    const itemPrice = 10;
    return count * itemPrice;
  },
});

export const productsState = selector({
  key: "productsState",
  get: async () => {
    const products = await fetchProducts();
    return products;
  },
});
