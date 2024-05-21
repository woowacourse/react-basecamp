<<<<<<< HEAD
import { atom } from "recoil";
import { Coupon } from "../types/coupon";
import { CartItem } from "../types/cart";

export const couponsState = atom<Coupon[]>({
  key: "couponsState",
=======
import { atom } from 'recoil';
import { Coupon } from '../types/coupon';
import { CartItem } from '../types/cart';

export const couponsState = atom<Coupon[]>({
  key: 'couponsState',
>>>>>>> bb7b51d9b22bbb08fa7c3785cfe93ab21e05c80f
  default: [],
});

export const cartState = atom<CartItem[]>({
<<<<<<< HEAD
  key: "cartState",
=======
  key: 'cartState',
>>>>>>> bb7b51d9b22bbb08fa7c3785cfe93ab21e05c80f
  default: [],
});
