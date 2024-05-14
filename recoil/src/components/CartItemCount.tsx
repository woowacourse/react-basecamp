import React from "react";
import { useRecoilValue } from "recoil";
import { cartItemCountState } from "../recoil/atoms";

// useRecoilValue : Recoil의 상태 값을 읽어오는 역할
function CartItemCount() {
  const count = useRecoilValue(cartItemCountState);
  return <div>장바구니 상품 개수: {count}</div>;
}

export default CartItemCount;
