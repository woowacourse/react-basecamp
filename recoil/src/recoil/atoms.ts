import { atom } from "recoil";

export const cardItemCountState = atom<number>({
  key: "cardItemCountState", // 식별자 (key는 애플리케이션 전체에서 고유해야 함)
  default: 0, // 초기값
});
