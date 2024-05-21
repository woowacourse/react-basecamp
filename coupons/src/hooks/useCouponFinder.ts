import { useRecoilValue } from 'recoil';
import { couponListSelector } from '../recoil/selectors';

// 쿠폰 코드에 해당하는 쿠폰이 존재하는지 확인한다.
export const useCouponFinder = () => {
  const coupons = useRecoilValue(couponListSelector);

  const findCouponByCode = (code: string) => {
    return coupons.find((coupon) => coupon.code === code);
  };

  return {
    findCouponByCode,
  };
};
