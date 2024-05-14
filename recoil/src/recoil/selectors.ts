import { selector } from "recoil";
import { cartItemCountState } from "./atoms";

export const cartTotalPriceState = selector({
  key: "cartTotalPriceState",
  get: ({ get }) => {
    const count = get(cartItemCountState);
    const itemPrice = 10;
    return count * itemPrice;
  },
});
