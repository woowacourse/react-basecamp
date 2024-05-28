import React from "react";
import { cartItemCountState } from "../recoil/atoms";
import { useRecoilValue } from "recoil";

function CartItemCount() {
  // 이 훅을 사용하여 컴포넌트에서 Atom이나 Selector의 현재 값을 가져올 수 있습니다.
  // useRecoilValue는 읽기 전용이므로 상태 값을 변경하려면 다른 훅을 사용해야 합니다.
  const count = useRecoilValue(cartItemCountState);
  return <div>장바구니 상품 개수: {count}</div>;
}

export default CartItemCount;
