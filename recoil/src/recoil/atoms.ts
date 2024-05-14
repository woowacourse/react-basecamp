import { atom } from "recoil";

export const cartItemCountState = atom<number>({
  key: "cartItemCountState",
  default: 0,
});
