import { atom } from "recoil";
import { Coupon } from "../types/coupon";
import { CartItem } from "../types/cart";

export const cartState = atom<CartItem[]>({
  key: "cartState",
  default: [],
});

export const couponsState = atom<Coupon[]>({
  key: "couponsState",
  default: [],
});
