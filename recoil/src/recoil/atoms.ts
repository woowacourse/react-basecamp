import { atom, atomFamily } from "recoil";

export const cartItemCountState = atom<number>({
  key: "cartItemCountState",
  default: 0,
});

export const itemQuantityState = atomFamily<number, number>({
  key: "itemQuantityState",
  default: 0,
});
