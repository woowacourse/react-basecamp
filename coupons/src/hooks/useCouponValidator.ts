import { Coupon } from "../types/coupon";

// 쿠폰의 존재 여부는 이 훅에서 알 수 없지 않나?
export const useCouponValidator = () => {
  const isCouponExpired = (expirationDate: string) => {
    const today = new Date();
    const expiration = new Date(expirationDate);
    return expiration < today;
  };

  const isCouponValid = (coupon: Coupon) => {
    return !isCouponExpired(coupon.expirationDate);
  };

  return {
    isCouponValid,
  };
};
