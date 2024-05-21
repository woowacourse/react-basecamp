import { Coupon } from "../types/coupon";
import { atom } from "recoil";

export const couponsState = atom<Coupon[]>({
  key: "couponsState",
  default: [],
});
