import { Coupon } from "../types/coupon";
import { useCouponFinder } from "./useCouponFinder";
import { couponValidator } from "./useCouponValidator";

export const useCouponApplicabilityChecker = () => {
  const { findCouponByCode } = useCouponFinder();
  const { isCouponValid } = couponValidator();

  const isCouponApplicable = (
    coupon: Coupon,
    totalAmount: number,
    now: Date = new Date()
  ) => {
    /**
     * 쿠폰 코드로 쿠폰을 찾아
     * 해당하는 코픈이 없거나 유효한 쿠폰이 아니면 false 반환
     * 총 금액이 쿠폰 적용 최소 금액을 넘지 않으면 false 반환
     */
    const targetCoupon = findCouponByCode(coupon.code);
    if (!targetCoupon || !isCouponValid(coupon)) return false;

    if (coupon.minimumAmount && totalAmount < coupon.minimumAmount) {
      return false;
    }

    if (targetCoupon.availableTime) {
      // 2023-04-30T23:00:00.000Z
      const [startHour, startMinute, startSecond] =
        targetCoupon.availableTime.start.split(":").map(Number);

      const [endHour, endMinute, endSecond] = targetCoupon.availableTime.end
        .split(":")
        .map(Number);

      const startTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        startHour,
        startMinute,
        startSecond
      );

      const endTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        endHour,
        endMinute,
        endSecond
      );

      if (now < startTime || now > endTime) {
        return false;
      }
    }
    return true;
  };

  return { isCouponApplicable };
};
