import { atom, atomFamily } from "recoil";

export const cartItemCountState = atom<number>({
  key: "cartItemCountState",
  default: 0,
});

export const itemQuantityState = atomFamily<number, number>({
  key: "itemQuantityState",
  default: 0,
});

// atom은 애플리케이션의 상태 단위를 나타낸다.

// 단위?
