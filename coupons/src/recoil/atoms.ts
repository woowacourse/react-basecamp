import { atom } from 'recoil';
import { CartItem, Coupon } from '../types/coupon';

export const couponsState = atom<Coupon[]>({
  key: 'couponsState',
  default: [],
});

export const cartState = atom<CartItem[]>({
  key: 'cartState',
  default: [],
});
