import { couponListSelector } from '../recoil/selectors';
import { useDiscountCalculator } from './useDiscountCalculator';
import { useRecoilValue } from 'recoil';

export const useCoupons = () => {
  const coupons = useRecoilValue(couponListSelector);
  const { calculateDiscountAmount } = useDiscountCalculator();

  return {
    coupons,
    calculateDiscountAmount,
  };
};
