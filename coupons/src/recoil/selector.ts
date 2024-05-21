import { selector } from 'recoil';
import { couponState } from './atom';

export const couponListSelector = selector({
  key: 'couponListSelector',
  get: ({ get }) => {
    const coupons = get(couponState);

    return coupons;
  },
});
