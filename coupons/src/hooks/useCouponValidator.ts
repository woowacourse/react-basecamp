<<<<<<< HEAD
import { Coupon } from "../types/coupon";
=======
import { Coupon } from '../types/coupon';
>>>>>>> bb7b51d9b22bbb08fa7c3785cfe93ab21e05c80f

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
