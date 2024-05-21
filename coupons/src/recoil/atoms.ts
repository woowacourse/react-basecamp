import { CartItem } from '../types/cart';
import { Coupon } from '../types/coupon';
import { atom } from 'recoil';

export const couponsState = atom<Coupon[]>({
  key: 'couponsState',
  default: [],
});

export const cartState = atom<CartItem[]>({
  key: 'cartState',
  default: [],
});
