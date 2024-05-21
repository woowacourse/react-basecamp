import { atom } from "recoil";
import { Coupon } from "../types/coupon";
import { CartItem } from "../types/cart";

/**
 * 쿠폰 목록 저장
 */
export const couponsState = atom<Coupon[]>({
  key: "couponsState",
  default: [],
});

/**
 * 장바구니 상태 관리
 * @example [{
 * id: number,
    name: string,
    price: number,
    quantity: number,
  },]
 */
export const cartState = atom<CartItem[]>({
  key: "cartState",
  default: [],
});
