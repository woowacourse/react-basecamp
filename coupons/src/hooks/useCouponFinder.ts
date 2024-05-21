import { selectorFamily, useRecoilValue } from "recoil";
import { couponListSelector } from "../recoil/selectors";
import { Coupon } from "../types/coupon";
import { couponValidityState, couponsState } from "../recoil/atoms";

export const useCouponFinder = () => {
  const coupons = useRecoilValue(couponListSelector);

  const findCouponByCode = (code: string) => {
    return coupons.find((coupon) => coupon.code === code);
  };

  return {
    findCouponByCode,
  };
};

export const couponByCodeSelector = selectorFamily<Coupon | undefined, string>({
  key: "couponByCodeSelector",
  get:
    (code) =>
    ({ get }) => {
      const coupons = get(couponsState);
      return coupons.find((coupon) => coupon.code === code);
    },
});

export const useCouponValidator = (couponId: number) => {
  const isValid = useRecoilValue(couponValidityState(couponId));
  return isValid;
};
