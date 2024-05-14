import { atom } from "recoil";

export const cartItemCountState = atom<number>({
  key: "cartItemCountState", // 식별자 (key는 애플리케이션 전체에서 고유해야 함)
  default: 0, // 초기값
});
