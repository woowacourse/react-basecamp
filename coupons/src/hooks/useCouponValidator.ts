import { Coupon } from "../types/coupon";

export const useCouponValidator = () => {
  /**
   * 만료일과 현재 날짜를 비교하여 쿠폰 유효성 검사
   * @param expirationDate
   * @returns { boolean }
   */
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
