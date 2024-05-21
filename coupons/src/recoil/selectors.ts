import { selector } from "recoil";
import { couponsState } from "./atoms";

/**
 * 쿠폰 목록 (couponsState) 가져오기
 */
export const couponListSelector = selector({
  key: "couponListSelector",
  get: ({ get }) => {
    const coupons = get(couponsState);
    return coupons;
  },
});
