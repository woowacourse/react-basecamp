import { atom } from "recoil";
import { Coupon } from "../types/coupon";
import { CartItem } from "../types/cart";

// 쿠폰 목록을 저장하는 상태
export const couponsState = atom<Coupon[]>({
  key: "couponsState",
  default: [],
});

export const cartState = atom<CartItem[]>({
  key: "cartState",
  default: [],
});
