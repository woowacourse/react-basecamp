import { useRecoilValue } from "recoil";
import { couponsState } from "../recoil/atoms";

export const useCouponFinder = () => {
  const coupons = useRecoilValue(couponsState);
  const findCouponByCode = (code: string) => {
    return coupons.find((coupon) => coupon.code === code);
  };
  return { findCouponByCode };
};
