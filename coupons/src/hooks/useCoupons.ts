<<<<<<< HEAD
import { useRecoilValue } from "recoil";
import { couponListSelector } from "../recoil/selectors";
import { useDiscountCalculator } from "./useDiscountCalculator";
=======
import { useRecoilValue } from 'recoil';
import { couponListSelector } from '../recoil/selectors';
import { useDiscountCalculator } from './useDiscountCalculator';
>>>>>>> bb7b51d9b22bbb08fa7c3785cfe93ab21e05c80f

export const useCoupons = () => {
  const coupons = useRecoilValue(couponListSelector);
  const { calculateDiscountAmount } = useDiscountCalculator();

  return {
    coupons,
    calculateDiscountAmount,
  };
};
