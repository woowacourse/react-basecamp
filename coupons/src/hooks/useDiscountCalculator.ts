<<<<<<< HEAD
import { useCouponApplicabilityChecker } from "./useCouponApplicabilityChecker";
import { Coupon } from "../types/coupon";
=======
import { useCouponApplicabilityChecker } from './useCouponApplicabilityChecker';
import { Coupon } from '../types/coupon';
>>>>>>> bb7b51d9b22bbb08fa7c3785cfe93ab21e05c80f

export const useDiscountCalculator = () => {
  const { isCouponApplicable } = useCouponApplicabilityChecker();

  const calculateFixedDiscount = (coupon: Coupon, totalAmount: number) => {
    if (!isCouponApplicable(coupon, totalAmount)) {
      return 0;
    }
    return coupon.discount ?? 0;
  };

  const calculatePercentageDiscount = (coupon: Coupon, totalAmount: number) => {
    if (!isCouponApplicable(coupon, totalAmount)) {
      return 0;
    }
    return Math.floor((totalAmount * (coupon.discount ?? 0)) / 100);
  };

  const calculateDiscountAmount = (coupon: Coupon, totalAmount: number, now: Date = new Date()) => {
    if (!isCouponApplicable(coupon, totalAmount, now)) {
      return 0;
    }

    switch (coupon.discountType) {
<<<<<<< HEAD
      case "fixed":
        return calculateFixedDiscount(coupon, totalAmount);
      case "percentage":
=======
      case 'fixed':
        return calculateFixedDiscount(coupon, totalAmount);
      case 'percentage':
>>>>>>> bb7b51d9b22bbb08fa7c3785cfe93ab21e05c80f
        return calculatePercentageDiscount(coupon, totalAmount);
      default:
        return 0;
    }
  };

  return {
    calculateDiscountAmount,
  };
};
