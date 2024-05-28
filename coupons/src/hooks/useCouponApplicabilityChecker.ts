import { useCouponFinder } from './useCouponFinder';
import { useCouponValidator } from './useCouponValidator';
import { Coupon } from '../types/coupon';

export const useCouponApplicabilityChecker = () => {
  const { findCouponByCode } = useCouponFinder();
  const { isCouponValid } = useCouponValidator();

  const isCouponApplicable = (
    coupon: Coupon,
    totalAmount: number,
    now: Date = new Date(), // 쿠폰을 사용하는 사용자의 시간
  ) => {
    const targetCoupon = findCouponByCode(coupon.code);
    if (!targetCoupon || !isCouponValid(targetCoupon)) return false;

    // 최소 금액 넘는지 확인
    if (targetCoupon.minimumAmount && totalAmount < targetCoupon.minimumAmount) {
      return false;
    }

    // 유효 시간 내부인지 확인
    if (targetCoupon.availableTime) {
      const [startHour, startMinute, startSecond] = targetCoupon.availableTime.start.split(':').map(Number);

      const [endHour, endMinute, endSecond] = targetCoupon.availableTime.end.split(':').map(Number);

      const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour, startMinute, startSecond);

      const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endHour, endMinute, endSecond);

      if (now < startTime || now > endTime) {
        return false;
      }
    }

    return true;
  };

  return {
    isCouponApplicable,
  };
};
