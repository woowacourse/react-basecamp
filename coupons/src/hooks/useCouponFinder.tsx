import { selectorFamily, useRecoilValue } from 'recoil';
import { Coupon } from '../types/coupon';
import { couponValidityState, couponsState } from '../recoil/atom';

export const useCouponFinder = (code: string) => {
  const coupon = useRecoilValue(couponByCodeSelector(code));

  return coupon;
};

export const couponByCodeSelector = selectorFamily<Coupon | undefined, string>({
  key: 'couponByCodeSelector',
  get:
    (code) =>
    ({ get }) => {
      const coupons = get(couponsState);

      return coupons.find((coupon) => coupon.code == code);
    },
});

export const useCouponValidator = (couponId: number) => {
  const isValid = useRecoilValue(couponValidityState(couponId));

  return isValid;
};
