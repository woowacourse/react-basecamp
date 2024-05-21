import { atom } from 'recoil';
import { Coupon } from '../types/coupon';

export const couponState = atom<Coupon[]>({
  key: 'couponState',
  default: [],
});
