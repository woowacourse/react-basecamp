import { Coupon } from '../types/coupon';
import { couponValidator } from '../util/couponValidator';
import { useCouponFinder } from './useCouponFinder';

export const useCouponApplicabilityChecker = () => {
  const { findCouponByCode } = useCouponFinder();
  const { isCouponValid } = couponValidator();

  const isCouponApplicable = (coupon: Coupon, totalAmount: number, now: Date = new Date()) => {
    const targetCoupon = findCouponByCode(coupon.code);
    if (!targetCoupon || !isCouponValid(coupon)) return false;

    if (coupon.minimumAmount && totalAmount < coupon.minimumAmount) return false;

    if (targetCoupon.availableTime) {
      const [startHour, startMinute, startSecond] = targetCoupon.availableTime.start.split(':').map(Number);

      const [endHour, endMinute, endSecond] = targetCoupon.availableTime.end.split(':').map(Number);

      const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour, startMinute, startSecond);
      const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endHour, endMinute, endSecond);

      if (now < startTime || now > endTime) return false;
    }

    return true;
  };

  return { isCouponApplicable };
};
