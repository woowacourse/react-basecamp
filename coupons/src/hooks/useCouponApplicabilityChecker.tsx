import { Coupon } from '../types/coupon';
import { couponValidator } from '../util/couponValidator';
import { useCouponFinder } from './useCouponFinder';

export const useCouponApplicabilityChecker = () => {
  const { findCouponByCode } = useCouponFinder();
  const { isCouponValid } = couponValidator();

  const isCouponApplicable = (coupon: Coupon, totalAmount: number) => {
    const targetCoupon = findCouponByCode(coupon.code);
    if (!targetCoupon || !isCouponValid(coupon)) return false;

    if (coupon.minimumAmount && totalAmount < coupon.minimumAmount) return false;

    return true;
  };

  return { isCouponApplicable };
};
