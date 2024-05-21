<<<<<<< HEAD
import { selector } from "recoil";
import { couponsState } from "./atoms";

export const couponListSelector = selector({
  key: "couponListSelector",
=======
import { selector } from 'recoil';
import { couponsState } from './atoms';

export const couponListSelector = selector({
  key: 'couponListSelector',
>>>>>>> bb7b51d9b22bbb08fa7c3785cfe93ab21e05c80f
  get: ({ get }) => {
    const coupons = get(couponsState);
    return coupons;
  },
});
