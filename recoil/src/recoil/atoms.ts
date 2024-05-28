import { atom, atomFamily } from "recoil";

export const cartItemCountState = atom<number>({
  key: "cartItemCountState", // 식별자 (key는 애플리케이션 전체에서 고유해야 함)
  default: 0, // 초기값
});

/**
 * AtomFamily는 동일한 형태의 Atom을 동적으로 생성할 수 있게 해줍니다.
 * AtomFamily를 사용하면 동적으로 생성되는 Atom을 효과적으로 관리할 수 있습니다.
 * 제네릭 매개변수: <param1, param2> -> <Atom의 값 타입, Atom을 식별하는 매개변수의 타입>
 */
export const itemQuantityState = atomFamily<number, number>({
  key: "itemQuantityState",
  default: 0,
});
