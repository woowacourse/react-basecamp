import { atom, atomFamily } from 'recoil';

export const cartItemCountState = atom<number>({
  key: 'cartItemCountState',
  default: 0,
});

// atomFamily는 recoil에서 제공하는 유틸리티 함수 중 하나로,
// 동일한 형태의 Atom을 동적으로 생성할 수 있게 해줍니다.
// 예를 들어, 장바구니에 담긴 각 상품의 수량을 관리할 때, 상품마다 별도의 Atom을 생성하는 것이 효과적일 수 있습니다.
// 이때 AtomFamily를 사용하면 상품 ID와 같은 고유한 식별자를 기반으로 Atom을 생성할 수 있습니다.
// 첫 번째 제네릭 매개변수는 Atom의 값 타입, 두 번째 매개변수는 Atom을 식별하는 배개변수의 타입이다.
// 즉, 상품 ID를 매개변수로 받아 해당 상품의 수량을 관리하는 Atom을 반환한다.
export const itemQuantityState = atomFamily<number, number>({
  key: 'itemQuantityState',
  default: 0,
});
