import { atom } from 'recoil';
import { Coupon } from '../types/coupon';

export const couponsState = atom<Coupon[]>({
  key: 'couponsState',
  default: [],
});
