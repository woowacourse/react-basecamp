import { selector } from "recoil";
import { couponsState } from "./atoms";

// 쿠폰 목록에 대한 복잡한 로직
export const couponListSelector = selector({
  key: "couponListSelector",
  get: ({ get }) => {
    const coupons = get(couponsState);
    return coupons;
  },
});
