import { useCouponFinder } from "./useCouponFinder";
import { useCouponValidator } from "./useCouponValidator";
import { Coupon } from "../types/coupon";

export const useCouponApplicabilityChecker = () => {
  const { findCouponByCode } = useCouponFinder();
  const { isCouponValid } = useCouponValidator();

  const isCouponApplicable = (coupon: Coupon, totalAmount: number) => {
    const targetCoupon = findCouponByCode(coupon.code);
    if (!targetCoupon || !isCouponValid(coupon)) return false;

    if (coupon.minimumAmount && totalAmount < coupon.minimumAmount) {
      return false;
    }

    return true;
  };

  return {
    isCouponApplicable,
  };
};
