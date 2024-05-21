<<<<<<< HEAD
import { useRecoilValue } from "recoil";
import { couponListSelector } from "../recoil/selectors";
=======
import { useRecoilValue } from 'recoil';
import { couponListSelector } from '../recoil/selectors';
>>>>>>> bb7b51d9b22bbb08fa7c3785cfe93ab21e05c80f

export const useCouponFinder = () => {
  const coupons = useRecoilValue(couponListSelector);

  const findCouponByCode = (code: string) => {
    return coupons.find((coupon) => coupon.code === code);
  };

  return {
    findCouponByCode,
  };
};
