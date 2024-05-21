import { useRecoilValue } from 'recoil';
import { couponListSelector } from '../recoil/selector';

export const useCoupons = () => {
  const coupons = useRecoilValue(couponListSelector);

  return { coupons };
};
