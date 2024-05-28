import { selector, selectorFamily } from "recoil";
import { Coupon } from "../types/coupon";
import { couponsState } from "./atoms";

export const couponListSelector = selector({
  key: "couponListSelector",
  get: ({ get }) => {
    const coupons = get(couponsState);
    return coupons;
  },
});

export const couponByCodeSelector = selectorFamily<Coupon | undefined, string>({
  key: "couponByCodeSelector",
  get:
    (code) =>
    ({ get }) => {
      const coupons = get(couponsState);
      return coupons.find((coupon) => coupon.code === code);
    },
});
