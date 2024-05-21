import { selector, selectorFamily } from 'recoil';
import { couponsState, cartState } from './atom';
import { Coupon } from '../types/coupon';

const isCouponExpired = (expirationDate: string) => {
  const today = new Date();
  const expiration = new Date(expirationDate);
  return expiration < today;
};

export const couponListSelector = selector({
  key: 'couponListSelector',
  get: ({ get }) => {
    const coupons = get(couponsState);
    return coupons;
  },
});

export const couponByCodeSelector = selectorFamily<Coupon | undefined, string>({
  key: 'couponByCodeSelector',
  get:
    (code) =>
    ({ get }) => {
      const coupons = get(couponsState);
      return coupons.find((coupon) => coupon.code === code);
    },
});

export const couponValidityState = selectorFamily<boolean, number>({
  key: 'couponValidityState',
  get:
    (couponId) =>
    ({ get }) => {
      const coupon = get(couponsState).find((c) => c.id === couponId);
      if (!coupon) return false;
      return !isCouponExpired(coupon.expirationDate);
    },
});

export const cartTotalState = selector<number>({
  key: 'cartTotalState',
  get: ({ get }) => {
    const cartItems = get(cartState);
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  },
});
