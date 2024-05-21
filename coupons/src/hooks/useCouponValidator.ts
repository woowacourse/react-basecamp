import { Coupon } from "../types/coupon";

export const isCouponExpired = (expirationDate: string) => {
  const today = new Date();
  const expiration = new Date(expirationDate);
  return expiration < today;
};

export const useCouponValidator = () => {
  const isCouponValid = (coupon: Coupon) => {
    return !isCouponExpired(coupon.expirationDate);
  };

  return {
    isCouponValid,
  };
};
