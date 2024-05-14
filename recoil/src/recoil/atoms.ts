import { atom, atomFamily } from "recoil";

// Atom : Recoil의 상태를 정의하고 관리하는 데 사용됩니다.
export const cartItemCountState = atom<number>({
  key: "cartItemCountState",
  default: 0,
});

// AtomFamily : Recoil에서 제공하는 유틸리티 함수 중 하나로, 동일한 형태의 Atom을 동적으로 생성할 수 있게 해줍니다.
export const itemQuantityState = atomFamily<number, number>({
  key: "itemQuantityState",
  default: 0,
});
